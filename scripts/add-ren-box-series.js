// REN BOX SERİSİ tüm ürünlerini ekleyen script

const API_BASE = 'http://localhost:3001';

// RH1 Serisi Ürünleri
const RH1_PRODUCTS = [
  {
    "name": "RH1-007-130",
    "code": "RH1-007-130",
    "brand": "REN BOX",
    "model": "RH1-007-130",
    "category": "REN BOX SERİSİ - RH1",
    "price": 255.88,
    "description": "Yüzey: 6,5 m2, Boru: 0,60 d3, Kapasite: 2.825 Watt, Fan: 1x300mm, Hava debisi: 1.382 m3/h",
    "specifications": "Boyutlar: 361x801x530mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH1-007-135",
    "code": "RH1-007-135",
    "brand": "REN BOX",
    "model": "RH1-007-135",
    "category": "REN BOX SERİSİ - RH1",
    "price": 255.88,
    "description": "Yüzey: 6,5 m2, Boru: 0,60 d3, Kapasite: 3.615 Watt, Fan: 1x350mm, Hava debisi: 2.170 m3/h",
    "specifications": "Boyutlar: 361x801x530mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH1-007-130 - LG",
    "code": "RH1-007-130-LG",
    "brand": "REN BOX",
    "model": "RH1-007-130 - LG",
    "category": "REN BOX SERİSİ - RH1",
    "price": 258.32,
    "description": "Yüzey: 6,5 m2, Boru: 0,59 d3, Kapasite: 3.380 Watt, Fan: 1x300mm, Hava debisi: 1.312 m3/h",
    "specifications": "Boyutlar: 361x801x530mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH1-007-135 - LG",
    "code": "RH1-007-135-LG",
    "brand": "REN BOX",
    "model": "RH1-007-135 - LG",
    "category": "REN BOX SERİSİ - RH1",
    "price": 258.32,
    "description": "Yüzey: 6,5 m2, Boru: 0,59 d3, Kapasite: 5.040 Watt, Fan: 1x350mm, Hava debisi: 2.020 m3/h",
    "specifications": "Boyutlar: 361x801x530mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH1-010-130",
    "code": "RH1-010-130",
    "brand": "REN BOX",
    "model": "RH1-010-130",
    "category": "REN BOX SERİSİ - RH1",
    "price": 290.76,
    "description": "Yüzey: 9,74 m2, Boru: 0,90 d3, Kapasite: 3.475 Watt, Fan: 1x300mm, Hava debisi: 1.259 m3/h",
    "specifications": "Boyutlar: 361x801x530mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH1-010-135",
    "code": "RH1-010-135",
    "brand": "REN BOX",
    "model": "RH1-010-135",
    "category": "REN BOX SERİSİ - RH1",
    "price": 290.76,
    "description": "Yüzey: 9,74 m2, Boru: 0,90 d3, Kapasite: 4.600 Watt, Fan: 1x350mm, Hava debisi: 1.890 m3/h",
    "specifications": "Boyutlar: 361x801x530mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH1-010-130 - LG",
    "code": "RH1-010-130-LG",
    "brand": "REN BOX",
    "model": "RH1-010-130 - LG",
    "category": "REN BOX SERİSİ - RH1",
    "price": 292.81,
    "description": "Yüzey: 9,74 m2, Boru: 0,88 d3, Kapasite: 4.640 Watt, Fan: 1x300mm, Hava debisi: 1.176 m3/h",
    "specifications": "Boyutlar: 361x801x530mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH1-010-135 - LG",
    "code": "RH1-010-135-LG",
    "brand": "REN BOX",
    "model": "RH1-010-135 - LG",
    "category": "REN BOX SERİSİ - RH1",
    "price": 292.81,
    "description": "Yüzey: 9,74 m2, Boru: 0,88 d3, Kapasite: 6.030 Watt, Fan: 1x350mm, Hava debisi: 1.730 m3/h",
    "specifications": "Boyutlar: 361x801x530mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH1-013-135",
    "code": "RH1-013-135",
    "brand": "REN BOX",
    "model": "RH1-013-135",
    "category": "REN BOX SERİSİ - RH1",
    "price": 315.86,
    "description": "Yüzey: 12,99 m2, Boru: 1,20 d3, Kapasite: 4.975 Watt, Fan: 1x350mm, Hava debisi: 1.685 m3/h",
    "specifications": "Boyutlar: 361x801x530mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH1-013-135 - LG",
    "code": "RH1-013-135-LG",
    "brand": "REN BOX",
    "model": "RH1-013-135 - LG",
    "category": "REN BOX SERİSİ - RH1",
    "price": 334.04,
    "description": "Yüzey: 12,99 m2, Boru: 1,18 d3, Kapasite: 6.580 Watt, Fan: 1x350mm, Hava debisi: 1.517 m3/h",
    "specifications": "Boyutlar: 361x801x530mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  }
];

// RH2 Serisi Ürünleri
const RH2_PRODUCTS = [
  {
    "name": "RH2-007-135-LG",
    "code": "RH2-007-135-LG",
    "brand": "REN BOX",
    "model": "RH2-007-135-LG",
    "category": "REN BOX SERİSİ - RH2",
    "price": 291.49,
    "description": "Yüzey: 7,22 m2, Boru: 0,65 d3, Kapasite: 5.470 Watt, Fan: 1x350mm, Hava debisi: 2.133 m3/h",
    "specifications": "Boyutlar: 360x900x580mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH2-011-130",
    "code": "RH2-011-130",
    "brand": "REN BOX",
    "model": "RH2-011-130",
    "category": "REN BOX SERİSİ - RH2",
    "price": 316.81,
    "description": "Yüzey: 10,83 m2, Boru: 1,00 d3, Kapasite: 3.750 Watt, Fan: 1x300mm, Hava debisi: 1.312 m3/h",
    "specifications": "Boyutlar: 360x900x580mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH2-011-135",
    "code": "RH2-011-135",
    "brand": "REN BOX",
    "model": "RH2-011-135",
    "category": "REN BOX SERİSİ - RH2",
    "price": 316.81,
    "description": "Yüzey: 10,83 m2, Boru: 1,00 d3, Kapasite: 4.950 Watt, Fan: 1x350mm, Hava debisi: 2.013 m3/h",
    "specifications": "Boyutlar: 360x900x580mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH2-011-130-LG",
    "code": "RH2-011-130-LG",
    "brand": "REN BOX",
    "model": "RH2-011-130-LG",
    "category": "REN BOX SERİSİ - RH2",
    "price": 331.96,
    "description": "Yüzey: 10,83 m2, Boru: 0,98 d3, Kapasite: 4.980 Watt, Fan: 1x300mm, Hava debisi: 1.233 m3/h",
    "specifications": "Boyutlar: 360x900x580mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH2-011-135-LG",
    "code": "RH2-011-135-LG",
    "brand": "REN BOX",
    "model": "RH2-011-135-LG",
    "category": "REN BOX SERİSİ - RH2",
    "price": 331.96,
    "description": "Yüzey: 10,83 m2, Boru: 0,98 d3, Kapasite: 6.580 Watt, Fan: 1x350mm, Hava debisi: 1.849 m3/h",
    "specifications": "Boyutlar: 360x900x580mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH2-015-135",
    "code": "RH2-015-135",
    "brand": "REN BOX",
    "model": "RH2-015-135",
    "category": "REN BOX SERİSİ - RH2",
    "price": 359.97,
    "description": "Yüzey: 14,43 m2, Boru: 1,34 d3, Kapasite: 5.475 Watt, Fan: 1x350mm, Hava debisi: 1.808 m3/h",
    "specifications": "Boyutlar: 360x900x580mm, Giriş: 12mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH2-015-140",
    "code": "RH2-015-140",
    "brand": "REN BOX",
    "model": "RH2-015-140",
    "category": "REN BOX SERİSİ - RH2",
    "price": 359.97,
    "description": "Yüzey: 14,43 m2, Boru: 1,34 d3, Kapasite: 5.900 Watt, Fan: 1x400mm, Hava debisi: 2.027 m3/h",
    "specifications": "Boyutlar: 360x900x580mm, Giriş: 12mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH2-015-135-LG",
    "code": "RH2-015-135-LG",
    "brand": "REN BOX",
    "model": "RH2-015-135-LG",
    "category": "REN BOX SERİSİ - RH2",
    "price": 383.71,
    "description": "Yüzey: 14,43 m2, Boru: 1,28 d3, Kapasite: 7.200 Watt, Fan: 1x350mm, Hava debisi: 1.644 m3/h",
    "specifications": "Boyutlar: 360x900x580mm, Giriş: 12mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH2-015-140-LG",
    "code": "RH2-015-140-LG",
    "brand": "REN BOX",
    "model": "RH2-015-140-LG",
    "category": "REN BOX SERİSİ - RH2",
    "price": 383.71,
    "description": "Yüzey: 14,43 m2, Boru: 1,28 d3, Kapasite: 7.670 Watt, Fan: 1x400mm, Hava debisi: 1.794 m3/h",
    "specifications": "Boyutlar: 360x900x580mm, Giriş: 12mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  }
];

async function addProducts(products, seriesName) {
  try {
    console.log(`${seriesName} serisi ekleniyor... (${products.length} ürün)`);
    
    const response = await fetch(`${API_BASE}/api/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${seriesName} başarılı: ${result.summary?.success} ürün eklendi`);
      if (result.summary?.errors > 0) {
        console.log(`⚠️  ${result.summary.errors} üründe hata oluştu`);
      }
    } else {
      console.error(`❌ ${seriesName} hatası:`, result.error);
    }
    
    return result;
  } catch (error) {
    console.error(`❌ ${seriesName} ağ hatası:`, error);
    return null;
  }
}

async function main() {
  console.log('🚀 REN BOX SERİSİ ürünleri ekleniyor...\n');
  
  // RH1 Serisini ekle
  await addProducts(RH1_PRODUCTS, 'RH1');
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniye bekle
  
  // RH2 Serisini ekle
  await addProducts(RH2_PRODUCTS, 'RH2');
  
  console.log('\n✨ İlk 2 seri eklendi! Diğer serileri eklemek için script devam edebilir.');
}

// Script çalıştır
main().catch(console.error);