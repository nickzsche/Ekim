const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RSC 6MM EVAPORATÖR SERİSİ products data - Part 2 (next 20 products)
const rsc6mmEvaporatorProductsPart2 = [
  {
    name: "RSC-230-660",
    code: "RSC-230-660",
    brand: "RSC",
    model: "RSC-230-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 631.03,
    description: "RSC 6MM Evaporator Series - 20,44 kW Cooling Capacity",
    specifications: "Cooling: 20,44 kW | Heating: 5,45 kW | Capacity: 2.429 | Phases: 2 | Voltage: 300V | Current: 5.578A | Length: 5038mm | Width: 3831mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-235-630",
    code: "RSC-235-630",
    brand: "RSC",
    model: "RSC-235-630",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 418.16,
    description: "RSC 6MM Evaporator Series - 12,78 kW Cooling Capacity",
    specifications: "Cooling: 12,78 kW | Heating: 3,31 kW | Capacity: 5.100 | Phases: 2 | Voltage: 350V | Current: 5.264A | Length: 4745mm | Width: 3556mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-235-640",
    code: "RSC-235-640",
    brand: "RSC",
    model: "RSC-235-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 556.09,
    description: "RSC 6MM Evaporator Series - 17,04 kW Cooling Capacity",
    specifications: "Cooling: 17,04 kW | Heating: 4,34 kW | Capacity: 4.801 | Phases: 2 | Voltage: 350V | Current: 6.457A | Length: 5853mm | Width: 4392mm | Height: 492mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-235-650",
    code: "RSC-235-650",
    brand: "RSC",
    model: "RSC-235-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 654.64,
    description: "RSC 6MM Evaporator Series - 21,30 kW Cooling Capacity",
    specifications: "Cooling: 21,30 kW | Heating: 5,58 kW | Capacity: 4.360 | Phases: 2 | Voltage: 350V | Current: 7.368A | Length: 6694mm | Width: 5048mm | Height: 492mm | Fan Speed 1: 16 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-235-660",
    code: "RSC-235-660",
    brand: "RSC",
    model: "RSC-235-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 743.50,
    description: "RSC 6MM Evaporator Series - 25,56 kW Cooling Capacity",
    specifications: "Cooling: 25,56 kW | Heating: 6,61 kW | Capacity: 4.073 | Phases: 2 | Voltage: 350V | Current: 8.106A | Length: 7356mm | Width: 5564mm | Height: 492mm | Fan Speed 1: 16 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-240-630",
    code: "RSC-240-630",
    brand: "RSC",
    model: "RSC-240-630",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 633.38,
    description: "RSC 6MM Evaporator Series - 19,11 kW Cooling Capacity",
    specifications: "Cooling: 19,11 kW | Heating: 4,71 kW | Capacity: 7.157 | Phases: 2 | Voltage: 400V | Current: 7.343A | Length: 6756mm | Width: 5064mm | Height: 512mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-240-640",
    code: "RSC-240-640",
    brand: "RSC",
    model: "RSC-240-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 761.52,
    description: "RSC 6MM Evaporator Series - 25,48 kW Cooling Capacity",
    specifications: "Cooling: 25,48 kW | Heating: 6,80 kW | Capacity: 6.776 | Phases: 2 | Voltage: 400V | Current: 9.416A | Length: 8393mm | Width: 6300mm | Height: 512mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-240-650",
    code: "RSC-240-650",
    brand: "RSC",
    model: "RSC-240-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 913.75,
    description: "RSC 6MM Evaporator Series - 31,85 kW Cooling Capacity",
    specifications: "Cooling: 31,85 kW | Heating: 8,37 kW | Capacity: 6.384 | Phases: 2 | Voltage: 400V | Current: 11.033A | Length: 9861mm | Width: 7438mm | Height: 512mm | Fan Speed 1: 16 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-240-660",
    code: "RSC-240-660",
    brand: "RSC",
    model: "RSC-240-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1011.99,
    description: "RSC 6MM Evaporator Series - 38,22 kW Cooling Capacity",
    specifications: "Cooling: 38,22 kW | Heating: 9,15 kW | Capacity: 6.079 | Phases: 2 | Voltage: 400V | Current: 12.027A | Length: 10771mm | Width: 8133mm | Height: 512mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-245-640",
    code: "RSC-245-640",
    brand: "RSC",
    model: "RSC-245-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1039.22,
    description: "RSC 6MM Evaporator Series - 32,67 kW Cooling Capacity",
    specifications: "Cooling: 32,67 kW | Heating: 8,71 kW | Capacity: 9.254 | Phases: 2 | Voltage: 450V | Current: 12.643A | Length: 11331mm | Width: 8513mm | Height: 532mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-245-650",
    code: "RSC-245-650",
    brand: "RSC",
    model: "RSC-245-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1205.05,
    description: "RSC 6MM Evaporator Series - 40,83 kW Cooling Capacity",
    specifications: "Cooling: 40,83 kW | Heating: 10,89 kW | Capacity: 8.772 | Phases: 2 | Voltage: 450V | Current: 14.702A | Length: 13177mm | Width: 9937mm | Height: 532mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-245-660",
    code: "RSC-245-660",
    brand: "RSC",
    model: "RSC-245-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1379.48,
    description: "RSC 6MM Evaporator Series - 49,00 kW Cooling Capacity",
    specifications: "Cooling: 49,00 kW | Heating: 13,07 kW | Capacity: 8.361 | Phases: 2 | Voltage: 450V | Current: 16.404A | Length: 14721mm | Width: 11129mm | Height: 532mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-245-680",
    code: "RSC-245-680",
    brand: "RSC",
    model: "RSC-245-680",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1709.31,
    description: "RSC 6MM Evaporator Series - 65,33 kW Cooling Capacity",
    specifications: "Cooling: 65,33 kW | Heating: 17,43 kW | Capacity: 7.621 | Phases: 2 | Voltage: 450V | Current: 18.930A | Length: 17058mm | Width: 12967mm | Height: 532mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-250-460",
    code: "RSC-250-460",
    brand: "RSC",
    model: "RSC-250-460",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1232.49,
    description: "RSC 6MM Evaporator Series - 41,81 kW Cooling Capacity",
    specifications: "Cooling: 41,81 kW | Heating: 10,46 kW | Capacity: 14.774 | Phases: 2 | Voltage: 500V | Current: 17.227A | Length: 15878mm | Width: 11881mm | Height: 552mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-250-650",
    code: "RSC-250-650",
    brand: "RSC",
    model: "RSC-250-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1484.99,
    description: "RSC 6MM Evaporator Series - 52,27 kW Cooling Capacity",
    specifications: "Cooling: 52,27 kW | Heating: 13,94 kW | Capacity: 13.749 | Phases: 2 | Voltage: 500V | Current: 20.644A | Length: 18647mm | Width: 14006mm | Height: 552mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-250-660",
    code: "RSC-250-660",
    brand: "RSC",
    model: "RSC-250-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1645.35,
    description: "RSC 6MM Evaporator Series - 62,72 kW Cooling Capacity",
    specifications: "Cooling: 62,72 kW | Heating: 15,69 kW | Capacity: 13.147 | Phases: 2 | Voltage: 500V | Current: 22.841A | Length: 20643mm | Width: 15539mm | Height: 552mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-250-680",
    code: "RSC-250-680",
    brand: "RSC",
    model: "RSC-250-680",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 2050.15,
    description: "RSC 6MM Evaporator Series - 83,63 kW Cooling Capacity",
    specifications: "Cooling: 83,63 kW | Heating: 20,91 kW | Capacity: 11.616 | Phases: 2 | Voltage: 500V | Current: 26.250A | Length: 23689mm | Width: 17935mm | Height: 552mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-335-630",
    code: "RSC-335-630",
    brand: "RSC",
    model: "RSC-335-630",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 821.06,
    description: "RSC 6MM Evaporator Series - 24,64 kW Cooling Capacity",
    specifications: "Cooling: 24,64 kW | Heating: 6,37 kW | Capacity: 8.184 | Phases: 3 | Voltage: 350V | Current: 9.276A | Length: 8381mm | Width: 6284mm | Height: 492mm | Fan Speed 1: 16 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-335-640",
    code: "RSC-335-640",
    brand: "RSC",
    model: "RSC-335-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 955.92,
    description: "RSC 6MM Evaporator Series - 32,85 kW Cooling Capacity",
    specifications: "Cooling: 32,85 kW | Heating: 7,97 kW | Capacity: 7.786 | Phases: 3 | Voltage: 350V | Current: 11.342A | Length: 10234mm | Width: 7699mm | Height: 492mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-335-650",
    code: "RSC-335-650",
    brand: "RSC",
    model: "RSC-335-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1108.84,
    description: "RSC 6MM Evaporator Series - 41,07 kW Cooling Capacity",
    specifications: "Cooling: 41,07 kW | Heating: 9,96 kW | Capacity: 7.535 | Phases: 3 | Voltage: 350V | Current: 13.235A | Length: 11971mm | Width: 9024mm | Height: 492mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRsc6mmEvaporatorSeriesPart2() {
  try {
    console.log('🔄 Starting RSC 6MM EVAPORATÖR SERİSİ Part 2 addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsc6mmEvaporatorProductsPart2),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RSC 6MM EVAPORATÖR SERİSİ Part 2 completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
    } else {
      console.log('❌ Failed to add RSC 6MM products Part 2:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRsc6mmEvaporatorSeriesPart2();