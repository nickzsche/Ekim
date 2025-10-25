import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET() {
  try {
    const db = getDatabase();
    const products = db.prepare('SELECT * FROM products ORDER BY name').all();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Ürünleri getirirken hata:', error);
    return NextResponse.json(
      { error: 'Ürünler getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const product = await request.json() as {
      name: string;
      code?: string;
      brand?: string;
      model?: string;
      category: string;
      price: number;
      description?: string;
      specifications?: string;
      stock_quantity?: number;
      unit: string;
      supplier_id?: number;
    };
    const db = getDatabase();
    
    const stmt = db.prepare(`
      INSERT INTO products (name, code, brand, model, category, price, description, specifications, stock_quantity, unit, supplier_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      product.name,
      product.code || null,
      product.brand || null,
      product.model || null,
      product.category || null,
      product.price || null,
      product.description || null,
      product.specifications || null,
      product.stock_quantity || 0,
      product.unit || 'adet',
      product.supplier_id || null
    );
    
    const newProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    
    return NextResponse.json(newProduct);
  } catch (error) {
    console.error('Ürün eklerken hata:', error);
    return NextResponse.json(
      { error: 'Ürün eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}