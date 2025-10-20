const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RH3 Series products data
const rh3Products = [
  {
    name: "RH3-011-140",
    code: "RH3-011-140",
    brand: "REN BOX",
    model: "RH3-011-140",
    category: "REN BOX SERİSİ - RH3",
    price: 348.93,
    description: "RH3 Series - 11,13 kW Cooling Capacity",
    specifications: "Cooling: 11,13 kW | Heating: 1,03 kW | Capacity: 5.808 | Phases: 1 | Voltage: 400V | Current: 3.357A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 10 | Fan Speed 2: 10",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-011-145",
    code: "RH3-011-145",
    brand: "REN BOX",
    model: "RH3-011-145",
    category: "REN BOX SERİSİ - RH3",
    price: 348.93,
    description: "RH3 Series - 11,13 kW Cooling Capacity",
    specifications: "Cooling: 11,13 kW | Heating: 1,03 kW | Capacity: 6.542 | Phases: 1 | Voltage: 450V | Current: 4.177A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 12 | Fan Speed 2: 10",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-011-140-LG",
    code: "RH3-011-140-LG",
    brand: "REN BOX",
    model: "RH3-011-140-LG",
    category: "REN BOX SERİSİ - RH3",
    price: 359.02,
    description: "RH3 Series LG - 11,13 kW Cooling Capacity",
    specifications: "Cooling: 11,13 kW | Heating: 1,01 kW | Capacity: 8.270 | Phases: 1 | Voltage: 400V | Current: 3.177A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-011-145-LG",
    code: "RH3-011-145-LG",
    brand: "REN BOX",
    model: "RH3-011-145-LG",
    category: "REN BOX SERİSİ - RH3",
    price: 359.02,
    description: "RH3 Series LG - 11,13 kW Cooling Capacity",
    specifications: "Cooling: 11,13 kW | Heating: 1,01 kW | Capacity: 9.330 | Phases: 1 | Voltage: 450V | Current: 3.908A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-017-140",
    code: "RH3-017-140",
    brand: "REN BOX",
    model: "RH3-017-140",
    category: "REN BOX SERİSİ - RH3",
    price: 413.36,
    description: "RH3 Series - 16,7 kW Cooling Capacity",
    specifications: "Cooling: 16,7 kW | Heating: 1,55 kW | Capacity: 7.225 | Phases: 1 | Voltage: 400V | Current: 3.031A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 12 | Fan Speed 2: 10",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-017-145",
    code: "RH3-017-145",
    brand: "REN BOX",
    model: "RH3-017-145",
    category: "REN BOX SERİSİ - RH3",
    price: 413.36,
    description: "RH3 Series - 16,7 kW Cooling Capacity",
    specifications: "Cooling: 16,7 kW | Heating: 1,55 kW | Capacity: 8.150 | Phases: 1 | Voltage: 450V | Current: 3.683A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 12 | Fan Speed 2: 10",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-017-140-LG",
    code: "RH3-017-140-LG",
    brand: "REN BOX",
    model: "RH3-017-140-LG",
    category: "REN BOX SERİSİ - RH3",
    price: 436.09,
    description: "RH3 Series LG - 16,7 kW Cooling Capacity",
    specifications: "Cooling: 16,7 kW | Heating: 1,52 kW | Capacity: 10.130 | Phases: 1 | Voltage: 400V | Current: 2.813A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-017-145-LG",
    code: "RH3-017-145-LG",
    brand: "REN BOX",
    model: "RH3-017-145-LG",
    category: "REN BOX SERİSİ - RH3",
    price: 436.09,
    description: "RH3 Series LG - 16,7 kW Cooling Capacity",
    specifications: "Cooling: 16,7 kW | Heating: 1,52 kW | Capacity: 11.410 | Phases: 1 | Voltage: 450V | Current: 3.370A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-022-140",
    code: "RH3-022-140",
    brand: "REN BOX",
    model: "RH3-022-140",
    category: "REN BOX SERİSİ - RH3",
    price: 467.31,
    description: "RH3 Series - 22,27 kW Cooling Capacity",
    specifications: "Cooling: 22,27 kW | Heating: 2,06 kW | Capacity: 8.425 | Phases: 1 | Voltage: 400V | Current: 2.760A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-022-145",
    code: "RH3-022-145",
    brand: "REN BOX",
    model: "RH3-022-145",
    category: "REN BOX SERİSİ - RH3",
    price: 467.31,
    description: "RH3 Series - 22,27 kW Cooling Capacity",
    specifications: "Cooling: 22,27 kW | Heating: 2,06 kW | Capacity: 9.475 | Phases: 1 | Voltage: 450V | Current: 3.283A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-022-140-LG",
    code: "RH3-022-140-LG",
    brand: "REN BOX",
    model: "RH3-022-140-LG",
    category: "REN BOX SERİSİ - RH3",
    price: 514.80,
    description: "RH3 Series LG - 22,27 kW Cooling Capacity",
    specifications: "Cooling: 22,27 kW | Heating: 2,03 kW | Capacity: 10.950 | Phases: 1 | Voltage: 400V | Current: 2.527A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH3-022-145-LG",
    code: "RH3-022-145-LG",
    brand: "REN BOX",
    model: "RH3-022-145-LG",
    category: "REN BOX SERİSİ - RH3",
    price: 514.80,
    description: "RH3 Series LG - 22,7 kW Cooling Capacity",
    specifications: "Cooling: 22,7 kW | Heating: 2,03 kW | Capacity: 12.240 | Phases: 1 | Voltage: 450V | Current: 2.951A | Length: 370mm | Width: 1000mm | Height: 680mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function updateRH3Series() {
  try {
    console.log('🔄 Starting RH3 series update...');
    
    // Step 1: Get all existing products
    console.log('📋 Fetching existing products...');
    const response = await fetch(`${API_BASE}/products`);
    const allProducts = await response.json();
    
    // Step 2: Find RH3 category products (both 'RH3' and 'REN BOX SERİSİ - RH3')
    const rh3ExistingProducts = allProducts.filter(product => 
      product.category === 'RH3' || 
      product.category === 'REN BOX SERİSİ - RH3' ||
      (product.code && product.code.startsWith('RH3'))
    );
    console.log(`🔍 Found ${rh3ExistingProducts.length} existing RH3 products`);
    
    // Step 3: Delete existing RH3 products
    if (rh3ExistingProducts.length > 0) {
      console.log('🗑️ Deleting existing RH3 products...');
      
      for (const product of rh3ExistingProducts) {
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
    
    // Step 4: Add new RH3 products
    console.log('➕ Adding new RH3 series products...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rh3Products),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RH3 series update completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RH3 products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

// Run the update
updateRH3Series();
