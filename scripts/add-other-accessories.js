const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'ekim_sogutma.db');
const db = new Database(dbPath);

const GENERAL_SUPPLIER_ID = 1;

console.log('Diğer ürünler ekleniyor...\n');

const insertProduct = db.prepare(`
  INSERT INTO products (supplier_id, category, series, model, description, price)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// A. TERMOSTATLAR
console.log('📦 Termostatlar ekleniyor...');
const thermostats = [
  { model: 'GENERAL GN-021', description: 'TEK PROP TERMOSTAT', price: 11.50 },
  { model: 'GENERAL GN-023', description: 'ÇİFT PROP TERMOSTAT', price: 13.00 },
  { model: 'GENERAL ETC-961', description: 'TEK PROP TERMOSTAT', price: 11.00 },
  { model: 'GENERAL ETC-974', description: 'ÇİFT PROP TERMOSTAT', price: 12.50 }
];

for (const thermo of thermostats) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Aksesuarlar',
    'Termostatlar',
    thermo.model,
    thermo.description,
    thermo.price
  );
}
console.log(`✅ ${thermostats.length} adet termostat eklendi\n`);

// B. GENERAL TAŞ DRIERLAR
console.log('📦 General Taş Drierlar ekleniyor...');
const driers = [
  { model: 'SDCL-052', connection: '1/4" REKORLU', boxQty: 28, price: 4.07 },
  { model: 'SDCL-052S', connection: '1/4" KAYNAKLI', boxQty: 28, price: 3.52 },
  { model: 'SDCL-083', connection: '3/8" REKORLU', boxQty: 28, price: 4.95 },
  { model: 'SDCL-083S', connection: '3/8" KAYNAKLI', boxQty: 28, price: 4.62 },
  { model: 'SDCL-084', connection: '1/2" REKORLU', boxQty: 28, price: 5.17 },
  { model: 'SDCL-084S', connection: '1/2" KAYNAKLI', boxQty: 28, price: 4.62 },
  { model: 'SDCL-0163', connection: '3/8" REKORLU', boxQty: 15, price: 4.07 },
  { model: 'SDCL-0163S', connection: '3/8" KAYNAKLI', boxQty: 15, price: 4.95 },
  { model: 'SDCL-0164', connection: '1/2" REKORLU', boxQty: 15, price: 5.39 },
  { model: 'SDCL-0164S', connection: '1/2" KAYNAKLI', boxQty: 15, price: 5.17 },
  { model: 'SDCL-0165', connection: '5/8" REKORLU', boxQty: 15, price: 5.39 },
  { model: 'SDCL-0165S', connection: '5/8" KAYNAKLI', boxQty: 15, price: 6.38 },
  { model: 'SDCL-032', connection: '1/4" REKORLU', boxQty: 28, price: 3.19 },
  { model: 'SDCL-032S', connection: '1/4" KAYNAKLI', boxQty: 28, price: 3.19 },
  { model: 'HS48', connection: 'KARTUŞ DRIER', boxQty: 12, price: 3.52 }
];

for (const drier of driers) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Aksesuarlar',
    'General Taş Drierlar',
    drier.model,
    `${drier.connection} - Koli: ${drier.boxQty} Adet`,
    drier.price
  );
}
console.log(`✅ ${driers.length} adet taş drier eklendi\n`);

// C. GE.NA BAKIR FİLTRELER
console.log('📦 GE.NA Bakır Filtreler ekleniyor...');
const copperFilters = [
  { weight: '13.5 G', size: '5.0 * 2.5', boxQty: 500, price: 0.61 },
  { weight: '15 G', size: '5.0 * 2.5', boxQty: 500, price: 0.67 },
  { weight: '20 G', size: '5.0 * 2.5', boxQty: 400, price: 0.79 },
  { weight: '30 G', size: '6.35 * 6.35', boxQty: 250, price: 1.14 },
  { weight: '40 G', size: '6.35 * 6.35', boxQty: 250, price: 1.38 },
  { weight: '50 G', size: '6.35 * 6.35', boxQty: 200, price: 1.56 }
];

for (const filter of copperFilters) {
  insertProduct.run(
    GENERAL_SUPPLIER_ID,
    'Aksesuarlar',
    'GE.NA Bakır Filtreler',
    `Bakır Filtre ${filter.weight}`,
    `Ölçü: ${filter.size} - Koli: ${filter.boxQty} Adet`,
    filter.price
  );
}
console.log(`✅ ${copperFilters.length} adet bakır filtre eklendi\n`);

console.log('\n🎉 Tüm diğer ürünler başarıyla eklendi!');
db.close();
