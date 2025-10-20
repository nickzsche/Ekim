const API_BASE = 'http://localhost:3001/api';

async function getCurrentSummary() {
  try {
    console.log('📊 Fetching current product summary...');
    
    const response = await fetch(`${API_BASE}/products`);
    const products = await response.json();
    
    console.log(`\n📈 Total Products: ${products.length}`);
    
    // Group by category
    const categoryCount = {};
    products.forEach(product => {
      const category = product.category || 'Uncategorized';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    
    console.log('\n📋 Products by Category:');
    Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .forEach(([category, count]) => {
        console.log(`   ${category}: ${count} products`);
      });
    
    // Show RCS specifically
    const rcsProducts = products.filter(p => p.category === 'RCS 8MM EVAPORATÖR SERİSİ');
    console.log(`\n🆕 RCS 8MM EVAPORATÖR SERİSİ: ${rcsProducts.length} products`);
    
  } catch (error) {
    console.error('❌ Failed to fetch summary:', error.message);
  }
}

getCurrentSummary();