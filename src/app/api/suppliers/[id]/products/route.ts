import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET - Tedarikçinin ürünlerini kategorilere göre gruplu getir
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    
    // Tedarikçinin tüm ürünlerini getir
    const products = db.prepare(`
      SELECT * FROM products 
      WHERE supplier_id = ? 
      ORDER BY category, name
    `).all(params.id);

    // Kategorilere göre grupla
    const categorizedProducts: Record<string, any[]> = {};
    
    products.forEach((product: any) => {
      const category = product.category || 'Diğer';
      if (!categorizedProducts[category]) {
        categorizedProducts[category] = [];
      }
      categorizedProducts[category].push(product);
    });

    return NextResponse.json({
      supplierId: params.id,
      categories: categorizedProducts
    });
  } catch (error) {
    console.error('Tedarikçi ürünleri yüklenirken hata:', error);
    return NextResponse.json({ error: 'Ürünler yüklenemedi' }, { status: 500 });
  }
}
