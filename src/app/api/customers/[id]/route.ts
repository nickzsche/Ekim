import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function DELETE(
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
    
    // Check if customer exists
    const customer = db.prepare('SELECT id FROM customers WHERE id = ?').get(customerId);
    
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Check if customer has any quotes (prevent deletion if they have quotes)
    const quotes = db.prepare('SELECT COUNT(*) as count FROM quotes WHERE customer_name = (SELECT name FROM customers WHERE id = ?)').get(customerId);
    
    if (quotes && (quotes as any).count > 0) {
      return NextResponse.json({ 
        error: 'Bu müşteriye ait teklifler bulunmaktadır. Önce teklitleri silin.' 
      }, { status: 400 });
    }

    // Delete the customer
    const result = db.prepare('DELETE FROM customers WHERE id = ?').run(customerId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Customer could not be deleted' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Müşteri başarıyla silindi',
      deletedId: customerId 
    });

  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    
    const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(customerId);
    
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customer);

  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
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
    const { name, email, phone, company, address, tax_number, tax_office, balance } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }

    const db = getDatabase();
    
    // Check if customer exists
    const existingCustomer = db.prepare('SELECT id FROM customers WHERE id = ?').get(customerId);
    
    if (!existingCustomer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Update the customer (balance dahil)
    const result = db.prepare(`
      UPDATE customers 
      SET name = ?, email = ?, phone = ?, company = ?, address = ?, tax_number = ?, tax_office = ?, balance = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(name, email || null, phone || null, company || null, address || null, tax_number || null, tax_office || null, balance || 0, customerId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Customer could not be updated' }, { status: 500 });
    }

    // Return updated customer
    const updatedCustomer = db.prepare('SELECT * FROM customers WHERE id = ?').get(customerId);
    
    return NextResponse.json({
      message: 'Müşteri başarıyla güncellendi',
      customer: updatedCustomer
    });

  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}