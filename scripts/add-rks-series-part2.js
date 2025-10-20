const Database = require('better-sqlite3');
const path = require('path');

// Veritabanı yolu
const dbPath = path.join(__dirname, '..', 'data', 'products.db');

// RK-S 3/8 Kondanser Serisi - 450 ve 500 Fan serileri (seçilmiş modeller)
const rkSLargeProducts = [
  // 450 FAN SERİSİ - Önemli modeller
  {
    name: 'REN RK-020-1145-S Kondanser 450 Fan',
    code: 'RK-020-1145-S',
    brand: 'REN',
    model: 'RK-020-1145-S',
    category: 'RK-S 3/8 Kondanser',
    price: 411.60,
    description: '450mm fan, 20.3m² yüzey, 10536W kapasite',
    specifications: 'Yüzey: 20.3m², Boru: 3.46d3, Kapasite: 10536W (ΔT:15), Fan: 1x450mm, Hava debisi: 4390m³/h, Boyutlar: 353x708x615mm, Giriş: 12mm, Çıkış: 10mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-027-1145-S Kondanser 450 Fan',
    code: 'RK-027-1145-S',
    brand: 'REN',
    model: 'RK-027-1145-S',
    category: 'RK-S 3/8 Kondanser',
    price: 513.01,
    description: '450mm fan, 27.0m² yüzey, 11776W kapasite',
    specifications: 'Yüzey: 27.0m², Boru: 4.61d3, Kapasite: 11776W (ΔT:15), Fan: 1x450mm, Hava debisi: 4039m³/h, Boyutlar: 353x708x615mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-039-1145-S Kondanser 450 Fan',
    code: 'RK-039-1145-S',
    brand: 'REN',
    model: 'RK-039-1145-S',
    category: 'RK-S 3/8 Kondanser',
    price: 686.75,
    description: '450mm fan, 39.0m² yüzey, 15024W kapasite',
    specifications: 'Yüzey: 39.0m², Boru: 6.65d3, Kapasite: 15024W (ΔT:15), Fan: 1x450mm, Hava debisi: 4725m³/h, Boyutlar: 353x807x765mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-041-1245-S Kondanser 450 Fan Çift',
    code: 'RK-041-1245-S',
    brand: 'REN',
    model: 'RK-041-1245-S',
    category: 'RK-S 3/8 Kondanser',
    price: 759.56,
    description: '450mm çift fan, 40.5m² yüzey, 20889W kapasite',
    specifications: 'Yüzey: 40.5m², Boru: 6.92d3, Kapasite: 20889W (ΔT:15), Fan: 2x450mm, Hava debisi: 8780m³/h, Boyutlar: 353x1358x615mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-054-1245-S Kondanser 450 Fan Çift',
    code: 'RK-054-1245-S',
    brand: 'REN',
    model: 'RK-054-1245-S',
    category: 'RK-S 3/8 Kondanser',
    price: 942.67,
    description: '450mm çift fan, 54.0m² yüzey, 23614W kapasite',
    specifications: 'Yüzey: 54.0m², Boru: 9.22d3, Kapasite: 23614W (ΔT:15), Fan: 2x450mm, Hava debisi: 8089m³/h, Boyutlar: 353x1358x615mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-078-1245-S Kondanser 450 Fan Çift',
    code: 'RK-078-1245-S',
    brand: 'REN',
    model: 'RK-078-1245-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1301.96,
    description: '450mm çift fan, 77.9m² yüzey, 30141W kapasite',
    specifications: 'Yüzey: 77.9m², Boru: 13.30d3, Kapasite: 30141W (ΔT:15), Fan: 2x450mm, Hava debisi: 9449m³/h, Boyutlar: 353x1558x765mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-081-1345-S Kondanser 450 Fan Üçlü',
    code: 'RK-081-1345-S',
    brand: 'REN',
    model: 'RK-081-1345-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1357.17,
    description: '450mm üçlü fan, 81.1m² yüzey, 36449W kapasite',
    specifications: 'Yüzey: 81.1m², Boru: 13.83d3, Kapasite: 36449W (ΔT:15), Fan: 3x450mm, Hava debisi: 12133m³/h, Boyutlar: 353x2008x615mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-117-1345-S Kondanser 450 Fan Üçlü',
    code: 'RK-117-1345-S',
    brand: 'REN',
    model: 'RK-117-1345-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1896.94,
    description: '450mm üçlü fan, 116.9m² yüzey, 45005W kapasite',
    specifications: 'Yüzey: 116.9m², Boru: 19.95d3, Kapasite: 45005W (ΔT:15), Fan: 3x450mm, Hava debisi: 14174m³/h, Boyutlar: 353x2308x765mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  // 500 FAN SERİSİ - Önemli modeller
  {
    name: 'REN RK-029-1150-S Kondanser 500 Fan',
    code: 'RK-029-1150-S',
    brand: 'REN',
    model: 'RK-029-1150-S',
    category: 'RK-S 3/8 Kondanser',
    price: 550.49,
    description: '500mm fan, 29.2m² yüzey, 16030W kapasite',
    specifications: 'Yüzey: 29.2m², Boru: 4.66d3, Kapasite: 16030W (ΔT:15), Fan: 1x500mm, Hava debisi: 7282m³/h, Boyutlar: 403x808x765mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-039-1150-S Kondanser 500 Fan',
    code: 'RK-039-1150-S',
    brand: 'REN',
    model: 'RK-039-1150-S',
    category: 'RK-S 3/8 Kondanser',
    price: 713.24,
    description: '500mm fan, 39.0m² yüzey, 18392W kapasite',
    specifications: 'Yüzey: 39.0m², Boru: 6.65d3, Kapasite: 18392W (ΔT:15), Fan: 1x500mm, Hava debisi: 6700m³/h, Boyutlar: 403x808x765mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-049-1150-S Kondanser 500 Fan',
    code: 'RK-049-1150-S',
    brand: 'REN',
    model: 'RK-049-1150-S',
    category: 'RK-S 3/8 Kondanser',
    price: 827.19,
    description: '500mm fan, 48.7m² yüzey, 20394W kapasite',
    specifications: 'Yüzey: 48.7m², Boru: 7.98d3, Kapasite: 20394W (ΔT:15), Fan: 1x500mm, Hava debisi: 6215m³/h, Boyutlar: 403x808x765mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-078-1250-S Kondanser 500 Fan Çift',
    code: 'RK-078-1250-S',
    brand: 'REN',
    model: 'RK-078-1250-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1327.40,
    description: '500mm çift fan, 77.9m² yüzey, 38003W kapasite',
    specifications: 'Yüzey: 77.9m², Boru: 13.30d3, Kapasite: 38003W (ΔT:15), Fan: 2x500mm, Hava debisi: 13391m³/h, Boyutlar: 403x1558x765mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-117-1350-S Kondanser 500 Fan Üçlü',
    code: 'RK-117-1350-S',
    brand: 'REN',
    model: 'RK-117-1350-S',
    category: 'RK-S 3/8 Kondanser',
    price: 1946.66,
    description: '500mm üçlü fan, 116.9m² yüzey, 57507W kapasite',
    specifications: 'Yüzey: 116.9m², Boru: 19.95d3, Kapasite: 57507W (ΔT:15), Fan: 3x500mm, Hava debisi: 20086m³/h, Boyutlar: 403x2308x765mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-146-1350-S Kondanser 500 Fan Üçlü',
    code: 'RK-146-1350-S',
    brand: 'REN',
    model: 'RK-146-1350-S',
    category: 'RK-S 3/8 Kondanser',
    price: 2329.84,
    description: '500mm üçlü fan, 146.1m² yüzey, 61647W kapasite',
    specifications: 'Yüzey: 146.1m², Boru: 24.94d3, Kapasite: 61647W (ΔT:15), Fan: 3x500mm, Hava debisi: 18645m³/h, Boyutlar: 403x2308x765mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  // ÇİFT KATLI (2x) SERİLER - Seçilmiş premium modeller
  {
    name: 'REN RK-117-2250-S Kondanser 500 Fan 2x2',
    code: 'RK-117-2250-S',
    brand: 'REN',
    model: 'RK-117-2250-S',
    category: 'RK-S 3/8 Kondanser',
    price: 2147.03,
    description: '500mm 2x2 fan, 116.9m² yüzey, 64700W kapasite',
    specifications: 'Yüzey: 116.9m², Boru: 19.95d3, Kapasite: 64700W (ΔT:15), Fan: 2x2x500mm, Hava debisi: 29129m³/h, Boyutlar: 403x1530x1515mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 1,
    unit: 'adet'
  },
  {
    name: 'REN RK-195-2250-S Kondanser 500 Fan 2x2',
    code: 'RK-195-2250-S',
    brand: 'REN',
    model: 'RK-195-2250-S',
    category: 'RK-S 3/8 Kondanser',
    price: 3173.74,
    description: '500mm 2x2 fan, 194.9m² yüzey, 82486W kapasite',
    specifications: 'Yüzey: 194.9m², Boru: 33.25d3, Kapasite: 82486W (ΔT:15), Fan: 2x2x500mm, Hava debisi: 24860m³/h, Boyutlar: 403x1530x1515mm, Giriş: 35mm, Çıkış: 28mm',
    stock_quantity: 1,
    unit: 'adet'
  },
  {
    name: 'REN RK-234-2350-S Kondanser 500 Fan 2x3',
    code: 'RK-234-2350-S',
    brand: 'REN',
    model: 'RK-234-2350-S',
    category: 'RK-S 3/8 Kondanser',
    price: 3903.36,
    description: '500mm 2x3 fan, 233.8m² yüzey, 115014W kapasite',
    specifications: 'Yüzey: 233.8m², Boru: 39.90d3, Kapasite: 115014W (ΔT:15), Fan: 2x3x500mm, Hava debisi: 40173m³/h, Boyutlar: 403x2280x1515mm, Giriş: 35mm, Çıkış: 28mm',
    stock_quantity: 1,
    unit: 'adet'
  }
];

function addRKSLargeProducts() {
  try {
    console.log('🔄 RK-S 3/8 büyük kapasiteli modeller ekleniyor...');
    
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

    console.log('📦 RK-S 450-500 Fan ve çift katlı serileri ekleniyor...');
    insertManyProducts(rkSLargeProducts);
    console.log('✅ Büyük kapasiteli ürünler eklendi');

    // Kontrol et
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    
    console.log('✅ RK-S 3/8 büyük kapasiteli seriler başarıyla eklendi!');
    console.log(`📦 Toplam ${productCount} ürün veritabanında`);
    console.log(`📦 ${rkSLargeProducts.length} yeni büyük kapasiteli RK-S ürünü eklendi`);
    
    db.close();
    
  } catch (error) {
    console.error('❌ Ürün ekleme hatası:', error);
  }
}

// Script çalıştırıldığında otomatik olarak ürün ekle
if (require.main === module) {
  addRKSLargeProducts();
}

module.exports = { addRKSLargeProducts };