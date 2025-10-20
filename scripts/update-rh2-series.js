// RH2 serisini tamamen güncelle

const API_BASE = 'http://localhost:3001';

// Yeni RH2 Serisi Ürünleri
const NEW_RH2_PRODUCTS = [
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
  console.log('🔄 RH2 serisi güncelleniyor...\n');
  
  // 1. Mevcut RH2 ürünlerini al
  console.log('📦 Mevcut ürünler alınıyor...');
  const allProducts = await getAllProducts();
  const rh2Products = allProducts.filter(p => p.category === 'REN BOX SERİSİ - RH2');
  
  console.log(`🗑️  ${rh2Products.length} adet RH2 ürünü siliniyor...`);
  
  // 2. Mevcut RH2 ürünlerini sil
  let deletedCount = 0;
  for (const product of rh2Products) {
    const deleted = await deleteProduct(product.id);
    if (deleted) {
      deletedCount++;
      console.log(`✅ Silindi: ${product.name}`);
    } else {
      console.log(`❌ Silinemedi: ${product.name}`);
    }
  }
  
  console.log(`\n🗑️  Toplam ${deletedCount} ürün silindi.\n`);
  
  // 3. Yeni RH2 ürünlerini ekle
  console.log('➕ Yeni RH2 ürünleri ekleniyor...');
  const addResult = await addProducts(NEW_RH2_PRODUCTS);
  
  if (addResult && addResult.summary) {
    console.log(`✅ ${addResult.summary.success} yeni ürün eklendi`);
    if (addResult.summary.errors > 0) {
      console.log(`⚠️  ${addResult.summary.errors} üründe hata oluştu`);
    }
  }
  
  console.log('\n🎉 RH2 serisi başarıyla güncellendi!');
}

main().catch(console.error);