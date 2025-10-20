const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RCS 8MM EVAPORATÖR SERİSİ products data - Part 4 (final batch)
const rcsEvaporatorProductsPart4 = [
  {
    name: "RSC-245-860",
    code: "RSC-245-860",
    brand: "RCS",
    model: "RSC-245-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1318.62,
    description: "RCS 8MM Evaporator Series - 36,75 kW Cooling Capacity",
    specifications: "Cooling: 36,75 kW | Heating: 13,2 kW | Capacity: 8.947 | Phases: 2 | Voltage: 450V | Current: 14.279A | Length: 10797mm | Width: 8366mm | Height: 7007mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-245-880",
    code: "RSC-245-880",
    brand: "RCS",
    model: "RSC-245-880",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1631.06,
    description: "RCS 8MM Evaporator Series - 49,00 kW Cooling Capacity",
    specifications: "Cooling: 49,00 kW | Heating: 17,6 kW | Capacity: 8.307 | Phases: 2 | Voltage: 450V | Current: 16.755A | Length: 12734mm | Width: 9871mm | Height: 8311mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-250-840",
    code: "RSC-250-840",
    brand: "RCS",
    model: "RSC-250-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1224.79,
    description: "RCS 8MM Evaporator Series - 31,36 kW Cooling Capacity",
    specifications: "Cooling: 31,36 kW | Heating: 11,26 kW | Capacity: 16.039 | Phases: 2 | Voltage: 500V | Current: 15.509A | Length: 11643mm | Width: 9491mm | Height: 7998mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-250-850",
    code: "RSC-250-850",
    brand: "RCS",
    model: "RSC-250-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1425.49,
    description: "RCS 8MM Evaporator Series - 39,20 kW Cooling Capacity",
    specifications: "Cooling: 39,20 kW | Heating: 14,08 kW | Capacity: 14.945 | Phases: 2 | Voltage: 500V | Current: 18.070A | Length: 13577mm | Width: 11048mm | Height: 9330mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-250-860",
    code: "RSC-250-860",
    brand: "RCS",
    model: "RSC-250-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1634.78,
    description: "RCS 8MM Evaporator Series - 47,04 kW Cooling Capacity",
    specifications: "Cooling: 47,04 kW | Heating: 16,89 kW | Capacity: 14.116 | Phases: 2 | Voltage: 500V | Current: 20.239A | Length: 15264mm | Width: 12408mm | Height: 10488mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-250-880",
    code: "RSC-250-880",
    brand: "RCS",
    model: "RSC-250-880",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1946.39,
    description: "RCS 8MM Evaporator Series - 62,72 kW Cooling Capacity",
    specifications: "Cooling: 62,72 kW | Heating: 21,11 kW | Capacity: 13.099 | Phases: 2 | Voltage: 500V | Current: 23.747A | Length: 17959mm | Width: 13854mm | Height: 11824mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-335-830",
    code: "RSC-335-830",
    brand: "RCS",
    model: "RSC-335-830",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 790.63,
    description: "RCS 8MM Evaporator Series - 18,48 kW Cooling Capacity",
    specifications: "Cooling: 18,48 kW | Heating: 6,43 kW | Capacity: 8.699 | Phases: 3 | Voltage: 350V | Current: 7.961A | Length: 5976mm | Width: 4640mm | Height: 3867mm | Fan Speed 1: 16 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-335-840",
    code: "RSC-335-840",
    brand: "RCS",
    model: "RSC-335-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 909.76,
    description: "RCS 8MM Evaporator Series - 24,64 kW Cooling Capacity",
    specifications: "Cooling: 24,64 kW | Heating: 8,04 kW | Capacity: 8.181 | Phases: 3 | Voltage: 350V | Current: 9.723A | Length: 7318mm | Width: 5461mm | Height: 4532mm | Fan Speed 1: 16 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-335-850",
    code: "RSC-335-850",
    brand: "RCS",
    model: "RSC-335-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1028.35,
    description: "RCS 8MM Evaporator Series - 30,80 kW Cooling Capacity",
    specifications: "Cooling: 30,80 kW | Heating: 9,65 kW | Capacity: 7.862 | Phases: 3 | Voltage: 350V | Current: 11.309A | Length: 8527mm | Width: 6362mm | Height: 5335mm | Fan Speed 1: 16 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-335-860",
    code: "RSC-335-860",
    brand: "RCS",
    model: "RSC-335-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1199.30,
    description: "RCS 8MM Evaporator Series - 36,96 kW Cooling Capacity",
    specifications: "Cooling: 36,96 kW | Heating: 12,07 kW | Capacity: 7.631 | Phases: 3 | Voltage: 350V | Current: 12.912A | Length: 9772mm | Width: 7290mm | Height: 6138mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRcsEvaporatorSeriesPart4() {
  try {
    console.log('🔄 Starting RCS 8MM EVAPORATÖR SERİSİ Part 4 (Final) addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rcsEvaporatorProductsPart4),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RCS 8MM EVAPORATÖR SERİSİ Part 4 completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 RCS 8MM EVAPORATÖR SERİSİ addition complete! (40 products total)');
    } else {
      console.log('❌ Failed to add RCS products Part 4:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRcsEvaporatorSeriesPart4();