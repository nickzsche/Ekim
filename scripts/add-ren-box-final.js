// REN BOX SERİSİ - Final Part (RH6, RH7)

const API_BASE = 'http://localhost:3001';

// RH6 Serisi (sadece ilk yarısı)
const RH6_PART1_PRODUCTS = [
  {
    "name": "RH6-057-435-LG",
    "code": "RH6-057-435-LG",
    "brand": "REN BOX",
    "model": "RH6-057-435-LG",
    "category": "REN BOX SERİSİ - RH6",
    "price": 1713.23,
    "description": "Yüzey: 56,91 m2, Boru: 5,07 d3, Kapasite: 32.580 Watt, Fan: 4x350mm, Hava debisi: 10.694 m3/h",
    "specifications": "Boyutlar: 526x2300x1232mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH6-057-440-LG",
    "code": "RH6-057-440-LG",
    "brand": "REN BOX",
    "model": "RH6-057-440-LG",
    "category": "REN BOX SERİSİ - RH6",
    "price": 1713.23,
    "description": "Yüzey: 56,91 m2, Boru: 5,07 d3, Kapasite: 38.220 Watt, Fan: 4x400mm, Hava debisi: 13.795 m3/h",
    "specifications": "Boyutlar: 526x2300x1232mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH6-057-445-LG",
    "code": "RH6-057-445-LG",
    "brand": "REN BOX",
    "model": "RH6-057-445-LG",
    "category": "REN BOX SERİSİ - RH6",
    "price": 1713.23,
    "description": "Yüzey: 56,91 m2, Boru: 5,07 d3, Kapasite: 43.860 Watt, Fan: 4x450mm, Hava debisi: 17.387 m3/h",
    "specifications": "Boyutlar: 526x2300x1232mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH6-057-450-LG",
    "code": "RH6-057-450-LG",
    "brand": "REN BOX",
    "model": "RH6-057-450-LG",
    "category": "REN BOX SERİSİ - RH6",
    "price": 1713.23,
    "description": "Yüzey: 56,91 m2, Boru: 5,07 d3, Kapasite: 52.820 Watt, Fan: 4x450mm, Hava debisi: 24.170 m3/h",
    "specifications": "Boyutlar: 526x2300x1232mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH6-085-445",
    "code": "RH6-085-445",
    "brand": "REN BOX",
    "model": "RH6-085-445",
    "category": "REN BOX SERİSİ - RH6",
    "price": 1913.26,
    "description": "Yüzey: 85,36 m2, Boru: 7,91 d3, Kapasite: 41.425 Watt, Fan: 4x450mm, Hava debisi: 16.635 m3/h",
    "specifications": "Boyutlar: 526x2300x1232mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH6-085-450",
    "code": "RH6-085-450",
    "brand": "REN BOX",
    "model": "RH6-085-450",
    "category": "REN BOX SERİSİ - RH6",
    "price": 1913.26,
    "description": "Yüzey: 85,36 m2, Boru: 7,91 d3, Kapasite: 49.850 Watt, Fan: 4x500mm, Hava debisi: 22.345 m3/h",
    "specifications": "Boyutlar: 526x2300x1232mm, Giriş: 28mm, Çıkış: 22mm",
    "stock_quantity": 0,
    "unit": "adet"
  }
];

// RH7 Serisi
const RH7_PRODUCTS = [
  {
    "name": "RH7-038-245-LG",
    "code": "RH7-038-245-LG",
    "brand": "REN BOX",
    "model": "RH7-038-245-LG",
    "category": "REN BOX SERİSİ - RH7",
    "price": 1343.72,
    "description": "Yüzey: 37,94 m2, Boru: 3,31 d3, Kapasite: 25.770 Watt, Fan: 2x450mm, Hava debisi: 9.495 m3/h",
    "specifications": "Boyutlar: 600x1800x1282mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH7-038-250-LG",
    "code": "RH7-038-250-LG",
    "brand": "REN BOX",
    "model": "RH7-038-250-LG",
    "category": "REN BOX SERİSİ - RH7",
    "price": 1343.72,
    "description": "Yüzey: 37,94 m2, Boru: 3,31 d3, Kapasite: 31.800 Watt, Fan: 2x500mm, Hava debisi: 13.600 m3/h",
    "specifications": "Boyutlar: 600x1800x1282mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH7-057-250",
    "code": "RH7-057-250",
    "brand": "REN BOX",
    "model": "RH7-057-250",
    "category": "REN BOX SERİSİ - RH7",
    "price": 1466.98,
    "description": "Yüzey: 56,91 m2, Boru: 5,05 d3, Kapasite: 31.142 Watt, Fan: 2x500mm, Hava debisi: 12.920 m3/h",
    "specifications": "Boyutlar: 600x1800x1282mm, Giriş: 22mm, Çıkış: 19mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH7-057-250-LG",
    "code": "RH7-057-250-LG",
    "brand": "REN BOX",
    "model": "RH7-057-250-LG",
    "category": "REN BOX SERİSİ - RH7",
    "price": 1506.92,
    "description": "Yüzey: 56,91 m2, Boru: 4,89 d3, Kapasite: 40.320 Watt, Fan: 2x500mm, Hava debisi: 12.250 m3/h",
    "specifications": "Boyutlar: 600x1800x1282mm, Giriş: 28mm, Çıkış: 22mm",
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
  console.log('🚀 REN BOX SERİSİ - Final Part ekleniyor...\n');
  
  await addProducts(RH6_PART1_PRODUCTS, 'RH6 Part 1');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await addProducts(RH7_PRODUCTS, 'RH7');
  
  console.log('\n✨ Final part eklendi!');
}

main().catch(console.error);