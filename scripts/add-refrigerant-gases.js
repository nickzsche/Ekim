const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'ekim_sogutma.db');
const db = new Database(dbPath);

const GENERAL_SUPPLIER_ID = 1;

console.log('Soğutucu gazlar ekleniyor...\n');

const insertProduct = db.prepare(`
  INSERT INTO products (supplier_id, category, series, model, description, price)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// A. KARTUŞ TÜP SOĞUTUCU GAZ
console.log('📦 Kartuş Tüp Soğutucu Gazlar ekleniyor...');
const cartridgeGases = [
  { product: 'E-GAS R290', weight: '700 GRAM', package: '12 TÜP / 1 KOLİ', price: 6.50 },
  { product: 'E-GAS R290', weight: '700 GRAM', package: '1 TÜP / 1 KOLİ', price: 90.00 },
  { product: 'E-GAS R600A', weight: '400 GRAM', package: '12 TÜP / 1 KOLİ', price: 3.00 },
  { product: 'GENERAL R134A', weight: '400 GRAM', package: '12 TÜP / 1 KOLİ', price: 15.00 },
  { product: 'GENERAL R600A', weight: '850 GRAM', package: '1 TÜP / 1 KOLİ', price: 21.50 },
  { product: 'GENERAL R32', weight: '350 GRAM', package: '12 TÜP / 1 KOLİ', price: 15.00 },
  { product: 'GENERAL R600A', weight: '3.00 KG', package: '12 TÜP / 1 KOLİ', price: 3.25 }
];

for (const gas of cartridgeGases) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Soğutucu Gazlar',
    'Kartuş Tüp Soğutucu Gaz',
    gas.product,
    `${gas.weight} - ${gas.package}`,
    gas.price
  );
}
console.log(`✅ ${cartridgeGases.length} adet kartuş tüp gaz eklendi\n`);

console.log('\n🎉 Tüm soğutucu gazlar başarıyla eklendi!');
console.log('ℹ️  Not: Tekrar dolum yapılabilir tüpler "FİYAT SORUNUZ" olduğu için eklenmedi.\n');

db.close();
