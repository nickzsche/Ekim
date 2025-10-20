const Database = require('better-sqlite3');
const db = new Database('./data/products.db');

console.log('🎯 KAPSAMLI VERİTABANI ANALİZİ');
console.log('===============================');

// RK-S 3/8 serisinin detaylı analizi
console.log('\n📋 RK-S 3/8 Kondanser Serisi Detayları:');
const rksSeries = db.prepare(`
  SELECT 
    CASE 
      WHEN name LIKE '%300 Fan%' THEN '300mm Fan'
      WHEN name LIKE '%350 Fan%' THEN '350mm Fan' 
      WHEN name LIKE '%400 Fan%' THEN '400mm Fan'
      WHEN name LIKE '%450 Fan%' THEN '450mm Fan'
      WHEN name LIKE '%500 Fan%' THEN '500mm Fan'
      ELSE 'Diğer'
    END as fan_type,
    COUNT(*) as count,
    MIN(price) as min_price,
    MAX(price) as max_price,
    AVG(price) as avg_price
  FROM products 
  WHERE category = 'RK-S 3/8 Kondanser'
  GROUP BY fan_type
  ORDER BY fan_type
`).all();

rksSeries.forEach(series => {
  console.log(`${series.fan_type}: ${series.count} model, €${series.min_price.toFixed(2)} - €${series.max_price.toFixed(2)} (Ort: €${series.avg_price.toFixed(2)})`);
});

// Tüm kategorilerin karşılaştırması
console.log('\n📊 Kategori Karşılaştırması:');
const comparison = db.prepare(`
  SELECT 
    category,
    COUNT(*) as model_count,
    MIN(price) as min_price,
    MAX(price) as max_price,
    AVG(price) as avg_price,
    SUM(stock_quantity) as total_stock
  FROM products 
  GROUP BY category
  ORDER BY model_count DESC
`).all();

comparison.forEach(cat => {
  console.log(`\n🏷️ ${cat.category}:`);
  console.log(`   Model sayısı: ${cat.model_count}`);
  console.log(`   Fiyat aralığı: €${cat.min_price.toFixed(2)} - €${cat.max_price.toFixed(2)}`);
  console.log(`   Ortalama fiyat: €${cat.avg_price.toFixed(2)}`);
  console.log(`   Toplam stok: ${cat.total_stock} adet`);
});

// En pahalı ve en ucuz ürünler
console.log('\n💎 En Pahalı 3 Ürün:');
const expensive = db.prepare('SELECT name, price, category FROM products ORDER BY price DESC LIMIT 3').all();
expensive.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name} - €${product.price.toFixed(2)} (${product.category})`);
});

console.log('\n💰 En Uygun 3 Ürün:');
const affordable = db.prepare('SELECT name, price, category FROM products ORDER BY price ASC LIMIT 3').all();
affordable.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name} - €${product.price.toFixed(2)} (${product.category})`);
});

// RK-G vs RK-S karşılaştırması
console.log('\n⚔️ RK-G 5/16 vs RK-S 3/8 Karşılaştırması:');
const rkComparison = db.prepare(`
  SELECT 
    category,
    COUNT(*) as model_count,
    AVG(price) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price
  FROM products 
  WHERE category LIKE 'RK-%'
  GROUP BY category
`).all();

rkComparison.forEach(series => {
  console.log(`${series.category}: ${series.model_count} model, Ort: €${series.avg_price.toFixed(2)}`);
});

// Özet istatistikler
const stats = db.prepare(`
  SELECT 
    COUNT(*) as total_products,
    COUNT(DISTINCT category) as categories,
    COUNT(DISTINCT brand) as brands,
    SUM(stock_quantity) as total_stock,
    AVG(price) as avg_price,
    SUM(price * stock_quantity) as total_inventory_value
  FROM products
`).get();

console.log('\n📈 GENEL İSTATİSTİKLER:');
console.log(`📦 Toplam ürün: ${stats.total_products}`);
console.log(`🏷️ Kategori sayısı: ${stats.categories}`);
console.log(`🏭 Marka sayısı: ${stats.brands}`);
console.log(`📚 Toplam stok: ${stats.total_stock} adet`);
console.log(`💶 Ortalama fiyat: €${stats.avg_price.toFixed(2)}`);
console.log(`💼 Envanter değeri: €${stats.total_inventory_value.toFixed(2)}`);

db.close();
console.log('\n✅ Analiz tamamlandı!');
console.log('🎉 RK-S 3/8 Kondanser Serisi başarıyla entegre edildi!');