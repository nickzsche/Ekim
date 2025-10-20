// RH1 serisini tamamen güncelle

const API_BASE = 'http://localhost:3001';

// Yeni RH1 Serisi Ürünleri
const NEW_RH1_PRODUCTS = [
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

async function getAllProducts() {
  try {
    const response = await fetch(`${API_BASE}/api/products`);
    return await response.json();
  } catch (error) {
    console.error('Ürünler alınırken hata:', error);
    return [];
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`${API_BASE}/api/products/${productId}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error(`Ürün silme hatası (ID: ${productId}):`, error);
    return false;
  }
}

async function addProducts(products) {
  try {
    const response = await fetch(`${API_BASE}/api/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    });
    return await response.json();
  } catch (error) {
    console.error('Ürün ekleme hatası:', error);
    return null;
  }
}

async function main() {
  console.log('🔄 RH1 serisi güncelleniyor...\n');
  
  // 1. Mevcut RH1 ürünlerini al
  console.log('📦 Mevcut ürünler alınıyor...');
  const allProducts = await getAllProducts();
  const rh1Products = allProducts.filter(p => p.category === 'REN BOX SERİSİ - RH1');
  
  console.log(`🗑️  ${rh1Products.length} adet RH1 ürünü siliniyor...`);
  
  // 2. Mevcut RH1 ürünlerini sil
  let deletedCount = 0;
  for (const product of rh1Products) {
    const deleted = await deleteProduct(product.id);
    if (deleted) {
      deletedCount++;
      console.log(`✅ Silindi: ${product.name}`);
    } else {
      console.log(`❌ Silinemedi: ${product.name}`);
    }
  }
  
  console.log(`\n🗑️  Toplam ${deletedCount} ürün silindi.\n`);
  
  // 3. Yeni RH1 ürünlerini ekle
  console.log('➕ Yeni RH1 ürünleri ekleniyor...');
  const addResult = await addProducts(NEW_RH1_PRODUCTS);
  
  if (addResult && addResult.summary) {
    console.log(`✅ ${addResult.summary.success} yeni ürün eklendi`);
    if (addResult.summary.errors > 0) {
      console.log(`⚠️  ${addResult.summary.errors} üründe hata oluştu`);
    }
  }
  
  console.log('\n🎉 RH1 serisi başarıyla güncellendi!');
}

main().catch(console.error);