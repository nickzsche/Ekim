const Database = require('better-sqlite3');
const path = require('path');

// Veritabanı yolu
const dbPath = path.join(__dirname, '..', 'data', 'products.db');

// Kullanıcının gönderdiği TÜM RK-S 3/8 ürünleri (orijinal listeden)
const allRKSProducts = [
  // 300 FAN
  { code: 'RK-007-1130-S', price: 143.98 },
  { code: 'RK-010-1130-S', price: 184.11 },
  { code: 'RK-015-1230-S', price: 269.09 },
  { code: 'RK-019-1230-S', price: 337.19 },
  
  // 350 FAN
  { code: 'RK-011-1135-S', price: 228.01 },
  { code: 'RK-015-1135-S', price: 282.98 },
  { code: 'RK-022-1235-S', price: 401.37 },
  { code: 'RK-030-1235-S', price: 521.96 },
  
  // 400 FAN
  { code: 'RK-014-1140-S', price: 285.69 },
  { code: 'RK-019-1140-S', price: 354.94 },
  { code: 'RK-029-1240-S', price: 527.36 },
  { code: 'RK-038-1240-S', price: 659.64 },
  { code: 'RK-043-1340-S', price: 735.90 },
  { code: 'RK-057-1340-S', price: 954.72 },
  { code: 'RK-029-2140-S', price: 568.68 },  // EKSİK - 2x1 serisi
  { code: 'RK-038-2140-S', price: 706.72 },  // EKSİK - 2x1 serisi
  { code: 'RK-076-2240-S', price: 1305.20 }, // EKSİK - 2x2 serisi
  
  // 450 FAN
  { code: 'RK-020-1145-S', price: 411.60 },
  { code: 'RK-027-1145-S', price: 513.01 },
  { code: 'RK-039-1145-S', price: 686.75 },
  { code: 'RK-041-1245-S', price: 759.56 },
  { code: 'RK-054-1245-S', price: 942.67 },
  { code: 'RK-078-1245-S', price: 1301.96 },
  { code: 'RK-061-1345-S', price: 1089.94 }, // EKSİK - 3 fan
  { code: 'RK-081-1345-S', price: 1357.17 },
  { code: 'RK-117-1345-S', price: 1896.94 },
  { code: 'RK-041-2145-S', price: 800.53 },  // EKSİK - 2x1 serisi
  { code: 'RK-054-2145-S', price: 989.41 },  // EKSİK - 2x1 serisi
  { code: 'RK-078-2145-S', price: 1427.51 }, // EKSİK - 2x1 serisi
  { code: 'RK-081-2245-S', price: 1459.23 }, // EKSİK - 2x2 serisi
  { code: 'RK-108-2245-S', price: 1864.69 }, // EKSİK - 2x2 serisi
  { code: 'RK-162-2345-S', price: 2710.63 }, // EKSİK - 2x3 serisi
  
  // 500 FAN
  { code: 'RK-029-1150-S', price: 550.49 },
  { code: 'RK-039-1150-S', price: 713.24 },
  { code: 'RK-049-1150-S', price: 827.19 },
  { code: 'RK-059-1250-S', price: 1052.22 }, // EKSİK - 2 fan
  { code: 'RK-078-1250-S', price: 1327.40 },
  { code: 'RK-097-1250-S', price: 1600.37 }, // EKSİK - 2 fan
  { code: 'RK-088-1350-S', price: 1563.03 }, // EKSİK - 3 fan
  { code: 'RK-117-1350-S', price: 1946.66 },
  { code: 'RK-146-1350-S', price: 2329.84 },
  { code: 'RK-059-2150-S', price: 1178.72 }, // EKSİK - 2x1 serisi
  { code: 'RK-078-2150-S', price: 1451.25 }, // EKSİK - 2x1 serisi
  { code: 'RK-097-2150-S', price: 1744.62 }, // EKSİK - 2x1 serisi
  { code: 'RK-117-2250-S', price: 2147.03 },
  { code: 'RK-156-2250-S', price: 2692.96 }, // EKSİK - 2x2 serisi
  { code: 'RK-195-2250-S', price: 3173.74 },
  { code: 'RK-175-2350-S', price: 3128.87 }, // EKSİK - 2x3 serisi
  { code: 'RK-234-2350-S', price: 3903.36 }
];

function checkMissingProducts() {
  try {
    console.log('🔍 RK-S 3/8 eksik ürünler kontrol ediliyor...');
    
    const db = new Database(dbPath);
    
    // Veritabanındaki RK-S ürünlerini al
    const existingProducts = db.prepare(`
      SELECT code FROM products 
      WHERE category = 'RK-S 3/8 Kondanser'
    `).all();
    
    const existingCodes = existingProducts.map(p => p.code);
    
    console.log(`\n📊 DURUM RAPORU:`);
    console.log(`Gönderilen toplam ürün: ${allRKSProducts.length}`);
    console.log(`Veritabanında bulunan: ${existingCodes.length}`);
    console.log(`Eksik ürün sayısı: ${allRKSProducts.length - existingCodes.length}`);
    
    // Eksik ürünleri bul
    const missingProducts = allRKSProducts.filter(product => 
      !existingCodes.includes(product.code)
    );
    
    if (missingProducts.length > 0) {
      console.log(`\n❌ EKSİK ÜRÜNLER (${missingProducts.length} adet):`);
      missingProducts.forEach((product, index) => {
        console.log(`${index + 1}. ${product.code} - €${product.price}`);
      });
      
      // Eksik ürünleri kategorilere göre grupla
      const missing400 = missingProducts.filter(p => p.code.includes('140') || p.code.includes('240'));
      const missing450 = missingProducts.filter(p => p.code.includes('145') || p.code.includes('245') || p.code.includes('345'));
      const missing500 = missingProducts.filter(p => p.code.includes('150') || p.code.includes('250') || p.code.includes('350'));
      
      console.log(`\n📂 EKSİK ÜRÜN KATEGORİLERİ:`);
      console.log(`400 Fan serisi: ${missing400.length} ürün`);
      console.log(`450 Fan serisi: ${missing450.length} ürün`);
      console.log(`500 Fan serisi: ${missing500.length} ürün`);
      
      // 2x serileri (çift katlı)
      const missing2x = missingProducts.filter(p => p.code.includes('2'));
      console.log(`Çift katlı (2x) seriler: ${missing2x.length} ürün`);
      
    } else {
      console.log('\n✅ Tüm ürünler eklenmiş!');
    }
    
    db.close();
    
  } catch (error) {
    console.error('❌ Kontrol hatası:', error);
  }
}

// Script çalıştırıldığında kontrol et
if (require.main === module) {
  checkMissingProducts();
}

module.exports = { checkMissingProducts, allRKSProducts };