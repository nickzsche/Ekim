const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RSC 6MM EVAPORATÖR SERİSİ products data - Part 3 (Final batch)
const rsc6mmEvaporatorProductsPart3 = [
  {
    name: "RSC-335-660",
    code: "RSC-335-660",
    brand: "RSC",
    model: "RSC-335-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1263.06,
    description: "RSC 6MM Evaporator Series - 49,28 kW Cooling Capacity",
    specifications: "Cooling: 49,28 kW | Heating: 11,95 kW | Capacity: 7.178 | Phases: 3 | Voltage: 350V | Current: 14.663A | Length: 13356mm | Width: 10105mm | Height: 492mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-340-630",
    code: "RSC-340-630",
    brand: "RSC",
    model: "RSC-340-630",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 896.51,
    description: "RSC 6MM Evaporator Series - 29,12 kW Cooling Capacity",
    specifications: "Cooling: 29,12 kW | Heating: 5,94 kW | Capacity: 10.893 | Phases: 3 | Voltage: 400V | Current: 10.639A | Length: 9861mm | Width: 7337mm | Height: 512mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-340-640",
    code: "RSC-340-640",
    brand: "RSC",
    model: "RSC-340-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1147.73,
    description: "RSC 6MM Evaporator Series - 38,83 kW Cooling Capacity",
    specifications: "Cooling: 38,83 kW | Heating: 9,96 kW | Capacity: 10.216 | Phases: 3 | Voltage: 400V | Current: 13.930A | Length: 12867mm | Width: 9672mm | Height: 512mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-340-650",
    code: "RSC-340-650",
    brand: "RSC",
    model: "RSC-340-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1267.41,
    description: "RSC 6MM Evaporator Series - 48,53 kW Cooling Capacity",
    specifications: "Cooling: 48,53 kW | Heating: 11,15 kW | Capacity: 9.730 | Phases: 3 | Voltage: 400V | Current: 16.264A | Length: 14542mm | Width: 10944mm | Height: 512mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-340-660",
    code: "RSC-340-660",
    brand: "RSC",
    model: "RSC-340-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1477.94,
    description: "RSC 6MM Evaporator Series - 58,24 kW Cooling Capacity",
    specifications: "Cooling: 58,24 kW | Heating: 13,94 kW | Capacity: 9.180 | Phases: 3 | Voltage: 400V | Current: 18.184A | Length: 16352mm | Width: 12350mm | Height: 512mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-340-680",
    code: "RSC-340-680",
    brand: "RSC",
    model: "RSC-340-680",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1902.39,
    description: "RSC 6MM Evaporator Series - 77,65 kW Cooling Capacity",
    specifications: "Cooling: 77,65 kW | Heating: 19,40 kW | Capacity: 8.150 | Phases: 3 | Voltage: 400V | Current: 21.024A | Length: 19063mm | Width: 14499mm | Height: 512mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-345-630",
    code: "RSC-345-630",
    brand: "RSC",
    model: "RSC-345-630",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1141.44,
    description: "RSC 6MM Evaporator Series - 31,36 kW Cooling Capacity",
    specifications: "Cooling: 31,36 kW | Heating: 8,31 kW | Capacity: 14.072 | Phases: 3 | Voltage: 450V | Current: 13.265A | Length: 12247mm | Width: 9148mm | Height: 532mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-345-640",
    code: "RSC-345-640",
    brand: "RSC",
    model: "RSC-345-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1352.33,
    description: "RSC 6MM Evaporator Series - 41,81 kW Cooling Capacity",
    specifications: "Cooling: 41,81 kW | Heating: 11,15 kW | Capacity: 13.102 | Phases: 3 | Voltage: 450V | Current: 16.986A | Length: 15180mm | Width: 11393mm | Height: 532mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-345-650",
    code: "RSC-345-650",
    brand: "RSC",
    model: "RSC-345-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1559.14,
    description: "RSC 6MM Evaporator Series - 52,27 kW Cooling Capacity",
    specifications: "Cooling: 52,27 kW | Heating: 13,94 kW | Capacity: 12.286 | Phases: 3 | Voltage: 450V | Current: 19.631A | Length: 17657mm | Width: 13301mm | Height: 532mm | Fan Speed 1: 16 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-345-660",
    code: "RSC-345-660",
    brand: "RSC",
    model: "RSC-345-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1731.87,
    description: "RSC 6MM Evaporator Series - 62,72 kW Cooling Capacity",
    specifications: "Cooling: 62,72 kW | Heating: 15,93 kW | Capacity: 11.622 | Phases: 3 | Voltage: 450V | Current: 21.644A | Length: 19497mm | Width: 14699mm | Height: 532mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-345-680",
    code: "RSC-345-680",
    brand: "RSC",
    model: "RSC-345-680",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 2064.63,
    description: "RSC 6MM Evaporator Series - 83,63 kW Cooling Capacity",
    specifications: "Cooling: 83,63 kW | Heating: 19,92 kW | Capacity: 10.301 | Phases: 3 | Voltage: 450V | Current: 24.311A | Length: 21930mm | Width: 16621mm | Height: 532mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-350-640",
    code: "RSC-350-640",
    brand: "RSC",
    model: "RSC-350-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1794.67,
    description: "RSC 6MM Evaporator Series - 62,72 kW Cooling Capacity",
    specifications: "Cooling: 62,72 kW | Heating: 15,69 kW | Capacity: 22.180 | Phases: 3 | Voltage: 500V | Current: 25.791A | Length: 23770mm | Width: 17787mm | Height: 552mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-350-650",
    code: "RSC-350-650",
    brand: "RSC",
    model: "RSC-350-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 2050.37,
    description: "RSC 6MM Evaporator Series - 78,40 kW Cooling Capacity",
    specifications: "Cooling: 78,40 kW | Heating: 18,82 kW | Capacity: 20.820 | Phases: 3 | Voltage: 500V | Current: 30.320A | Length: 27417mm | Width: 20531mm | Height: 552mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-350-660",
    code: "RSC-350-660",
    brand: "RSC",
    model: "RSC-350-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 2306.82,
    description: "RSC 6MM Evaporator Series - 94,08 kW Cooling Capacity",
    specifications: "Cooling: 94,08 kW | Heating: 21,96 kW | Capacity: 19.837 | Phases: 3 | Voltage: 500V | Current: 33.720A | Length: 30475mm | Width: 22897mm | Height: 552mm | Fan Speed 1: 22 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-350-680",
    code: "RSC-350-680",
    brand: "RSC",
    model: "RSC-350-680",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 3106.37,
    description: "RSC 6MM Evaporator Series - 125,44 kW Cooling Capacity",
    specifications: "Cooling: 125,44 kW | Heating: 33,46 kW | Capacity: 17.351 | Phases: 3 | Voltage: 500V | Current: 39.698A | Length: 35951mm | Width: 27264mm | Height: 552mm | Fan Speed 1: 22 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-440-640",
    code: "RSC-440-640",
    brand: "RSC",
    model: "RSC-440-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1357.33,
    description: "RSC 6MM Evaporator Series - 50,96 kW Cooling Capacity",
    specifications: "Cooling: 50,96 kW | Heating: 10,98 kW | Capacity: 13.646 | Phases: 4 | Voltage: 400V | Current: 18.127A | Length: 16288mm | Width: 12191mm | Height: 512mm | Fan Speed 1: 16 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-440-650",
    code: "RSC-440-650",
    brand: "RSC",
    model: "RSC-440-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1620.49,
    description: "RSC 6MM Evaporator Series - 63,70 kW Cooling Capacity",
    specifications: "Cooling: 63,70 kW | Heating: 14,64 kW | Capacity: 12.877 | Phases: 4 | Voltage: 400V | Current: 21.248A | Length: 19204mm | Width: 14454mm | Height: 512mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-440-660",
    code: "RSC-440-660",
    brand: "RSC",
    model: "RSC-440-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1800.87,
    description: "RSC 6MM Evaporator Series - 76,44 kW Cooling Capacity",
    specifications: "Cooling: 76,44 kW | Heating: 16,73 kW | Capacity: 12.220 | Phases: 4 | Voltage: 400V | Current: 23.465A | Length: 21208mm | Width: 15977mm | Height: 512mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-440-680",
    code: "RSC-440-680",
    brand: "RSC",
    model: "RSC-440-680",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 2406.49,
    description: "RSC 6MM Evaporator Series - 101,92 kW Cooling Capacity",
    specifications: "Cooling: 101,92 kW | Heating: 24,94 kW | Capacity: 10.729 | Phases: 4 | Voltage: 400V | Current: 27.592A | Length: 25033mm | Width: 19029mm | Height: 512mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-445-640",
    code: "RSC-445-640",
    brand: "RSC",
    model: "RSC-445-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1602.02,
    description: "RSC 6MM Evaporator Series - 54,88 kW Cooling Capacity",
    specifications: "Cooling: 54,88 kW | Heating: 12,55 kW | Capacity: 17.497 | Phases: 4 | Voltage: 450V | Current: 20.955A | Length: 19309mm | Width: 14452mm | Height: 532mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-445-650",
    code: "RSC-445-650",
    brand: "RSC",
    model: "RSC-445-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1899.07,
    description: "RSC 6MM Evaporator Series - 68,60 kW Cooling Capacity",
    specifications: "Cooling: 68,60 kW | Heating: 16,73 kW | Capacity: 16.354 | Phases: 4 | Voltage: 450V | Current: 25.354A | Length: 22856mm | Width: 17169mm | Height: 532mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-445-660",
    code: "RSC-445-660",
    brand: "RSC",
    model: "RSC-445-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 2201.50,
    description: "RSC 6MM Evaporator Series - 82,32 kW Cooling Capacity",
    specifications: "Cooling: 82,32 kW | Heating: 20,91 kW | Capacity: 15.387 | Phases: 4 | Voltage: 450V | Current: 28.531A | Length: 25704mm | Width: 19379mm | Height: 532mm | Fan Speed 1: 19 | Fan Speed 2: 28",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-445-680",
    code: "RSC-445-680",
    brand: "RSC",
    model: "RSC-445-680",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 2581.86,
    description: "RSC 6MM Evaporator Series - 109,76 kW Cooling Capacity",
    specifications: "Cooling: 109,76 kW | Heating: 25,10 kW | Capacity: 13.626 | Phases: 4 | Voltage: 450V | Current: 31.742A | Length: 28672mm | Width: 21711mm | Height: 532mm | Fan Speed 1: 22 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-450-640",
    code: "RSC-450-640",
    brand: "RSC",
    model: "RSC-450-640",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 1979.98,
    description: "RSC 6MM Evaporator Series - 74,67 kW Cooling Capacity",
    specifications: "Cooling: 74,67 kW | Heating: 16,18 kW | Capacity: 28.307 | Phases: 4 | Voltage: 500V | Current: 30.291A | Length: 28150mm | Width: 20890mm | Height: 552mm | Fan Speed 1: 22 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-450-650",
    code: "RSC-450-650",
    brand: "RSC",
    model: "RSC-450-650",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 2512.27,
    description: "RSC 6MM Evaporator Series - 93,33 kW Cooling Capacity",
    specifications: "Cooling: 93,33 kW | Heating: 24,28 kW | Capacity: 26.298 | Phases: 4 | Voltage: 500V | Current: 37.567A | Length: 34189mm | Width: 25629mm | Height: 552mm | Fan Speed 1: 22 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-450-660",
    code: "RSC-450-660",
    brand: "RSC",
    model: "RSC-450-660",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 2917.16,
    description: "RSC 6MM Evaporator Series - 112,00 kW Cooling Capacity",
    specifications: "Cooling: 112,00 kW | Heating: 29,88 kW | Capacity: 24.147 | Phases: 4 | Voltage: 500V | Current: 41.815A | Length: 37960mm | Width: 28606mm | Height: 552mm | Fan Speed 1: 22 | Fan Speed 2: 35",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RSC-450-680",
    code: "RSC-450-680",
    brand: "RSC",
    model: "RSC-450-680",
    category: "RSC 6MM EVAPORATÖR SERİSİ",
    price: 3658.88,
    description: "RSC 6MM Evaporator Series - 149,33 kW Cooling Capacity",
    specifications: "Cooling: 149,33 kW | Heating: 39,84 kW | Capacity: 21.728 | Phases: 4 | Voltage: 500V | Current: 48.682A | Length: 44117mm | Width: 33429mm | Height: 552mm | Fan Speed 1: 28 | Fan Speed 2: 42",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRsc6mmEvaporatorSeriesPart3() {
  try {
    console.log('🔄 Starting RSC 6MM EVAPORATÖR SERİSİ Part 3 (Final) addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsc6mmEvaporatorProductsPart3),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RSC 6MM EVAPORATÖR SERİSİ Part 3 completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete RSC 6MM EVAPORATÖR SERİSİ addition finished! Total: 28 products in this batch');
    } else {
      console.log('❌ Failed to add RSC 6MM products Part 3:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRsc6mmEvaporatorSeriesPart3();