const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RH5 Series products data
const rh5Products = [
  {
    name: "RH5-029-240 PLUS",
    code: "RH5-029-240-PLUS",
    brand: "REN BOX",
    model: "RH5-029-240 PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 947.16,
    description: "RH5 Series PLUS - 28,45 kW Cooling Capacity",
    specifications: "Cooling: 28,45 kW | Heating: 2,58 kW | Capacity: 13.187 | Phases: 2 | Voltage: 400V | Current: 7.189A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-029-245 PLUS",
    code: "RH5-029-245-PLUS",
    brand: "REN BOX",
    model: "RH5-029-245 PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 947.16,
    description: "RH5 Series PLUS - 28,45 kW Cooling Capacity",
    specifications: "Cooling: 28,45 kW | Heating: 2,58 kW | Capacity: 15.184 | Phases: 2 | Voltage: 450V | Current: 9.163A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-029-240-LG PLUS",
    code: "RH5-029-240-LG-PLUS",
    brand: "REN BOX",
    model: "RH5-029-240-LG PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 960.25,
    description: "RH5 Series LG PLUS - 28,45 kW Cooling Capacity",
    specifications: "Cooling: 28,45 kW | Heating: 2,53 kW | Capacity: 18.900 | Phases: 2 | Voltage: 400V | Current: 6.898A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-029-245-LG PLUS",
    code: "RH5-029-245-LG-PLUS",
    brand: "REN BOX",
    model: "RH5-029-245-LG PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 960.25,
    description: "RH5 Series LG PLUS - 28,45 kW Cooling Capacity",
    specifications: "Cooling: 28,45 kW | Heating: 2,53 kW | Capacity: 21.720 | Phases: 2 | Voltage: 450V | Current: 8.706A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-240 PLUS",
    code: "RH5-043-240-PLUS",
    brand: "REN BOX",
    model: "RH5-043-240 PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1042.58,
    description: "RH5 Series PLUS - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,78 kW | Capacity: 17.050 | Phases: 2 | Voltage: 400V | Current: 6.674A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-245 PLUS",
    code: "RH5-043-245-PLUS",
    brand: "REN BOX",
    model: "RH5-043-245 PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1042.58,
    description: "RH5 Series PLUS - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,78 kW | Capacity: 19.575 | Phases: 2 | Voltage: 450V | Current: 8.318A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-250 PLUS",
    code: "RH5-043-250-PLUS",
    brand: "REN BOX",
    model: "RH5-043-250 PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1042.58,
    description: "RH5 Series PLUS - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,78 kW | Capacity: 23.600 | Phases: 2 | Voltage: 500V | Current: 11.172A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-240-LG PLUS",
    code: "RH5-043-240-LG-PLUS",
    brand: "REN BOX",
    model: "RH5-043-240-LG PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1075.18,
    description: "RH5 Series LG PLUS - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,72 kW | Capacity: 23.520 | Phases: 2 | Voltage: 400V | Current: 6.315A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-245-LG PLUS",
    code: "RH5-043-245-LG-PLUS",
    brand: "REN BOX",
    model: "RH5-043-245-LG PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1075.18,
    description: "RH5 Series LG PLUS - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,72 kW | Capacity: 27.010 | Phases: 2 | Voltage: 450V | Current: 7.767A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-250-LG PLUS",
    code: "RH5-043-250-LG-PLUS",
    brand: "REN BOX",
    model: "RH5-043-250-LG PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1075.18,
    description: "RH5 Series LG PLUS - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,72 kW | Capacity: 32.710 | Phases: 2 | Voltage: 500V | Current: 10.497A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-240 PLUS",
    code: "RH5-057-240-PLUS",
    brand: "REN BOX",
    model: "RH5-057-240 PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1206.46,
    description: "RH5 Series PLUS - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,22 kW | Capacity: 20.100 | Phases: 2 | Voltage: 400V | Current: 6.228A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-245 PLUS",
    code: "RH5-057-245-PLUS",
    brand: "REN BOX",
    model: "RH5-057-245 PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1206.46,
    description: "RH5 Series PLUS - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,22 kW | Capacity: 23.125 | Phases: 2 | Voltage: 450V | Current: 7.629A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-250 PLUS",
    code: "RH5-057-250-PLUS",
    brand: "REN BOX",
    model: "RH5-057-250 PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1206.46,
    description: "RH5 Series PLUS - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,22 kW | Capacity: 28.125 | Phases: 2 | Voltage: 500V | Current: 10.007A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-240-LG PLUS",
    code: "RH5-057-240-LG-PLUS",
    brand: "REN BOX",
    model: "RH5-057-240-LG PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1279.71,
    description: "RH5 Series LG PLUS - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,13 kW | Capacity: 26.060 | Phases: 2 | Voltage: 400V | Current: 5.810A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-245-LG PLUS",
    code: "RH5-057-245-LG-PLUS",
    brand: "REN BOX",
    model: "RH5-057-245-LG PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1279.71,
    description: "RH5 Series LG PLUS - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,13 kW | Capacity: 29.960 | Phases: 2 | Voltage: 450V | Current: 7.028A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-250-LG PLUS",
    code: "RH5-057-250-LG-PLUS",
    brand: "REN BOX",
    model: "RH5-057-250-LG PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1279.71,
    description: "RH5 Series LG PLUS - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,13 kW | Capacity: 36.450 | Phases: 2 | Voltage: 500V | Current: 9.294A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-071-245 PLUS",
    code: "RH5-071-245-PLUS",
    brand: "REN BOX",
    model: "RH5-071-245 PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1357.44,
    description: "RH5 Series PLUS - 71,14 kW Cooling Capacity",
    specifications: "Cooling: 71,14 kW | Heating: 6,42 kW | Capacity: 25.350 | Phases: 2 | Voltage: 450V | Current: 7.053A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-071-250 PLUS",
    code: "RH5-071-250-PLUS",
    brand: "REN BOX",
    model: "RH5-071-250 PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1357.44,
    description: "RH5 Series PLUS - 71,14 kW Cooling Capacity",
    specifications: "Cooling: 71,14 kW | Heating: 6,42 kW | Capacity: 29.690 | Phases: 2 | Voltage: 500V | Current: 9.377A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-071-245-LG PLUS",
    code: "RH5-071-245-LG-PLUS",
    brand: "REN BOX",
    model: "RH5-071-245-LG PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1447.36,
    description: "RH5 Series LG PLUS - 71,14 kW Cooling Capacity",
    specifications: "Cooling: 71,14 kW | Heating: 6,32 kW | Capacity: 31.140 | Phases: 2 | Voltage: 450V | Current: 6.403A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-071-250-LG PLUS",
    code: "RH5-071-250-LG-PLUS",
    brand: "REN BOX",
    model: "RH5-071-250-LG PLUS",
    category: "REN BOX SERİSİ - RH5 PLUS",
    price: 1447.36,
    description: "RH5 Series LG PLUS - 71,14 kW Cooling Capacity",
    specifications: "Cooling: 71,14 kW | Heating: 6,32 kW | Capacity: 38.120 | Phases: 2 | Voltage: 500V | Current: 8.358A | Length: 526mm | Width: 1460mm | Height: 1237mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function updateRH5Series() {
  try {
    console.log('🔄 Starting RH5 series update...');
    
    // Step 1: Get all existing products
    console.log('📋 Fetching existing products...');
    const response = await fetch(`${API_BASE}/products`);
    const allProducts = await response.json();
    
    // Step 2: Find RH5 PLUS category products only
    const rh5ExistingProducts = allProducts.filter(product => 
      product.category === 'RH5 PLUS' ||
      product.category === 'REN BOX SERİSİ - RH5 PLUS' ||
      (product.code && product.code.includes('RH5') && product.code.includes('PLUS'))
    );
    console.log(`🔍 Found ${rh5ExistingProducts.length} existing RH5 PLUS products`);
    
    // Step 3: Delete existing RH5 products
    if (rh5ExistingProducts.length > 0) {
      console.log('🗑️ Deleting existing RH5 PLUS products...');
      
      for (const product of rh5ExistingProducts) {
        try {
          const deleteResponse = await fetch(`${API_BASE}/products/${product.id}`, {
            method: 'DELETE'
          });
          
          if (deleteResponse.ok) {
            console.log(`   ✅ Deleted: ${product.name}`);
          } else {
            console.log(`   ❌ Failed to delete: ${product.name}`);
          }
        } catch (error) {
          console.log(`   ❌ Error deleting ${product.name}:`, error.message);
        }
      }
    }
    
    // Step 4: Add new RH5 products
    console.log('➕ Adding new RH5 PLUS series products...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rh5Products),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RH5 PLUS series update completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RH5 PLUS products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

// Run the update
updateRH5Series();
