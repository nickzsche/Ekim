import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quoteId = parseInt(params.id);
    const db = getDatabase();
    
    // Get quote with items
    const quote = db.prepare(`
      SELECT q.*
      FROM quotes q
      WHERE q.id = ?
    `).get(quoteId);
    
    if (!quote) {
      return NextResponse.json(
        { error: 'Teklif bulunamadı' },
        { status: 404 }
      );
    }
    
    // Get quote items
    const items = db.prepare(`
      SELECT qi.*, p.name as product_name, p.brand, p.model, p.code
      FROM quote_items qi
      LEFT JOIN products p ON qi.product_id = p.id
      WHERE qi.quote_id = ?
    `).all(quoteId);
    
    return NextResponse.json({
      ...quote,
      items
    });
  } catch (error) {
    console.error('Teklif detayları getirilirken hata:', error);
    return NextResponse.json(
      { error: 'Teklif detayları getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quoteId = parseInt(params.id);
    const db = getDatabase();
    
    // Check if quote exists
    const quote = db.prepare('SELECT id FROM quotes WHERE id = ?').get(quoteId);
    
    if (!quote) {
      return NextResponse.json(
        { error: 'Teklif bulunamadı' },
        { status: 404 }
      );
    }
    
    // Delete in transaction
    const transaction = db.transaction(() => {
      // First delete quote items
      db.prepare('DELETE FROM quote_items WHERE quote_id = ?').run(quoteId);
      
      // Then delete the quote
      db.prepare('DELETE FROM quotes WHERE id = ?').run(quoteId);
    });
    
    transaction();
    
    return NextResponse.json({
      success: true,
      message: 'Teklif başarıyla silindi'
    });
  } catch (error) {
    console.error('Teklif silinirken hata:', error);
    return NextResponse.json(
      { error: 'Teklif silinirken hata oluştu' },
      { status: 500 }
    );
  }
}