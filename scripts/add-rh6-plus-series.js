const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RH6 PLUS Series products data
const rh6PlusProducts = [
  {
    name: "RH6-085-445 PLUS",
    code: "RH6-085-445-PLUS",
    brand: "REN BOX",
    model: "RH6-085-445 PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2165.94,
    description: "RH6 Series PLUS - 85,36 kW Cooling Capacity",
    specifications: "Cooling: 85,36 kW | Heating: 7,91 kW | Capacity: 41.425 | Phases: 4 | Voltage: 450V | Current: 16.635A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-085-450 PLUS",
    code: "RH6-085-450-PLUS",
    brand: "REN BOX",
    model: "RH6-085-450 PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2165.94,
    description: "RH6 Series PLUS - 85,36 kW Cooling Capacity",
    specifications: "Cooling: 85,36 kW | Heating: 7,91 kW | Capacity: 49.850 | Phases: 4 | Voltage: 500V | Current: 22.345A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-085-440-LG PLUS",
    code: "RH6-085-440-LG-PLUS",
    brand: "REN BOX",
    model: "RH6-085-440-LG PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2231.87,
    description: "RH6 Series LG PLUS - 85,36 kW Cooling Capacity",
    specifications: "Cooling: 85,36 kW | Heating: 7,78 kW | Capacity: 47.030 | Phases: 4 | Voltage: 400V | Current: 12.630A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-085-445-LG PLUS",
    code: "RH6-085-445-LG-PLUS",
    brand: "REN BOX",
    model: "RH6-085-445-LG PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2231.87,
    description: "RH6 Series LG PLUS - 85,36 kW Cooling Capacity",
    specifications: "Cooling: 85,36 kW | Heating: 7,78 kW | Capacity: 54.020 | Phases: 4 | Voltage: 450V | Current: 15.534A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-085-450-LG PLUS",
    code: "RH6-085-450-LG-PLUS",
    brand: "REN BOX",
    model: "RH6-085-450-LG PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2231.87,
    description: "RH6 Series LG PLUS - 85,36 kW Cooling Capacity",
    specifications: "Cooling: 85,36 kW | Heating: 7,78 kW | Capacity: 65.430 | Phases: 4 | Voltage: 500V | Current: 20.994A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-114-445 PLUS",
    code: "RH6-114-445-PLUS",
    brand: "REN BOX",
    model: "RH6-114-445 PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2367.89,
    description: "RH6 Series PLUS - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 10,55 kW | Capacity: 45.983 | Phases: 4 | Voltage: 450V | Current: 15.258A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-114-450 PLUS",
    code: "RH6-114-450-PLUS",
    brand: "REN BOX",
    model: "RH6-114-450 PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2367.89,
    description: "RH6 Series PLUS - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 10,55 kW | Capacity: 57.850 | Phases: 4 | Voltage: 500V | Current: 20.015A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-114-445-LG PLUS",
    code: "RH6-114-445-LG-PLUS",
    brand: "REN BOX",
    model: "RH6-114-445-LG PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2506.81,
    description: "RH6 Series LG PLUS - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 10,38 kW | Capacity: 60.250 | Phases: 4 | Voltage: 450V | Current: 14.056A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-114-450-LG PLUS",
    code: "RH6-114-450-LG-PLUS",
    brand: "REN BOX",
    model: "RH6-114-450-LG PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2506.81,
    description: "RH6 Series LG PLUS - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 10,38 kW | Capacity: 73.320 | Phases: 4 | Voltage: 500V | Current: 18.588A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-142-450 PLUS",
    code: "RH6-142-450-PLUS",
    brand: "REN BOX",
    model: "RH6-142-450 PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2696.51,
    description: "RH6 Series PLUS - 142,27 kW Cooling Capacity",
    specifications: "Cooling: 142,27 kW | Heating: 13,07 kW | Capacity: 61.770 | Phases: 4 | Voltage: 500V | Current: 18.635A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-142-450-LG PLUS",
    code: "RH6-142-450-LG-PLUS",
    brand: "REN BOX",
    model: "RH6-142-450-LG PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2696.51,
    description: "RH6 Series LG PLUS - 142,27 kW Cooling Capacity",
    specifications: "Cooling: 142,27 kW | Heating: 12,60 kW | Capacity: 76.170 | Phases: 4 | Voltage: 500V | Current: 16.716A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-171-450 PLUS",
    code: "RH6-171-450-PLUS",
    brand: "REN BOX",
    model: "RH6-171-450 PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 2975.34,
    description: "RH6 Series PLUS - 170,73 kW Cooling Capacity",
    specifications: "Cooling: 170,73 kW | Heating: 15,83 kW | Capacity: 63.650 | Phases: 4 | Voltage: 500V | Current: 17.143A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH6-171-450-LG PLUS",
    code: "RH6-171-450-LG-PLUS",
    brand: "REN BOX",
    model: "RH6-171-450-LG PLUS",
    category: "REN BOX SERİSİ - RH6 PLUS",
    price: 3179.43,
    description: "RH6 Series LG PLUS - 170,73 kW Cooling Capacity",
    specifications: "Cooling: 170,73 kW | Heating: 15,83 kW | Capacity: 78.650 | Phases: 4 | Voltage: 500V | Current: 15.873A | Length: 700mm | Width: 2300mm | Height: 1237mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRH6PlusSeries() {
  try {
    console.log('🔄 Starting RH6 PLUS series addition...');
    
    // Add new RH6 PLUS products
    console.log('➕ Adding RH6 PLUS series products...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rh6PlusProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RH6 PLUS series addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RH6 PLUS products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

// Run the addition
addRH6PlusSeries();