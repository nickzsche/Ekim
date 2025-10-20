const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RYE 6MM EVAPORATÖR SERİSİ products data (complete series)
const rye6mmEvaporatorProducts = [
  {
    name: "RYE-130-630",
    code: "RYE-130-630",
    brand: "RYE",
    model: "RYE-130-630",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 201.78,
    description: "RYE 6MM Evaporator Series - 3,36 kW Cooling Capacity",
    specifications: "Cooling: 3,36 kW | Heating: 0,90 kW | Capacity: 1.236 | Phases: 1 | Voltage: 300V | Current: 1.359A | Length: 1078mm | Width: 906mm | Height: 279mm | Connection: 1/2'' | Outlet: 1/2''",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-130-640",
    code: "RYE-130-640",
    brand: "RYE",
    model: "RYE-130-640",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 235.76,
    description: "RYE 6MM Evaporator Series - 4,48 kW Cooling Capacity",
    specifications: "Cooling: 4,48 kW | Heating: 1,20 kW | Capacity: 1.127 | Phases: 1 | Voltage: 300V | Current: 1.609A | Length: 1296mm | Width: 1101mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-130-650",
    code: "RYE-130-650",
    brand: "RYE",
    model: "RYE-130-650",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 254.37,
    description: "RYE 6MM Evaporator Series - 5,60 kW Cooling Capacity",
    specifications: "Cooling: 5,60 kW | Heating: 1,39 kW | Capacity: 1.035 | Phases: 1 | Voltage: 300V | Current: 1.763A | Length: 1443mm | Width: 1238mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-130-660",
    code: "RYE-130-660",
    brand: "RYE",
    model: "RYE-130-660",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 285.67,
    description: "RYE 6MM Evaporator Series - 6,72 kW Cooling Capacity",
    specifications: "Cooling: 6,72 kW | Heating: 1,79 kW | Capacity: 956 | Phases: 1 | Voltage: 300V | Current: 1.938A | Length: 1592mm | Width: 1384mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-135-630",
    code: "RYE-135-630",
    brand: "RYE",
    model: "RYE-135-630",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 222.11,
    description: "RYE 6MM Evaporator Series - 4,20 kW Cooling Capacity",
    specifications: "Cooling: 4,20 kW | Heating: 1,00 kW | Capacity: 2.088 | Phases: 1 | Voltage: 350V | Current: 1.735A | Length: 1506mm | Width: 1239mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-135-640",
    code: "RYE-135-640",
    brand: "RYE",
    model: "RYE-135-640",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 260.26,
    description: "RYE 6MM Evaporator Series - 5,60 kW Cooling Capacity",
    specifications: "Cooling: 5,60 kW | Heating: 1,49 kW | Capacity: 1.876 | Phases: 1 | Voltage: 350V | Current: 2.325A | Length: 1878mm | Width: 1573mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-135-650",
    code: "RYE-135-650",
    brand: "RYE",
    model: "RYE-135-650",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 294.44,
    description: "RYE 6MM Evaporator Series - 7,00 kW Cooling Capacity",
    specifications: "Cooling: 7,00 kW | Heating: 1,87 kW | Capacity: 1.701 | Phases: 1 | Voltage: 350V | Current: 2.629A | Length: 2126mm | Width: 1803mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-135-660",
    code: "RYE-135-660",
    brand: "RYE",
    model: "RYE-135-660",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 324.53,
    description: "RYE 6MM Evaporator Series - 8,40 kW Cooling Capacity",
    specifications: "Cooling: 8,40 kW | Heating: 2,24 kW | Capacity: 1.531 | Phases: 1 | Voltage: 350V | Current: 2.838A | Length: 2297mm | Width: 1970mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-230-630",
    code: "RYE-230-630",
    brand: "RYE",
    model: "RYE-230-630",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 300.26,
    description: "RYE 6MM Evaporator Series - 6,30 kW Cooling Capacity",
    specifications: "Cooling: 6,30 kW | Heating: 1,49 kW | Capacity: 2.418 | Phases: 2 | Voltage: 300V | Current: 2.478A | Length: 1999mm | Width: 1672mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-230-640",
    code: "RYE-230-640",
    brand: "RYE",
    model: "RYE-230-640",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 354.70,
    description: "RYE 6MM Evaporator Series - 8,40 kW Cooling Capacity",
    specifications: "Cooling: 8,40 kW | Heating: 2,24 kW | Capacity: 2.166 | Phases: 2 | Voltage: 300V | Current: 3.055A | Length: 2457mm | Width: 2089mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 12",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-230-650",
    code: "RYE-230-650",
    brand: "RYE",
    model: "RYE-230-650",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 401.82,
    description: "RYE 6MM Evaporator Series - 10,50 kW Cooling Capacity",
    specifications: "Cooling: 10,50 kW | Heating: 2,80 kW | Capacity: 1.987 | Phases: 2 | Voltage: 300V | Current: 3.438A | Length: 2778mm | Width: 2385mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-230-660",
    code: "RYE-230-660",
    brand: "RYE",
    model: "RYE-230-660",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 445.50,
    description: "RYE 6MM Evaporator Series - 12,60 kW Cooling Capacity",
    specifications: "Cooling: 12,60 kW | Heating: 3,36 kW | Capacity: 1.818 | Phases: 2 | Voltage: 300V | Current: 3.708A | Length: 3002mm | Width: 2611mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-235-630",
    code: "RYE-235-630",
    brand: "RYE",
    model: "RYE-235-630",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 339.22,
    description: "RYE 6MM Evaporator Series - 7,56 kW Cooling Capacity",
    specifications: "Cooling: 7,56 kW | Heating: 1,79 kW | Capacity: 3.947 | Phases: 2 | Voltage: 350V | Current: 2.958A | Length: 2755mm | Width: 2275mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-235-640",
    code: "RYE-235-640",
    brand: "RYE",
    model: "RYE-235-640",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 403.30,
    description: "RYE 6MM Evaporator Series - 10,08 kW Cooling Capacity",
    specifications: "Cooling: 10,08 kW | Heating: 2,69 kW | Capacity: 3.495 | Phases: 2 | Voltage: 350V | Current: 3.565A | Length: 3424mm | Width: 2865mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-235-650",
    code: "RYE-235-650",
    brand: "RYE",
    model: "RYE-235-650",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 455.01,
    description: "RYE 6MM Evaporator Series - 12,60 kW Cooling Capacity",
    specifications: "Cooling: 12,60 kW | Heating: 3,36 kW | Capacity: 3.107 | Phases: 2 | Voltage: 350V | Current: 4.308A | Length: 3842mm | Width: 3258mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-235-660",
    code: "RYE-235-660",
    brand: "RYE",
    model: "RYE-235-660",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 484.14,
    description: "RYE 6MM Evaporator Series - 15,12 kW Cooling Capacity",
    specifications: "Cooling: 15,12 kW | Heating: 3,59 kW | Capacity: 2.837 | Phases: 2 | Voltage: 350V | Current: 4.705A | Length: 4083mm | Width: 3485mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-330-630",
    code: "RYE-330-630",
    brand: "RYE",
    model: "RYE-330-630",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 409.81,
    description: "RYE 6MM Evaporator Series - 9,24 kW Cooling Capacity",
    specifications: "Cooling: 9,24 kW | Heating: 2,46 kW | Capacity: 3.563 | Phases: 3 | Voltage: 300V | Current: 3.721A | Length: 3034mm | Width: 2546mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-330-640",
    code: "RYE-330-640",
    brand: "RYE",
    model: "RYE-330-640",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 472.33,
    description: "RYE 6MM Evaporator Series - 12,32 kW Cooling Capacity",
    specifications: "Cooling: 12,32 kW | Heating: 3,29 kW | Capacity: 3.201 | Phases: 3 | Voltage: 300V | Current: 4.514A | Length: 3623mm | Width: 3081mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-330-650",
    code: "RYE-330-650",
    brand: "RYE",
    model: "RYE-330-650",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 536.68,
    description: "RYE 6MM Evaporator Series - 15,40 kW Cooling Capacity",
    specifications: "Cooling: 15,40 kW | Heating: 4,11 kW | Capacity: 2.932 | Phases: 3 | Voltage: 300V | Current: 5.098A | Length: 4013mm | Width: 3525mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-330-660",
    code: "RYE-330-660",
    brand: "RYE",
    model: "RYE-330-660",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 567.48,
    description: "RYE 6MM Evaporator Series - 18,48 kW Cooling Capacity",
    specifications: "Cooling: 18,48 kW | Heating: 4,38 kW | Capacity: 2.707 | Phases: 3 | Voltage: 300V | Current: 5.456A | Length: 4347mm | Width: 3763mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-335-630",
    code: "RYE-335-630",
    brand: "RYE",
    model: "RYE-335-630",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 464.99,
    description: "RYE 6MM Evaporator Series - 11,76 kW Cooling Capacity",
    specifications: "Cooling: 11,76 kW | Heating: 2,79 kW | Capacity: 6.033 | Phases: 3 | Voltage: 350V | Current: 5.095A | Length: 4268mm | Width: 3514mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 16",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-335-640",
    code: "RYE-335-640",
    brand: "RYE",
    model: "RYE-335-640",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 562.91,
    description: "RYE 6MM Evaporator Series - 15,68 kW Cooling Capacity",
    specifications: "Cooling: 15,68 kW | Heating: 4,18 kW | Capacity: 5.454 | Phases: 3 | Voltage: 350V | Current: 6.566A | Length: 5344mm | Width: 4474mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-335-650",
    code: "RYE-335-650",
    brand: "RYE",
    model: "RYE-335-650",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 644.71,
    description: "RYE 6MM Evaporator Series - 19,60 kW Cooling Capacity",
    specifications: "Cooling: 19,60 kW | Heating: 5,23 kW | Capacity: 4.810 | Phases: 3 | Voltage: 350V | Current: 7.327A | Length: 5980mm | Width: 5062mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 19",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RYE-335-660",
    code: "RYE-335-660",
    brand: "RYE",
    model: "RYE-335-660",
    category: "RYE 6MM EVAPORATÖR SERİSİ",
    price: 724.90,
    description: "RYE 6MM Evaporator Series - 23,52 kW Cooling Capacity",
    specifications: "Cooling: 23,52 kW | Heating: 6,27 kW | Capacity: 4.330 | Phases: 3 | Voltage: 350V | Current: 7.983A | Length: 6455mm | Width: 5542mm | Height: 279mm | Fan Speed 1: 12 | Fan Speed 2: 22",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRye6mmEvaporatorSeries() {
  try {
    console.log('🔄 Starting RYE 6MM EVAPORATÖR SERİSİ addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rye6mmEvaporatorProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RYE 6MM EVAPORATÖR SERİSİ addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete RYE 6MM EVAPORATÖR SERİSİ addition finished! Total: 24 products');
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RYE 6MM products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRye6mmEvaporatorSeries();