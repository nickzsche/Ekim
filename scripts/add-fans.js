const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'ekim_sogutma.db');
const db = new Database(dbPath);

const GENERAL_SUPPLIER_ID = 1;

console.log('Fanlar ekleniyor...\n');

// A. AXIAL FAN - EMİCİ
console.log('📦 Axial Fanlar (Emici) ekleniyor...');
const emiciFans = [
  { diameter: '200 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 25.00 },
  { diameter: '250 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 26.00 },
  { diameter: '300 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 28.00 },
  { diameter: '350 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 36.00 },
  { diameter: '400 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 39.00 },
  { diameter: '450 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 47.00 },
  { diameter: '500 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 61.00 },
  { diameter: '630 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 89.00 },
  { diameter: '350 mm', rpm: '900 RPM', phase: '1 FAZ', price: 36.00 },
  { diameter: '400 mm', rpm: '900 RPM', phase: '1 FAZ', price: 39.00 },
  { diameter: '450 mm', rpm: '900 RPM', phase: '1 FAZ', price: 47.00 },
  { diameter: '500 mm', rpm: '900 RPM', phase: '1 FAZ', price: 61.00 },
  { diameter: '630 mm', rpm: '900 RPM', phase: '1 FAZ', price: 89.00 },
  { diameter: '400 mm', rpm: '1400 RPM', phase: '3 FAZ', price: 39.00 },
  { diameter: '450 mm', rpm: '1400 RPM', phase: '3 FAZ', price: 47.00 },
  { diameter: '500 mm', rpm: '1400 RPM', phase: '3 FAZ', price: 61.00 },
  { diameter: '630 mm', rpm: '1400 RPM', phase: '3 FAZ', price: 89.00 },
  { diameter: '630 mm', rpm: '900 RPM', phase: '3 FAZ', price: 366.00 },
  { diameter: '710 mm', rpm: '900 RPM', phase: '3 FAZ', price: 395.00 },
  { diameter: '800 mm', rpm: '900 RPM', phase: '3 FAZ', price: 335.00 }
];

const insertFan = db.prepare(`
  INSERT INTO products (supplier_id, category, series, model, description, price)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (const fan of emiciFans) {
  insertFan.run(
    GENERAL_SUPPLIER_ID,
    'Fanlar',
    'Axial Fan - Emici',
    `Emici Fan ${fan.diameter}`,
    `${fan.rpm} - ${fan.phase}`,
    fan.price
  );
}
console.log(`✅ ${emiciFans.length} adet emici fan eklendi\n`);

// A. AXIAL FAN - ÜFLEYİCİ
console.log('📦 Axial Fanlar (Üfleyici) ekleniyor...');
constufleyiciFans = [
  { diameter: '300 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 28.00 },
  { diameter: '350 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 36.00 },
  { diameter: '400 mm', rpm: '1400 RPM', phase: '-', price: 39.00 },
  { diameter: '450 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 47.00 },
  { diameter: '500 mm', rpm: '1400 RPM', phase: '1 FAZ', price: 61.00 }
];

for (const fan of ufleyiciFans) {
  insertFan.run(
    GENERAL_SUPPLIER_ID,
    'Fanlar',
    'Axial Fan - Üfleyici',
    `Üfleyici Fan ${fan.diameter}`,
    `${fan.rpm} - ${fan.phase}`,
    fan.price
  );
}
console.log(`✅ ${ufleyiciFans.length} adet üfleyici fan eklendi\n`);

// B. QFAN FİYAT LİSTESİ
console.log('📦 QFan ürünleri ekleniyor...');
const qfans = [
  { model: 'GM-YJF5W', nominalWatt: '5 WATT', voltage: '220 V 50 HZ', price: 5.70 },
  { model: 'GM-YJF10W', nominalWatt: '10 WATT', voltage: '220 V 50 HZ', price: 7.00 },
  { model: 'GM-YJF16W', nominalWatt: '16 WATT', voltage: '220 V 50 HZ', price: 7.90 },
  { model: 'GM-YJF18W', nominalWatt: '18 WATT', voltage: '220 V 50 HZ', price: 9.40 },
  { model: 'GM-YJF25W', nominalWatt: '25 WATT', voltage: '220 V 50 HZ', price: 11.30 },
  { model: 'GM-YJF34W', nominalWatt: '34 WATT', voltage: '220 V 50 HZ', price: 13.20 }
];

for (const fan of qfans) {
  insertFan.run(
    GENERAL_SUPPLIER_ID,
    'Fanlar',
    'QFan',
    fan.model,
    `${fan.nominalWatt} - ${fan.voltage}`,
    fan.price
  );
}
console.log(`✅ ${qfans.length} adet QFan eklendi\n`);

console.log('\n🎉 Tüm fanlar başarıyla eklendi!');
db.close();
