const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'ekim_sogutma.db');
const db = new Database(dbPath);

const GENERAL_SUPPLIER_ID = 1;

console.log('Klima montaj kitleri ve fittingsler ekleniyor...\n');

const insertProduct = db.prepare(`
  INSERT INTO products (supplier_id, category, series, model, description, price)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// A. KLİMA MONTAJ KİTLERİ
console.log('📦 Klima Montaj Kitleri ekleniyor...');
const installationKits = [
  { size: '1/4" - 3/8"', length: '3 m', price: 7.25 },
  { size: '1/4" - 3/8"', length: '5 m', price: 9.87 },
  { size: '1/4" - 3/8"', length: '7 m', price: 12.39 },
  { size: '1/4" - 3/8"', length: '10 m', price: 15.44 },
  { size: '1/4" - 1/2"', length: '3 m', price: 8.30 },
  { size: '1/4" - 1/2"', length: '5 m', price: 11.24 },
  { size: '1/4" - 1/2"', length: '7 m', price: 13.97 },
  { size: '1/4" - 1/2"', length: '10 m', price: 18.27 },
  { size: '1/4" - 5/8"', length: '3 m', price: 10.29 },
  { size: '1/4" - 5/8"', length: '5 m', price: 13.55 },
  { size: '1/4" - 5/8"', length: '7 m', price: 17.12 },
  { size: '1/4" - 5/8"', length: '10 m', price: 22.47 },
  { size: '3/8" - 5/8"', length: '3 m', price: 11.03 },
  { size: '3/8" - 5/8"', length: '5 m', price: 14.91 },
  { size: '3/8" - 5/8"', length: '7 m', price: 18.69 },
  { size: '3/8" - 5/8"', length: '10 m', price: 24.68 },
  { size: '1/2" - 3/4"', length: '3 m', price: 14.07 },
  { size: '1/2" - 3/4"', length: '5 m', price: 19.11 },
  { size: '1/2" - 3/4"', length: '7 m', price: 24.05 },
  { size: '1/2" - 3/4"', length: '10 m', price: 31.29 }
];

for (const kit of installationKits) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Klima Malzemeleri',
    'Klima Montaj Kitleri',
    `Montaj Kiti ${kit.size}`,
    `Uzunluk: ${kit.length}`,
    kit.price
  );
}
console.log(`✅ ${installationKits.length} adet klima montaj kiti eklendi\n`);

// B. BAKIR FITTINGSLER - DİRSEK 90 DERECE
console.log('📦 Bakır Fittingsler - 90° Dirsek ekleniyor...');
const elbows90 = [
  { size: '1/2"', price: 0.245 },
  { size: '5/8"', price: 0.290 },
  { size: '3/4"', price: 0.685 },
  { size: '22 mm', price: 0.695 },
  { size: '28 mm', price: 1.375 },
  { size: '35 mm', price: 2.200 },
  { size: '42 mm', price: 3.115 },
  { size: '54 mm', price: 4.050 }
];

for (const elbow of elbows90) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Klima Malzemeleri',
    'Bakır Fittingsler - 90° Dirsek',
    `90° Bakır Dirsek ${elbow.size}`,
    '90 Derece Bakır Dirsek',
    elbow.price
  );
}
console.log(`✅ ${elbows90.length} adet 90° dirsek eklendi\n`);

// B. BAKIR FITTINGSLER - DİRSEK 45 DERECE
console.log('📦 Bakır Fittingsler - 45° Dirsek ekleniyor...');
const elbows45 = [
  { size: '22 mm', price: 0.645 },
  { size: '28 mm', price: 1.150 },
  { size: '35 mm', price: 2.100 },
  { size: '42 mm', price: 4.050 }
];

for (const elbow of elbows45) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Klima Malzemeleri',
    'Bakır Fittingsler - 45° Dirsek',
    `45° Bakır Dirsek ${elbow.size}`,
    '45 Derece Bakır Dirsek',
    elbow.price
  );
}
console.log(`✅ ${elbows45.length} adet 45° dirsek eklendi\n`);

// B. BAKIR FITTINGSLER - MANŞON
console.log('📦 Bakır Fittingsler - Manşon ekleniyor...');
const sleeves = [
  { size: '5/8"', price: 0.225 },
  { size: '3/4"', price: 0.340 },
  { size: '22 mm', price: 0.625 },
  { size: '28 mm', price: 0.675 },
  { size: '35 mm', price: 1.750 },
  { size: '42 mm', price: 3.200 },
  { size: '2 1/8" 54 mm', price: 3.800 }
];

for (const sleeve of sleeves) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Klima Malzemeleri',
    'Bakır Fittingsler - Manşon',
    `Bakır Manşon ${sleeve.size}`,
    'Bakır Manşon',
    sleeve.price
  );
}
console.log(`✅ ${sleeves.length} adet manşon eklendi\n`);

// B. BAKIR FITTINGSLER - TEE
console.log('📦 Bakır Fittingsler - Tee ekleniyor...');
const tees = [
  { size: '1/4"', price: 0.220 },
  { size: '3/8"', price: 0.365 },
  { size: '1/2"', price: 0.520 },
  { size: '5/8"', price: 0.670 },
  { size: '3/4"', price: 1.100 },
  { size: '22 mm', price: 1.250 },
  { size: '28 mm', price: 2.530 },
  { size: '35 mm', price: 5.000 },
  { size: '42 mm', price: 5.350 },
  { size: '54 mm', price: 9.500 }
];

for (const tee of tees) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Klima Malzemeleri',
    'Bakır Fittingsler - Tee',
    `Bakır Tee ${tee.size}`,
    'Bakır Tee',
    tee.price
  );
}
console.log(`✅ ${tees.length} adet tee eklendi\n`);

// B. BAKIR FITTINGSLER - REKOR (DÖVME)
console.log('📦 Bakır Fittingsler - Rekor (Dövme) ekleniyor...');
const records = [
  { size: '1/4"', boxQty: 800, price: 0.320 },
  { size: '3/8"', boxQty: 600, price: 0.495 },
  { size: '1/2"', boxQty: 300, price: 0.650 },
  { size: '5/8"', boxQty: 300, price: 0.918 },
  { size: '3/4"', boxQty: 150, price: 1.323 }
];

for (const record of records) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Klima Malzemeleri',
    'Bakır Fittingsler - Rekor (Dövme)',
    `Rekor Dövme ${record.size}`,
    `Koli: ${record.boxQty} Adet`,
    record.price
  );
}
console.log(`✅ ${records.length} adet rekor eklendi\n`);

// B. BAKIR FITTINGSLER - ÜNYON (DÖVME)
console.log('📦 Bakır Fittingsler - Ünyon (Dövme) ekleniyor...');
const unions = [
  { size: '1/4"', boxQty: 600, price: 0.311 },
  { size: '3/8"', boxQty: 400, price: 0.667 },
  { size: '1/2"', boxQty: 200, price: 0.950 },
  { size: '5/8"', boxQty: 200, price: 1.578 },
  { size: '3/4"', boxQty: 100, price: 2.822 }
];

for (const union of unions) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Klima Malzemeleri',
    'Bakır Fittingsler - Ünyon (Dövme)',
    `Ünyon Dövme ${union.size}`,
    `Koli: ${union.boxQty} Adet`,
    union.price
  );
}
console.log(`✅ ${unions.length} adet ünyon eklendi\n`);

// B. BAKIR FITTINGSLER - REDİKSİYON ÜNYON (DÖVME)
console.log('📦 Bakır Fittingsler - Rediksiyon Ünyon (Dövme) ekleniyor...');
const reductionUnions = [
  { size: '1/4" x 3/8"', price: 0.452 },
  { size: '1/4" x 1/2"', price: 0.552 },
  { size: '3/8" x 1/2"', price: 0.578 },
  { size: '1/2" x 5/8"', price: 0.965 }
];

for (const ru of reductionUnions) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Klima Malzemeleri',
    'Bakır Fittingsler - Rediksiyon Ünyon',
    `Rediksiyon Ünyon ${ru.size}`,
    'Dövme Rediksiyon Ünyon',
    ru.price
  );
}
console.log(`✅ ${reductionUnions.length} adet rediksiyon ünyon eklendi\n`);

console.log('\n🎉 Tüm klima montaj kitleri ve fittingsler başarıyla eklendi!');
db.close();
