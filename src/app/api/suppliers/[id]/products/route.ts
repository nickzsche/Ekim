import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

interface Product {
  id: number;
  name: string;
  category: string;
  [key: string]: unknown;
}

// GET - Tedarikçinin ürünlerini kategorilere göre gruplu getir
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDatabase();
    
    // Tedarikçinin tüm ürünlerini getir
    const products = db.prepare(`
      SELECT * FROM products 
      WHERE supplier_id = ? 
      ORDER BY category, name
    `).all(id) as Product[];

    // Kategorilere göre grupla
    const categorizedProducts: Record<string, Product[]> = {};
    
    products.forEach((product: Product) => {
      const category = product.category || 'Diğer';
      if (!categorizedProducts[category]) {
        categorizedProducts[category] = [];
      }
      categorizedProducts[category].push(product);
    });

    return NextResponse.json({
      supplierId: id,
      categories: categorizedProducts
    });
  } catch (error) {
    console.error('Tedarikçi ürünleri yüklenirken hata:', error);
    return NextResponse.json({ error: 'Ürünler yüklenemedi' }, { status: 500 });
  }
}
