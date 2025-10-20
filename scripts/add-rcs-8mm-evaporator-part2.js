const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RCS 8MM EVAPORATÖR SERİSİ products data - Part 2 (continuing from RSC-140-850)
const rcsEvaporatorProductsPart2 = [
  {
    name: "RSC-140-850",
    code: "RSC-140-850",
    brand: "RCS",
    model: "RSC-140-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 542.89,
    description: "RCS 8MM Evaporator Series - 12,51 kW Cooling Capacity",
    specifications: "Cooling: 12,51 kW | Heating: 4,42 kW | Capacity: 3.456 | Phases: 1 | Voltage: 400V | Current: 4.920A | Length: 3715mm | Width: 2867mm | Height: 2394mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-140-860",
    code: "RSC-140-860",
    brand: "RCS",
    model: "RSC-140-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 623.71,
    description: "RCS 8MM Evaporator Series - 15,02 kW Cooling Capacity",
    specifications: "Cooling: 15,02 kW | Heating: 5,39 kW | Capacity: 3.353 | Phases: 1 | Voltage: 400V | Current: 5.530A | Length: 4189mm | Width: 3366mm | Height: 2718mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-145-830",
    code: "RSC-145-830",
    brand: "RCS",
    model: "RSC-145-830",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 466.94,
    description: "RCS 8MM Evaporator Series - 8,09 kW Cooling Capacity",
    specifications: "Cooling: 8,09 kW | Heating: 2,72 kW | Capacity: 4.860 | Phases: 1 | Voltage: 450V | Current: 3.908A | Length: 2923mm | Width: 2248mm | Height: 1889mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-145-840",
    code: "RSC-145-840",
    brand: "RCS",
    model: "RSC-145-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 524.36,
    description: "RCS 8MM Evaporator Series - 10,78 kW Cooling Capacity",
    specifications: "Cooling: 10,78 kW | Heating: 3,87 kW | Capacity: 4.716 | Phases: 1 | Voltage: 450V | Current: 4.964A | Length: 3728mm | Width: 2887mm | Height: 2387mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-145-850",
    code: "RSC-145-850",
    brand: "RCS",
    model: "RSC-145-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 597.16,
    description: "RCS 8MM Evaporator Series - 13,48 kW Cooling Capacity",
    specifications: "Cooling: 13,48 kW | Heating: 4,56 kW | Capacity: 4.472 | Phases: 1 | Voltage: 450V | Current: 5.719A | Length: 4303mm | Width: 3498mm | Height: 2876mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-145-860",
    code: "RSC-145-860",
    brand: "RCS",
    model: "RSC-145-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 677.34,
    description: "RCS 8MM Evaporator Series - 16,17 kW Cooling Capacity",
    specifications: "Cooling: 16,17 kW | Heating: 5,53 kW | Capacity: 4.295 | Phases: 1 | Voltage: 450V | Current: 6.453A | Length: 4868mm | Width: 3935mm | Height: 3139mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-230-830",
    code: "RSC-230-830",
    brand: "RCS",
    model: "RSC-230-830",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 417.99,
    description: "RCS 8MM Evaporator Series - 7,67 kW Cooling Capacity",
    specifications: "Cooling: 7,67 kW | Heating: 2,75 kW | Capacity: 3.016 | Phases: 2 | Voltage: 300V | Current: 3.069A | Length: 2315mm | Width: 1783mm | Height: 1458mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-230-840",
    code: "RSC-230-840",
    brand: "RCS",
    model: "RSC-230-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 450.75,
    description: "RCS 8MM Evaporator Series - 10,22 kW Cooling Capacity",
    specifications: "Cooling: 10,22 kW | Heating: 3,3 kW | Capacity: 2.890 | Phases: 2 | Voltage: 300V | Current: 3.719A | Length: 2804mm | Width: 2059mm | Height: 1731mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-230-850",
    code: "RSC-230-850",
    brand: "RCS",
    model: "RSC-230-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 533.86,
    description: "RCS 8MM Evaporator Series - 12,78 kW Cooling Capacity",
    specifications: "Cooling: 12,78 kW | Heating: 4,4 kW | Capacity: 2.745 | Phases: 2 | Voltage: 300V | Current: 4.365A | Length: 3306mm | Width: 2502mm | Height: 2089mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-230-860",
    code: "RSC-230-860",
    brand: "RCS",
    model: "RSC-230-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 589.00,
    description: "RCS 8MM Evaporator Series - 15,33 kW Cooling Capacity",
    specifications: "Cooling: 15,33 kW | Heating: 5,14 kW | Capacity: 2.638 | Phases: 2 | Voltage: 300V | Current: 4.864A | Length: 3693mm | Width: 2676mm | Height: 2256mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRcsEvaporatorSeriesPart2() {
  try {
    console.log('🔄 Starting RCS 8MM EVAPORATÖR SERİSİ Part 2 addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rcsEvaporatorProductsPart2),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RCS 8MM EVAPORATÖR SERİSİ Part 2 completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
    } else {
      console.log('❌ Failed to add RCS products Part 2:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRcsEvaporatorSeriesPart2();