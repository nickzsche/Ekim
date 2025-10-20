const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RCS 8MM EVAPORATÖR SERİSİ products data (complete series)
const rcsEvaporatorProducts = [
  {
    name: "RSC-130-830",
    code: "RSC-130-830",
    brand: "RCS",
    model: "RSC-130-830",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 269.64,
    description: "RCS 8MM Evaporator Series - 4,20 kW Cooling Capacity",
    specifications: "Cooling: 4,20 kW | Heating: 1,41 kW | Capacity: 1.555 | Phases: 1 | Voltage: 300V | Current: 1.591A | Length: 1201mm | Width: 924mm | Height: 765mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-130-840",
    code: "RSC-130-840",
    brand: "RCS",
    model: "RSC-130-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 318.17,
    description: "RCS 8MM Evaporator Series - 5,60 kW Cooling Capacity",
    specifications: "Cooling: 5,60 kW | Heating: 2,01 kW | Capacity: 1.472 | Phases: 1 | Voltage: 300V | Current: 2.006A | Length: 1518mm | Width: 1151mm | Height: 955mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-130-850",
    code: "RSC-130-850",
    brand: "RCS",
    model: "RSC-130-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 354.62,
    description: "RCS 8MM Evaporator Series - 7,00 kW Cooling Capacity",
    specifications: "Cooling: 7,00 kW | Heating: 2,41 kW | Capacity: 1.424 | Phases: 1 | Voltage: 300V | Current: 2.308A | Length: 1750mm | Width: 1272mm | Height: 1064mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-130-860",
    code: "RSC-130-860",
    brand: "RCS",
    model: "RSC-130-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 403.15,
    description: "RCS 8MM Evaporator Series - 8,40 kW Cooling Capacity",
    specifications: "Cooling: 8,40 kW | Heating: 3,02 kW | Capacity: 1.357 | Phases: 1 | Voltage: 300V | Current: 2.599A | Length: 1978mm | Width: 1447mm | Height: 1206mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-135-830",
    code: "RSC-135-830",
    brand: "RCS",
    model: "RSC-135-830",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 309.05,
    description: "RCS 8MM Evaporator Series - 5,20 kW Cooling Capacity",
    specifications: "Cooling: 5,20 kW | Heating: 1,81 kW | Capacity: 2.728 | Phases: 1 | Voltage: 350V | Current: 2.370A | Length: 1779mm | Width: 1334mm | Height: 1112mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-135-840",
    code: "RSC-135-840",
    brand: "RCS",
    model: "RSC-135-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 374.48,
    description: "RCS 8MM Evaporator Series - 6,93 kW Cooling Capacity",
    specifications: "Cooling: 6,93 kW | Heating: 2,49 kW | Capacity: 2.587 | Phases: 1 | Voltage: 350V | Current: 2.985A | Length: 2245mm | Width: 1709mm | Height: 1421mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-135-850",
    code: "RSC-135-850",
    brand: "RCS",
    model: "RSC-135-850",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 390.61,
    description: "RCS 8MM Evaporator Series - 8,66 kW Cooling Capacity",
    specifications: "Cooling: 8,66 kW | Heating: 2,94 kW | Capacity: 2.509 | Phases: 1 | Voltage: 350V | Current: 3.477A | Length: 2631mm | Width: 1953mm | Height: 1624mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-135-860",
    code: "RSC-135-860",
    brand: "RCS",
    model: "RSC-135-860",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 457.02,
    description: "RCS 8MM Evaporator Series - 10,40 kW Cooling Capacity",
    specifications: "Cooling: 10,40 kW | Heating: 3,73 kW | Capacity: 2.373 | Phases: 1 | Voltage: 350V | Current: 3.880A | Length: 2938mm | Width: 2209mm | Height: 1844mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-140-830",
    code: "RSC-140-830",
    brand: "RCS",
    model: "RSC-140-830",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 396.26,
    description: "RCS 8MM Evaporator Series - 7,51 kW Cooling Capacity",
    specifications: "Cooling: 7,51 kW | Heating: 2,49 kW | Capacity: 3.746 | Phases: 1 | Voltage: 400V | Current: 3.299A | Length: 2473mm | Width: 1902mm | Height: 1599mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-140-840",
    code: "RSC-140-840",
    brand: "RCS",
    model: "RSC-140-840",
    category: "RCS 8MM EVAPORATÖR SERİSİ",
    price: 481.28,
    description: "RCS 8MM Evaporator Series - 10,01 kW Cooling Capacity",
    specifications: "Cooling: 10,01 kW | Heating: 3,59 kW | Capacity: 3.605 | Phases: 1 | Voltage: 400V | Current: 4.204A | Length: 3166mm | Width: 2435mm | Height: 1997mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRcsEvaporatorSeries() {
  try {
    console.log('🔄 Starting RCS 8MM EVAPORATÖR SERİSİ addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rcsEvaporatorProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RCS 8MM EVAPORATÖR SERİSİ addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
    } else {
      console.log('❌ Failed to add RCS products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRcsEvaporatorSeries();