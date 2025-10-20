import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, Quote, QuoteItem } from '@/lib/database';

export async function GET() {
  try {
    const db = getDatabase();
    const quotes = db.prepare(`
      SELECT q.*, 
             COUNT(qi.id) as item_count
      FROM quotes q
      LEFT JOIN quote_items qi ON q.id = qi.quote_id
      GROUP BY q.id
      ORDER BY q.created_at DESC
    `).all();
    
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Teklifleri getirirken hata:', error);
    return NextResponse.json(
      { error: 'Teklifler getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { quote, items }: { quote: Quote; items: QuoteItem[] } = await request.json();
    const db = getDatabase();
    
    // Transaction başlat
    const transaction = db.transaction(() => {
      // Teklifi ekle
      const quoteStmt = db.prepare(`
        INSERT INTO quotes (customer_name, customer_email, customer_phone, company, total_amount, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      
      const result = quoteStmt.run(
        quote.customer_name,
        quote.customer_email || null,
        quote.customer_phone || null,
        quote.company || null,
        quote.total_amount || 0,
        quote.status || 'draft',
        quote.notes || null
      );
      
      const quoteId = result.lastInsertRowid;
      
      // Teklif kalemlerini ekle
      if (items && items.length > 0) {
        const itemStmt = db.prepare(`
          INSERT INTO quote_items (quote_id, product_id, quantity, unit_price, total_price)
          VALUES (?, ?, ?, ?, ?)
        `);
        
        let totalAmount = 0;
        for (const item of items) {
          const itemTotal = item.quantity * item.unit_price;
          totalAmount += itemTotal;
          
          itemStmt.run(
            quoteId,
            item.product_id,
            item.quantity,
            item.unit_price,
            itemTotal
          );
        }
        
        // Toplam tutarı güncelle
        const updateStmt = db.prepare('UPDATE quotes SET total_amount = ? WHERE id = ?');
        updateStmt.run(totalAmount, quoteId);
      }
      
      return quoteId;
    });
    
    const quoteId = transaction();
    
    return NextResponse.json({ 
      success: true, 
      quoteId: Number(quoteId),
      message: 'Teklif başarıyla oluşturuldu' 
    });
  } catch (error) {
    console.error('Teklif oluştururken hata:', error);
    return NextResponse.json(
      { error: 'Teklif oluşturulurken hata oluştu' },
      { status: 500 }
    );
  }
}