import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// Cari hareketi güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; transactionId: string }> }
) {
  try {
    const { id, transactionId } = await params;
    const customerId = parseInt(id);
    const txId = parseInt(transactionId);

    if (isNaN(customerId) || isNaN(txId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const { date, type, method, amount, description, verilis_tarihi, vade_tarihi, bank } = body;

    const db = getDatabase();
    
    // Get old transaction to calculate balance difference
    const oldTransaction = db.prepare('SELECT * FROM transactions WHERE id = ? AND customer_id = ?').get(txId, customerId);
    
    if (!oldTransaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    const oldTx = oldTransaction as any;
    const oldBalanceEffect = (oldTx.type === 'tahsilat' || oldTx.type === 'çek') ? oldTx.amount : -oldTx.amount;
    const newBalanceEffect = (type === 'tahsilat' || type === 'çek') ? amount : -amount;
    const balanceChange = newBalanceEffect - oldBalanceEffect;

    // Update transaction
    db.prepare(`
      UPDATE transactions 
      SET date = ?, type = ?, method = ?, amount = ?, description = ?, 
          verilis_tarihi = ?, vade_tarihi = ?, bank = ?
      WHERE id = ? AND customer_id = ?
    `).run(date, type, method, amount, description || null, verilis_tarihi || null, vade_tarihi || null, bank || null, txId, customerId);

    // Update customer balance
    db.prepare(`
      UPDATE customers 
      SET balance = balance + ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(balanceChange, customerId);

    // Get updated customer balance
    const updatedCustomer = db.prepare('SELECT balance FROM customers WHERE id = ?').get(customerId);

    return NextResponse.json({
      message: 'Cari hareket başarıyla güncellendi',
      balance: (updatedCustomer as any).balance
    });

  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Cari hareketi sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; transactionId: string }> }
) {
  try {
    const { id, transactionId } = await params;
    const customerId = parseInt(id);
    const txId = parseInt(transactionId);

    if (isNaN(customerId) || isNaN(txId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const db = getDatabase();
    
    // Get transaction to calculate balance change
    const transaction = db.prepare('SELECT * FROM transactions WHERE id = ? AND customer_id = ?').get(txId, customerId);
    
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    const tx = transaction as any;
    // Reverse the balance effect
    const balanceChange = (tx.type === 'tahsilat' || tx.type === 'çek') ? -tx.amount : tx.amount;

    // Delete transaction
    db.prepare('DELETE FROM transactions WHERE id = ? AND customer_id = ?').run(txId, customerId);

    // Update customer balance
    db.prepare(`
      UPDATE customers 
      SET balance = balance + ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(balanceChange, customerId);

    // Get updated customer balance
    const updatedCustomer = db.prepare('SELECT balance FROM customers WHERE id = ?').get(customerId);

    return NextResponse.json({
      message: 'Cari hareket başarıyla silindi',
      balance: (updatedCustomer as any).balance
    });

  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
