const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RH7 Series products data
const rh7Products = [
  {
    name: "RH7-038-245-LG",
    code: "RH7-038-245-LG",
    brand: "REN BOX",
    model: "RH7-038-245-LG",
    category: "REN BOX SERİSİ - RH7",
    price: 1343.72,
    description: "RH7 Series LG - 37,94 kW Cooling Capacity",
    specifications: "Cooling: 37,94 kW | Heating: 3,31 kW | Capacity: 25.770 | Phases: 2 | Voltage: 450V | Current: 9.495A | Length: 600mm | Width: 1800mm | Height: 1282mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH7-038-250-LG",
    code: "RH7-038-250-LG",
    brand: "REN BOX",
    model: "RH7-038-250-LG",
    category: "REN BOX SERİSİ - RH7",
    price: 1343.72,
    description: "RH7 Series LG - 37,94 kW Cooling Capacity",
    specifications: "Cooling: 37,94 kW | Heating: 3,31 kW | Capacity: 31.800 | Phases: 2 | Voltage: 500V | Current: 13.600A | Length: 600mm | Width: 1800mm | Height: 1282mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH7-057-250",
    code: "RH7-057-250",
    brand: "REN BOX",
    model: "RH7-057-250",
    category: "REN BOX SERİSİ - RH7",
    price: 1466.98,
    description: "RH7 Series - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,05 kW | Capacity: 31.142 | Phases: 2 | Voltage: 500V | Current: 12.920A | Length: 600mm | Width: 1800mm | Height: 1282mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH7-057-250-LG",
    code: "RH7-057-250-LG",
    brand: "REN BOX",
    model: "RH7-057-250-LG",
    category: "REN BOX SERİSİ - RH7",
    price: 1506.92,
    description: "RH7 Series LG - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 4,89 kW | Capacity: 40.320 | Phases: 2 | Voltage: 500V | Current: 12.250A | Length: 600mm | Width: 1800mm | Height: 1282mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH7-076-250",
    code: "RH7-076-250",
    brand: "REN BOX",
    model: "RH7-076-250",
    category: "REN BOX SERİSİ - RH7",
    price: 1674.97,
    description: "RH7 Series - 75,88 kW Cooling Capacity",
    specifications: "Cooling: 75,88 kW | Heating: 6,88 kW | Capacity: 35.189 | Phases: 2 | Voltage: 500V | Current: 11.865A | Length: 600mm | Width: 1800mm | Height: 1282mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH7-076-250-LG",
    code: "RH7-076-250-LG",
    brand: "REN BOX",
    model: "RH7-076-250-LG",
    category: "REN BOX SERİSİ - RH7",
    price: 1768.42,
    description: "RH7 Series LG - 75,88 kW Cooling Capacity",
    specifications: "Cooling: 75,88 kW | Heating: 6,77 kW | Capacity: 45.520 | Phases: 2 | Voltage: 500V | Current: 11.176A | Length: 600mm | Width: 1800mm | Height: 1282mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH7-095-250",
    code: "RH7-095-250",
    brand: "REN BOX",
    model: "RH7-095-250",
    category: "REN BOX SERİSİ - RH7",
    price: 1895.04,
    description: "RH7 Series - 94,85 kW Cooling Capacity",
    specifications: "Cooling: 94,85 kW | Heating: 8,72 kW | Capacity: 37.455 | Phases: 2 | Voltage: 500V | Current: 10.983A | Length: 600mm | Width: 1800mm | Height: 1282mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH7-095-250-LG",
    code: "RH7-095-250-LG",
    brand: "REN BOX",
    model: "RH7-095-250-LG",
    category: "REN BOX SERİSİ - RH7",
    price: 2012.25,
    description: "RH7 Series LG - 94,85 kW Cooling Capacity",
    specifications: "Cooling: 94,85 kW | Heating: 8,57 kW | Capacity: 47.900 | Phases: 2 | Voltage: 500V | Current: 10.295A | Length: 600mm | Width: 1800mm | Height: 1282mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH7-114-250",
    code: "RH7-114-250",
    brand: "REN BOX",
    model: "RH7-114-250",
    category: "REN BOX SERİSİ - RH7",
    price: 2097.65,
    description: "RH7 Series - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 10,17 kW | Capacity: 39.061 | Phases: 2 | Voltage: 500V | Current: 10.244A | Length: 600mm | Width: 1800mm | Height: 1282mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH7-114-250-LG",
    code: "RH7-114-250-LG",
    brand: "REN BOX",
    model: "RH7-114-250-LG",
    category: "REN BOX SERİSİ - RH7",
    price: 2236.07,
    description: "RH7 Series LG - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 10,17 kW | Capacity: 49.050 | Phases: 2 | Voltage: 500V | Current: 9.485A | Length: 600mm | Width: 1800mm | Height: 1282mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function updateRH7Series() {
  try {
    console.log('🔄 Starting RH7 series update...');
    
    // Step 1: Get all existing products
    console.log('📋 Fetching existing products...');
    const response = await fetch(`${API_BASE}/products`);
    const allProducts = await response.json();
    
    // Step 2: Find RH7 category products
    const rh7ExistingProducts = allProducts.filter(product => 
      product.category === 'REN BOX SERİSİ - RH7' ||
      (product.code && product.code.startsWith('RH7'))
    );
    console.log(`🔍 Found ${rh7ExistingProducts.length} existing RH7 products`);
    
    // Step 3: Delete existing RH7 products
    if (rh7ExistingProducts.length > 0) {
      console.log('🗑️ Deleting existing RH7 products...');
      
      for (const product of rh7ExistingProducts) {
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
    
    // Step 4: Add new RH7 products
    console.log('➕ Adding new RH7 series products...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rh7Products),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RH7 series update completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RH7 products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

// Run the update
updateRH7Series();
