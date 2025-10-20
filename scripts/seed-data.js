const Database = require('better-sqlite3');
const path = require('path');

// Veritabanı yolu
const dbPath = path.join(__dirname, '..', 'data', 'products.db');

// REN Alçak Kondanser Serisi ürün verileri
const sampleProducts = [
  // DAVLUNBAZSIZ SERİSİ
  {
    name: 'REN Alçak Kondanser 1/4 HP Davlunbazsız',
    code: 'REN-AK-014-D',
    brand: 'REN',
    model: '1/4 HP',
    category: 'Alçak Kondanser',
    price: 37.43,
    description: 'Davlunbazsız alçak kondanser, 1/4 HP güç',
    specifications: 'Yüzey: 2,20 m², Fan: Yok, Boyutlar: 104x340x257mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Alçak Kondanser 1/3 HP Davlunbazsız',
    code: 'REN-AK-013-D',
    brand: 'REN',
    model: '1/3 HP',
    category: 'Alçak Kondanser',
    price: 46.58,
    description: 'Davlunbazsız alçak kondanser, 1/3 HP güç',
    specifications: 'Yüzey: 2,80 m², Fan: Yok, Boyutlar: 104x360x282mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Alçak Kondanser 1/2 HP Davlunbazsız',
    code: 'REN-AK-012-D',
    brand: 'REN',
    model: '1/2 HP',
    category: 'Alçak Kondanser',
    price: 71.18,
    description: 'Davlunbazsız alçak kondanser, 1/2 HP güç',
    specifications: 'Yüzey: 3,80 m², Fan: Yok, Boyutlar: 125x360x282mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Alçak Kondanser 3/4 HP Davlunbazsız',
    code: 'REN-AK-034-D',
    brand: 'REN',
    model: '3/4 HP',
    category: 'Alçak Kondanser',
    price: 81.04,
    description: 'Davlunbazsız alçak kondanser, 3/4 HP güç',
    specifications: 'Yüzey: 5,10 m², Fan: Yok, Boyutlar: 153x390x282mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Alçak Kondanser 1 HP Davlunbazsız',
    code: 'REN-AK-001-D',
    brand: 'REN',
    model: '1 HP',
    category: 'Alçak Kondanser',
    price: 103.25,
    description: 'Davlunbazsız alçak kondanser, 1 HP güç',
    specifications: 'Yüzey: 6,00 m², Fan: Yok, Boyutlar: 153x390x282mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  // DAVLUNBAZLI SERİSİ
  {
    name: 'REN Alçak Kondanser 1/4 HP Davlunbazlı',
    code: 'REN-AK-014-DAV',
    brand: 'REN',
    model: '1/4 HP DAV.',
    category: 'Alçak Kondanser',
    price: 40.82,
    description: 'Davlunbazlı alçak kondanser, 1/4 HP güç',
    specifications: 'Yüzey: 2,20 m², Fan: 1 adet 200mm, Boyutlar: 104x340x257mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Alçak Kondanser 1/3 HP Davlunbazlı',
    code: 'REN-AK-013-DAV',
    brand: 'REN',
    model: '1/3 HP DAV.',
    category: 'Alçak Kondanser',
    price: 50.17,
    description: 'Davlunbazlı alçak kondanser, 1/3 HP güç',
    specifications: 'Yüzey: 2,80 m², Fan: 1 adet 250mm, Boyutlar: 104x360x282mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Alçak Kondanser 1/2 HP Davlunbazlı',
    code: 'REN-AK-012-DAV',
    brand: 'REN',
    model: '1/2 HP DAV.',
    category: 'Alçak Kondanser',
    price: 75.02,
    description: 'Davlunbazlı alçak kondanser, 1/2 HP güç',
    specifications: 'Yüzey: 3,80 m², Fan: 1 adet 250mm, Boyutlar: 125x360x282mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Alçak Kondanser 3/4 HP Davlunbazlı',
    code: 'REN-AK-034-DAV',
    brand: 'REN',
    model: '3/4 HP DAV.',
    category: 'Alçak Kondanser',
    price: 85.79,
    description: 'Davlunbazlı alçak kondanser, 3/4 HP güç',
    specifications: 'Yüzey: 5,10 m², Fan: 1 adet 250mm, Boyutlar: 153x390x282mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Alçak Kondanser 1 HP Davlunbazlı',
    code: 'REN-AK-001-DAV',
    brand: 'REN',
    model: '1 HP DAV.',
    category: 'Alçak Kondanser',
    price: 108.00,
    description: 'Davlunbazlı alçak kondanser, 1 HP güç',
    specifications: 'Yüzey: 6,00 m², Fan: 1 adet 250mm, Boyutlar: 153x390x282mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Alçak Kondanser 3/4 HP Çift Fanlı',
    code: 'REN-AK-034-CF',
    brand: 'REN',
    model: '3/4 HP Ç.F',
    category: 'Alçak Kondanser',
    price: 97.97,
    description: 'Çift fanlı alçak kondanser, 3/4 HP güç',
    specifications: 'Yüzey: 4,50 m², Fan: 2 adet 200mm, Boyutlar: 143x580x226mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Alçak Kondanser 1 HP Çift Fanlı',
    code: 'REN-AK-001-CF',
    brand: 'REN',
    model: '1 HP Ç.F',
    category: 'Alçak Kondanser',
    price: 125.64,
    description: 'Çift fanlı alçak kondanser, 1 HP güç',
    specifications: 'Yüzey: 6,00 m², Fan: 2 adet 200mm, Boyutlar: 143x580x226mm, Giriş/Çıkış: 3/8"',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Kondanser RK-8,5 m² Çift Fanlı',
    code: 'REN-RK-85-CF',
    brand: 'REN',
    model: 'RK-8,5 m² ÇF',
    category: 'Alçak Kondanser',
    price: 171.01,
    description: 'Çift fanlı kondanser, 8,5 m² yüzey alanı',
    specifications: 'Yüzey: 8,5 m², Fan: 2 adet 250mm, Boyutlar: 200x693x285mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Kondanser RK-10 m² Çift Fanlı',
    code: 'REN-RK-10-CF',
    brand: 'REN',
    model: 'RK-10 m² ÇF',
    category: 'Alçak Kondanser',
    price: 195.62,
    description: 'Çift fanlı kondanser, 10 m² yüzey alanı',
    specifications: 'Yüzey: 10 m², Fan: 2 adet 250mm, Boyutlar: 200x693x285mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Kondanser RK-12 m² Çift Fanlı',
    code: 'REN-RK-12-CF',
    brand: 'REN',
    model: 'RK-12 m² ÇF',
    category: 'Alçak Kondanser',
    price: 211.67,
    description: 'Çift fanlı kondanser, 12 m² yüzey alanı',
    specifications: 'Yüzey: 12 m², Fan: 2 adet 250mm, Boyutlar: 200x708x285mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 10,
    unit: 'adet'
  },
  {
    name: 'REN Kondanser RK-15 m² Çift Fanlı',
    code: 'REN-RK-15-CF',
    brand: 'REN',
    model: 'RK-15 m² ÇF',
    category: 'Alçak Kondanser',
    price: 235.90,
    description: 'Çift fanlı kondanser, 15 m² yüzey alanı',
    specifications: 'Yüzey: 15 m², Fan: 2 adet 250mm, Boyutlar: 200x748x285mm, Giriş: 16mm, Çıkış: 12mm',
    stock_quantity: 10,
    unit: 'adet'
  },
  // RK-G 5/16 KONDANSER SERİSİ - 300 FAN
  {
    name: 'REN RK-007-1130-G Kondanser 300 Fan',
    code: 'RK-007-1130-G',
    brand: 'REN',
    model: 'RK-007-1130-G',
    category: 'RK-G 5/16 Kondanser',
    price: 130.67,
    description: '300mm fan, 7.27m² yüzey, 3000W kapasite',
    specifications: 'Yüzey: 7.27m², Boru: 0.76d3, Kapasite: 3000W, Fan: 1x300mm, Hava debisi: 1230m³/h, Boyutlar: 203x458x364mm, Giriş: 10mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-010-1130-G Kondanser 300 Fan',
    code: 'RK-010-1130-G',
    brand: 'REN',
    model: 'RK-010-1130-G',
    category: 'RK-G 5/16 Kondanser',
    price: 165.04,
    description: '300mm fan, 9.70m² yüzey, 3500W kapasite',
    specifications: 'Yüzey: 9.70m², Boru: 1.07d3, Kapasite: 3500W, Fan: 1x300mm, Hava debisi: 1128m³/h, Boyutlar: 203x458x364mm, Giriş: 10mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-015-1230-G Kondanser 300 Fan Çift',
    code: 'RK-015-1230-G',
    brand: 'REN',
    model: 'RK-015-1230-G',
    category: 'RK-G 5/16 Kondanser',
    price: 242.92,
    description: '300mm çift fan, 14.55m² yüzey, 6200W kapasite',
    specifications: 'Yüzey: 14.55m², Boru: 1.61d3, Kapasite: 6200W, Fan: 2x300mm, Hava debisi: 2459m³/h, Boyutlar: 203x858x365mm, Giriş: 12mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  },
  {
    name: 'REN RK-019-1230-G Kondanser 300 Fan Çift',
    code: 'RK-019-1230-G',
    brand: 'REN',
    model: 'RK-019-1230-G',
    category: 'RK-G 5/16 Kondanser',
    price: 302.15,
    description: '300mm çift fan, 19.40m² yüzey, 7100W kapasite',
    specifications: 'Yüzey: 19.40m², Boru: 2.14d3, Kapasite: 7100W, Fan: 2x300mm, Hava debisi: 2311m³/h, Boyutlar: 203x858x365mm, Giriş: 12mm, Çıkış: 10mm',
    stock_quantity: 5,
    unit: 'adet'
  }
];

// Örnek müşteri verileri
const sampleCustomers = [
  {
    name: 'ABC İnşaat Ltd. Şti.',
    email: 'info@abcinsaat.com',
    phone: '0312 123 45 67',
    company: 'ABC İnşaat',
    address: 'Çankaya Mahallesi, Ankara',
    tax_number: '1234567890',
    tax_office: 'Çankaya'
  },
  {
    name: 'Mega Plaza AVM',
    email: 'teknik@megaplaza.com',
    phone: '0216 987 65 43',
    company: 'Mega Plaza',
    address: 'Ataşehir, İstanbul',
    tax_number: '9876543210',
    tax_office: 'Ataşehir'
  },
  {
    name: 'Star Hotel',
    email: 'maintenance@starhotel.com',
    phone: '0232 555 66 77',
    company: 'Star Hotel',
    address: 'Alsancak, İzmir',
    tax_number: '5555666677',
    tax_office: 'Konak'
  },
  {
    name: 'Endüstri Fabrika A.Ş.',
    email: 'proje@endustri.com',
    phone: '0262 444 33 22',
    company: 'Endüstri Fabrika',
    address: 'OSB Bölgesi, Kocaeli',
    tax_number: '4444333322',
    tax_office: 'Gebze'
  },
  {
    name: 'Modern Ofis Kompleksi',
    email: 'yonetim@modernofis.com',
    phone: '0312 888 99 00',
    company: 'Modern Ofis',
    address: 'Bilkent, Ankara',
    tax_number: '8888990000',
    tax_office: 'Çankaya'
  }
];

function seedDatabase() {
  try {
    console.log('🔄 Veritabanı seeding başlıyor...');
    console.log('📁 Veritabanı yolu:', dbPath);
    
    // Data klasörünü oluştur
    const fs = require('fs');
    const dataDir = path.dirname(dbPath);
    console.log('📂 Data klasörü:', dataDir);
    
    if (!fs.existsSync(dataDir)) {
      console.log('📁 Data klasörü oluşturuluyor...');
      fs.mkdirSync(dataDir, { recursive: true });
    }

    console.log('🔗 Veritabanı bağlantısı kuruluyor...');
    const db = new Database(dbPath);
    console.log('✅ Veritabanı bağlantısı başarılı');
    
    // Tabloları oluştur
    db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT UNIQUE,
        brand TEXT,
        model TEXT,
        category TEXT,
        price REAL,
        description TEXT,
        specifications TEXT,
        stock_quantity INTEGER DEFAULT 0,
        unit TEXT DEFAULT 'adet',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        company TEXT,
        address TEXT,
        tax_number TEXT,
        tax_office TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        customer_email TEXT,
        customer_phone TEXT,
        company TEXT,
        total_amount REAL DEFAULT 0,
        status TEXT DEFAULT 'draft',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS quote_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quote_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        total_price REAL NOT NULL,
        FOREIGN KEY (quote_id) REFERENCES quotes (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id)
      )
    `);

    // Mevcut verileri temizleme - Devre dışı bırakıldı
    // console.log('🗺️ Mevcut veriler temizleniyor...');
    // db.exec('DELETE FROM quote_items');
    // db.exec('DELETE FROM quotes');
    // db.exec('DELETE FROM products');
    // db.exec('DELETE FROM customers');
    // console.log('✅ Mevcut veriler temizlendi');

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

    console.log('📦 Ürünler ekleniyor...');
    insertManyProducts(sampleProducts);
    console.log('✅ Ürünler eklendi');

    // Müşterileri ekle
    console.log('👥 Müşteriler ekleniyor...');
    const insertCustomer = db.prepare(`
      INSERT OR IGNORE INTO customers (name, email, phone, company, address, tax_number, tax_office)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertManyCustomers = db.transaction((customers) => {
      for (const customer of customers) {
        insertCustomer.run(
          customer.name,
          customer.email,
          customer.phone,
          customer.company,
          customer.address,
          customer.tax_number,
          customer.tax_office
        );
      }
    });

    insertManyCustomers(sampleCustomers);
    console.log('✅ Müşteriler eklendi');

    // Kontrol et
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const customerCount = db.prepare('SELECT COUNT(*) as count FROM customers').get().count;
    
    console.log('✅ Örnek veriler başarıyla eklendi!');
    console.log(`📦 Toplam ${productCount} ürün eklendi`);
    console.log(`👥 Toplam ${customerCount} müşteri eklendi`);
    console.log(`📁 Veritabanı konumu: ${dbPath}`);
    console.log(`📦 ${sampleProducts.length} ürün eklendi`);
    console.log(`👥 ${sampleCustomers.length} müşteri eklendi`);
    
    db.close();
    
  } catch (error) {
    console.error('❌ Veri ekleme hatası:', error);
  }
}

// Script çalıştırıldığında otomatik olarak veri ekle
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };