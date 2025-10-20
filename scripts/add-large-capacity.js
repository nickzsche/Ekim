const Database = require('better-sqlite3');
const path = require('path');

// Veritabanı yolu
const dbPath = path.join(__dirname, '..', 'data', 'products.db');

// RK-G 5/16 Kondanser Serisi - 450 ve 500 Fan serileri (seçilmiş önemli modeller)
const fanSeries450and500 = [
  // 450 FAN SERİSİ - Önemli modeller
  {
    name: 'REN RK-020-1145-G Kondanser 450 Fan',
    code: 'RK-020-1145-G',
    brand: 'REN',
    model: 'RK-020-1145-G',
    category: 'RK-G 5/16 Kondanser',
    price: 370.78,
    description: '450mm fan, 20.26m² yüzey, 10200W kapasite',
    specifications: 'Yüzey: 20.26m², Boru: 2.17d3, Kapasite: 10200W, Fan: 1x450mm, Hava debisi: 10200m³/h, Boyutlar: 353x708x615mm, Giriş: 12mm, Çıkış: 10mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-027-1145-G Kondanser 450 Fan',
    code: 'RK-027-1145-G',
    brand: 'REN',
    model: 'RK-027-1145-G',
    category: 'RK-G 5/16 Kondanser',
    price: 465.54,
    description: '450mm fan, 27.02m² yüzey, 11900W kapasite',
    specifications: 'Yüzey: 27.02m², Boru: 2.98d3, Kapasite: 11900W, Fan: 1x450mm, Hava debisi: 4267m³/h, Boyutlar: 353x708x615mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-039-1145-G Kondanser 450 Fan',
    code: 'RK-039-1145-G',
    brand: 'REN',
    model: 'RK-039-1145-G',
    category: 'RK-G 5/16 Kondanser',
    price: 594.03,
    description: '450mm fan, 38.97m² yüzey, 14550W kapasite',
    specifications: 'Yüzey: 38.97m², Boru: 4.01d3, Kapasite: 14550W, Fan: 1x450mm, Hava debisi: 4875m³/h, Boyutlar: 353x807x765mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-041-1245-G Kondanser 450 Fan Çift',
    code: 'RK-041-1245-G',
    brand: 'REN',
    model: 'RK-041-1245-G',
    category: 'RK-G 5/16 Kondanser',
    price: 691.68,
    description: '450mm çift fan, 40.53m² yüzey, 20750W kapasite',
    specifications: 'Yüzey: 40.53m², Boru: 4.47d3, Kapasite: 20750W, Fan: 2x450mm, Hava debisi: 9171m³/h, Boyutlar: 353x1358x615mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-054-1245-G Kondanser 450 Fan Çift',
    code: 'RK-054-1245-G',
    brand: 'REN',
    model: 'RK-054-1245-G',
    category: 'RK-G 5/16 Kondanser',
    price: 849.07,
    description: '450mm çift fan, 54.04m² yüzey, 23850W kapasite',
    specifications: 'Yüzey: 54.04m², Boru: 5.96d3, Kapasite: 23850W, Fan: 2x450mm, Hava debisi: 8535m³/h, Boyutlar: 353x1358x615mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-078-1245-G Kondanser 450 Fan Çift',
    code: 'RK-078-1245-G',
    brand: 'REN',
    model: 'RK-078-1245-G',
    category: 'RK-G 5/16 Kondanser',
    price: 1181.29,
    description: '450mm çift fan, 77.94m² yüzey, 29600W kapasite',
    specifications: 'Yüzey: 77.94m², Boru: 8.60d3, Kapasite: 29600W, Fan: 2x450mm, Hava debisi: 9751m³/h, Boyutlar: 353x1558x765mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-081-1345-G Kondanser 450 Fan Üçlü',
    code: 'RK-081-1345-G',
    brand: 'REN',
    model: 'RK-081-1345-G',
    category: 'RK-G 5/16 Kondanser',
    price: 1225.41,
    description: '450mm üçlü fan, 81.06m² yüzey, 36000W kapasite',
    specifications: 'Yüzey: 81.06m², Boru: 8.95d3, Kapasite: 36000W, Fan: 3x450mm, Hava debisi: 12802m³/h, Boyutlar: 353x2008x615mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-117-1345-G Kondanser 450 Fan Üçlü',
    code: 'RK-117-1345-G',
    brand: 'REN',
    model: 'RK-117-1345-G',
    category: 'RK-G 5/16 Kondanser',
    price: 1699.53,
    description: '450mm üçlü fan, 116.91m² yüzey, 44500W kapasite',
    specifications: 'Yüzey: 116.91m², Boru: 12.90d3, Kapasite: 44500W, Fan: 3x450mm, Hava debisi: 14626m³/h, Boyutlar: 353x2308x765mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  // 500 FAN SERİSİ - Önemli modeller
  {
    name: 'REN RK-029-1150-G Kondanser 500 Fan',
    code: 'RK-029-1150-G',
    brand: 'REN',
    model: 'RK-029-1150-G',
    category: 'RK-G 5/16 Kondanser',
    price: 501.25,
    description: '500mm fan, 29.23m² yüzey, 16100W kapasite',
    specifications: 'Yüzey: 29.23m², Boru: 3.01d3, Kapasite: 16100W, Fan: 1x500mm, Hava debisi: 7737m³/h, Boyutlar: 403x808x765mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-039-1150-G Kondanser 500 Fan',
    code: 'RK-039-1150-G',
    brand: 'REN',
    model: 'RK-039-1150-G',
    category: 'RK-G 5/16 Kondanser',
    price: 644.04,
    description: '500mm fan, 38.97m² yüzey, 18850W kapasite',
    specifications: 'Yüzey: 38.97m², Boru: 4.30d3, Kapasite: 18850W, Fan: 1x500mm, Hava debisi: 7216m³/h, Boyutlar: 403x808x765mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-049-1150-G Kondanser 500 Fan',
    code: 'RK-049-1150-G',
    brand: 'REN',
    model: 'RK-049-1150-G',
    category: 'RK-G 5/16 Kondanser',
    price: 743.79,
    description: '500mm fan, 48.71m² yüzey, 20500W kapasite',
    specifications: 'Yüzey: 48.71m², Boru: 5.16d3, Kapasite: 20500W, Fan: 1x500mm, Hava debisi: 6761m³/h, Boyutlar: 403x808x765mm, Giriş: 19mm, Çıkış: 16mm',
    stock_quantity: 3,
    unit: 'adet'
  },
  {
    name: 'REN RK-078-1250-G Kondanser 500 Fan Çift',
    code: 'RK-078-1250-G',
    brand: 'REN',
    model: 'RK-078-1250-G',
    category: 'RK-G 5/16 Kondanser',
    price: 1193.87,
    description: '500mm çift fan, 77.94m² yüzey, 38000W kapasite',
    specifications: 'Yüzey: 77.94m², Boru: 8.60d3, Kapasite: 38000W, Fan: 2x500mm, Hava debisi: 14403m³/h, Boyutlar: 403x1558x765mm, Giriş: 22mm, Çıkış: 19mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-117-1350-G Kondanser 500 Fan Üçlü',
    code: 'RK-117-1350-G',
    brand: 'REN',
    model: 'RK-117-1350-G',
    category: 'RK-G 5/16 Kondanser',
    price: 1749.24,
    description: '500mm üçlü fan, 116.91m² yüzey, 56750W kapasite',
    specifications: 'Yüzey: 116.91m², Boru: 12.90d3, Kapasite: 56750W, Fan: 3x500mm, Hava debisi: 21649m³/h, Boyutlar: 403x2308x765mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  {
    name: 'REN RK-146-1350-G Kondanser 500 Fan Üçlü',
    code: 'RK-146-1350-G',
    brand: 'REN',
    model: 'RK-146-1350-G',
    category: 'RK-G 5/16 Kondanser',
    price: 2066.77,
    description: '500mm üçlü fan, 146.14m² yüzey, 61850W kapasite',
    specifications: 'Yüzey: 146.14m², Boru: 15.91d3, Kapasite: 61850W, Fan: 3x500mm, Hava debisi: 20284m³/h, Boyutlar: 403x2308x765mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 2,
    unit: 'adet'
  },
  // ÇİFT KATLI (2x) SERİLER - Seçilmiş modeller
  {
    name: 'REN RK-117-2250-G Kondanser 500 Fan 2x2',
    code: 'RK-117-2250-G',
    brand: 'REN',
    model: 'RK-117-2250-G',
    category: 'RK-G 5/16 Kondanser',
    price: 1946.06,
    description: '500mm 2x2 fan, 116.91m² yüzey, 65100W kapasite',
    specifications: 'Yüzey: 116.91m², Boru: 12.90d3, Kapasite: 65100W, Fan: 2x2x500mm, Hava debisi: 30950m³/h, Boyutlar: 403x1530x1515mm, Giriş: 28mm, Çıkış: 22mm',
    stock_quantity: 1,
    unit: 'adet'
  },
  {
    name: 'REN RK-195-2250-G Kondanser 500 Fan 2x2',
    code: 'RK-195-2250-G',
    brand: 'REN',
    model: 'RK-195-2250-G',
    category: 'RK-G 5/16 Kondanser',
    price: 2838.81,
    description: '500mm 2x2 fan, 194.85m² yüzey, 82450W kapasite',
    specifications: 'Yüzey: 194.85m², Boru: 21.50d3, Kapasite: 82450W, Fan: 2x2x500mm, Hava debisi: 27045m³/h, Boyutlar: 403x1530x1515mm, Giriş: 35mm, Çıkış: 28mm',
    stock_quantity: 1,
    unit: 'adet'
  },
  {
    name: 'REN RK-234-2350-G Kondanser 500 Fan 2x3',
    code: 'RK-234-2350-G',
    brand: 'REN',
    model: 'RK-234-2350-G',
    category: 'RK-G 5/16 Kondanser',
    price: 3508.53,
    description: '500mm 2x3 fan, 233.82m² yüzey, 113500W kapasite',
    specifications: 'Yüzey: 233.82m², Boru: 25.80d3, Kapasite: 113500W, Fan: 2x3x500mm, Hava debisi: 43299m³/h, Boyutlar: 403x2280x1515mm, Giriş: 35mm, Çıkış: 28mm',
    stock_quantity: 1,
    unit: 'adet'
  }
];

function addLargeCapacityProducts() {
  try {
    console.log('🔄 450-500 Fan RK-G serileri ekleniyor...');
    
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

    console.log('📦 450-500 Fan ve çift katlı serileri ekleniyor...');
    insertManyProducts(fanSeries450and500);
    console.log('✅ Ürünler eklendi');

    // Kontrol et
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    
    console.log('✅ Büyük kapasiteli ürünler başarıyla eklendi!');
    console.log(`📦 Toplam ${productCount} ürün veritabanında`);
    console.log(`📦 ${fanSeries450and500.length} yeni büyük kapasiteli ürün eklendi`);
    
    db.close();
    
  } catch (error) {
    console.error('❌ Ürün ekleme hatası:', error);
  }
}

// Script çalıştırıldığında otomatik olarak ürün ekle
if (require.main === module) {
  addLargeCapacityProducts();
}

module.exports = { addLargeCapacityProducts };