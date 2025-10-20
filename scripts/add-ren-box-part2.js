// REN BOX SERİSİ - Kalan Seriler (RH3, RH4, RH5, RH6, RH7)

const API_BASE = 'http://localhost:3001';

// RH3 Serisi
const RH3_PRODUCTS = [
  {
    "name": "RH3-011-140",
    "code": "RH3-011-140",
    "brand": "REN BOX",
    "model": "RH3-011-140",
    "category": "REN BOX SERİSİ - RH3",
    "price": 348.93,
    "description": "Yüzey: 11,13 m2, Boru: 1,03 d3, Kapasite: 5.808 Watt, Fan: 1x400mm, Hava debisi: 3.357 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 10mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-011-145",
    "code": "RH3-011-145",
    "brand": "REN BOX",
    "model": "RH3-011-145",
    "category": "REN BOX SERİSİ - RH3",
    "price": 348.93,
    "description": "Yüzey: 11,13 m2, Boru: 1,03 d3, Kapasite: 6.542 Watt, Fan: 1x450mm, Hava debisi: 4.177 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 12mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-011-140-LG",
    "code": "RH3-011-140-LG",
    "brand": "REN BOX",
    "model": "RH3-011-140-LG",
    "category": "REN BOX SERİSİ - RH3",
    "price": 359.02,
    "description": "Yüzey: 11,13 m2, Boru: 1,01 d3, Kapasite: 8.270 Watt, Fan: 1x400mm, Hava debisi: 3.177 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-011-145-LG",
    "code": "RH3-011-145-LG",
    "brand": "REN BOX",
    "model": "RH3-011-145-LG",
    "category": "REN BOX SERİSİ - RH3",
    "price": 359.02,
    "description": "Yüzey: 11,13 m2, Boru: 1,01 d3, Kapasite: 9.330 Watt, Fan: 1x450mm, Hava debisi: 3.908 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-017-140",
    "code": "RH3-017-140",
    "brand": "REN BOX",
    "model": "RH3-017-140",
    "category": "REN BOX SERİSİ - RH3",
    "price": 413.36,
    "description": "Yüzey: 16,7 m2, Boru: 1,55 d3, Kapasite: 7.225 Watt, Fan: 1x400mm, Hava debisi: 3.031 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 12mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-017-145",
    "code": "RH3-017-145",
    "brand": "REN BOX",
    "model": "RH3-017-145",
    "category": "REN BOX SERİSİ - RH3",
    "price": 413.36,
    "description": "Yüzey: 16,7 m2, Boru: 1,55 d3, Kapasite: 8.150 Watt, Fan: 1x450mm, Hava debisi: 3.683 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 12mm, Çıkış: 10mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-017-140-LG",
    "code": "RH3-017-140-LG",
    "brand": "REN BOX",
    "model": "RH3-017-140-LG",
    "category": "REN BOX SERİSİ - RH3",
    "price": 436.09,
    "description": "Yüzey: 16,7 m2, Boru: 1,52 d3, Kapasite: 10.130 Watt, Fan: 1x400mm, Hava debisi: 2.813 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-017-145-LG",
    "code": "RH3-017-145-LG",
    "brand": "REN BOX",
    "model": "RH3-017-145-LG",
    "category": "REN BOX SERİSİ - RH3",
    "price": 436.09,
    "description": "Yüzey: 16,7 m2, Boru: 1,52 d3, Kapasite: 11.410 Watt, Fan: 1x450mm, Hava debisi: 3.370 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-022-140",
    "code": "RH3-022-140",
    "brand": "REN BOX",
    "model": "RH3-022-140",
    "category": "REN BOX SERİSİ - RH3",
    "price": 467.31,
    "description": "Yüzey: 22,27 m2, Boru: 2,06 d3, Kapasite: 8.425 Watt, Fan: 1x400mm, Hava debisi: 2.760 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-022-145",
    "code": "RH3-022-145",
    "brand": "REN BOX",
    "model": "RH3-022-145",
    "category": "REN BOX SERİSİ - RH3",
    "price": 467.31,
    "description": "Yüzey: 22,27 m2, Boru: 2,06 d3, Kapasite: 9.475 Watt, Fan: 1x450mm, Hava debisi: 3.283 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-022-140-LG",
    "code": "RH3-022-140-LG",
    "brand": "REN BOX",
    "model": "RH3-022-140-LG",
    "category": "REN BOX SERİSİ - RH3",
    "price": 514.80,
    "description": "Yüzey: 22,27 m2, Boru: 2,03 d3, Kapasite: 10.950 Watt, Fan: 1x400mm, Hava debisi: 2.527 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH3-022-145-LG",
    "code": "RH3-022-145-LG",
    "brand": "REN BOX",
    "model": "RH3-022-145-LG",
    "category": "REN BOX SERİSİ - RH3",
    "price": 514.80,
    "description": "Yüzey: 22,7 m2, Boru: 2,03 d3, Kapasite: 12.240 Watt, Fan: 1x450mm, Hava debisi: 2.951 m3/h",
    "specifications": "Boyutlar: 370x1000x680mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  }
];

// RH4 Serisi
const RH4_PRODUCTS = [
  {
    "name": "RH4-018-140-LG",
    "code": "RH4-018-140-LG",
    "brand": "REN BOX",
    "model": "RH4-018-140-LG",
    "category": "REN BOX SERİSİ - RH4",
    "price": 542.52,
    "description": "Yüzey: 18,14 m2, Boru: 1,55 d3, Kapasite: 10.790 Watt, Fan: 1x400mm, Hava debisi: 3.648 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-018-145-LG",
    "code": "RH4-018-145-LG",
    "brand": "REN BOX",
    "model": "RH4-018-145-LG",
    "category": "REN BOX SERİSİ - RH4",
    "price": 542.52,
    "description": "Yüzey: 18,14 m2, Boru: 1,55 d3, Kapasite: 12.610 Watt, Fan: 1x450mm, Hava debisi: 4.698 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-027-140",
    "code": "RH4-027-140",
    "brand": "REN BOX",
    "model": "RH4-027-140",
    "category": "REN BOX SERİSİ - RH4",
    "price": 621.69,
    "description": "Yüzey: 27,22 m2, Boru: 2,52 d3, Kapasite: 9.602 Watt, Fan: 1x400mm, Hava debisi: 3.570 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-027-145",
    "code": "RH4-027-145",
    "brand": "REN BOX",
    "model": "RH4-027-145",
    "category": "REN BOX SERİSİ - RH4",
    "price": 621.69,
    "description": "Yüzey: 27,22 m2, Boru: 2,52 d3, Kapasite: 11.600 Watt, Fan: 1x450mm, Hava debisi: 4.553 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-027-150",
    "code": "RH4-027-150",
    "brand": "REN BOX",
    "model": "RH4-027-150",
    "category": "REN BOX SERİSİ - RH4",
    "price": 621.69,
    "description": "Yüzey: 27,22 m2, Boru: 2,52 d3, Kapasite: 14.225 Watt, Fan: 1x500mm, Hava debisi: 6.342 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 16mm, Çıkış: 12mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-027-140-LG",
    "code": "RH4-027-140-LG",
    "brand": "REN BOX",
    "model": "RH4-027-140-LG",
    "category": "REN BOX SERİSİ - RH4",
    "price": 657.56,
    "description": "Yüzey: 27,22 m2, Boru: 2,48 d3, Kapasite: 13.350 Watt, Fan: 1x400mm, Hava debisi: 3.420 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-027-145-LG",
    "code": "RH4-027-145-LG",
    "brand": "REN BOX",
    "model": "RH4-027-145-LG",
    "category": "REN BOX SERİSİ - RH4",
    "price": 657.56,
    "description": "Yüzey: 27,22 m2, Boru: 2,48 d3, Kapasite: 15.660 Watt, Fan: 1x450mm, Hava debisi: 4.315 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-027-150-LG",
    "code": "RH4-027-150-LG",
    "brand": "REN BOX",
    "model": "RH4-027-150-LG",
    "category": "REN BOX SERİSİ - RH4",
    "price": 657.56,
    "description": "Yüzey: 27,22 m2, Boru: 2,48 d3, Kapasite: 19.410 Watt, Fan: 1x500mm, Hava debisi: 6.001 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-036-145",
    "code": "RH4-036-145",
    "brand": "REN BOX",
    "model": "RH4-036-145",
    "category": "REN BOX SERİSİ - RH4",
    "price": 732.18,
    "description": "Yüzey: 36,29 m2, Boru: 3,36 d3, Kapasite: 13.550 Watt, Fan: 1x450mm, Hava debisi: 4.262 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-036-150",
    "code": "RH4-036-150",
    "brand": "REN BOX",
    "model": "RH4-036-150",
    "category": "REN BOX SERİSİ - RH4",
    "price": 732.18,
    "description": "Yüzey: 36,29 m2, Boru: 3,36 d3, Kapasite: 16.650 Watt, Fan: 1x500mm, Hava debisi: 5.791 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-036-145-LG",
    "code": "RH4-036-145-LG",
    "brand": "REN BOX",
    "model": "RH4-036-145-LG",
    "category": "REN BOX SERİSİ - RH4",
    "price": 779.66,
    "description": "Yüzey: 36,29 m2, Boru: 3,31 d3, Kapasite: 17.620 Watt, Fan: 1x450mm, Hava debisi: 3.996 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 19mm, Çıkış: 16mm",
    "stock_quantity": 0,
    "unit": "adet"
  },
  {
    "name": "RH4-036-150-LG",
    "code": "RH4-036-150-LG",
    "brand": "REN BOX",
    "model": "RH4-036-150-LG",
    "category": "REN BOX SERİSİ - RH4",
    "price": 779.66,
    "description": "Yüzey: 36,29 m2, Boru: 3,31 d3, Kapasite: 22.000 Watt, Fan: 1x500mm, Hava debisi: 5.450 m3/h",
    "specifications": "Boyutlar: 380x1180x880mm, Giriş: 19mm, Çıkış: 16mm",
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
  console.log('🚀 REN BOX SERİSİ - Kalan seriler ekleniyor...\n');
  
  // RH3 Serisini ekle
  await addProducts(RH3_PRODUCTS, 'RH3');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // RH4 Serisini ekle
  await addProducts(RH4_PRODUCTS, 'RH4');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('\n✨ RH3 ve RH4 serileri eklendi!');
}

main().catch(console.error);