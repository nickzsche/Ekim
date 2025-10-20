const Database = require('better-sqlite3');
const path = require('path');

// Veritabanı yolu
const dbPath = path.join(__dirname, '..', 'data', 'products.db');

// RK-G 5/16 Kondanser Serisi - 350, 400, 450, 500 Fan serileri
const additionalProducts = [
  // 350 FAN SERİSİ
  {
    name: 'REN RK-011-1135-G Kondanser 350 Fan',
    code: 'RK-011-1135-G',
    brand: 'REN',
    model: 'RK-011-1135-G',
    category: 'RK-G 5/16 Kondanser',
    price: 206.72,
    description: '350mm fan, 11.11m² yüzey, 5250W kapasite',
    specifications: 'Yüzey: 11.11m², Boru: 1.23d3, Kapasite: 5250W, Fan: 1x350mm, Hava debisi: 2288m³/h, Boyutlar: 253x533x465mm, Giriş: 10mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-015-1135-G Kondanser 350 Fan',
    code: 'RK-015-1135-G',
    brand: 'REN',
    model: 'RK-015-1135-G',
    category: 'RK-G 5/16 Kondanser',
    price: 254.59,
    description: '350mm fan, 14.81m² yüzey, 6100W kapasite',
    specifications: 'Yüzey: 14.81m², Boru: 1.63d3, Kapasite: 6100W, Fan: 1x350mm, Hava debisi: 2096m³/h, Boyutlar: 253x533x465mm, Giriş: 10mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-022-1235-G Kondanser 350 Fan Çift',
    code: 'RK-022-1235-G',
    brand: 'REN',
    model: 'RK-022-1235-G',
    category: 'RK-G 5/16 Kondanser',
    price: 364.99,
    description: '350mm çift fan, 22.21m² yüzey, 10550W kapasite',
    specifications: 'Yüzey: 22.21m², Boru: 2.27d3, Kapasite: 10550W, Fan: 2x350mm, Hava debisi: 4575m³/h, Boyutlar: 253x1008x465mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-030-1235-G Kondanser 350 Fan Çift',
    code: 'RK-030-1235-G',
    brand: 'REN',
    model: 'RK-030-1235-G',
    category: 'RK-G 5/16 Kondanser',
    price: 469.17,
    description: '350mm çift fan, 29.62m² yüzey, 12200W kapasite',
    specifications: 'Yüzey: 29.62m², Boru: 3.27d3, Kapasite: 12200W, Fan: 2x350mm, Hava debisi: 4192m³/h, Boyutlar: 253x1008x465mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  // 400 FAN SERİSİ
  {
    name: 'REN RK-014-1140-G Kondanser 400 Fan',
    code: 'RK-014-1140-G',
    brand: 'REN',
    model: 'RK-014-1140-G',
    category: 'RK-G 5/16 Kondanser',
    price: 251.54,
    description: '400mm fan, 14.29m² yüzey, 6900W kapasite',
    specifications: 'Yüzey: 14.29m², Boru: 1.47d3, Kapasite: 6900W, Fan: 1x400mm, Hava debisi: 3137m³/h, Boyutlar: 303x608x515mm, Giriş: 12mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-019-1140-G Kondanser 400 Fan',
    code: 'RK-019-1140-G',
    brand: 'REN',
    model: 'RK-019-1140-G',
    category: 'RK-G 5/16 Kondanser',
    price: 319.01,
    description: '400mm fan, 19.05m² yüzey, 8100W kapasite',
    specifications: 'Yüzey: 19.05m², Boru: 2.10d3, Kapasite: 8100W, Fan: 1x400mm, Hava debisi: 2852m³/h, Boyutlar: 303x608x515mm, Giriş: 12mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-029-1240-G Kondanser 400 Fan Çift',
    code: 'RK-029-1240-G',
    brand: 'REN',
    model: 'RK-029-1240-G',
    category: 'RK-G 5/16 Kondanser',
    price: 449.73,
    description: '400mm çift fan, 28.58m² yüzey, 14050W kapasite',
    specifications: 'Yüzey: 28.58m², Boru: 2.94d3, Kapasite: 14050W, Fan: 2x400mm, Hava debisi: 6273m³/h, Boyutlar: 303x1158x515mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-038-1240-G Kondanser 400 Fan Çift',
    code: 'RK-038-1240-G',
    brand: 'REN',
    model: 'RK-038-1240-G',
    category: 'RK-G 5/16 Kondanser',
    price: 591.77,
    description: '400mm çift fan, 38.10m² yüzey, 16300W kapasite',
    specifications: 'Yüzey: 38.10m², Boru: 4.20d3, Kapasite: 16300W, Fan: 2x400mm, Hava debisi: 5704m³/h, Boyutlar: 303x1158x515mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-043-1340-G Kondanser 400 Fan Üçlü',
    code: 'RK-043-1340-G',
    brand: 'REN',
    model: 'RK-043-1340-G',
    category: 'RK-G 5/16 Kondanser',
    price: 691.98,
    description: '400mm üçlü fan, 42.87m² yüzey, 21500W kapasite',
    specifications: 'Yüzey: 42.87m², Boru: 4.73d3, Kapasite: 21500W, Fan: 3x400mm, Hava debisi: 9410m³/h, Boyutlar: 303x608x1015mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-057-1340-G Kondanser 400 Fan Üçlü',
    code: 'RK-057-1340-G',
    brand: 'REN',
    model: 'RK-057-1340-G',
    category: 'RK-G 5/16 Kondanser',
    price: 844.70,
    description: '400mm üçlü fan, 57.16m² yüzey, 24600W kapasite',
    specifications: 'Yüzey: 57.16m², Boru: 6.15d3, Kapasite: 24600W, Fan: 3x400mm, Hava debisi: 8741m³/h, Boyutlar: 303x608x1015mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 5,
    unit: 'adet'
  }
];

function addAdditionalProducts() {
  try {
    console.log('🔄 Ek RK-G 5/16 ürünleri ekleniyor...');
    
    const db = new Database(dbPath);
    console.log('✅ Veritabanı bağlantısı başarılı');
    
    // Ürünleri ekle
    const insertProduct = db.prepare(`
      INSERT INTO products (name, code, brand, model, category, price, description, specifications, stock_quantity, unit)
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

    console.log('📦 350-400 Fan ürünleri ekleniyor...');
    insertManyProducts(additionalProducts);
    console.log('✅ Ürünler eklendi');

    // Kontrol et
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    
    console.log('✅ Ek ürünler başarıyla eklendi!');
    console.log(`📦 Toplam ${productCount} ürün veritabanında`);
    console.log(`📦 ${additionalProducts.length} yeni ürün eklendi`);
    
    db.close();
    
  } catch (error) {
    console.error('❌ Ürün ekleme hatası:', error);
  }
}

// Script çalıştırıldığında otomatik olarak ürün ekle
if (require.main === module) {
  addAdditionalProducts();
}

module.exports = { addAdditionalProducts };