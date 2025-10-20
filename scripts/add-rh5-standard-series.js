const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RH5 Series (standard) products data
const rh5Products = [
  {
    name: "RH5-029-240",
    code: "RH5-029-240",
    brand: "REN BOX",
    model: "RH5-029-240",
    category: "REN BOX SERİSİ - RH5",
    price: 832.21,
    description: "RH5 Series - 28,45 kW Cooling Capacity",
    specifications: "Cooling: 28,45 kW | Heating: 2,58 kW | Capacity: 13.187 | Phases: 2 | Voltage: 400V | Current: 7.189A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-029-245",
    code: "RH5-029-245",
    brand: "REN BOX",
    model: "RH5-029-245",
    category: "REN BOX SERİSİ - RH5",
    price: 832.21,
    description: "RH5 Series - 28,45 kW Cooling Capacity",
    specifications: "Cooling: 28,45 kW | Heating: 2,58 kW | Capacity: 15.184 | Phases: 2 | Voltage: 450V | Current: 9.163A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 16 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-029-240-LG",
    code: "RH5-029-240-LG",
    brand: "REN BOX",
    model: "RH5-029-240-LG",
    category: "REN BOX SERİSİ - RH5",
    price: 848.55,
    description: "RH5 Series LG - 28,45 kW Cooling Capacity",
    specifications: "Cooling: 28,45 kW | Heating: 2,53 kW | Capacity: 18.900 | Phases: 2 | Voltage: 400V | Current: 6.898A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-029-245-LG",
    code: "RH5-029-245-LG",
    brand: "REN BOX",
    model: "RH5-029-245-LG",
    category: "REN BOX SERİSİ - RH5",
    price: 848.44,
    description: "RH5 Series LG - 28,45 kW Cooling Capacity",
    specifications: "Cooling: 28,45 kW | Heating: 2,53 kW | Capacity: 21.720 | Phases: 2 | Voltage: 450V | Current: 8.706A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-240",
    code: "RH5-043-240",
    brand: "REN BOX",
    model: "RH5-043-240",
    category: "REN BOX SERİSİ - RH5",
    price: 935.99,
    description: "RH5 Series - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,78 kW | Capacity: 17.050 | Phases: 2 | Voltage: 400V | Current: 6.675A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-245",
    code: "RH5-043-245",
    brand: "REN BOX",
    model: "RH5-043-245",
    category: "REN BOX SERİSİ - RH5",
    price: 935.99,
    description: "RH5 Series - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,78 kW | Capacity: 19.575 | Phases: 2 | Voltage: 450V | Current: 8.318A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-250",
    code: "RH5-043-250",
    brand: "REN BOX",
    model: "RH5-043-250",
    category: "REN BOX SERİSİ - RH5",
    price: 935.99,
    description: "RH5 Series - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,78 kW | Capacity: 23.600 | Phases: 2 | Voltage: 500V | Current: 11.173A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-240-LG",
    code: "RH5-043-240-LG",
    brand: "REN BOX",
    model: "RH5-043-240-LG",
    category: "REN BOX SERİSİ - RH5",
    price: 970.69,
    description: "RH5 Series LG - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,72 kW | Capacity: 23.520 | Phases: 2 | Voltage: 400V | Current: 6.315A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-245-LG",
    code: "RH5-043-245-LG",
    brand: "REN BOX",
    model: "RH5-043-245-LG",
    category: "REN BOX SERİSİ - RH5",
    price: 970.69,
    description: "RH5 Series LG - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,72 kW | Capacity: 27.010 | Phases: 2 | Voltage: 450V | Current: 7.767A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-043-250-LG",
    code: "RH5-043-250-LG",
    brand: "REN BOX",
    model: "RH5-043-250-LG",
    category: "REN BOX SERİSİ - RH5",
    price: 970.69,
    description: "RH5 Series LG - 42,68 kW Cooling Capacity",
    specifications: "Cooling: 42,68 kW | Heating: 3,72 kW | Capacity: 32.710 | Phases: 2 | Voltage: 500V | Current: 10.497A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-240",
    code: "RH5-057-240",
    brand: "REN BOX",
    model: "RH5-057-240",
    category: "REN BOX SERİSİ - RH5",
    price: 1101.96,
    description: "RH5 Series - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,22 kW | Capacity: 20.100 | Phases: 2 | Voltage: 400V | Current: 6.228A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-245",
    code: "RH5-057-245",
    brand: "REN BOX",
    model: "RH5-057-245",
    category: "REN BOX SERİSİ - RH5",
    price: 1101.96,
    description: "RH5 Series - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,22 kW | Capacity: 23.125 | Phases: 2 | Voltage: 450V | Current: 7.630A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-250",
    code: "RH5-057-250",
    brand: "REN BOX",
    model: "RH5-057-250",
    category: "REN BOX SERİSİ - RH5",
    price: 1101.96,
    description: "RH5 Series - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,22 kW | Capacity: 28.125 | Phases: 2 | Voltage: 500V | Current: 10.007A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-240-LG",
    code: "RH5-057-240-LG",
    brand: "REN BOX",
    model: "RH5-057-240-LG",
    category: "REN BOX SERİSİ - RH5",
    price: 1175.22,
    description: "RH5 Series LG - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,13 kW | Capacity: 26.060 | Phases: 2 | Voltage: 400V | Current: 5.810A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-245-LG",
    code: "RH5-057-245-LG",
    brand: "REN BOX",
    model: "RH5-057-245-LG",
    category: "REN BOX SERİSİ - RH5",
    price: 1175.22,
    description: "RH5 Series LG - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,13 kW | Capacity: 29.960 | Phases: 2 | Voltage: 450V | Current: 7.028A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-057-250-LG",
    code: "RH5-057-250-LG",
    brand: "REN BOX",
    model: "RH5-057-250-LG",
    category: "REN BOX SERİSİ - RH5",
    price: 1175.22,
    description: "RH5 Series LG - 56,91 kW Cooling Capacity",
    specifications: "Cooling: 56,91 kW | Heating: 5,13 kW | Capacity: 36.450 | Phases: 2 | Voltage: 500V | Current: 9.294A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-071-245",
    code: "RH5-071-245",
    brand: "REN BOX",
    model: "RH5-071-245",
    category: "REN BOX SERİSİ - RH5",
    price: 1252.95,
    description: "RH5 Series - 71,14 kW Cooling Capacity",
    specifications: "Cooling: 71,14 kW | Heating: 6,42 kW | Capacity: 25.350 | Phases: 2 | Voltage: 450V | Current: 7.053A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-071-250",
    code: "RH5-071-250",
    brand: "REN BOX",
    model: "RH5-071-250",
    category: "REN BOX SERİSİ - RH5",
    price: 1252.95,
    description: "RH5 Series - 71,14 kW Cooling Capacity",
    specifications: "Cooling: 71,14 kW | Heating: 6,42 kW | Capacity: 29.690 | Phases: 2 | Voltage: 500V | Current: 9.377A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-071-245-LG",
    code: "RH5-071-245-LG",
    brand: "REN BOX",
    model: "RH5-071-245-LG",
    category: "REN BOX SERİSİ - RH5",
    price: 1342.87,
    description: "RH5 Series LG - 71,14 kW Cooling Capacity",
    specifications: "Cooling: 71,14 kW | Heating: 6,32 kW | Capacity: 31.140 | Phases: 2 | Voltage: 450V | Current: 6.402A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RH5-071-250-LG",
    code: "RH5-071-250-LG",
    brand: "REN BOX",
    model: "RH5-071-250-LG",
    category: "REN BOX SERİSİ - RH5",
    price: 1342.87,
    description: "RH5 Series LG - 71,14 kW Cooling Capacity",
    specifications: "Cooling: 71,14 kW | Heating: 6,32 kW | Capacity: 38.120 | Phases: 2 | Voltage: 500V | Current: 8.358A | Length: 400mm | Width: 1280mm | Height: 1231mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRH5StandardSeries() {
  try {
    console.log('🔄 Starting RH5 standard series addition...');
    
    // Add new RH5 standard products
    console.log('➕ Adding RH5 standard series products...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rh5Products),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RH5 standard series addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RH5 standard products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

// Run the addition
addRH5StandardSeries();