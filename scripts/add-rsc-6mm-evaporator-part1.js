const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RSC 6MM EVAPORATÖR SERİSİ products data - Part 1 (first 20 products)
const rsc6mmEvaporatorProductsPart1 = [
  {
    name: "RSC-130-630",
    code: "RSC-130-630",
    brand: "RSC",
    model: "RSC-130-630",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 277.53,
    description: "RSC 6MM Evaporator Series - 5,60 kW Cooling Capacity",
    specifications: "Cooling: 5,60 kW | Heating: 1,49 kW | Capacity: 1.475 | Phases: 1 | Voltage: 300V | Current: 1.887A | Length: 1720mm | Width: 1296mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-130-640",
    code: "RSC-130-640",
    brand: "RSC",
    model: "RSC-130-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 328.28,
    description: "RSC 6MM Evaporator Series - 7,47 kW Cooling Capacity",
    specifications: "Cooling: 7,47 kW | Heating: 1,99 kW | Capacity: 1.404 | Phases: 1 | Voltage: 300V | Current: 2.372A | Length: 2103mm | Width: 1589mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-130-650",
    code: "RSC-130-650",
    brand: "RSC",
    model: "RSC-130-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 365.70,
    description: "RSC 6MM Evaporator Series - 9,33 kW Cooling Capacity",
    specifications: "Cooling: 9,33 kW | Heating: 2,39 kW | Capacity: 1.334 | Phases: 1 | Voltage: 300V | Current: 2.675A | Length: 2402mm | Width: 1821mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-130-660",
    code: "RSC-130-660",
    brand: "RSC",
    model: "RSC-130-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 417.80,
    description: "RSC 6MM Evaporator Series - 11,20 kW Cooling Capacity",
    specifications: "Cooling: 11,20 kW | Heating: 2,99 kW | Capacity: 1.269 | Phases: 1 | Voltage: 300V | Current: 2.968A | Length: 2679mm | Width: 2039mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-135-630",
    code: "RSC-135-630",
    brand: "RSC",
    model: "RSC-135-630",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 305.22,
    description: "RSC 6MM Evaporator Series - 6,93 kW Cooling Capacity",
    specifications: "Cooling: 6,93 kW | Heating: 1,79 kW | Capacity: 2.604 | Phases: 1 | Voltage: 350V | Current: 2.766A | Length: 2483mm | Width: 1863mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-135-640",
    code: "RSC-135-640",
    brand: "RSC",
    model: "RSC-135-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 359.63,
    description: "RSC 6MM Evaporator Series - 9,24 kW Cooling Capacity",
    specifications: "Cooling: 9,24 kW | Heating: 2,46 kW | Capacity: 2.495 | Phases: 1 | Voltage: 350V | Current: 3.477A | Length: 3125mm | Width: 2350mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-135-650",
    code: "RSC-135-650",
    brand: "RSC",
    model: "RSC-135-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 412.39,
    description: "RSC 6MM Evaporator Series - 11,55 kW Cooling Capacity",
    specifications: "Cooling: 11,55 kW | Heating: 3,03 kW | Capacity: 2.307 | Phases: 1 | Voltage: 350V | Current: 3.920A | Length: 3553mm | Width: 2682mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-135-660",
    code: "RSC-135-660",
    brand: "RSC",
    model: "RSC-135-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 470.31,
    description: "RSC 6MM Evaporator Series - 13,86 kW Cooling Capacity",
    specifications: "Cooling: 13,86 kW | Heating: 3,70 kW | Capacity: 2.137 | Phases: 1 | Voltage: 350V | Current: 4.347A | Length: 3923mm | Width: 2972mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-140-630",
    code: "RSC-140-630",
    brand: "RSC",
    model: "RSC-140-630",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 416.15,
    description: "RSC 6MM Evaporator Series - 10,01 kW Cooling Capacity",
    specifications: "Cooling: 10,01 kW | Heating: 2,46 kW | Capacity: 3.639 | Phases: 1 | Voltage: 400V | Current: 3.808A | Length: 3504mm | Width: 2626mm | Height: 512mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-140-640",
    code: "RSC-140-640",
    brand: "RSC",
    model: "RSC-140-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 469.98,
    description: "RSC 6MM Evaporator Series - 13,35 kW Cooling Capacity",
    specifications: "Cooling: 13,35 kW | Heating: 3,56 kW | Capacity: 3.426 | Phases: 1 | Voltage: 400V | Current: 4.970A | Length: 4411mm | Width: 3321mm | Height: 512mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-140-650",
    code: "RSC-140-650",
    brand: "RSC",
    model: "RSC-140-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 544.20,
    description: "RSC 6MM Evaporator Series - 16,68 kW Cooling Capacity",
    specifications: "Cooling: 16,68 kW | Heating: 4,38 kW | Capacity: 3.263 | Phases: 1 | Voltage: 400V | Current: 5.687A | Length: 5107mm | Width: 3853mm | Height: 512mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-140-660",
    code: "RSC-140-660",
    brand: "RSC",
    model: "RSC-140-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 614.63,
    description: "RSC 6MM Evaporator Series - 20,02 kW Cooling Capacity",
    specifications: "Cooling: 20,02 kW | Heating: 5,34 kW | Capacity: 3.081 | Phases: 1 | Voltage: 400V | Current: 6.374A | Length: 5681mm | Width: 4303mm | Height: 512mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-145-630",
    code: "RSC-145-630",
    brand: "RSC",
    model: "RSC-145-630",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 480.10,
    description: "RSC 6MM Evaporator Series - 10,78 kW Cooling Capacity",
    specifications: "Cooling: 10,78 kW | Heating: 2,74 kW | Capacity: 4.739 | Phases: 1 | Voltage: 450V | Current: 4.472A | Length: 4134mm | Width: 3084mm | Height: 532mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-145-640",
    code: "RSC-145-640",
    brand: "RSC",
    model: "RSC-145-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 551.81,
    description: "RSC 6MM Evaporator Series - 14,37 kW Cooling Capacity",
    specifications: "Cooling: 14,37 kW | Heating: 3,83 kW | Capacity: 4.411 | Phases: 1 | Voltage: 450V | Current: 5.782A | Length: 5183mm | Width: 3890mm | Height: 532mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-145-650",
    code: "RSC-145-650",
    brand: "RSC",
    model: "RSC-145-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 618.48,
    description: "RSC 6MM Evaporator Series - 17,97 kW Cooling Capacity",
    specifications: "Cooling: 17,97 kW | Heating: 4,52 kW | Capacity: 4.176 | Phases: 1 | Voltage: 450V | Current: 6.656A | Length: 5936mm | Width: 4466mm | Height: 532mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-145-660",
    code: "RSC-145-660",
    brand: "RSC",
    model: "RSC-145-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 712.57,
    description: "RSC 6MM Evaporator Series - 21,56 kW Cooling Capacity",
    specifications: "Cooling: 21,56 kW | Heating: 5,75 kW | Capacity: 3.917 | Phases: 1 | Voltage: 450V | Current: 7.464A | Length: 6709mm | Width: 5065mm | Height: 532mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-145-680",
    code: "RSC-145-680",
    brand: "RSC",
    model: "RSC-145-680",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 877.30,
    description: "RSC 6MM Evaporator Series - 28,75 kW Cooling Capacity",
    specifications: "Cooling: 28,75 kW | Heating: 7,67 kW | Capacity: 3.474 | Phases: 1 | Voltage: 450V | Current: 8.515A | Length: 7636mm | Width: 5801mm | Height: 532mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-230-630",
    code: "RSC-230-630",
    brand: "RSC",
    model: "RSC-230-630",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 416.66,
    description: "RSC 6MM Evaporator Series - 10,22 kW Cooling Capacity",
    specifications: "Cooling: 10,22 kW | Heating: 2,54 kW | Capacity: 2.895 | Phases: 2 | Voltage: 300V | Current: 3.513A | Length: 3193mm | Width: 2397mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-230-640",
    code: "RSC-230-640",
    brand: "RSC",
    model: "RSC-230-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 486.47,
    description: "RSC 6MM Evaporator Series - 13,63 kW Cooling Capacity",
    specifications: "Cooling: 13,63 kW | Heating: 3,64 kW | Capacity: 2.711 | Phases: 2 | Voltage: 300V | Current: 4.403A | Length: 3972mm | Width: 2998mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-230-650",
    code: "RSC-230-650",
    brand: "RSC",
    model: "RSC-230-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 549.61,
    description: "RSC 6MM Evaporator Series - 17,03 kW Cooling Capacity",
    specifications: "Cooling: 17,03 kW | Heating: 4,36 kW | Capacity: 2.584 | Phases: 2 | Voltage: 300V | Current: 4.999A | Length: 4549mm | Width: 3445mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRsc6mmEvaporatorSeriesPart1() {
  try {
    console.log('🔄 Starting RSC 6MM EVAPORATÖR SERİSİ Part 1 addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsc6mmEvaporatorProductsPart1),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RSC 6MM EVAPORATÖR SERİSİ Part 1 completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
    } else {
      console.log('❌ Failed to add RSC 6MM products Part 1:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRsc6mmEvaporatorSeriesPart1();