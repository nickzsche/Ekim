const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RYE 8MM EVAPORATÖR SERİSİ products data (complete series)
const rye8mmEvaporatorProducts = [
  {
    name: "RYE-130-830",
    code: "RYE-130-830",
    brand: "RYE",
    model: "RYE-130-830",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 199.70,
    description: "RYE 8MM Evaporator Series - 2,52 kW Cooling Capacity",
    specifications: "Cooling: 2,52 kW | Heating: 0,8 kW | Capacity: 1.316 | Phases: 1 | Voltage: 300V | Current: 994A | Length: 804mm | Width: 607mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-130-840",
    code: "RYE-130-840",
    brand: "RYE",
    model: "RYE-130-840",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 230.27,
    description: "RYE 8MM Evaporator Series - 3,36 kW Cooling Capacity",
    specifications: "Cooling: 3,36 kW | Heating: 1,2 kW | Capacity: 1.200 | Phases: 1 | Voltage: 300V | Current: 1.250A | Length: 1029mm | Width: 770mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-130-850",
    code: "RYE-130-850",
    brand: "RYE",
    model: "RYE-130-850",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 247.40,
    description: "RYE 8MM Evaporator Series - 4,20 kW Cooling Capacity",
    specifications: "Cooling: 4,20 kW | Heating: 1,39 kW | Capacity: 1.119 | Phases: 1 | Voltage: 300V | Current: 1.408A | Length: 1171mm | Width: 870mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-130-860",
    code: "RYE-130-860",
    brand: "RYE",
    model: "RYE-130-860",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 277.21,
    description: "RYE 8MM Evaporator Series - 5,04 kW Cooling Capacity",
    specifications: "Cooling: 5,04 kW | Heating: 1,79 kW | Capacity: 1.032 | Phases: 1 | Voltage: 300V | Current: 1.565A | Length: 1320mm | Width: 976mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-135-830",
    code: "RYE-135-830",
    brand: "RYE",
    model: "RYE-135-830",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 216.83,
    description: "RYE 8MM Evaporator Series - 3,15 kW Cooling Capacity",
    specifications: "Cooling: 3,15 kW | Heating: 1 kW | Capacity: 2.248 | Phases: 1 | Voltage: 350V | Current: 1.447A | Length: 1153mm | Width: 908mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-135-840",
    code: "RYE-135-840",
    brand: "RYE",
    model: "RYE-135-840",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 253.83,
    description: "RYE 8MM Evaporator Series - 4,20 kW Cooling Capacity",
    specifications: "Cooling: 4,20 kW | Heating: 1,49 kW | Capacity: 1.996 | Phases: 1 | Voltage: 350V | Current: 1.809A | Length: 1467mm | Width: 1151mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-135-850",
    code: "RYE-135-850",
    brand: "RYE",
    model: "RYE-135-850",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 282.02,
    description: "RYE 8MM Evaporator Series - 5,25 kW Cooling Capacity",
    specifications: "Cooling: 5,25 kW | Heating: 1,74 kW | Capacity: 1.863 | Phases: 1 | Voltage: 350V | Current: 2.057A | Length: 1684mm | Width: 1311mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-135-860",
    code: "RYE-135-860",
    brand: "RYE",
    model: "RYE-135-860",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 314.18,
    description: "RYE 8MM Evaporator Series - 6,30 kW Cooling Capacity",
    specifications: "Cooling: 6,30 kW | Heating: 2,24 kW | Capacity: 1.704 | Phases: 1 | Voltage: 350V | Current: 2.293A | Length: 1906mm | Width: 1505mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-230-830",
    code: "RYE-230-830",
    brand: "RYE",
    model: "RYE-230-830",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 306.95,
    description: "RYE 8MM Evaporator Series - 4,73 kW Cooling Capacity",
    specifications: "Cooling: 4,73 kW | Heating: 1,68 kW | Capacity: 2.543 | Phases: 2 | Voltage: 300V | Current: 1.957A | Length: 1590mm | Width: 1208mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-230-840",
    code: "RYE-230-840",
    brand: "RYE",
    model: "RYE-230-840",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 348.10,
    description: "RYE 8MM Evaporator Series - 6,30 kW Cooling Capacity",
    specifications: "Cooling: 6,30 kW | Heating: 2,24 kW | Capacity: 2.332 | Phases: 2 | Voltage: 300V | Current: 2.395A | Length: 1966mm | Width: 1485mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-230-850",
    code: "RYE-230-850",
    brand: "RYE",
    model: "RYE-230-850",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 361.84,
    description: "RYE 8MM Evaporator Series - 7,88 kW Cooling Capacity",
    specifications: "Cooling: 7,88 kW | Heating: 2,24 kW | Capacity: 2.175 | Phases: 2 | Voltage: 300V | Current: 2.599A | Length: 2142mm | Width: 1607mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-230-860",
    code: "RYE-230-860",
    brand: "RYE",
    model: "RYE-230-860",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 413.74,
    description: "RYE 8MM Evaporator Series - 9,45 kW Cooling Capacity",
    specifications: "Cooling: 9,45 kW | Heating: 2,99 kW | Capacity: 2.008 | Phases: 2 | Voltage: 300V | Current: 2.920A | Length: 2447mm | Width: 1858mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-235-830",
    code: "RYE-235-830",
    brand: "RYE",
    model: "RYE-235-830",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 342.62,
    description: "RYE 8MM Evaporator Series - 5,67 kW Cooling Capacity",
    specifications: "Cooling: 5,67 kW | Heating: 2,02 kW | Capacity: 4.179 | Phases: 2 | Voltage: 350V | Current: 2.730A | Length: 2181mm | Width: 1736mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-235-840",
    code: "RYE-235-840",
    brand: "RYE",
    model: "RYE-235-840",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 390.83,
    description: "RYE 8MM Evaporator Series - 7,56 kW Cooling Capacity",
    specifications: "Cooling: 7,56 kW | Heating: 2,69 kW | Capacity: 3.783 | Phases: 2 | Voltage: 350V | Current: 3.334A | Length: 2696mm | Width: 2138mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-235-850",
    code: "RYE-235-850",
    brand: "RYE",
    model: "RYE-235-850",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 439.91,
    description: "RYE 8MM Evaporator Series - 9,45 kW Cooling Capacity",
    specifications: "Cooling: 9,45 kW | Heating: 3,36 kW | Capacity: 3.439 | Phases: 2 | Voltage: 350V | Current: 3.808A | Length: 3128mm | Width: 2458mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-235-860",
    code: "RYE-235-860",
    brand: "RYE",
    model: "RYE-235-860",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 465.34,
    description: "RYE 8MM Evaporator Series - 11,34 kW Cooling Capacity",
    specifications: "Cooling: 11,34 kW | Heating: 3,59 kW | Capacity: 3.157 | Phases: 2 | Voltage: 350V | Current: 4.076A | Length: 3357mm | Width: 2686mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-330-830",
    code: "RYE-330-830",
    brand: "RYE",
    model: "RYE-330-830",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 401.09,
    description: "RYE 8MM Evaporator Series - 6,93 kW Cooling Capacity",
    specifications: "Cooling: 6,93 kW | Heating: 2,46 kW | Capacity: 3.771 | Phases: 3 | Voltage: 300V | Current: 2.886A | Length: 2350mm | Width: 1816mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-330-840",
    code: "RYE-330-840",
    brand: "RYE",
    model: "RYE-330-840",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 459.27,
    description: "RYE 8MM Evaporator Series - 9,24 kW Cooling Capacity",
    specifications: "Cooling: 9,24 kW | Heating: 3,29 kW | Capacity: 3.464 | Phases: 3 | Voltage: 300V | Current: 3.538A | Length: 2907mm | Width: 2234mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-330-850",
    code: "RYE-330-850",
    brand: "RYE",
    model: "RYE-330-850",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 496.48,
    description: "RYE 8MM Evaporator Series - 11,55 kW Cooling Capacity",
    specifications: "Cooling: 11,55 kW | Heating: 3,29 kW | Capacity: 3.216 | Phases: 3 | Voltage: 300V | Current: 3.833A | Length: 3154mm | Width: 2411mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-330-860",
    code: "RYE-330-860",
    brand: "RYE",
    model: "RYE-330-860",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 536.60,
    description: "RYE 8MM Evaporator Series - 13,86 kW Cooling Capacity",
    specifications: "Cooling: 13,86 kW | Heating: 4,11 kW | Capacity: 2.988 | Phases: 3 | Voltage: 300V | Current: 4.259A | Length: 3560mm | Width: 2752mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-335-830",
    code: "RYE-335-830",
    brand: "RYE",
    model: "RYE-335-830",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 453.09,
    description: "RYE 8MM Evaporator Series - 8,82 kW Cooling Capacity",
    specifications: "Cooling: 8,82 kW | Heating: 2,79 kW | Capacity: 6.477 | Phases: 3 | Voltage: 350V | Current: 4.089A | Length: 3252mm | Width: 2553mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-335-840",
    code: "RYE-335-840",
    brand: "RYE",
    model: "RYE-335-840",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 546.16,
    description: "RYE 8MM Evaporator Series - 11,76 kW Cooling Capacity",
    specifications: "Cooling: 11,76 kW | Heating: 4,18 kW | Capacity: 5.785 | Phases: 3 | Voltage: 350V | Current: 5.131A | Length: 4157mm | Width: 3247mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-335-850",
    code: "RYE-335-850",
    brand: "RYE",
    model: "RYE-335-850",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 583.86,
    description: "RYE 8MM Evaporator Series - 14,70 kW Cooling Capacity",
    specifications: "Cooling: 14,70 kW | Heating: 4,18 kW | Capacity: 5.476 | Phases: 3 | Voltage: 350V | Current: 5.653A | Length: 4581mm | Width: 3640mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-335-860",
    code: "RYE-335-860",
    brand: "RYE",
    model: "RYE-335-860",
    category: "RYE 8MM EVAPORATÖR SERİSİ",
    price: 638.22,
    description: "RYE 8MM Evaporator Series - 17,64 kW Cooling Capacity",
    specifications: "Cooling: 17,64 kW | Heating: 5,23 kW | Capacity: 4.941 | Phases: 3 | Voltage: 350V | Current: 6.232A | Length: 5131mm | Width: 4047mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRye8mmEvaporatorSeries() {
  try {
    console.log('🔄 Starting RYE 8MM EVAPORATÖR SERİSİ addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rye8mmEvaporatorProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RYE 8MM EVAPORATÖR SERİSİ addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete RYE 8MM EVAPORATÖR SERİSİ addition finished! Total: 24 products');
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RYE 8MM products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRye8mmEvaporatorSeries();