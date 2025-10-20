const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RCS 8MM EVAPORATÖR SERİSİ products data - Part 5 (Final batch - remaining products)
const rcsEvaporatorProductsPart5 = [
  {
    name: "RSC-340-830",
    code: "RSC-340-830",
    brand: "RCS",
    model: "RSC-340-830",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 859.84,
    description: "RCS 8MM Evaporator Series - 21,84 kW Cooling Capacity",
    specifications: "Cooling: 21,84 kW | Heating: 5,94 kW | Capacity: 11.163 | Phases: 3 | Voltage: 400V | Current: 9.250A | Length: 6905mm | Width: 5153mm | Height: 4330mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-340-840",
    code: "RSC-340-840",
    brand: "RCS",
    model: "RSC-340-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1099.55,
    description: "RCS 8MM Evaporator Series - 29,12 kW Cooling Capacity",
    specifications: "Cooling: 29,12 kW | Heating: 10,05 kW | Capacity: 10.734 | Phases: 3 | Voltage: 400V | Current: 12.234A | Length: 9201mm | Width: 7321mm | Height: 6117mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-340-850",
    code: "RSC-340-850",
    brand: "RCS",
    model: "RSC-340-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1207.18,
    description: "RCS 8MM Evaporator Series - 36,40 kW Cooling Capacity",
    specifications: "Cooling: 36,40 kW | Heating: 11,26 kW | Capacity: 10.341 | Phases: 3 | Voltage: 400V | Current: 13.983A | Length: 10530mm | Width: 8471mm | Height: 7043mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-340-860",
    code: "RSC-340-860",
    brand: "RCS",
    model: "RSC-340-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1405.67,
    description: "RCS 8MM Evaporator Series - 43,68 kW Cooling Capacity",
    specifications: "Cooling: 43,68 kW | Heating: 14,08 kW | Capacity: 10.000 | Phases: 3 | Voltage: 400V | Current: 15.867A | Length: 11983mm | Width: 9226mm | Height: 7746mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-340-880",
    code: "RSC-340-880",
    brand: "RCS",
    model: "RSC-340-880",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1768.23,
    description: "RCS 8MM Evaporator Series - 58,24 kW Cooling Capacity",
    specifications: "Cooling: 58,24 kW | Heating: 19,3 kW | Capacity: 9.126 | Phases: 3 | Voltage: 400V | Current: 18.769A | Length: 14258mm | Width: 10640mm | Height: 8941mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-345-840",
    code: "RSC-345-840",
    brand: "RCS",
    model: "RSC-345-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1300.56,
    description: "RCS 8MM Evaporator Series - 31,36 kW Cooling Capacity",
    specifications: "Cooling: 31,36 kW | Heating: 11,26 kW | Capacity: 13.979 | Phases: 3 | Voltage: 450V | Current: 14.527A | Length: 10900mm | Width: 8764mm | Height: 7363mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-345-850",
    code: "RSC-345-850",
    brand: "RCS",
    model: "RSC-345-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1430.83,
    description: "RCS 8MM Evaporator Series - 39,20 kW Cooling Capacity",
    specifications: "Cooling: 39,20 kW | Heating: 12,87 kW | Capacity: 13.299 | Phases: 3 | Voltage: 450V | Current: 16.669A | Length: 12527mm | Width: 10008mm | Height: 8410mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-345-860",
    code: "RSC-345-860",
    brand: "RCS",
    model: "RSC-345-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1659.48,
    description: "RCS 8MM Evaporator Series - 47,04 kW Cooling Capacity",
    specifications: "Cooling: 47,04 kW | Heating: 16,09 kW | Capacity: 12.713 | Phases: 3 | Voltage: 450V | Current: 18.875A | Length: 14236mm | Width: 11389mm | Height: 9555mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-345-880",
    code: "RSC-345-880",
    brand: "RCS",
    model: "RSC-345-880",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 2104.94,
    description: "RCS 8MM Evaporator Series - 62,72 kW Cooling Capacity",
    specifications: "Cooling: 62,72 kW | Heating: 22,52 kW | Capacity: 11.528 | Phases: 3 | Voltage: 450V | Current: 22.473A | Length: 17055mm | Width: 13060mm | Height: 10970mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-350-840",
    code: "RSC-350-840",
    brand: "RCS",
    model: "RSC-350-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 1715.83,
    description: "RCS 8MM Evaporator Series - 47,04 kW Cooling Capacity",
    specifications: "Cooling: 47,04 kW | Heating: 15,84 kW | Capacity: 24.088 | Phases: 3 | Voltage: 500V | Current: 22.925A | Length: 17181mm | Width: 13548mm | Height: 11227mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-350-850",
    code: "RSC-350-850",
    brand: "RCS",
    model: "RSC-350-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 2041.32,
    description: "RCS 8MM Evaporator Series - 58,80 kW Cooling Capacity",
    specifications: "Cooling: 58,80 kW | Heating: 20,59 kW | Capacity: 22.450 | Phases: 3 | Voltage: 500V | Current: 26.980A | Length: 20259mm | Width: 16001mm | Height: 13323mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-350-860",
    code: "RSC-350-860",
    brand: "RCS",
    model: "RSC-350-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 2366.82,
    description: "RCS 8MM Evaporator Series - 70,56 kW Cooling Capacity",
    specifications: "Cooling: 70,56 kW | Heating: 25,34 kW | Capacity: 21.167 | Phases: 3 | Voltage: 500V | Current: 30.401A | Length: 22928mm | Width: 18100mm | Height: 15225mm | Fan Speed 1: 22 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-350-880",
    code: "RSC-350-880",
    brand: "RCS",
    model: "RSC-350-880",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 2950.30,
    description: "RCS 8MM Evaporator Series - 94,08 kW Cooling Capacity",
    specifications: "Cooling: 94,08 kW | Heating: 33,78 kW | Capacity: 19.574 | Phases: 3 | Voltage: 500V | Current: 36.199A | Length: 27421mm | Width: 21586mm | Height: 18258mm | Fan Speed 1: 22 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRcsEvaporatorSeriesPart5() {
  try {
    console.log('🔄 Starting RCS 8MM EVAPORATÖR SERİSİ Part 5 (Final batch) addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rcsEvaporatorProductsPart5),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RCS 8MM EVAPORATÖR SERİSİ Part 5 completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
    } else {
      console.log('❌ Failed to add RCS products Part 5:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRcsEvaporatorSeriesPart5();