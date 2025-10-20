const Database = require('better-sqlite3');
const db = new Database('./data/products.db');

console.log('📊 VERİTABANI DURUMU');
console.log('==================');

// Kategorilere göre ürün sayısı
const categories = db.prepare('SELECT category, COUNT(*) as count FROM products GROUP BY category').all();
console.log('\n📂 Kategori başına ürün sayısı:');
categories.forEach(cat => {
  console.log(`${cat.category}: ${cat.count} ürün`);
});

// Toplam ürün sayısı
const total = db.prepare('SELECT COUNT(*) as total FROM products').get();
console.log(`\n📦 TOPLAM: ${total.total} ürün`);

// Son eklenen ürünler
const recent = db.prepare('SELECT name, price, category FROM products ORDER BY id DESC LIMIT 5').all();
console.log('\n🆕 Son eklenen 5 ürün:');
recent.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name} - €${product.price}`);
});

// Fiyat aralıkları
const priceRanges = db.prepare(`
  SELECT 
    CASE 
      WHEN price < 100 THEN 'Düşük (€0-100)'
      WHEN price < 500 THEN 'Orta (€100-500)'
      WHEN price < 1000 THEN 'Yüksek (€500-1000)'
      ELSE 'Premium (€1000+)'
    END as price_range,
    COUNT(*) as count
  FROM products 
  WHERE price IS NOT NULL 
  GROUP BY price_range
`).all();

console.log('\n💰 Fiyat aralıklarına göre dağılım:');
priceRanges.forEach(range => {
  console.log(`${range.price_range}: ${range.count} ürün`);
});

db.close();
console.log('\n✅ Rapor tamamlandı!');