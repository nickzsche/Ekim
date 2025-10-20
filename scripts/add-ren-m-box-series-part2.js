const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// REN M BOX Series products data - Part 2 (remaining 17 products)
const renMBoxProductsPart2 = [
  {
    name: "REN M BOX-208-363 LG",
    code: "REN-M-BOX-208-363-LG",
    brand: "REN M BOX",
    model: "REN M BOX-208-363 LG",
    category: "REN M BOX SERİSİ",
    price: 4345.79,
    description: "REN M BOX Series LG - 207,84 kW Cooling Capacity",
    specifications: "Cooling: 207,84 kW | Heating: 17,00 kW | Capacity: 104.680 | Phases: 3 | Voltage: 630V | Current: 23.631A | Length: 1070mm | Width: 2450mm | Height: 1654mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-158-363 LG",
    code: "REN-M-BOX-158-363-LG",
    brand: "REN M BOX",
    model: "REN M BOX-158-363 LG",
    category: "REN M BOX SERİSİ",
    price: 4363.33,
    description: "REN M BOX Series LG - 158,36 kW Cooling Capacity",
    specifications: "Cooling: 158,36 kW | Heating: 12,96 kW | Capacity: 97.220 | Phases: 3 | Voltage: 630V | Current: 32.389A | Length: 1070mm | Width: 2800mm | Height: 2074mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-238-363 LG",
    code: "REN-M-BOX-238-363-LG",
    brand: "REN M BOX",
    model: "REN M BOX-238-363 LG",
    category: "REN M BOX SERİSİ",
    price: 5197.38,
    description: "REN M BOX Series LG - 237,54 kW Cooling Capacity",
    specifications: "Cooling: 237,54 kW | Heating: 19,44 kW | Capacity: 119.590 | Phases: 3 | Voltage: 630V | Current: 30.227A | Length: 1070mm | Width: 2800mm | Height: 2074mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-317-363 LG",
    code: "REN-M-BOX-317-363-LG",
    brand: "REN M BOX",
    model: "REN M BOX-317-363 LG",
    category: "REN M BOX SERİSİ",
    price: 6241.26,
    description: "REN M BOX Series LG - 316,7 kW Cooling Capacity",
    specifications: "Cooling: 316,7 kW | Heating: 25,92 kW | Capacity: 132.290 | Phases: 3 | Voltage: 630V | Current: 28.438A | Length: 1070mm | Width: 2800mm | Height: 2074mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-158-450 LG",
    code: "REN-M-BOX-158-450-LG",
    brand: "REN M BOX",
    model: "REN M BOX-158-450 LG",
    category: "REN M BOX SERİSİ",
    price: 4362.96,
    description: "REN M BOX Series LG - 158,36 kW Cooling Capacity",
    specifications: "Cooling: 158,36 kW | Heating: 12,96 kW | Capacity: 95.600 | Phases: 4 | Voltage: 500V | Current: 31.550A | Length: 920mm | Width: 2800mm | Height: 2074mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-222-450 LG",
    code: "REN-M-BOX-222-450-LG",
    brand: "REN M BOX",
    model: "REN M BOX-222-450 LG",
    category: "REN M BOX SERİSİ",
    price: 4498.73,
    description: "REN M BOX Series LG - 222 kW Cooling Capacity",
    specifications: "Cooling: 222 kW | Heating: 20,64 kW | Capacity: 111.971 | Phases: 4 | Voltage: 500V | Current: 30.758A | Length: 705mm | Width: 2614mm | Height: 1688mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-238-450 LG",
    code: "REN-M-BOX-238-450-LG",
    brand: "REN M BOX",
    model: "REN M BOX-238-450 LG",
    category: "REN M BOX SERİSİ",
    price: 5037.59,
    description: "REN M BOX Series LG - 237,54 kW Cooling Capacity",
    specifications: "Cooling: 237,54 kW | Heating: 19,44 kW | Capacity: 119.810 | Phases: 4 | Voltage: 500V | Current: 30.284A | Length: 920mm | Width: 2800mm | Height: 2074mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-297-450 LG",
    code: "REN-M-BOX-297-450-LG",
    brand: "REN M BOX",
    model: "REN M BOX-297-450 LG",
    category: "REN M BOX SERİSİ",
    price: 5525.68,
    description: "REN M BOX Series LG - 297 kW Cooling Capacity",
    specifications: "Cooling: 297 kW | Heating: 27,52 kW | Capacity: 127.235 | Phases: 4 | Voltage: 500V | Current: 29.842A | Length: 705mm | Width: 2614mm | Height: 1688mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-317-450 LG",
    code: "REN-M-BOX-317-450-LG",
    brand: "REN M BOX",
    model: "REN M BOX-317-450 LG",
    category: "REN M BOX SERİSİ",
    price: 5960.38,
    description: "REN M BOX Series LG - 316,7 kW Cooling Capacity",
    specifications: "Cooling: 316,7 kW | Heating: 25,92 kW | Capacity: 134.870 | Phases: 4 | Voltage: 500V | Current: 29.182A | Length: 920mm | Width: 2800mm | Height: 2074mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-185-463 LG",
    code: "REN-M-BOX-185-463-LG",
    brand: "REN M BOX",
    model: "REN M BOX-185-463 LG",
    category: "REN M BOX SERİSİ",
    price: 5194.15,
    description: "REN M BOX Series LG - 184,74 kW Cooling Capacity",
    specifications: "Cooling: 184,74 kW | Heating: 15,12 kW | Capacity: 121.830 | Phases: 4 | Voltage: 630V | Current: 41.892A | Length: 1065mm | Width: 3200mm | Height: 2074mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-277-463 LG",
    code: "REN-M-BOX-277-463-LG",
    brand: "REN M BOX",
    model: "REN M BOX-277-463 LG",
    category: "REN M BOX SERİSİ",
    price: 6015.32,
    description: "REN M BOX Series LG - 277,12 kW Cooling Capacity",
    specifications: "Cooling: 277,12 kW | Heating: 22,68 kW | Capacity: 149.760 | Phases: 4 | Voltage: 630V | Current: 38.662A | Length: 1065mm | Width: 3200mm | Height: 2074mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-369-463 LG",
    code: "REN-M-BOX-369-463-LG",
    brand: "REN M BOX",
    model: "REN M BOX-369-463 LG",
    category: "REN M BOX SERİSİ",
    price: 7148.54,
    description: "REN M BOX Series LG - 369,5 kW Cooling Capacity",
    specifications: "Cooling: 369,5 kW | Heating: 30,24 kW | Capacity: 165.420 | Phases: 4 | Voltage: 630V | Current: 36.079A | Length: 1065mm | Width: 3200mm | Height: 2074mm | Fan Speed 1: 42 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-158-280 LG",
    code: "REN-M-BOX-158-280-LG",
    brand: "REN M BOX",
    model: "REN M BOX-158-280 LG",
    category: "REN M BOX SERİSİ",
    price: 4643.37,
    description: "REN M BOX Series LG - 158,36 kW Cooling Capacity",
    specifications: "Cooling: 158,36 kW | Heating: 12,96 kW | Capacity: 113.850 | Phases: 2 | Voltage: 800V | Current: 41.835A | Length: 1105mm | Width: 2800mm | Height: 2069mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-238-280 LG",
    code: "REN-M-BOX-238-280-LG",
    brand: "REN M BOX",
    model: "REN M BOX-238-280 LG",
    category: "REN M BOX SERİSİ",
    price: 5385.99,
    description: "REN M BOX Series LG - 237,54 kW Cooling Capacity",
    specifications: "Cooling: 237,54 kW | Heating: 19,44 kW | Capacity: 142.630 | Phases: 2 | Voltage: 800V | Current: 39.057A | Length: 1105mm | Width: 2800mm | Height: 2069mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-317-280 LG",
    code: "REN-M-BOX-317-280-LG",
    brand: "REN M BOX",
    model: "REN M BOX-317-280 LG",
    category: "REN M BOX SERİSİ",
    price: 6307.50,
    description: "REN M BOX Series LG - 316,7 kW Cooling Capacity",
    specifications: "Cooling: 316,7 kW | Heating: 25,92 kW | Capacity: 159.740 | Phases: 2 | Voltage: 800V | Current: 36.627A | Length: 1105mm | Width: 2800mm | Height: 2069mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-198-380 LG",
    code: "REN-M-BOX-198-380-LG",
    brand: "REN M BOX",
    model: "REN M BOX-198-380 LG",
    category: "REN M BOX SERİSİ",
    price: 6224.05,
    description: "REN M BOX Series LG - 197,94 kW Cooling Capacity",
    specifications: "Cooling: 197,94 kW | Heating: 26,74 kW | Capacity: 161.340 | Phases: 3 | Voltage: 800V | Current: 58.099A | Length: 1135mm | Width: 3400mm | Height: 2069mm | Fan Speed 1: 35 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-528-480 LG",
    code: "REN-M-BOX-528-480-LG",
    brand: "REN M BOX",
    model: "REN M BOX-528-480 LG",
    category: "REN M BOX SERİSİ",
    price: 11563.33,
    description: "REN M BOX Series LG - 527,84 kW Cooling Capacity",
    specifications: "Cooling: 527,84 kW | Heating: 71,32 kW | Capacity: 292.190 | Phases: 4 | Voltage: 800V | Current: 64.598A | Length: 1135mm | Width: 4400mm | Height: 2069mm | Fan Speed 1: 54 | Fan Speed 2: 42",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRenMBoxSeriesPart2() {
  try {
    console.log('🔄 Starting REN M BOX series addition - Part 2...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(renMBoxProductsPart2),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ REN M BOX series Part 2 completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Total REN M BOX products: 35 (18 + 17)');
    } else {
      console.log('❌ Failed to add REN M BOX products Part 2:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRenMBoxSeriesPart2();