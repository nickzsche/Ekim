const Database = require('better-sqlite3');
const path = require('path');

// Veritabanı yolu
const dbPath = path.join(__dirname, '..', 'data', 'products.db');

// Eksik kalan RK-S 3/8 ürünleri
const missingRKSProducts = [
  // 400 FAN - Eksik çift katlı seriler
  {
    name: 'REN RK-029-2140-S Kondanser 400 Fan 2x1',
    code: 'RK-029-2140-S',
    brand: 'REN',
    model: 'RK-029-2140-S',
    category: 'RK-S 3/8 Kondanser',
    price: 568.68,
    description: '400mm 2x1 fan, 28.6m² yüzey, 14523W kapasite',
    specifications: 'Yüzey: 28.6m², Boru: 4.88d3, Kapasite: 14523W (ΔT:15), Fan: 2x1x400mm, Hava debisi: 6034m³/h, Boyutlar: 303x1708x515mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-038-2140-S Kondanser 400 Fan 2x1',
    code: 'RK-038-2140-S',
    brand: 'REN',
    model: 'RK-038-2140-S',
    category: 'RK-S 3/8 Kondanser',
    price: 706.72,
    description: '400mm 2x1 fan, 38.1m² yüzey, 16194W kapasite',
    specifications: 'Yüzey: 38.1m², Boru: 6.50d3, Kapasite: 16194W (ΔT:15), Fan: 2x1x400mm, Hava debisi: 5456m³/h, Boyutlar: 303x1708x515mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-076-2240-S Kondanser 400 Fan 2x2',
    code: 'RK-076-2240-S',
    brand: 'REN',
    model: 'RK-076-2240-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1305.20,
    description: '400mm 2x2 fan, 76.2m² yüzey, 32458W kapasite',
    specifications: 'Yüzey: 76.2m², Boru: 13.01d3, Kapasite: 32458W (ΔT:15), Fan: 2x2x400mm, Hava debisi: 10912m³/h, Boyutlar: 303x1158x1015mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  
  // 450 FAN - Eksik modeller
  {
    name: 'REN RK-061-1345-S Kondanser 450 Fan Üçlü',
    code: 'RK-061-1345-S',
    brand: 'REN',
    model: 'RK-061-1345-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1089.94,
    description: '450mm üçlü fan, 60.8m² yüzey, 31734W kapasite',
    specifications: 'Yüzey: 60.8m², Boru: 10.38d3, Kapasite: 31734W (ΔT:15), Fan: 3x450mm, Hava debisi: 13170m³/h, Boyutlar: 353x2008x615mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-041-2145-S Kondanser 450 Fan 2x1',
    code: 'RK-041-2145-S',
    brand: 'REN',
    model: 'RK-041-2145-S',
    category: 'RK-S 3/8 Kondanser',
    price: 800.53,
    description: '450mm 2x1 fan, 40.5m² yüzey, 20844W kapasite',
    specifications: 'Yüzey: 40.5m², Boru: 6.92d3, Kapasite: 20844W (ΔT:15), Fan: 2x1x450mm, Hava debisi: 8780m³/h, Boyutlar: 353x708x1215mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-054-2145-S Kondanser 450 Fan 2x1',
    code: 'RK-054-2145-S',
    brand: 'REN',
    model: 'RK-054-2145-S',
    category: 'RK-S 3/8 Kondanser',
    price: 989.41,
    description: '450mm 2x1 fan, 54.0m² yüzey, 23575W kapasite',
    specifications: 'Yüzey: 54.0m², Boru: 9.22d3, Kapasite: 23575W (ΔT:15), Fan: 2x1x450mm, Hava debisi: 8089m³/h, Boyutlar: 353x708x1215mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-078-2145-S Kondanser 450 Fan 2x1',
    code: 'RK-078-2145-S',
    brand: 'REN',
    model: 'RK-078-2145-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1427.51,
    description: '450mm 2x1 fan, 77.9m² yüzey, 30047W kapasite',
    specifications: 'Yüzey: 77.9m², Boru: 13.30d3, Kapasite: 30047W (ΔT:15), Fan: 2x1x450mm, Hava debisi: 9449m³/h, Boyutlar: 353x807x1515mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-081-2245-S Kondanser 450 Fan 2x2',
    code: 'RK-081-2245-S',
    brand: 'REN',
    model: 'RK-081-2245-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1459.23,
    description: '450mm 2x2 fan, 81.1m² yüzey, 42448W kapasite',
    specifications: 'Yüzey: 81.1m², Boru: 13.45d3, Kapasite: 42448W (ΔT:15), Fan: 2x2x450mm, Hava debisi: 17560m³/h, Boyutlar: 353x1358x1215mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-108-2245-S Kondanser 450 Fan 2x2',
    code: 'RK-108-2245-S',
    brand: 'REN',
    model: 'RK-108-2245-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1864.69,
    description: '450mm 2x2 fan, 108.1m² yüzey, 47228W kapasite',
    specifications: 'Yüzey: 108.1m², Boru: 18.44d3, Kapasite: 47228W (ΔT:15), Fan: 2x2x450mm, Hava debisi: 16177m³/h, Boyutlar: 353x1358x1215mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-162-2345-S Kondanser 450 Fan 2x3',
    code: 'RK-162-2345-S',
    brand: 'REN',
    model: 'RK-162-2345-S',
    category: 'RK-S 3/8 Kondanser',
    price: 2710.63,
    description: '450mm 2x3 fan, 162.1m² yüzey, 72897W kapasite',
    specifications: 'Yüzey: 162.1m², Boru: 27.67d3, Kapasite: 72897W (ΔT:15), Fan: 2x3x450mm, Hava debisi: 24265m³/h, Boyutlar: 353x2008x1215mm, Giriş: 35mm, Çıkış: 28mm',
    stock_quantity: 1,
    unit: 'adet'
  },
  
  // 500 FAN - Eksik modeller
  {
    name: 'REN RK-059-1250-S Kondanser 500 Fan Çift',
    code: 'RK-059-1250-S',
    brand: 'REN',
    model: 'RK-059-1250-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1052.22,
    description: '500mm çift fan, 58.5m² yüzey, 33323W kapasite',
    specifications: 'Yüzey: 58.5m², Boru: 9.75d3, Kapasite: 33323W (ΔT:15), Fan: 2x500mm, Hava debisi: 14564m³/h, Boyutlar: 403x1558x765mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-097-1250-S Kondanser 500 Fan Çift',
    code: 'RK-097-1250-S',
    brand: 'REN',
    model: 'RK-097-1250-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1600.37,
    description: '500mm çift fan, 97.4m² yüzey, 41243W kapasite',
    specifications: 'Yüzey: 97.4m², Boru: 16.63d3, Kapasite: 41243W (ΔT:15), Fan: 2x500mm, Hava debisi: 12430m³/h, Boyutlar: 403x1558x765mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-088-1350-S Kondanser 500 Fan Üçlü',
    code: 'RK-088-1350-S',
    brand: 'REN',
    model: 'RK-088-1350-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1563.03,
    description: '500mm üçlü fan, 87.7m² yüzey, 50512W kapasite',
    specifications: 'Yüzey: 87.7m², Boru: 14.96d3, Kapasite: 50512W (ΔT:15), Fan: 3x500mm, Hava debisi: 21831m³/h, Boyutlar: 403x2308x765mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-059-2150-S Kondanser 500 Fan 2x1',
    code: 'RK-059-2150-S',
    brand: 'REN',
    model: 'RK-059-2150-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1178.72,
    description: '500mm 2x1 fan, 58.5m² yüzey, 33485W kapasite',
    specifications: 'Yüzey: 58.5m², Boru: 9.98d3, Kapasite: 33485W (ΔT:15), Fan: 2x1x500mm, Hava debisi: 14564m³/h, Boyutlar: 403x808x1515mm, Giriş: 28mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-078-2150-S Kondanser 500 Fan 2x1',
    code: 'RK-078-2150-S',
    brand: 'REN',
    model: 'RK-078-2150-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1451.25,
    description: '500mm 2x1 fan, 77.9m² yüzey, 37906W kapasite',
    specifications: 'Yüzey: 77.9m², Boru: 13.30d3, Kapasite: 37906W (ΔT:15), Fan: 2x1x500mm, Hava debisi: 13391m³/h, Boyutlar: 403x808x1515mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-097-2150-S Kondanser 500 Fan 2x1',
    code: 'RK-097-2150-S',
    brand: 'REN',
    model: 'RK-097-2150-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1744.62,
    description: '500mm 2x1 fan, 97.4m² yüzey, 41090W kapasite',
    specifications: 'Yüzey: 97.4m², Boru: 16.63d3, Kapasite: 41090W (ΔT:15), Fan: 2x1x500mm, Hava debisi: 12430m³/h, Boyutlar: 403x808x1515mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-156-2250-S Kondanser 500 Fan 2x2',
    code: 'RK-156-2250-S',
    brand: 'REN',
    model: 'RK-156-2250-S',
    category: 'RK-S 3/8 Kondanser',
    price: 2692.96,
    description: '500mm 2x2 fan, 155.9m² yüzey, 76866W kapasite',
    specifications: 'Yüzey: 155.9m², Boru: 26.60d3, Kapasite: 76866W (ΔT:15), Fan: 2x2x500mm, Hava debisi: 26782m³/h, Boyutlar: 403x1530x1515mm, Giriş: 35mm, Çıkış: 28mm',
    stock_quantity: 1,
    unit: 'adet'
  },
  {
    name: 'REN RK-175-2350-S Kondanser 500 Fan 2x3',
    code: 'RK-175-2350-S',
    brand: 'REN',
    model: 'RK-175-2350-S',
    category: 'RK-S 3/8 Kondanser',
    price: 3128.87,
    description: '500mm 2x3 fan, 175.4m² yüzey, 101023W kapasite',
    specifications: 'Yüzey: 175.4m², Boru: 29.93d3, Kapasite: 101023W (ΔT:15), Fan: 2x3x500mm, Hava debisi: 43663m³/h, Boyutlar: 403x2280x1515mm, Giriş: 35mm, Çıkış: 28mm',
    stock_quantity: 1,
    unit: 'adet'
  }
];

function addMissingRKSProducts() {
  try {
    console.log('🔄 Eksik RK-S 3/8 ürünleri ekleniyor...');
    
    const db = new Database(dbPath);
    console.log('✅ Veritabanı bağlantısı başarılı');
    
    // Ürünleri ekle
    const insertProduct = db.prepare(`
      INSERT OR IGNORE INTO products (name, code, brand, model, category, price, description, specifications, stock_quantity, unit)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertManyProducts = db.transaction((products) => {
      for (const product of products) {
        insertProduct.run(
          product.name,
          product.code,
          product.brand,
          product.model,
          product.category,
          product.price,
          product.description,
          product.specifications,
          product.stock_quantity,
          product.unit
        );
      }
    });

    console.log('📦 Eksik RK-S ürünleri (çift katlı seriler) ekleniyor...');
    insertManyProducts(missingRKSProducts);
    console.log('✅ Eksik ürünler eklendi');

    // Kontrol et
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const rksSCount = db.prepare('SELECT COUNT(*) as count FROM products WHERE category = ?').get('RK-S 3/8 Kondanser').count;
    
    console.log('✅ Eksik RK-S 3/8 ürünleri başarıyla eklendi!');
    console.log(`📦 Toplam ${productCount} ürün veritabanında`);
    console.log(`📦 RK-S 3/8 serisi: ${rksSCount} ürün (TAMAMLANDI)`);
    console.log(`📦 ${missingRKSProducts.length} eksik ürün eklendi`);
    
    db.close();
    
  } catch (error) {
    console.error('❌ Ürün ekleme hatası:', error);
  }
}

// Script çalıştırıldığında otomatik olarak ürün ekle
if (require.main === module) {
  addMissingRKSProducts();
}

module.exports = { addMissingRKSProducts };