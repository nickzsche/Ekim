const Database = require('better-sqlite3');
const path = require('path');

// Veritabanı yolu
const dbPath = path.join(__dirname, '..', 'data', 'products.db');

// RK-S 3/8 Kondanser Serisi ürünleri
const rkSSeriesProducts = [
  // 300 FAN SERİSİ
  {
    name: 'REN RK-007-1130-S Kondanser 300 Fan',
    code: 'RK-007-1130-S',
    brand: 'REN',
    model: 'RK-007-1130-S',
    category: 'RK-S 3/8 Kondanser',
    price: 143.98,
    description: '300mm fan, 7.3m² yüzey, 2940W kapasite',
    specifications: 'Yüzey: 7.3m², Boru: 1.18d3, Kapasite: 2940W (ΔT:15), Fan: 1x300mm, Hava debisi: 1167m³/h, Boyutlar: 203x458x364mm, Giriş: 10mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-010-1130-S Kondanser 300 Fan',
    code: 'RK-010-1130-S',
    brand: 'REN',
    model: 'RK-010-1130-S',
    category: 'RK-S 3/8 Kondanser',
    price: 184.11,
    description: '300mm fan, 9.7m² yüzey, 3399W kapasite',
    specifications: 'Yüzey: 9.7m², Boru: 1.66d3, Kapasite: 3399W (ΔT:15), Fan: 1x300mm, Hava debisi: 1062m³/h, Boyutlar: 203x458x364mm, Giriş: 10mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-015-1230-S Kondanser 300 Fan Çift',
    code: 'RK-015-1230-S',
    brand: 'REN',
    model: 'RK-015-1230-S',
    category: 'RK-S 3/8 Kondanser',
    price: 269.09,
    description: '300mm çift fan, 14.5m² yüzey, 6183W kapasite',
    specifications: 'Yüzey: 14.5m², Boru: 2.48d3, Kapasite: 6183W (ΔT:15), Fan: 2x300mm, Hava debisi: 2334m³/h, Boyutlar: 203x858x365mm, Giriş: 12mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-019-1230-S Kondanser 300 Fan Çift',
    code: 'RK-019-1230-S',
    brand: 'REN',
    model: 'RK-019-1230-S',
    category: 'RK-S 3/8 Kondanser',
    price: 337.19,
    description: '300mm çift fan, 19.4m² yüzey, 6924W kapasite',
    specifications: 'Yüzey: 19.4m², Boru: 3.31d3, Kapasite: 6924W (ΔT:15), Fan: 2x300mm, Hava debisi: 2170m³/h, Boyutlar: 203x858x365mm, Giriş: 12mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  // 350 FAN SERİSİ
  {
    name: 'REN RK-011-1135-S Kondanser 350 Fan',
    code: 'RK-011-1135-S',
    brand: 'REN',
    model: 'RK-011-1135-S',
    category: 'RK-S 3/8 Kondanser',
    price: 228.01,
    description: '350mm fan, 11.1m² yüzey, 5204W kapasite',
    specifications: 'Yüzey: 11.1m², Boru: 1.90d3, Kapasite: 5204W (ΔT:15), Fan: 1x350mm, Hava debisi: 2172m³/h, Boyutlar: 253x533x465mm, Giriş: 10mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-015-1135-S Kondanser 350 Fan',
    code: 'RK-015-1135-S',
    brand: 'REN',
    model: 'RK-015-1135-S',
    category: 'RK-S 3/8 Kondanser',
    price: 282.98,
    description: '350mm fan, 14.8m² yüzey, 5992W kapasite',
    specifications: 'Yüzey: 14.8m², Boru: 2.53d3, Kapasite: 5992W (ΔT:15), Fan: 1x350mm, Hava debisi: 1972m³/h, Boyutlar: 253x533x465mm, Giriş: 10mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-022-1235-S Kondanser 350 Fan Çift',
    code: 'RK-022-1235-S',
    brand: 'REN',
    model: 'RK-022-1235-S',
    category: 'RK-S 3/8 Kondanser',
    price: 401.37,
    description: '350mm çift fan, 22.2m² yüzey, 10500W kapasite',
    specifications: 'Yüzey: 22.2m², Boru: 3.51d3, Kapasite: 10500W (ΔT:15), Fan: 2x350mm, Hava debisi: 4344m³/h, Boyutlar: 253x1008x465mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-030-1235-S Kondanser 350 Fan Çift',
    code: 'RK-030-1235-S',
    brand: 'REN',
    model: 'RK-030-1235-S',
    category: 'RK-S 3/8 Kondanser',
    price: 521.96,
    description: '350mm çift fan, 29.6m² yüzey, 12015W kapasite',
    specifications: 'Yüzey: 29.6m², Boru: 5.05d3, Kapasite: 12015W (ΔT:15), Fan: 2x350mm, Hava debisi: 3943m³/h, Boyutlar: 253x1008x465mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  // 400 FAN SERİSİ (Seçilmiş modeller)
  {
    name: 'REN RK-014-1140-S Kondanser 400 Fan',
    code: 'RK-014-1140-S',
    brand: 'REN',
    model: 'RK-014-1140-S',
    category: 'RK-S 3/8 Kondanser',
    price: 285.69,
    description: '400mm fan, 14.3m² yüzey, 7178W kapasite',
    specifications: 'Yüzey: 14.3m², Boru: 2.44d3, Kapasite: 7178W (ΔT:15), Fan: 1x400mm, Hava debisi: 2963m³/h, Boyutlar: 303x608x515mm, Giriş: 12mm, Çıkış: 10mm',
    stock_quantity: 4,
    unit: 'adet'
  },
  {
    name: 'REN RK-019-1140-S Kondanser 400 Fan',
    code: 'RK-019-1140-S',
    brand: 'REN',
    model: 'RK-019-1140-S',
    category: 'RK-S 3/8 Kondanser',
    price: 354.94,
    description: '400mm fan, 19.1m² yüzey, 7976W kapasite',
    specifications: 'Yüzey: 19.1m², Boru: 3.25d3, Kapasite: 7976W (ΔT:15), Fan: 1x400mm, Hava debisi: 2670m³/h, Boyutlar: 303x608x515mm, Giriş: 12mm, Çıkış: 10mm',
    stock_quantity: 4,
    unit: 'adet'
  },
  {
    name: 'REN RK-029-1240-S Kondanser 400 Fan Çift',
    code: 'RK-029-1240-S',
    brand: 'REN',
    model: 'RK-029-1240-S',
    category: 'RK-S 3/8 Kondanser',
    price: 527.36,
    description: '400mm çift fan, 28.6m² yüzey, 14600W kapasite',
    specifications: 'Yüzey: 28.6m², Boru: 4.88d3, Kapasite: 14600W (ΔT:15), Fan: 2x400mm, Hava debisi: 5927m³/h, Boyutlar: 303x1158x515mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 4,
    unit: 'adet'
  },
  {
    name: 'REN RK-038-1240-S Kondanser 400 Fan Çift',
    code: 'RK-038-1240-S',
    brand: 'REN',
    model: 'RK-038-1240-S',
    category: 'RK-S 3/8 Kondanser',
    price: 659.64,
    description: '400mm çift fan, 38.1m² yüzey, 15985W kapasite',
    specifications: 'Yüzey: 38.1m², Boru: 6.50d3, Kapasite: 15985W (ΔT:15), Fan: 2x400mm, Hava debisi: 5341m³/h, Boyutlar: 303x1158x515mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 4,
    unit: 'adet'
  },
  {
    name: 'REN RK-043-1340-S Kondanser 400 Fan Üçlü',
    code: 'RK-043-1340-S',
    brand: 'REN',
    model: 'RK-043-1340-S',
    category: 'RK-S 3/8 Kondanser',
    price: 735.90,
    description: '400mm üçlü fan, 42.9m² yüzey, 21763W kapasite',
    specifications: 'Yüzey: 42.9m², Boru: 6.83d3, Kapasite: 21763W (ΔT:15), Fan: 3x400mm, Hava debisi: 8890m³/h, Boyutlar: 303x608x1015mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-057-1340-S Kondanser 400 Fan Üçlü',
    code: 'RK-057-1340-S',
    brand: 'REN',
    model: 'RK-057-1340-S',
    category: 'RK-S 3/8 Kondanser',
    price: 954.72,
    description: '400mm üçlü fan, 57.2m² yüzey, 24925W kapasite',
    specifications: 'Yüzey: 57.2m², Boru: 9.75d3, Kapasite: 24925W (ΔT:15), Fan: 3x400mm, Hava debisi: 8184m³/h, Boyutlar: 303x608x1015mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 3,
    unit: 'adet'
  }
];

function addRKSSeriesProducts() {
  try {
    console.log('🔄 RK-S 3/8 Kondanser Serisi ekleniyor...');
    
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

    console.log('📦 RK-S 3/8 serisi (300-400 Fan) ekleniyor...');
    insertManyProducts(rkSSeriesProducts);
    console.log('✅ İlk grup ürünler eklendi');

    // Kontrol et
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    
    console.log('✅ RK-S 3/8 serisi (1. grup) başarıyla eklendi!');
    console.log(`📦 Toplam ${productCount} ürün veritabanında`);
    console.log(`📦 ${rkSSeriesProducts.length} yeni RK-S ürünü eklendi`);
    
    db.close();
    
  } catch (error) {
    console.error('❌ Ürün ekleme hatası:', error);
  }
}

// Script çalıştırıldığında otomatik olarak ürün ekle
if (require.main === module) {
  addRKSSeriesProducts();
}

module.exports = { addRKSSeriesProducts };