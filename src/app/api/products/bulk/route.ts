import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, Product } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const products: Product[] = await request.json();
    
    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Ürün listesi bekleniyor' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // Transaction başlat
    const transaction = db.transaction((products: Product[]) => {
      const stmt = db.prepare(`
        INSERT INTO products (name, code, brand, model, category, price, description, specifications, stock_quantity, unit)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const results = [];
      for (const product of products) {
        try {
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
            product.unit || 'adet'
          );
          results.push({ success: true, id: result.lastInsertRowid, name: product.name });
        } catch (error) {
          console.error(`Ürün eklenirken hata (${product.name}):`, error);
          const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
          results.push({ success: false, name: product.name, error: errorMessage });
        }
      }
      return results;
    });
    
    const results = transaction(products);
    
    const successCount = results.filter(r => r.success).length;
    const errorCount = results.filter(r => !r.success).length;
    
    return NextResponse.json({
      message: `${successCount} ürün başarıyla eklendi, ${errorCount} üründe hata oluştu`,
      results,
      summary: {
        total: products.length,
        success: successCount,
        errors: errorCount
      }
    });
    
  } catch (error) {
    console.error('Toplu ürün ekleme hatası:', error);
    return NextResponse.json(
      { error: 'Ürünler eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}