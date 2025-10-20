// REN BOX SERİSİ - Son seriler (RH5, RH6, RH7)

const API_BASE = 'http://localhost:3001';

// RH5 Serisi (Standard modeller)
const RH5_STANDARD_PRODUCTS = [
  {
    "name": "RH5-029-240",
    "code": "RH5-029-240",
    "brand": "REN BOX",
    "model": "RH5-029-240",
    "category": "REN BOX SERİSİ - RH5",
    "price": 832.21,
    "description": "Yüzey: 28,45 m2, Boru: 2,58 d3, Kapasite: 13.187 Watt, Fan: 2x400mm, Hava debisi: 7.189 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-029-245",
    "code": "RH5-029-245",
    "brand": "REN BOX",
    "model": "RH5-029-245",
    "category": "REN BOX SERİSİ - RH5",
    "price": 832.21,
    "description": "Yüzey: 28,45 m2, Boru: 2,58 d3, Kapasite: 15.184 Watt, Fan: 2x450mm, Hava debisi: 9.163 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-029-240-LG",
    "code": "RH5-029-240-LG",
    "brand": "REN BOX",
    "model": "RH5-029-240-LG",
    "category": "REN BOX SERİSİ - RH5",
    "price": 848.55,
    "description": "Yüzey: 28,45 m2, Boru: 2,53 d3, Kapasite: 18.900 Watt, Fan: 2x400mm, Hava debisi: 6.898 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-029-245-LG",
    "code": "RH5-029-245-LG",
    "brand": "REN BOX",
    "model": "RH5-029-245-LG",
    "category": "REN BOX SERİSİ - RH5",
    "price": 848.44,
    "description": "Yüzey: 28,45 m2, Boru: 2,53 d3, Kapasite: 21.720 Watt, Fan: 2x450mm, Hava debisi: 8.706 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-043-240",
    "code": "RH5-043-240",
    "brand": "REN BOX",
    "model": "RH5-043-240",
    "category": "REN BOX SERİSİ - RH5",
    "price": 935.99,
    "description": "Yüzey: 42,68 m2, Boru: 3,78 d3, Kapasite: 17.050 Watt, Fan: 2x400mm, Hava debisi: 6.675 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-043-245",
    "code": "RH5-043-245",
    "brand": "REN BOX",
    "model": "RH5-043-245",
    "category": "REN BOX SERİSİ - RH5",
    "price": 935.99,
    "description": "Yüzey: 42,68 m2, Boru: 3,78 d3, Kapasite: 19.575 Watt, Fan: 2x450mm, Hava debisi: 8.318 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-043-250",
    "code": "RH5-043-250",
    "brand": "REN BOX",
    "model": "RH5-043-250",
    "category": "REN BOX SERİSİ - RH5",
    "price": 935.99,
    "description": "Yüzey: 42,68 m2, Boru: 3,78 d3, Kapasite: 23.600 Watt, Fan: 2x500mm, Hava debisi: 11.173 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-043-240-LG",
    "code": "RH5-043-240-LG",
    "brand": "REN BOX",
    "model": "RH5-043-240-LG",
    "category": "REN BOX SERİSİ - RH5",
    "price": 970.69,
    "description": "Yüzey: 42,68 m2, Boru: 3,72 d3, Kapasite: 23.520 Watt, Fan: 2x400mm, Hava debisi: 6.315 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-043-245-LG",
    "code": "RH5-043-245-LG",
    "brand": "REN BOX",
    "model": "RH5-043-245-LG",
    "category": "REN BOX SERİSİ - RH5",
    "price": 970.69,
    "description": "Yüzey: 42,68 m2, Boru: 3,72 d3, Kapasite: 27.010 Watt, Fan: 2x450mm, Hava debisi: 7.767 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-043-250-LG",
    "code": "RH5-043-250-LG",
    "brand": "REN BOX",
    "model": "RH5-043-250-LG",
    "category": "REN BOX SERİSİ - RH5",
    "price": 970.69,
    "description": "Yüzey: 42,68 m2, Boru: 3,72 d3, Kapasite: 32.710 Watt, Fan: 2x500mm, Hava debisi: 10.497 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-057-240",
    "code": "RH5-057-240",
    "brand": "REN BOX",
    "model": "RH5-057-240",
    "category": "REN BOX SERİSİ - RH5",
    "price": 1101.96,
    "description": "Yüzey: 56,91 m2, Boru: 5,22 d3, Kapasite: 20.100 Watt, Fan: 2x400mm, Hava debisi: 6.228 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-057-245",
    "code": "RH5-057-245",
    "brand": "REN BOX",
    "model": "RH5-057-245",
    "category": "REN BOX SERİSİ - RH5",
    "price": 1101.96,
    "description": "Yüzey: 56,91 m2, Boru: 5,22 d3, Kapasite: 23.125 Watt, Fan: 2x450mm, Hava debisi: 7.630 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-057-250",
    "code": "RH5-057-250",
    "brand": "REN BOX",
    "model": "RH5-057-250",
    "category": "REN BOX SERİSİ - RH5",
    "price": 1101.96,
    "description": "Yüzey: 56,91 m2, Boru: 5,22 d3, Kapasite: 28.125 Watt, Fan: 2x500mm, Hava debisi: 10.007 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-057-240-LG",
    "code": "RH5-057-240-LG",
    "brand": "REN BOX",
    "model": "RH5-057-240-LG",
    "category": "REN BOX SERİSİ - RH5",
    "price": 1175.22,
    "description": "Yüzey: 56,91 m2, Boru: 5,13 d3, Kapasite: 26.060 Watt, Fan: 2x400mm, Hava debisi: 5.810 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-057-245-LG",
    "code": "RH5-057-245-LG",
    "brand": "REN BOX",
    "model": "RH5-057-245-LG",
    "category": "REN BOX SERİSİ - RH5",
    "price": 1175.22,
    "description": "Yüzey: 56,91 m2, Boru: 5,13 d3, Kapasite: 29.960 Watt, Fan: 2x450mm, Hava debisi: 7.028 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-057-250-LG",
    "code": "RH5-057-250-LG",
    "brand": "REN BOX",
    "model": "RH5-057-250-LG",
    "category": "REN BOX SERİSİ - RH5",
    "price": 1175.22,
    "description": "Yüzey: 56,91 m2, Boru: 5,13 d3, Kapasite: 36.450 Watt, Fan: 2x500mm, Hava debisi: 9.294 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-071-245",
    "code": "RH5-071-245",
    "brand": "REN BOX",
    "model": "RH5-071-245",
    "category": "REN BOX SERİSİ - RH5",
    "price": 1252.95,
    "description": "Yüzey: 71,14 m2, Boru: 6,42 d3, Kapasite: 25.350 Watt, Fan: 2x450mm, Hava debisi: 7.053 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-071-250",
    "code": "RH5-071-250",
    "brand": "REN BOX",
    "model": "RH5-071-250",
    "category": "REN BOX SERİSİ - RH5",
    "price": 1252.95,
    "description": "Yüzey: 71,14 m2, Boru: 6,42 d3, Kapasite: 29.690 Watt, Fan: 2x500mm, Hava debisi: 9.377 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-071-245-LG",
    "code": "RH5-071-245-LG",
    "brand": "REN BOX",
    "model": "RH5-071-245-LG",
    "category": "REN BOX SERİSİ - RH5",
    "price": 1342.87,
    "description": "Yüzey: 71,14 m2, Boru: 6,32 d3, Kapasite: 31.140 Watt, Fan: 2x450mm, Hava debisi: 6.402 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-071-250-LG",
    "code": "RH5-071-250-LG",
    "brand": "REN BOX",
    "model": "RH5-071-250-LG",
    "category": "REN BOX SERİSİ - RH5",
    "price": 1342.87,
    "description": "Yüzey: 71,14 m2, Boru: 6,32 d3, Kapasite: 38.120 Watt, Fan: 2x500mm, Hava debisi: 8.358 m3/h",
    "specifications": "Boyutlar: 400x1280x1231mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  }
];

// RH5 PLUS Serisi
const RH5_PLUS_PRODUCTS = [
  {
    "name": "RH5-029-240 PLUS",
    "code": "RH5-029-240-PLUS",
    "brand": "REN BOX",
    "model": "RH5-029-240 PLUS",
    "category": "REN BOX SERİSİ - RH5 PLUS",
    "price": 947.16,
    "description": "Yüzey: 28,45 m2, Boru: 2,58 d3, Kapasite: 13.187 Watt, Fan: 2x400mm, Hava debisi: 7.189 m3/h",
    "specifications": "Boyutlar: 526x1460x1237mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-029-245 PLUS",
    "code": "RH5-029-245-PLUS",
    "brand": "REN BOX",
    "model": "RH5-029-245 PLUS",
    "category": "REN BOX SERİSİ - RH5 PLUS",
    "price": 947.16,
    "description": "Yüzey: 28,45 m2, Boru: 2,58 d3, Kapasite: 15.184 Watt, Fan: 2x450mm, Hava debisi: 9.163 m3/h",
    "specifications": "Boyutlar: 526x1460x1237mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-029-240-LG PLUS",
    "code": "RH5-029-240-LG-PLUS",
    "brand": "REN BOX",
    "model": "RH5-029-240-LG PLUS",
    "category": "REN BOX SERİSİ - RH5 PLUS",
    "price": 960.25,
    "description": "Yüzey: 28,45 m2, Boru: 2,53 d3, Kapasite: 18.900 Watt, Fan: 2x400mm, Hava debisi: 6.898 m3/h",
    "specifications": "Boyutlar: 526x1460x1237mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH5-029-245-LG PLUS",
    "code": "RH5-029-245-LG-PLUS",
    "brand": "REN BOX",
    "model": "RH5-029-245-LG PLUS",
    "category": "REN BOX SERİSİ - RH5 PLUS",
    "price": 960.25,
    "description": "Yüzey: 28,45 m2, Boru: 2,53 d3, Kapasite: 21.720 Watt, Fan: 2x450mm, Hava debisi: 8.706 m3/h",
    "specifications": "Boyutlar: 526x1460x1237mm, Giriş: 19mm, Çıkış: 16mm",
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
  console.log('🚀 REN BOX SERİSİ - RH5 Standard ve PLUS serileri ekleniyor...\n');
  
  // RH5 Standard Serisini ekle
  await addProducts(RH5_STANDARD_PRODUCTS, 'RH5 Standard');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // RH5 PLUS Serisini ekle
  await addProducts(RH5_PLUS_PRODUCTS, 'RH5 PLUS');
  
  console.log('\n✨ RH5 Standard ve PLUS serileri eklendi!');
}

main().catch(console.error);