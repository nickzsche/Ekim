const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'ekim_sogutma.db');
const db = new Database(dbPath);

const GENERAL_SUPPLIER_ID = 1;

console.log('Pompalar, bantlar ve montaj ekipmanları ekleniyor...\n');

const insertProduct = db.prepare(`
  INSERT INTO products (supplier_id, category, series, model, description, price)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// A. DRENAJ POMPALARI
console.log('📦 Drenaj Pompaları ekleniyor...');
const drainPumps = [
  { 
    model: 'GN-50', 
    description: 'APLİK DRENAJ POMPASI - 20 LİTRE/SAAT Maksimum Debi, 7.5 METRE Maksimum Basma Yüksekliği', 
    price: 37.00 
  },
  { 
    model: 'GNE-15', 
    description: 'TANKLI DRENAJ POMPASI - 2.3 LİTRE Tank Kapasitesi, 15 METRE Maksimum Basma Yüksekliği', 
    price: 28.00 
  }
];

for (const pump of drainPumps) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Pompalar',
    'Drenaj Pompaları',
    pump.model,
    pump.description,
    pump.price
  );
}
console.log(`✅ ${drainPumps.length} adet drenaj pompası eklendi\n`);

// A. VAKUM POMPALARI
console.log('📦 Vakum Pompaları ekleniyor...');
const vacuumPumps = [
  { model: 'EG125N', specs: '2.5 CFM, 1/4 HP Güç', price: 64.60 },
  { model: 'EG135N', specs: '3.5 CFM, 1/3 HP Güç', price: 85.50 },
  { model: 'EG160N', specs: '6.0 CFM, 1/2 HP Güç', price: 120.00 },
  { model: 'EG135N VAKUM SETİ', specs: 'Set İçeriği: EG135N Vakum Pompası + 7 Ekipman', price: 240.00 }
];

for (const pump of vacuumPumps) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Pompalar',
    'Vakum Pompaları',
    pump.model,
    pump.specs,
    pump.price
  );
}
console.log(`✅ ${vacuumPumps.length} adet vakum pompası eklendi\n`);

// B. BANTLAR
console.log('📦 Bantlar ekleniyor...');
const tapes = [
  { product: 'GENERAL DEKORATİF BANT', boxQty: 100, price: 0.45 },
  { product: 'GLOBE PVC BANT BEYAZ RENK', boxQty: 500, price: 0.28 },
  { product: 'GLOBE PVC BANT SİYAH RENK', boxQty: 500, price: 0.28 }
];

for (const tape of tapes) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Montaj Ekipmanları',
    'Bantlar',
    tape.product,
    `Koli: ${tape.boxQty} Adet`,
    tape.price
  );
}
console.log(`✅ ${tapes.length} adet bant eklendi\n`);

// B. KLİMA KONSOLLARI
console.log('📦 Klima Konsolları ekleniyor...');
const consoles = [
  { size: '40 CM', boxQty: 6, price: 4.70 },
  { size: '50 CM', boxQty: 6, price: 5.00 }
];

for (const console of consoles) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Montaj Ekipmanları',
    'Klima Konsolları',
    `${console.size} VİDALI KLİMA KONSOL TAKIMI`,
    `${console.boxQty} TAKIM/KOLİ`,
    console.price
  );
}
console.log(`✅ ${consoles.length} adet klima konsolu eklendi\n`);

// B. SİBOPLAR
console.log('📦 Siboplar ekleniyor...');
const valves = [
  { type: 'BORULU SİBOP', boxQty: 500, price: 0.40 },
  { type: 'BORUSUZ SİBOP', boxQty: 1000, price: 0.32 }
];

for (const valve of valves) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Montaj Ekipmanları',
    'Siboplar',
    valve.type,
    `Koli: ${valve.boxQty} Adet`,
    valve.price
  );
}
console.log(`✅ ${valves.length} adet sibop eklendi\n`);

console.log('\n🎉 Tüm pompalar, bantlar ve montaj ekipmanları başarıyla eklendi!');
db.close();
