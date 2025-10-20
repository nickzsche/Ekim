import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET - Tüm tedarikçileri listele
export async function GET() {
  try {
    const db = getDatabase();
    const suppliers = db.prepare('SELECT * FROM suppliers ORDER BY name').all();
    return NextResponse.json(suppliers);
  } catch (error) {
    console.error('Tedarikçiler yüklenirken hata:', error);
    return NextResponse.json({ error: 'Tedarikçiler yüklenemedi' }, { status: 500 });
  }
}

// POST - Yeni tedarikçi oluştur
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = getDatabase();
    
    const result = db.prepare(`
      INSERT INTO suppliers (name, description, contact_name, email, phone, address)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      data.name,
      data.description || null,
      data.contact_name || null,
      data.email || null,
      data.phone || null,
      data.address || null
    );

    const supplier = db.prepare('SELECT * FROM suppliers WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(supplier, { status: 201 });
  } catch (error) {
    console.error('Tedarikçi oluşturulurken hata:', error);
    return NextResponse.json({ error: 'Tedarikçi oluşturulamadı' }, { status: 500 });
  }
}
