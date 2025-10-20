const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'ekim_sogutma.db');
const db = new Database(dbPath);

// Supplier ID - General olarak varsayıyorum
const GENERAL_SUPPLIER_ID = 1;

console.log('Kompresörler ve aksesuarlar ekleniyor...\n');

// A. R404A GAZLI GENERAL KOMPRESÖRLER
console.log('📦 R404A Gazlı General Kompresörler ekleniyor...');
const r404aCompressors = [
  { model: 'GN6215TG', type: 'HBP', power: '1895 WATT', price: 85.00 },
  { model: 'GN6220TG', type: 'HBP', power: '2180 WATT', price: 90.00 },
  { model: 'GN6226TG', type: 'HBP', power: '3355 WATT', price: 110.00 },
  { model: 'GN2178TG', type: 'LBP', power: '920 WATT', price: 90.00 }
];

const insertR404a = db.prepare(`
  INSERT INTO products (supplier_id, category, series, model, description, price)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (const comp of r404aCompressors) {
  insertR404a.run(
    GENERAL_SUPPLIER_ID,
    'Kompresörler',
    'R404A Gazlı General Kompresörler',
    comp.model,
    `${comp.type} Tip - ${comp.power}`,
    comp.price
  );
}
console.log(`✅ ${r404aCompressors.length} adet R404A kompresör eklendi\n`);

// B. 12-24 VOLT DC KOMPRESÖRLER (R134A Gazlı)
console.log('📦 12-24V DC Kompresörler ekleniyor...');
const dcCompressors = [
  { model: 'GNE30DC', voltage: '12-24 V', power: '52-87 WATT', price: 65.00 },
  { model: 'GNE35DC', voltage: '12-24 V', power: '60-100 WATT', price: 72.00 },
  { model: 'GNE12TG', voltage: '-', power: '1300 WATT', price: 61.00 }
];

for (const comp of dcCompressors) {
  insertR404a.run(
    GENERAL_SUPPLIER_ID,
    'Kompresörler',
    '12-24V DC Kompresörler (R134A)',
    comp.model,
    `${comp.voltage} - ${comp.power}`,
    comp.price
  );
}
console.log(`✅ ${dcCompressors.length} adet DC kompresör eklendi\n`);

// C. R134A GAZLI GENERAL KOMPRESÖRLER
console.log('📦 R134A Gazlı General Kompresörler ekleniyor...');
const r134aCompressors = [
  { model: 'GNE91HV', power: '220 WATT', price: 35.00 },
  { model: 'GNE16TG', power: '1490 WATT', price: 39.00 },
  { model: 'GNE85YV', power: '148 WATT', price: 39.00 },
  { model: 'GNE128YV', power: '220 WATT', price: 64.00 },
  { model: 'GNE110YV', power: '185 WATT', price: 49.00 },
  { model: 'GNE8.5TG', power: '665 WATT', price: 49.00 },
  { model: 'GN2150TG', power: '565 WATT', price: 78.00, type: 'LBP' },
  { model: 'Belirtilmemiş', power: '880 WATT', price: 54.00 }
];

for (const comp of r134aCompressors) {
  const desc = comp.type ? `${comp.type} Tip - ${comp.power}` : comp.power;
  insertR404a.run(
    GENERAL_SUPPLIER_ID,
    'Kompresörler',
    'R134A Gazlı General Kompresörler',
    comp.model,
    desc,
    comp.price
  );
}
console.log(`✅ ${r134aCompressors.length} adet R134A kompresör eklendi\n`);

// D. R600A GAZLI GENERAL KOMPRESÖRLER
console.log('📦 R600A Gazlı General Kompresörler ekleniyor...');
const r600aCompressors = [
  { model: 'GNE60TG', power: '-', price: 36.00 },
  { model: 'GNE65YV', power: '110 WATT', price: 35.00 }
];

for (const comp of r600aCompressors) {
  insertR404a.run(
    GENERAL_SUPPLIER_ID,
    'Kompresörler',
    'R600A Gazlı General Kompresörler',
    comp.model,
    comp.power,
    comp.price
  );
}
console.log(`✅ ${r600aCompressors.length} adet R600A kompresör eklendi\n`);

// E. ROTARY TİP KOMPRESÖRLER (R410A)
console.log('📦 Rotary Tip Kompresörler (R410A) ekleniyor...');
const rotaryR410a = [
  { model: 'PA108M1C-4DZDE2', capacity: '9000 BTU', gas: 'R410A', price: 80.00, brand: 'General' },
  { model: 'PA145G1C-4FT1', capacity: '12000 BTU', gas: 'R410A', price: 83.00, brand: 'General' },
  { model: 'PA190M2AS-4KTL1', capacity: '18000 BTU', gas: 'R410A', price: 124.00, brand: 'General' },
  { model: 'PA270G2CS-4MU1', capacity: '24000 BTU', gas: 'R410A', price: 135.00, brand: 'General' },
  { model: 'GKN134HNA', capacity: '12000 BTU', gas: 'R410A', price: 83.00, brand: 'LG' },
  { model: 'GJS222PMA', capacity: '18000 BTU', gas: 'R410A', price: 124.00, brand: 'LG' }
];

for (const comp of rotaryR410a) {
  insertR404a.run(
    GENERAL_SUPPLIER_ID,
    'Kompresörler',
    'Rotary Tip Kompresörler (R410A)',
    comp.model,
    `${comp.brand} - ${comp.capacity} - ${comp.gas}`,
    comp.price
  );
}
console.log(`✅ ${rotaryR410a.length} adet Rotary R410A kompresör eklendi\n`);

// F. ROTARY TİP KOMPRESÖRLER (R22)
console.log('📦 Rotary Tip Kompresörler (R22) ekleniyor...');
const rotaryR22 = [
  { model: 'HSM165V1UFZ', capacity: '9000 BTU', gas: 'R22', price: 70.00, brand: 'TOSHIBA (GMCC)' },
  { model: 'HSM215V1U4UFTA', capacity: '12000 BTU', gas: 'R22', price: 74.00, brand: 'TOSHIBA (GMCC)' },
  { model: 'PH310M2CS-4KTH', capacity: '18000 BTU', gas: 'R22', price: 124.00, brand: 'TOSHIBA (GMCC)' },
  { model: 'PH420G2CS-4KU1', capacity: '24000 BTU', gas: 'R22', price: 135.00, brand: 'TOSHIBA (GMCC)' },
  { model: 'QKS164PNA', capacity: '9000 BTU', gas: 'R22', price: 70.00, brand: 'LG' },
  { model: 'QKS208HNB', capacity: '12000 BTU', gas: 'R22', price: 74.00, brand: 'LG' },
  { model: 'QV308PNA', capacity: '18000 BTU', gas: 'R22', price: 124.00, brand: 'LG' },
  { model: 'QP407PNA', capacity: '24000 BTU', gas: 'R22', price: 135.00, brand: 'LG' }
];

for (const comp of rotaryR22) {
  insertR404a.run(
    GENERAL_SUPPLIER_ID,
    'Kompresörler',
    'Rotary Tip Kompresörler (R22)',
    comp.model,
    `${comp.brand} - ${comp.capacity} - ${comp.gas}`,
    comp.price
  );
}
console.log(`✅ ${rotaryR22.length} adet Rotary R22 kompresör eklendi\n`);

// G. DAIKIN SCROLL TİP KOMPRESÖRLER
console.log('📦 Daikin Scroll Tip Kompresörler ekleniyor...');
const daikinScroll = [
  { model: 'JT125-P8Y1', gas: 'R410A', hp: '4 HP', price: 320.00 },
  { model: 'JT160-P8Y1', gas: 'R410A', hp: '5 HP', price: 340.00 },
  { model: 'JT125-BCBY1L', gas: 'R22', hp: '4 HP', price: 285.00 },
  { model: 'JT160-BCBY1L', gas: 'R22', hp: '5 HP', price: 295.00 },
  { model: 'JT170-GABY1L', gas: 'R22', hp: '5 HP', price: 340.00 }
];

for (const comp of daikinScroll) {
  insertR404a.run(
    GENERAL_SUPPLIER_ID,
    'Kompresörler',
    'Daikin Scroll Tip Kompresörler',
    comp.model,
    `${comp.gas} - ${comp.hp}`,
    comp.price
  );
}
console.log(`✅ ${daikinScroll.length} adet Daikin Scroll kompresör eklendi\n`);

// H. COPELAND SCROLL TİP KOMPRESÖRLER
console.log('📦 Copeland Scroll Tip Kompresörler ekleniyor...');
const copelandR407c = [
  { model: 'ZR61-KCE-TFD-522', gas: 'R407C', hp: '5 HP', price: 395.00 },
  { model: 'ZR72-KCE-TFD-522', gas: 'R407C', hp: '6 HP', price: 420.00 },
  { model: 'ZR81-KCE-TFD-522', gas: 'R407C', hp: '6.5 HP', price: 440.00 },
  { model: 'ZR125-KCE-TFD-522', gas: 'R407C', hp: '10 HP', price: 780.00 }
];

const copelandR404a = [
  { model: 'ZB15-KQE-TFD-551', gas: 'R404A', hp: '2 HP', price: 336.00 },
  { model: 'ZB21-KQE-TFD-551', gas: 'R404A', hp: '3 HP', price: 380.00 },
  { model: 'ZB26-KQE-TFD-551', gas: 'R404A', hp: '3.5 HP', price: 390.00 },
  { model: 'ZB29-KQE-TFD-551', gas: 'R404A', hp: '4 HP', price: 410.00 },
  { model: 'ZB38-KQE-TFD-551', gas: 'R404A', hp: '5 HP', price: 425.00 },
  { model: 'ZB45-KQE-TFD-551', gas: 'R404A', hp: '6 HP', price: 530.00 },
  { model: 'ZB48-KQE-TFD-551', gas: 'R404A', hp: '7 HP', price: 870.00 },
  { model: 'ZB58-KQE-TFD-551', gas: 'R404A', hp: '8 HP', price: 890.00 },
  { model: 'ZB66-KQE-TFD-551', gas: 'R404A', hp: '9 HP', price: 960.00 },
  { model: 'ZB76-KQE-TFD-551', gas: 'R404A', hp: '10 HP', price: 1130.00 },
  { model: 'ZB95-KQE-TFD-551', gas: 'R404A', hp: '13 HP', price: 475.00 }
];

for (const comp of copelandR407c) {
  insertR404a.run(
    GENERAL_SUPPLIER_ID,
    'Kompresörler',
    'Copeland Scroll (R407C)',
    comp.model,
    `${comp.gas} - ${comp.hp}`,
    comp.price
  );
}

for (const comp of copelandR404a) {
  insertR404a.run(
    GENERAL_SUPPLIER_ID,
    'Kompresörler',
    'Copeland Scroll (R404A)',
    comp.model,
    `${comp.gas} - ${comp.hp}`,
    comp.price
  );
}
console.log(`✅ ${copelandR407c.length + copelandR404a.length} adet Copeland Scroll kompresör eklendi\n`);

console.log('\n🎉 Tüm kompresörler başarıyla eklendi!');
db.close();
