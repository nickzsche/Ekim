const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RH6 Series products data
const rh6Products = [
  {
    name: "RH6-057-435-LG",
    code: "RH6-057-435-LG",
    brand: "REN BOX",
    model: "RH6-057-435-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 1713.23,
    description: "RH6 Series LG - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,07 kW | Capacity: 32.580 | Phases: 4 | Voltage: 350V | Current: 10.694A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-057-440-LG",
    code: "RH6-057-440-LG",
    brand: "REN BOX",
    model: "RH6-057-440-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 1713.23,
    description: "RH6 Series LG - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,07 kW | Capacity: 38.220 | Phases: 4 | Voltage: 400V | Current: 13.795A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-057-445-LG",
    code: "RH6-057-445-LG",
    brand: "REN BOX",
    model: "RH6-057-445-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 1713.23,
    description: "RH6 Series LG - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,07 kW | Capacity: 43.860 | Phases: 4 | Voltage: 450V | Current: 17.387A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-057-450-LG",
    code: "RH6-057-450-LG",
    brand: "REN BOX",
    model: "RH6-057-450-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 1713.23,
    description: "RH6 Series LG - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,07 kW | Capacity: 52.820 | Phases: 4 | Voltage: 450V | Current: 24.170A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-085-445",
    code: "RH6-085-445",
    brand: "REN BOX",
    model: "RH6-085-445",
    category: "REN BOX SERİSİ - RH6",
    price: 1913.26,
    description: "RH6 Series - 85,36 kW Cooling Capacity",
    specifications: "Cooling: 85,36 kW | Heating: 7,91 kW | Capacity: 41.425 | Phases: 4 | Voltage: 450V | Current: 16.635A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-085-450",
    code: "RH6-085-450",
    brand: "REN BOX",
    model: "RH6-085-450",
    category: "REN BOX SERİSİ - RH6",
    price: 1913.26,
    description: "RH6 Series - 85,36 kW Cooling Capacity",
    specifications: "Cooling: 85,36 kW | Heating: 7,91 kW | Capacity: 49.850 | Phases: 4 | Voltage: 500V | Current: 22.345A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-085-440-LG",
    code: "RH6-085-440-LG",
    brand: "REN BOX",
    model: "RH6-085-440-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 1981.21,
    description: "RH6 Series LG - 85,36 kW Cooling Capacity",
    specifications: "Cooling: 85,36 kW | Heating: 7,78 kW | Capacity: 47.030 | Phases: 4 | Voltage: 400V | Current: 12.630A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-085-445-LG",
    code: "RH6-085-445-LG",
    brand: "REN BOX",
    model: "RH6-085-445-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 1981.21,
    description: "RH6 Series LG - 85,36 kW Cooling Capacity",
    specifications: "Cooling: 85,36 kW | Heating: 7,78 kW | Capacity: 54.020 | Phases: 4 | Voltage: 450V | Current: 15.534A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-085-450-LG",
    code: "RH6-085-450-LG",
    brand: "REN BOX",
    model: "RH6-085-450-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 1981.21,
    description: "RH6 Series LG - 85,36 kW Cooling Capacity",
    specifications: "Cooling: 85,36 kW | Heating: 7,78 kW | Capacity: 65.430 | Phases: 4 | Voltage: 500V | Current: 20.994A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-114-445",
    code: "RH6-114-445",
    brand: "REN BOX",
    model: "RH6-114-445",
    category: "REN BOX SERİSİ - RH6",
    price: 2162.62,
    description: "RH6 Series - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 10,55 kW | Capacity: 45.983 | Phases: 4 | Voltage: 450V | Current: 15.258A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-114-450",
    code: "RH6-114-450",
    brand: "REN BOX",
    model: "RH6-114-450",
    category: "REN BOX SERİSİ - RH6",
    price: 2162.62,
    description: "RH6 Series - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 10,55 kW | Capacity: 57.850 | Phases: 4 | Voltage: 500V | Current: 20.015A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-114-445-LG",
    code: "RH6-114-445-LG",
    brand: "REN BOX",
    model: "RH6-114-445-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 2301.55,
    description: "RH6 Series LG - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 10,55 kW | Capacity: 60.250 | Phases: 4 | Voltage: 450V | Current: 14.056A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-114-450-LG",
    code: "RH6-114-450-LG",
    brand: "REN BOX",
    model: "RH6-114-450-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 2301.55,
    description: "RH6 Series LG - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 10,55 kW | Capacity: 73.320 | Phases: 4 | Voltage: 500V | Current: 18.589A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-142-450",
    code: "RH6-142-450",
    brand: "REN BOX",
    model: "RH6-142-450",
    category: "REN BOX SERİSİ - RH6",
    price: 2491.25,
    description: "RH6 Series - 142,27 kW Cooling Capacity",
    specifications: "Cooling: 142,27 kW | Heating: 13,07 kW | Capacity: 61.770 | Phases: 4 | Voltage: 500V | Current: 18.635A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-142-450-LG",
    code: "RH6-142-450-LG",
    brand: "REN BOX",
    model: "RH6-142-450-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 2665.03,
    description: "RH6 Series LG - 142,27 kW Cooling Capacity",
    specifications: "Cooling: 142,27 kW | Heating: 12,60 kW | Capacity: 76.170 | Phases: 4 | Voltage: 500V | Current: 16.716A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-171-450",
    code: "RH6-171-450",
    brand: "REN BOX",
    model: "RH6-171-450",
    category: "REN BOX SERİSİ - RH6",
    price: 2770.07,
    description: "RH6 Series - 170,73 kW Cooling Capacity",
    specifications: "Cooling: 170,73 kW | Heating: 15,83 kW | Capacity: 63.650 | Phases: 4 | Voltage: 500V | Current: 17.143A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-171-450-LG",
    code: "RH6-171-450-LG",
    brand: "REN BOX",
    model: "RH6-171-450-LG",
    category: "REN BOX SERİSİ - RH6",
    price: 2974.16,
    description: "RH6 Series LG - 170,73 kW Cooling Capacity",
    specifications: "Cooling: 170,73 kW | Heating: 15,83 kW | Capacity: 78.650 | Phases: 4 | Voltage: 500V | Current: 15.873A | Length: 526mm | Width: 2300mm | Height: 1232mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function updateRH6Series() {
  try {
    console.log('🔄 Starting RH6 series update...');
    
    // Step 1: Get all existing products
    console.log('📋 Fetching existing products...');
    const response = await fetch(`${API_BASE}/products`);
    const allProducts = await response.json();
    
    // Step 2: Find RH6 category products
    const rh6ExistingProducts = allProducts.filter(product => 
      product.category === 'REN BOX SERİSİ - RH6' ||
      (product.code && product.code.startsWith('RH6'))
    );
    console.log(`🔍 Found ${rh6ExistingProducts.length} existing RH6 products`);
    
    // Step 3: Delete existing RH6 products
    if (rh6ExistingProducts.length > 0) {
      console.log('🗑️ Deleting existing RH6 products...');
      
      for (const product of rh6ExistingProducts) {
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
    
    // Step 4: Add new RH6 products
    console.log('➕ Adding new RH6 series products...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rh6Products),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RH6 series update completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RH6 products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

// Run the update
updateRH6Series();
