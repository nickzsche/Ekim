const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RCS 8MM EVAPORATÖR SERİSİ products data - Part 6 (Last batch with 4-phase models)
const rcsEvaporatorProductsPart6 = [
  {
    name: "RSC-440-840",
    code: "RSC-440-840",
    brand: "RCS",
    model: "RSC-440-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1289.84,
    description: "RCS 8MM Evaporator Series - 38,22 kW Cooling Capacity",
    specifications: "Cooling: 38,22 kW | Heating: 11,09 kW | Capacity: 14.348 | Phases: 4 | Voltage: 400V | Current: 15.469A | Length: 11588mm | Width: 9207mm | Height: 7710mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-440-850",
    code: "RSC-440-850",
    brand: "RCS",
    model: "RSC-440-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1655.96,
    description: "RCS 8MM Evaporator Series - 47,78 kW Cooling Capacity",
    specifications: "Cooling: 47,78 kW | Heating: 16,89 kW | Capacity: 13.660 | Phases: 4 | Voltage: 400V | Current: 19.113A | Length: 14428mm | Width: 11373mm | Height: 9554mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-440-860",
    code: "RSC-440-860",
    brand: "RCS",
    model: "RSC-440-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1651.69,
    description: "RCS 8MM Evaporator Series - 57,33 kW Cooling Capacity",
    specifications: "Cooling: 57,33 kW | Heating: 15,84 kW | Capacity: 13.366 | Phases: 4 | Voltage: 400V | Current: 20.254A | Length: 15240mm | Width: 12036mm | Height: 10123mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-440-880",
    code: "RSC-440-880",
    brand: "RCS",
    model: "RSC-440-880",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 2319.09,
    description: "RCS 8MM Evaporator Series - 76,44 kW Cooling Capacity",
    specifications: "Cooling: 76,44 kW | Heating: 26,39 kW | Capacity: 12.045 | Phases: 4 | Voltage: 400V | Current: 24.918A | Length: 18945mm | Width: 14138mm | Height: 11881mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-445-840",
    code: "RSC-445-840",
    brand: "RCS",
    model: "RSC-445-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1482.90,
    description: "RCS 8MM Evaporator Series - 41,16 kW Cooling Capacity",
    specifications: "Cooling: 41,16 kW | Heating: 11,61 kW | Capacity: 18.771 | Phases: 4 | Voltage: 450V | Current: 18.007A | Length: 13442mm | Width: 10031mm | Height: 8430mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-445-850",
    code: "RSC-445-850",
    brand: "RCS",
    model: "RSC-445-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1848.31,
    description: "RCS 8MM Evaporator Series - 51,45 kW Cooling Capacity",
    specifications: "Cooling: 51,45 kW | Heating: 17,42 kW | Capacity: 17.603 | Phases: 4 | Voltage: 450V | Current: 22.175A | Length: 16674mm | Width: 13619mm | Height: 11404mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-445-860",
    code: "RSC-445-860",
    brand: "RCS",
    model: "RSC-445-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 2165.55,
    description: "RCS 8MM Evaporator Series - 61,74 kW Cooling Capacity",
    specifications: "Cooling: 61,74 kW | Heating: 22,17 kW | Capacity: 16.734 | Phases: 4 | Voltage: 450V | Current: 25.307A | Length: 19098mm | Width: 15638mm | Height: 12870mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-445-880",
    code: "RSC-445-880",
    brand: "RCS",
    model: "RSC-445-880",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 2679.94,
    description: "RCS 8MM Evaporator Series - 82,32 kW Cooling Capacity",
    specifications: "Cooling: 82,32 kW | Heating: 29,56 kW | Capacity: 15.255 | Phases: 4 | Voltage: 450V | Current: 29.545A | Length: 22426mm | Width: 17261mm | Height: 14527mm | Fan Speed 1: 22 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-450-840",
    code: "RSC-450-840",
    brand: "RCS",
    model: "RSC-450-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1887.21,
    description: "RCS 8MM Evaporator Series - 56,00 kW Cooling Capacity",
    specifications: "Cooling: 56,00 kW | Heating: 16,34 kW | Capacity: 30.827 | Phases: 4 | Voltage: 500V | Current: 26.984A | Length: 20047mm | Width: 16325mm | Height: 13735mm | Fan Speed 1: 22 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-450-850",
    code: "RSC-450-850",
    brand: "RCS",
    model: "RSC-450-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 2396.47,
    description: "RCS 8MM Evaporator Series - 70,00 kW Cooling Capacity",
    specifications: "Cooling: 70,00 kW | Heating: 24,51 kW | Capacity: 28.327 | Phases: 4 | Voltage: 500V | Current: 33.146A | Length: 24882mm | Width: 20187mm | Height: 17029mm | Fan Speed 1: 22 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-450-860",
    code: "RSC-450-860",
    brand: "RCS",
    model: "RSC-450-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 2778.32,
    description: "RCS 8MM Evaporator Series - 84,00 kW Cooling Capacity",
    specifications: "Cooling: 84,00 kW | Heating: 30,16 kW | Capacity: 26.853 | Phases: 4 | Voltage: 500V | Current: 37.473A | Length: 28239mm | Width: 22836mm | Height: 19311mm | Fan Speed 1: 22 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-450-880",
    code: "RSC-450-880",
    brand: "RCS",
    model: "RSC-450-880",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 3473.55,
    description: "RCS 8MM Evaporator Series - 112,00 kW Cooling Capacity",
    specifications: "Cooling: 112,00 kW | Heating: 40,22 kW | Capacity: 23.972 | Phases: 4 | Voltage: 500V | Current: 43.555A | Length: 32987mm | Width: 26650mm | Height: 22364mm | Fan Speed 1: 28 | Fan Speed 2: 42",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRcsEvaporatorSeriesPart6() {
  try {
    console.log('🔄 Starting RCS 8MM EVAPORATÖR SERİSİ Part 6 (Final) addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rcsEvaporatorProductsPart6),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RCS 8MM EVAPORATÖR SERİSİ Part 6 completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete RCS 8MM EVAPORATÖR SERİSİ addition finished! Total: 65 products');
    } else {
      console.log('❌ Failed to add RCS products Part 6:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRcsEvaporatorSeriesPart6();