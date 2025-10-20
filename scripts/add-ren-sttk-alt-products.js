const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// REN-STTK ALT (LOWER) SOĞUTUCU products data (complete series)
const renSttkAltProducts = [
  {
    name: "REN-STTK ALT 56x48",
    code: "REN-STTK-ALT-56X48",
    brand: "REN-STTK",
    model: "REN-STTK ALT 56x48",
    category: "REN-STTK ALT (LOWER) SOĞUTUCU",
    price: 9.25,
    description: "REN-STTK Lower Cooler - 56x48mm Dimensions",
    specifications: "Connection: 1/2 | Dimensions: 56x48mm | Thickness: 7-10mm | Type: Lower Cooler",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN-STTK ALT 40x35",
    code: "REN-STTK-ALT-40X35",
    brand: "REN-STTK",
    model: "REN-STTK ALT 40x35",
    category: "REN-STTK ALT (LOWER) SOĞUTUCU",
    price: 9.25,
    description: "REN-STTK Lower Cooler - 40x35mm Dimensions",
    specifications: "Connection: 1/2 | Dimensions: 40x35mm | Thickness: 7-10mm | Type: Lower Cooler",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRenSttkAltProducts() {
  try {
    console.log('🔄 Starting REN-STTK ALT (LOWER) SOĞUTUCU addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(renSttkAltProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ REN-STTK ALT (LOWER) SOĞUTUCU addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete REN-STTK ALT addition finished! Total: 2 products');
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add REN-STTK ALT products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRenSttkAltProducts();