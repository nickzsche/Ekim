const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// REN H BOX Series products data
const renHBoxProducts = [
  {
    name: "REN H BOX -127-263",
    code: "REN-H-BOX-127-263",
    brand: "REN H BOX",
    model: "REN H BOX -127-263",
    category: "REN H BOX SERİSİ",
    price: 3629.66,
    description: "REN H BOX Series - 126,81 kW Cooling Capacity",
    specifications: "Cooling: 126,81 kW | Heating: 16,37 kW | Capacity: 46.206 | Phases: 2 | Voltage: 630V | Current: 18.430A | Length: 1104mm | Width: 2350mm | Height: 1522mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -169-263",
    code: "REN-H-BOX-169-263",
    brand: "REN H BOX",
    model: "REN H BOX -169-263",
    category: "REN H BOX SERİSİ",
    price: 3938.01,
    description: "REN H BOX Series - 169,08 kW Cooling Capacity",
    specifications: "Cooling: 169,08 kW | Heating: 22,10 kW | Capacity: 55.214 | Phases: 2 | Voltage: 630V | Current: 17.434A | Length: 1104mm | Width: 2350mm | Height: 1522mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -211-263",
    code: "REN-H-BOX-211-263",
    brand: "REN H BOX",
    model: "REN H BOX -211-263",
    category: "REN H BOX SERİSİ",
    price: 4493.49,
    description: "REN H BOX Series - 211,35 kW Cooling Capacity",
    specifications: "Cooling: 211,35 kW | Heating: 27,83 kW | Capacity: 60.796 | Phases: 2 | Voltage: 630V | Current: 16.496A | Length: 1104mm | Width: 2350mm | Height: 1522mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -093-250",
    code: "REN-H-BOX-093-250",
    brand: "REN H BOX",
    model: "REN H BOX -093-250",
    category: "REN H BOX SERİSİ",
    price: 3017.58,
    description: "REN H BOX Series - 92,79 kW Cooling Capacity",
    specifications: "Cooling: 92,79 kW | Heating: 12,28 kW | Capacity: 38.301 | Phases: 2 | Voltage: 500V | Current: 16.310A | Length: 848mm | Width: 2350mm | Height: 1462mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -124-250",
    code: "REN-H-BOX-124-250",
    brand: "REN H BOX",
    model: "REN H BOX -124-250",
    category: "REN H BOX SERİSİ",
    price: 3212.04,
    description: "REN H BOX Series - 123,71 kW Cooling Capacity",
    specifications: "Cooling: 123,71 kW | Heating: 16,37 kW | Capacity: 45.227 | Phases: 2 | Voltage: 500V | Current: 15.446A | Length: 848mm | Width: 2350mm | Height: 1462mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -155-250",
    code: "REN-H-BOX-155-250",
    brand: "REN H BOX",
    model: "REN H BOX -155-250",
    category: "REN H BOX SERİSİ",
    price: 3471.05,
    description: "REN H BOX Series - 154,64 kW Cooling Capacity",
    specifications: "Cooling: 154,64 kW | Heating: 20,47 kW | Capacity: 49.983 | Phases: 2 | Voltage: 500V | Current: 14.352A | Length: 848mm | Width: 2350mm | Height: 1462mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -152-263",
    code: "REN-H-BOX-152-263",
    brand: "REN H BOX",
    model: "REN H BOX -152-263",
    category: "REN H BOX SERİSİ",
    price: 4022.09,
    description: "REN H BOX Series - 152,17 kW Cooling Capacity",
    specifications: "Cooling: 152,17 kW | Heating: 19,65 kW | Capacity: 51.540 | Phases: 2 | Voltage: 630V | Current: 19.245A | Length: 1104mm | Width: 2700mm | Height: 1522mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -203-263",
    code: "REN-H-BOX-203-263",
    brand: "REN H BOX",
    model: "REN H BOX -203-263",
    category: "REN H BOX SERİSİ",
    price: 4568.03,
    description: "REN H BOX Series - 202,89 kW Cooling Capacity",
    specifications: "Cooling: 202,89 kW | Heating: 26,20 kW | Capacity: 61.872 | Phases: 2 | Voltage: 630V | Current: 18.400A | Length: 1104mm | Width: 2700mm | Height: 1522mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -254-263",
    code: "REN-H-BOX-254-263",
    brand: "REN H BOX",
    model: "REN H BOX -254-263",
    category: "REN H BOX SERİSİ",
    price: 5253.55,
    description: "REN H BOX Series - 253,61 kW Cooling Capacity",
    specifications: "Cooling: 253,61 kW | Heating: 33,57 kW | Capacity: 66.346 | Phases: 2 | Voltage: 630V | Current: 17.611A | Length: 1104mm | Width: 2700mm | Height: 1522mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -114-350",
    code: "REN-H-BOX-114-350",
    brand: "REN H BOX",
    model: "REN H BOX -114-350",
    category: "REN H BOX SERİSİ",
    price: 3265.46,
    description: "REN H BOX Series - 114,34 kW Cooling Capacity",
    specifications: "Cooling: 114,34 kW | Heating: 14,74 kW | Capacity: 49.053 | Phases: 3 | Voltage: 500V | Current: 21.846A | Length: 848mm | Width: 2750mm | Height: 1462mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -148-350",
    code: "REN-H-BOX-148-350",
    brand: "REN H BOX",
    model: "REN H BOX -148-350",
    category: "REN H BOX SERİSİ",
    price: 3705.48,
    description: "REN H BOX Series - 148,46 kW Cooling Capacity",
    specifications: "Cooling: 148,46 kW | Heating: 19,65 kW | Capacity: 57.764 | Phases: 3 | Voltage: 500V | Current: 20.359A | Length: 848mm | Width: 2750mm | Height: 1462mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -186-350",
    code: "REN-H-BOX-186-350",
    brand: "REN H BOX",
    model: "REN H BOX -186-350",
    category: "REN H BOX SERİSİ",
    price: 4013.97,
    description: "REN H BOX Series - 185,57 kW Cooling Capacity",
    specifications: "Cooling: 185,57 kW | Heating: 24,56 kW | Capacity: 66.371 | Phases: 3 | Voltage: 500V | Current: 19.040A | Length: 848mm | Width: 2750mm | Height: 1462mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -199-280",
    code: "REN-H-BOX-199-280",
    brand: "REN H BOX",
    model: "REN H BOX -199-280",
    category: "REN H BOX SERİSİ",
    price: 5098.45,
    description: "REN H BOX Series - 199,18 kW Cooling Capacity",
    specifications: "Cooling: 199,18 kW | Heating: 24,45 kW | Capacity: 85.946 | Phases: 2 | Voltage: 800V | Current: 39.673A | Length: 1233mm | Width: 3150mm | Height: 1592mm | Fan Speed 1: 42 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -266-280",
    code: "REN-H-BOX-266-280",
    brand: "REN H BOX",
    model: "REN H BOX -266-280",
    category: "REN H BOX SERİSİ",
    price: 5814.88,
    description: "REN H BOX Series - 265,57 kW Cooling Capacity",
    specifications: "Cooling: 265,57 kW | Heating: 33,62 kW | Capacity: 102.085 | Phases: 2 | Voltage: 800V | Current: 36.971A | Length: 1233mm | Width: 3150mm | Height: 1592mm | Fan Speed 1: 42 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -332-280",
    code: "REN-H-BOX-332-280",
    brand: "REN H BOX",
    model: "REN H BOX -332-280",
    category: "REN H BOX SERİSİ",
    price: 6879.37,
    description: "REN H BOX Series - 331,97 kW Cooling Capacity",
    specifications: "Cooling: 331,97 kW | Heating: 43,93 kW | Capacity: 121.230 | Phases: 2 | Voltage: 800V | Current: 34.590A | Length: 1233mm | Width: 3150mm | Height: 1592mm | Fan Speed 1: 42 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -190-363",
    code: "REN-H-BOX-190-363",
    brand: "REN H BOX",
    model: "REN H BOX -190-363",
    category: "REN H BOX SERİSİ",
    price: 5070.50,
    description: "REN H BOX Series - 190,21 kW Cooling Capacity",
    specifications: "Cooling: 190,21 kW | Heating: 24,56 kW | Capacity: 69.297 | Phases: 3 | Voltage: 630V | Current: 27.644A | Length: 1110mm | Width: 3350mm | Height: 1522mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -254-363",
    code: "REN-H-BOX-254-363",
    brand: "REN H BOX",
    model: "REN H BOX -254-363",
    category: "REN H BOX SERİSİ",
    price: 5548.73,
    description: "REN H BOX Series - 253,61 kW Cooling Capacity",
    specifications: "Cooling: 253,61 kW | Heating: 33,62 kW | Capacity: 85.289 | Phases: 3 | Voltage: 630V | Current: 26.138A | Length: 1110mm | Width: 3350mm | Height: 1522mm | Fan Speed 1: 42 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -317-363",
    code: "REN-H-BOX-317-363",
    brand: "REN H BOX",
    model: "REN H BOX -317-363",
    category: "REN H BOX SERİSİ",
    price: 6443.33,
    description: "REN H BOX Series - 317,02 kW Cooling Capacity",
    specifications: "Cooling: 317,02 kW | Heating: 43,93 kW | Capacity: 99.515 | Phases: 3 | Voltage: 630V | Current: 24.739A | Length: 1110mm | Width: 3350mm | Height: 1522mm | Fan Speed 1: 42 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -139-350",
    code: "REN-H-BOX-139-350",
    brand: "REN H BOX",
    model: "REN H BOX -139-350",
    category: "REN H BOX SERİSİ",
    price: 3849.50,
    description: "REN H BOX Series - 139,18 kW Cooling Capacity",
    specifications: "Cooling: 139,18 kW | Heating: 24,56 kW | Capacity: 55.264 | Phases: 3 | Voltage: 500V | Current: 23.176A | Length: 853mm | Width: 3350mm | Height: 1563mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -186-350",
    code: "REN-H-BOX-186-350-ALT",
    brand: "REN H BOX",
    model: "REN H BOX -186-350",
    category: "REN H BOX SERİSİ",
    price: 4286.77,
    description: "REN H BOX Series - 185,57 kW Cooling Capacity (Alt)",
    specifications: "Cooling: 185,57 kW | Heating: 33,57 kW | Capacity: 65.456 | Phases: 3 | Voltage: 500V | Current: 22.056A | Length: 853mm | Width: 3350mm | Height: 1563mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -232-350",
    code: "REN-H-BOX-232-350",
    brand: "REN H BOX",
    model: "REN H BOX -232-350",
    category: "REN H BOX SERİSİ",
    price: 4890.18,
    description: "REN H BOX Series - 231,96 kW Cooling Capacity",
    specifications: "Cooling: 231,96 kW | Heating: 41,96 kW | Capacity: 78.822 | Phases: 3 | Voltage: 500V | Current: 20.914A | Length: 853mm | Width: 3350mm | Height: 1563mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -256-380",
    code: "REN-H-BOX-256-380",
    brand: "REN H BOX",
    model: "REN H BOX -256-380",
    category: "REN H BOX SERİSİ",
    price: 6502.55,
    description: "REN H BOX Series - 256,09 kW Cooling Capacity",
    specifications: "Cooling: 256,09 kW | Heating: 18,01 kW | Capacity: 115.602 | Phases: 3 | Voltage: 800V | Current: 56.231A | Length: 1240mm | Width: 4000mm | Height: 1589mm | Fan Speed 1: 42 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN H BOX -341-380",
    code: "REN-H-BOX-341-380",
    brand: "REN H BOX",
    model: "REN H BOX -341-380",
    category: "REN H BOX SERİSİ",
    price: 7359.33,
    description: "REN H BOX Series - 341,45 kW Cooling Capacity",
    specifications: "Cooling: 341,45 kW | Heating: 24,56 kW | Capacity: 151.577 | Phases: 3 | Voltage: 800V | Current: 51.712A | Length: 1240mm | Width: 4000mm | Height: 1589mm | Fan Speed 1: 42 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRenHBoxSeries() {
  try {
    console.log('🔄 Starting REN H BOX series addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(renHBoxProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ REN H BOX series addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add REN H BOX products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

// Run the addition
addRenHBoxSeries();