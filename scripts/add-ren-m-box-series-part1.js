const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// REN M BOX Series products data - Part 1 (18 products)
const renMBoxProductsPart1 = [
  {
    name: "REN M BOX-059-245 LG",
    code: "REN-M-BOX-059-245-LG",
    brand: "REN M BOX",
    model: "REN M BOX-059-245 LG",
    category: "REN M BOX SERİSİ",
    price: 2117.47,
    description: "REN M BOX Series LG - 59,38 kW Cooling Capacity",
    specifications: "Cooling: 59,38 kW | Heating: 4,86 kW | Capacity: 32.690 | Phases: 2 | Voltage: 450V | Current: 10.233A | Length: 920mm | Width: 1550mm | Height: 1654mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-089-245 LG",
    code: "REN-M-BOX-089-245-LG",
    brand: "REN M BOX",
    model: "REN M BOX-089-245 LG",
    category: "REN M BOX SERİSİ",
    price: 2317.16,
    description: "REN M BOX Series LG - 89,08 kW Cooling Capacity",
    specifications: "Cooling: 89,08 kW | Heating: 7,28 kW | Capacity: 40.440 | Phases: 2 | Voltage: 450V | Current: 9.795A | Length: 920mm | Width: 1550mm | Height: 1654mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-119-245 LG",
    code: "REN-M-BOX-119-245-LG",
    brand: "REN M BOX",
    model: "REN M BOX-119-245 LG",
    category: "REN M BOX SERİSİ",
    price: 2673.18,
    description: "REN M BOX Series LG - 118,76 kW Cooling Capacity",
    specifications: "Cooling: 118,76 kW | Heating: 9,72 kW | Capacity: 45.050 | Phases: 2 | Voltage: 450V | Current: 9.407A | Length: 920mm | Width: 1550mm | Height: 1654mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-059-250 LG",
    code: "REN-M-BOX-059-250-LG",
    brand: "REN M BOX",
    model: "REN M BOX-059-250 LG",
    category: "REN M BOX SERİSİ",
    price: 2117.47,
    description: "REN M BOX Series LG - 59,38 kW Cooling Capacity",
    specifications: "Cooling: 59,38 kW | Heating: 4,86 kW | Capacity: 41.230 | Phases: 2 | Voltage: 500V | Current: 15.197A | Length: 920mm | Width: 1550mm | Height: 1654mm | Fan Speed 1: 19 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-089-250 LG",
    code: "REN-M-BOX-089-250-LG",
    brand: "REN M BOX",
    model: "REN M BOX-089-250 LG",
    category: "REN M BOX SERİSİ",
    price: 2317.16,
    description: "REN M BOX Series LG - 89,08 kW Cooling Capacity",
    specifications: "Cooling: 89,08 kW | Heating: 7,28 kW | Capacity: 52.700 | Phases: 2 | Voltage: 500V | Current: 14.306A | Length: 920mm | Width: 1550mm | Height: 1654mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-108-250 LG",
    code: "REN-M-BOX-108-250-LG",
    brand: "REN M BOX",
    model: "REN M BOX-108-250 LG",
    category: "REN M BOX SERİSİ",
    price: 2591.89,
    description: "REN M BOX Series LG - 108 kW Cooling Capacity",
    specifications: "Cooling: 108 kW | Heating: 10,06 kW | Capacity: 57.006 | Phases: 2 | Voltage: 500V | Current: 13.779A | Length: 805mm | Width: 1534mm | Height: 1588mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-119-250 LG",
    code: "REN-M-BOX-119-250-LG",
    brand: "REN M BOX",
    model: "REN M BOX-119-250 LG",
    category: "REN M BOX SERİSİ",
    price: 2673.18,
    description: "REN M BOX Series LG - 118,76 kW Cooling Capacity",
    specifications: "Cooling: 118,76 kW | Heating: 9,72 kW | Capacity: 59.310 | Phases: 2 | Voltage: 500V | Current: 13.535A | Length: 920mm | Width: 1550mm | Height: 1654mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-144-250 LG",
    code: "REN-M-BOX-144-250-LG",
    brand: "REN M BOX",
    model: "REN M BOX-144-250 LG",
    category: "REN M BOX SERİSİ",
    price: 3108.56,
    description: "REN M BOX Series LG - 144 kW Cooling Capacity",
    specifications: "Cooling: 144 kW | Heating: 13,42 kW | Capacity: 69.172 | Phases: 2 | Voltage: 500V | Current: 11.924A | Length: 805mm | Width: 1534mm | Height: 1588mm | Fan Speed 1: 28 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-069-263 LG",
    code: "REN-M-BOX-069-263-LG",
    brand: "REN M BOX",
    model: "REN M BOX-069-263 LG",
    category: "REN M BOX SERİSİ",
    price: 2643.29,
    description: "REN M BOX Series LG - 69,28 kW Cooling Capacity",
    specifications: "Cooling: 69,28 kW | Heating: 11,34 kW | Capacity: 50.920 | Phases: 2 | Voltage: 630V | Current: 15.754A | Length: 1070mm | Width: 1750mm | Height: 1654mm | Fan Speed 1: 28 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-104-263 LG",
    code: "REN-M-BOX-104-263-LG",
    brand: "REN M BOX",
    model: "REN M BOX-104-263 LG",
    category: "REN M BOX SERİSİ",
    price: 2872.91,
    description: "REN M BOX Series LG - 103,92 kW Cooling Capacity",
    specifications: "Cooling: 103,92 kW | Heating: 8,50 kW | Capacity: 62.420 | Phases: 2 | Voltage: 630V | Current: 17.245A | Length: 1070mm | Width: 1750mm | Height: 1654mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-139-263 LG",
    code: "REN-M-BOX-139-263-LG",
    brand: "REN M BOX",
    model: "REN M BOX-139-263 LG",
    category: "REN M BOX SERİSİ",
    price: 3168.09,
    description: "REN M BOX Series LG - 138,56 kW Cooling Capacity",
    specifications: "Cooling: 138,56 kW | Heating: 11,34 kW | Capacity: 69.520 | Phases: 2 | Voltage: 630V | Current: 15.754A | Length: 1070mm | Width: 1750mm | Height: 1654mm | Fan Speed 1: 28 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-089-350 LG",
    code: "REN-M-BOX-089-350-LG",
    brand: "REN M BOX",
    model: "REN M BOX-089-350 LG",
    category: "REN M BOX SERİSİ",
    price: 2664.30,
    description: "REN M BOX Series LG - 89,08 kW Cooling Capacity",
    specifications: "Cooling: 89,08 kW | Heating: 7,28 kW | Capacity: 61.820 | Phases: 3 | Voltage: 500V | Current: 22.795A | Length: 920mm | Width: 1250mm | Height: 1654mm | Fan Speed 1: 22 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-134-350 LG",
    code: "REN-M-BOX-134-350-LG",
    brand: "REN M BOX",
    model: "REN M BOX-134-350 LG",
    category: "REN M BOX SERİSİ",
    price: 3127.69,
    description: "REN M BOX Series LG - 133,62 kW Cooling Capacity",
    specifications: "Cooling: 133,62 kW | Heating: 10,94 kW | Capacity: 79.450 | Phases: 3 | Voltage: 500V | Current: 21.460A | Length: 920mm | Width: 1250mm | Height: 1654mm | Fan Speed 1: 28 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-167-350 LG",
    code: "REN-M-BOX-167-350-LG",
    brand: "REN M BOX",
    model: "REN M BOX-167-350 LG",
    category: "REN M BOX SERİSİ",
    price: 3576.74,
    description: "REN M BOX Series LG - 167 kW Cooling Capacity",
    specifications: "Cooling: 167 kW | Heating: 15,48 kW | Capacity: 85.206 | Phases: 3 | Voltage: 500V | Current: 20.806A | Length: 705mm | Width: 1984mm | Height: 1688mm | Fan Speed 1: 28 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-178-350 LG",
    code: "REN-M-BOX-178-350-LG",
    brand: "REN M BOX",
    model: "REN M BOX-178-350 LG",
    category: "REN M BOX SERİSİ",
    price: 3665.64,
    description: "REN M BOX Series LG - 178,14 kW Cooling Capacity",
    specifications: "Cooling: 178,14 kW | Heating: 14,58 kW | Capacity: 89.360 | Phases: 3 | Voltage: 500V | Current: 20.303A | Length: 920mm | Width: 1250mm | Height: 1654mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-222-350 LG",
    code: "REN-M-BOX-222-350-LG",
    brand: "REN M BOX",
    model: "REN M BOX-222-350 LG",
    category: "REN M BOX SERİSİ",
    price: 4358.69,
    description: "REN M BOX Series LG - 222 kW Cooling Capacity",
    specifications: "Cooling: 222 kW | Heating: 20,64 kW | Capacity: 101.158 | Phases: 3 | Voltage: 500V | Current: 18.756A | Length: 705mm | Width: 1984mm | Height: 1688mm | Fan Speed 1: 28 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-104-363 LG",
    code: "REN-M-BOX-104-363-LG",
    brand: "REN M BOX",
    model: "REN M BOX-104-363 LG",
    category: "REN M BOX SERİSİ",
    price: 3504.93,
    description: "REN M BOX Series LG - 103,92 kW Cooling Capacity",
    specifications: "Cooling: 103,92 kW | Heating: 8,50 kW | Capacity: 76.370 | Phases: 3 | Voltage: 630V | Current: 28.810A | Length: 1070mm | Width: 2450mm | Height: 1654mm | Fan Speed 1: 28 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "REN M BOX-156-363 LG",
    code: "REN-M-BOX-156-363-LG",
    brand: "REN M BOX",
    model: "REN M BOX-156-363 LG",
    category: "REN M BOX SERİSİ",
    price: 3924.37,
    description: "REN M BOX Series LG - 155,58 kW Cooling Capacity",
    specifications: "Cooling: 155,58 kW | Heating: 12,76 kW | Capacity: 93.580 | Phases: 3 | Voltage: 630V | Current: 25.867A | Length: 1070mm | Width: 2450mm | Height: 1654mm | Fan Speed 1: 28 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRenMBoxSeriesPart1() {
  try {
    console.log('🔄 Starting REN M BOX series addition - Part 1...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(renMBoxProductsPart1),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ REN M BOX series Part 1 completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
    } else {
      console.log('❌ Failed to add REN M BOX products Part 1:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRenMBoxSeriesPart1();