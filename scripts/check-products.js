// Ürün sayısını kontrol eden script

const API_BASE = 'http://localhost:3001';

async function checkProducts() {
  try {
    const response = await fetch(`${API_BASE}/api/products`);
    const products = await response.json();
    
    const renBoxProducts = products.filter(p => p.brand === 'REN BOX');
    const categories = {};
    
    renBoxProducts.forEach(p => {
      if (!categories[p.category]) categories[p.category] = 0;
      categories[p.category]++;
    });
    
    console.log('🎉 REN BOX SERİSİ ÜRÜN ÖZETİ:');
    console.log('=====================================');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`📦 ${cat}: ${count} ürün`);
    });
    console.log('=====================================');
    console.log(`🔢 TOPLAM REN BOX ÜRÜN SAYISI: ${renBoxProducts.length}`);
    console.log(`📊 GENEL TOPLAM ÜRÜN SAYISI: ${products.length}`);
    
  } catch (error) {
    console.error('Hata:', error);
  }
}

checkProducts();