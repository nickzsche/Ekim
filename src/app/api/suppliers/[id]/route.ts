import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET - Belirli bir tedarikçiyi getir
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDatabase();
    const supplier = db.prepare('SELECT * FROM suppliers WHERE id = ?').get(id);
    
    if (!supplier) {
      return NextResponse.json({ error: 'Tedarikçi bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(supplier);
  } catch (error) {
    console.error('Tedarikçi yüklenirken hata:', error);
    return NextResponse.json({ error: 'Tedarikçi yüklenemedi' }, { status: 500 });
  }
}

// PUT - Tedarikçi güncelle
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const db = getDatabase();

    db.prepare(`
      UPDATE suppliers
      SET name = ?, description = ?, contact_name = ?, email = ?, phone = ?, address = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      data.name,
      data.description || null,
      data.contact_name || null,
      data.email || null,
      data.phone || null,
      data.address || null,
      id
    );

    const supplier = db.prepare('SELECT * FROM suppliers WHERE id = ?').get(id);
    return NextResponse.json(supplier);
  } catch (error) {
    console.error('Tedarikçi güncellenirken hata:', error);
    return NextResponse.json({ error: 'Tedarikçi güncellenemedi' }, { status: 500 });
  }
}

// DELETE - Tedarikçi sil
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDatabase();
    db.prepare('DELETE FROM suppliers WHERE id = ?').run(id);
    return NextResponse.json({ message: 'Tedarikçi silindi' });
  } catch (error) {
    console.error('Tedarikçi silinirken hata:', error);
    return NextResponse.json({ error: 'Tedarikçi silinemedi' }, { status: 500 });
  }
}
