const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// REN-STTK ÜST (TOP) SOĞUTUCU products data (complete series)
const renSttkUstProducts = [
  {
    name: "REN-STTK ÜST 56x48",
    code: "REN-STTK-UST-56X48",
    brand: "REN-STTK",
    model: "REN-STTK ÜST 56x48",
    category: "REN-STTK ÜST (TOP) SOĞUTUCU",
    price: 9.25,
    description: "REN-STTK Top Cooler - 56x48mm Dimensions",
    specifications: "Connection: 1/2 | Dimensions: 56x48mm | Thickness: 7-10mm | Type: Top Cooler",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN-STTK ÜST 40x35",
    code: "REN-STTK-UST-40X35",
    brand: "REN-STTK",
    model: "REN-STTK ÜST 40x35",
    category: "REN-STTK ÜST (TOP) SOĞUTUCU",
    price: 9.25,
    description: "REN-STTK Top Cooler - 40x35mm Dimensions",
    specifications: "Connection: 1/2 | Dimensions: 40x35mm | Thickness: 7-10mm | Type: Top Cooler",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRenSttkUstProducts() {
  try {
    console.log('🔄 Starting REN-STTK ÜST (TOP) SOĞUTUCU addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(renSttkUstProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ REN-STTK ÜST (TOP) SOĞUTUCU addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete REN-STTK ÜST addition finished! Total: 2 products');
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add REN-STTK ÜST products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRenSttkUstProducts();