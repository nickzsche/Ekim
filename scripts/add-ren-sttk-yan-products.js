const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// REN-STTK YAN (SIDE) SOĞUTUCU products data (complete series)
const renSttkYanProducts = [
  {
    name: "REN-STTK YAN 56x48",
    code: "REN-STTK-YAN-56X48",
    brand: "REN-STTK",
    model: "REN-STTK YAN 56x48",
    category: "REN-STTK YAN (SIDE) SOĞUTUCU",
    price: 9.25,
    description: "REN-STTK Side Cooler - 56x48mm Dimensions",
    specifications: "Connection: 1/2 | Dimensions: 56x48mm | Thickness: 7-10mm | Type: Side Cooler",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN-STTK YAN 40x35",
    code: "REN-STTK-YAN-40X35",
    brand: "REN-STTK",
    model: "REN-STTK YAN 40x35",
    category: "REN-STTK YAN (SIDE) SOĞUTUCU",
    price: 9.25,
    description: "REN-STTK Side Cooler - 40x35mm Dimensions",
    specifications: "Connection: 1/2 | Dimensions: 40x35mm | Thickness: 7-10mm | Type: Side Cooler",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRenSttkYanProducts() {
  try {
    console.log('🔄 Starting REN-STTK YAN (SIDE) SOĞUTUCU addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(renSttkYanProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ REN-STTK YAN (SIDE) SOĞUTUCU addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete REN-STTK YAN addition finished! Total: 2 products');
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add REN-STTK YAN products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRenSttkYanProducts();