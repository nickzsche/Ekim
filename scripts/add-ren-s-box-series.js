const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// REN S BOX Series products data
const renSBoxProducts = [
  {
    name: "REN S BOX 114-450 LG",
    code: "REN-S-BOX-114-450-LG",
    brand: "REN S BOX",
    model: "REN S BOX 114-450 LG",
    category: "REN S BOX SERİSİ",
    price: 3324.48,
    description: "REN S BOX Series LG - 113,82 kW Cooling Capacity",
    specifications: "Cooling: 113,82 kW | Heating: 9,12 kW | Capacity: 80.650 | Phases: 4 | Voltage: 500V | Current: 30.173A | Length: 1490mm | Width: 2200mm | Height: 1355mm | Fan Speed 1: 28 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 171-450 LG",
    code: "REN-S-BOX-171-450-LG",
    brand: "REN S BOX",
    model: "REN S BOX 171-450 LG",
    category: "REN S BOX SERİSİ",
    price: 3973.57,
    description: "REN S BOX Series LG - 170,72 kW Cooling Capacity",
    specifications: "Cooling: 170,72 kW | Heating: 13,76 kW | Capacity: 103.110 | Phases: 4 | Voltage: 500V | Current: 28.300A | Length: 1490mm | Width: 2200mm | Height: 1355mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 228-450 LG",
    code: "REN-S-BOX-228-450-LG",
    brand: "REN S BOX",
    model: "REN S BOX 228-450 LG",
    category: "REN S BOX SERİSİ",
    price: 4621.63,
    description: "REN S BOX Series LG - 227,64 kW Cooling Capacity",
    specifications: "Cooling: 227,64 kW | Heating: 18,62 kW | Capacity: 116.090 | Phases: 4 | Voltage: 500V | Current: 26.704A | Length: 1490mm | Width: 2200mm | Height: 1355mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 285-450 LG",
    code: "REN-S-BOX-285-450-LG",
    brand: "REN S BOX",
    model: "REN S BOX 285-450 LG",
    category: "REN S BOX SERİSİ",
    price: 5237.60,
    description: "REN S BOX Series LG - 284,54 kW Cooling Capacity",
    specifications: "Cooling: 284,54 kW | Heating: 23,28 kW | Capacity: 124.370 | Phases: 4 | Voltage: 500V | Current: 25.290A | Length: 1490mm | Width: 2200mm | Height: 1355mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 171-650 LG",
    code: "REN-S-BOX-171-650-LG",
    brand: "REN S BOX",
    model: "REN S BOX 171-650 LG",
    category: "REN S BOX SERİSİ",
    price: 4393.05,
    description: "REN S BOX Series LG - 170,72 kW Cooling Capacity",
    specifications: "Cooling: 170,72 kW | Heating: 13,96 kW | Capacity: 121.030 | Phases: 6 | Voltage: 500V | Current: 45.260A | Length: 1490mm | Width: 2800mm | Height: 1355mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 256-650 LG",
    code: "REN-S-BOX-256-650-LG",
    brand: "REN S BOX",
    model: "REN S BOX 256-650 LG",
    category: "REN S BOX SERİSİ",
    price: 5450.27,
    description: "REN S BOX Series LG - 256,08 kW Cooling Capacity",
    specifications: "Cooling: 256,08 kW | Heating: 20,96 kW | Capacity: 155.520 | Phases: 6 | Voltage: 500V | Current: 42.451A | Length: 1490mm | Width: 2800mm | Height: 1355mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 341-650 LG",
    code: "REN-S-BOX-341-650-LG",
    brand: "REN S BOX",
    model: "REN S BOX 341-650 LG",
    category: "REN S BOX SERİSİ",
    price: 6396.18,
    description: "REN S BOX Series LG - 341,46 kW Cooling Capacity",
    specifications: "Cooling: 341,46 kW | Heating: 27,34 kW | Capacity: 174.750 | Phases: 6 | Voltage: 500V | Current: 40.027A | Length: 1490mm | Width: 2800mm | Height: 1355mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 427-650 LG",
    code: "REN-S-BOX-427-650-LG",
    brand: "REN S BOX",
    model: "REN S BOX 427-650 LG",
    category: "REN S BOX SERİSİ",
    price: 7478.23,
    description: "REN S BOX Series LG - 426,82 kW Cooling Capacity",
    specifications: "Cooling: 426,82 kW | Heating: 34,62 kW | Capacity: 185.830 | Phases: 6 | Voltage: 500V | Current: 37.963A | Length: 1490mm | Width: 2800mm | Height: 1355mm | Fan Speed 1: 42 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 199-280 LG",
    code: "REN-S-BOX-199-280-LG",
    brand: "REN S BOX",
    model: "REN S BOX 199-280 LG",
    category: "REN S BOX SERİSİ",
    price: 4850.25,
    description: "REN S BOX Series LG - 199,18 kW Cooling Capacity",
    specifications: "Cooling: 199,18 kW | Heating: 16,30 kW | Capacity: 126.670 | Phases: 2 | Voltage: 800V | Current: 43.548A | Length: 1190mm | Width: 3350mm | Height: 1365mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 299-280 LG",
    code: "REN-S-BOX-299-280-LG",
    brand: "REN S BOX",
    model: "REN S BOX 299-280 LG",
    category: "REN S BOX SERİSİ",
    price: 6015.71,
    description: "REN S BOX Series LG - 298,78 kW Cooling Capacity",
    specifications: "Cooling: 298,78 kW | Heating: 24,44 kW | Capacity: 161.150 | Phases: 2 | Voltage: 800V | Current: 41.278A | Length: 1190mm | Width: 3350mm | Height: 1365mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 398-280 LG",
    code: "REN-S-BOX-398-280-LG",
    brand: "REN S BOX",
    model: "REN S BOX 398-280 LG",
    category: "REN S BOX SERİSİ",
    price: 7156.76,
    description: "REN S BOX Series LG - 398,36 kW Cooling Capacity",
    specifications: "Cooling: 398,36 kW | Heating: 31,88 kW | Capacity: 180.730 | Phases: 2 | Voltage: 800V | Current: 39.391A | Length: 1190mm | Width: 3350mm | Height: 1365mm | Fan Speed 1: 42 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN S BOX 498-280 LG",
    code: "REN-S-BOX-498-280-LG",
    brand: "REN S BOX",
    model: "REN S BOX 498-280 LG",
    category: "REN S BOX SERİSİ",
    price: 8356.30,
    description: "REN S BOX Series LG - 497,96 kW Cooling Capacity",
    specifications: "Cooling: 497,96 kW | Heating: 40,38 kW | Capacity: 191.990 | Phases: 2 | Voltage: 800V | Current: 37.715A | Length: 1190mm | Width: 3350mm | Height: 1365mm | Fan Speed 1: 42 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRenSBoxSeries() {
  try {
    console.log('🔄 Starting REN S BOX series addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(renSBoxProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ REN S BOX series addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add REN S BOX products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

// Run the addition
addRenSBoxSeries();