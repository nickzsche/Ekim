import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// Müşterinin tüm cari hareketlerini getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);

    if (isNaN(customerId)) {
      return NextResponse.json({ error: 'Invalid customer ID' }, { status: 400 });
    }

    const db = getDatabase();
    
    const transactions = db.prepare(`
      SELECT * FROM transactions 
      WHERE customer_id = ? 
      ORDER BY date DESC, created_at DESC
    `).all(customerId);

    return NextResponse.json(transactions);

  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Yeni cari hareket ekle
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);

    if (isNaN(customerId)) {
      return NextResponse.json({ error: 'Invalid customer ID' }, { status: 400 });
    }

    const body = await request.json();
    const { date, type, method, amount, description, verilis_tarihi, vade_tarihi, bank } = body;

    if (!date || !type || !method || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getDatabase();
    
    // Check if customer exists
    const customer = db.prepare('SELECT id FROM customers WHERE id = ?').get(customerId);
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Insert transaction
    const result = db.prepare(`
      INSERT INTO transactions (customer_id, date, type, method, amount, description, verilis_tarihi, vade_tarihi, bank)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(customerId, date, type, method, amount, description || null, verilis_tarihi || null, vade_tarihi || null, bank || null);

    // Update customer balance
    // tahsilat ve çek: artı, ödeme ve borç: eksi
    const balanceChange = (type === 'tahsilat' || type === 'çek') ? amount : -amount;
    db.prepare(`
      UPDATE customers 
      SET balance = balance + ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(balanceChange, customerId);

    // Get updated customer balance
    const updatedCustomer = db.prepare('SELECT balance FROM customers WHERE id = ?').get(customerId);

    return NextResponse.json({
      message: 'Cari hareket başarıyla eklendi',
      transaction: {
        id: result.lastInsertRowid,
        customer_id: customerId,
        date,
        type,
        method,
        amount,
        description,
        verilis_tarihi,
        vade_tarihi,
        bank
      },
      balance: (updatedCustomer as any).balance
    });

  } catch (error) {
    console.error('Error adding transaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
