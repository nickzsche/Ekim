import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, Product } from '@/lib/database';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Geçersiz ürün ID' },
        { status: 400 }
      );
    }

    const updates: Partial<Product> = await request.json();
    const db = getDatabase();
    
    // Güncellenebilir alanları kontrol et
    const allowedFields = ['name', 'code', 'brand', 'model', 'category', 'price', 'description', 'specifications', 'stock_quantity', 'unit', 'supplier_id'];
    const updateFields = Object.keys(updates).filter(key => allowedFields.includes(key));
    
    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'Güncellenecek alan bulunamadı' },
        { status: 400 }
      );
    }
    
    // SQL sorgusu oluştur
    const setClause = updateFields.map(field => `${field} = ?`).join(', ');
    const values = updateFields.map(field => updates[field as keyof Product]);
    values.push(productId);
    
    const stmt = db.prepare(`
      UPDATE products 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = stmt.run(...values);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }
    
    // Güncellenmiş ürünü getir
    const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
    
    return NextResponse.json({
      message: 'Ürün başarıyla güncellendi',
      product: updatedProduct
    });
    
  } catch (error) {
    console.error('Ürün güncelleme hatası:', error);
    return NextResponse.json(
      { error: 'Ürün güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Geçersiz ürün ID' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const result = stmt.run(productId);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Ürün başarıyla silindi'
    });
    
  } catch (error) {
    console.error('Ürün silme hatası:', error);
    return NextResponse.json(
      { error: 'Ürün silinirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Geçersiz ürün ID' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
    
  } catch (error) {
    console.error('Ürün getirme hatası:', error);
    return NextResponse.json(
      { error: 'Ürün getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}