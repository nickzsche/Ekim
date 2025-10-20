const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RCS 8MM EVAPORATÖR SERİSİ products data - Part 3 (continuing with 3-phase models)
const rcsEvaporatorProductsPart3 = [
  {
    name: "RSC-235-830",
    code: "RSC-235-830",
    brand: "RCS",
    model: "RSC-235-830",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 467.69,
    description: "RCS 8MM Evaporator Series - 9,59 kW Cooling Capacity",
    specifications: "Cooling: 9,59 kW | Heating: 3,13 kW | Capacity: 5.348 | Phases: 2 | Voltage: 350V | Current: 4.396A | Length: 3291mm | Width: 2517mm | Height: 2091mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-235-840",
    code: "RSC-235-840",
    brand: "RCS",
    model: "RSC-235-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 534.96,
    description: "RCS 8MM Evaporator Series - 12,78 kW Cooling Capacity",
    specifications: "Cooling: 12,78 kW | Heating: 4,38 kW | Capacity: 5.092 | Phases: 2 | Voltage: 350V | Current: 5.590A | Length: 4194mm | Width: 3122mm | Height: 2614mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-235-850",
    code: "RSC-235-850",
    brand: "RCS",
    model: "RSC-235-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 626.80,
    description: "RCS 8MM Evaporator Series - 15,98 kW Cooling Capacity",
    specifications: "Cooling: 15,98 kW | Heating: 5,63 kW | Capacity: 4.892 | Phases: 2 | Voltage: 350V | Current: 6.576A | Length: 4960mm | Width: 3682mm | Height: 3090mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-235-860",
    code: "RSC-235-860",
    brand: "RCS",
    model: "RSC-235-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 711.80,
    description: "RCS 8MM Evaporator Series - 19,17 kW Cooling Capacity",
    specifications: "Cooling: 19,17 kW | Heating: 6,68 kW | Capacity: 4.527 | Phases: 2 | Voltage: 350V | Current: 7.218A | Length: 5457mm | Width: 4033mm | Height: 3385mm | Fan Speed 1: 16 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-240-830",
    code: "RSC-240-830",
    brand: "RCS",
    model: "RSC-240-830",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 590.50,
    description: "RCS 8MM Evaporator Series - 14,33 kW Cooling Capacity",
    specifications: "Cooling: 14,33 kW | Heating: 7,483 kW | Capacity: 7.483 | Phases: 2 | Voltage: 400V | Current: 6.227A | Length: 4655mm | Width: 3581mm | Height: 3009mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-240-840",
    code: "RSC-240-840",
    brand: "RCS",
    model: "RSC-240-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 729.61,
    description: "RCS 8MM Evaporator Series - 19,11 kW Cooling Capacity",
    specifications: "Cooling: 19,11 kW | Heating: 6,33 kW | Capacity: 7.129 | Phases: 2 | Voltage: 400V | Current: 8.003A | Length: 6008mm | Width: 4898mm | Height: 4029mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-240-850",
    code: "RSC-240-850",
    brand: "RCS",
    model: "RSC-240-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 847.35,
    description: "RCS 8MM Evaporator Series - 23,89 kW Cooling Capacity",
    specifications: "Cooling: 23,89 kW | Heating: 7,92 kW | Capacity: 6.843 | Phases: 2 | Voltage: 400V | Current: 9.408A | Length: 7092mm | Width: 5750mm | Height: 4720mm | Fan Speed 1: 16 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-240-860",
    code: "RSC-240-860",
    brand: "RCS",
    model: "RSC-240-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 951.65,
    description: "RCS 8MM Evaporator Series - 28,67 kW Cooling Capacity",
    specifications: "Cooling: 28,67 kW | Heating: 9,24 kW | Capacity: 5.277 | Phases: 2 | Voltage: 400V | Current: 10.477A | Length: 7911mm | Width: 6217mm | Height: 5220mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-245-840",
    code: "RSC-245-840",
    brand: "RCS",
    model: "RSC-245-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 948.65,
    description: "RCS 8MM Evaporator Series - 24,50 kW Cooling Capacity",
    specifications: "Cooling: 24,50 kW | Heating: 7,86 kW | Capacity: 9.724 | Phases: 2 | Voltage: 450V | Current: 10.497A | Length: 7867mm | Width: 6547mm | Height: 5357mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-245-850",
    code: "RSC-245-850",
    brand: "RCS",
    model: "RSC-245-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1154.33,
    description: "RCS 8MM Evaporator Series - 30,63 kW Cooling Capacity",
    specifications: "Cooling: 30,63 kW | Heating: 11 kW | Capacity: 9.365 | Phases: 2 | Voltage: 450V | Current: 12.682A | Length: 9571mm | Width: 7420mm | Height: 6187mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRcsEvaporatorSeriesPart3() {
  try {
    console.log('🔄 Starting RCS 8MM EVAPORATÖR SERİSİ Part 3 addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rcsEvaporatorProductsPart3),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RCS 8MM EVAPORATÖR SERİSİ Part 3 completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
    } else {
      console.log('❌ Failed to add RCS products Part 3:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRcsEvaporatorSeriesPart3();