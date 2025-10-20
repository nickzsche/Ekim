import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, Customer } from '@/lib/database';

export async function GET() {
  try {
    const db = getDatabase();
    const customers = db.prepare('SELECT * FROM customers ORDER BY name').all();
    
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Müşteriler getirilirken hata:', error);
    return NextResponse.json(
      { error: 'Müşteriler getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const customer: Customer = await request.json();
    const db = getDatabase();
    
    const stmt = db.prepare(`
      INSERT INTO customers (name, email, phone, company, address, tax_number, tax_office, balance)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      customer.name,
      customer.email || null,
      customer.phone || null,
      customer.company || null,
      customer.address || null,
      customer.tax_number || null,
      customer.tax_office || null,
      customer.balance || 0
    );
    
    const newCustomer = db.prepare('SELECT * FROM customers WHERE id = ?').get(result.lastInsertRowid);
    
    return NextResponse.json(newCustomer);
  } catch (error) {
    console.error('Müşteri eklerken hata:', error);
    return NextResponse.json(
      { error: 'Müşteri eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}