const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'products.db');
const db = new Database(dbPath);

try {
  // Suppliers tablosunu oluştur (yoksa)
  db.exec(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      contact_name TEXT,
      email TEXT,
      phone TEXT,
      address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Products tablosuna supplier_id kolonu ekle (yoksa)
  const productsTableInfo = db.prepare("PRAGMA table_info(products)").all();
  const hasSupplierId = productsTableInfo.some(col => col.name === 'supplier_id');
  if (!hasSupplierId) {
    db.exec(`ALTER TABLE products ADD COLUMN supplier_id INTEGER REFERENCES suppliers(id)`);
    console.log('products tablosuna supplier_id kolonu eklendi');
  }

  // REN tedarikçisini oluştur
  const checkSupplier = db.prepare('SELECT id FROM suppliers WHERE name = ?').get('REN');
  
  let supplierId;
  if (checkSupplier) {
    supplierId = checkSupplier.id;
    console.log('REN tedarikçisi zaten mevcut, ID:', supplierId);
  } else {
    const result = db.prepare(`
      INSERT INTO suppliers (name, description, contact_name, email, phone)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      'REN',
      'REN Marka Soğutma Ürünleri',
      'REN İletişim',
      'info@ren.com',
      '+90 (555) 123 45 67'
    );
    supplierId = result.lastInsertRowid;
    console.log('REN tedarikçisi oluşturuldu, ID:', supplierId);
  }

  // Tüm ürünleri REN tedarikçisine bağla
  const updateResult = db.prepare(`
    UPDATE products 
    SET supplier_id = ? 
    WHERE supplier_id IS NULL
  `).run(supplierId);

  console.log(`${updateResult.changes} adet ürün REN tedarikçisine bağlandı`);

  // Kategorilere göre ürün sayılarını göster
  const categoryCounts = db.prepare(`
    SELECT category, COUNT(*) as count 
    FROM products 
    WHERE supplier_id = ?
    GROUP BY category
    ORDER BY category
  `).all(supplierId);

  console.log('\n=== REN Tedarikçisi - Kategorilere Göre Ürün Sayıları ===');
  categoryCounts.forEach(row => {
    console.log(`  ${row.category}: ${row.count} ürün`);
  });

  const totalProducts = db.prepare('SELECT COUNT(*) as total FROM products WHERE supplier_id = ?').get(supplierId);
  console.log(`\n✅ Toplam: ${totalProducts.total} ürün REN tedarikçisine bağlı`);

} catch (error) {
  console.error('Hata:', error);
} finally {
  db.close();
}
