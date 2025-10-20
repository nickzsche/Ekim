const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RNK SERİSİ KARAMAN SOĞUTUCULARI products data (complete series)
const rnkSeriesProducts = [
  {
    name: "RNK 800.1",
    code: "RNK-800-1",
    brand: "RNK",
    model: "RNK 800.1",
    category: "RNK SERİSİ KARAMAN SOĞUTUCULARI",
    price: 208.00,
    description: "RNK Series Karaman Cooler - 4,0 kW Cooling Capacity",
    specifications: "Cooling: 4,0 kW | Capacity: 955 | Heat Load: 821 | Airflow: 500 m³/h | Net Airflow: 430 m³/h | Fans: 1 | Voltage: 250V | Power: 460W | Length: 820mm | Width: 120mm | Height: 820mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RNK 1200.1",
    code: "RNK-1200-1",
    brand: "RNK",
    model: "RNK 1200.1",
    category: "RNK SERİSİ KARAMAN SOĞUTUCULARI",
    price: 233.00,
    description: "RNK Series Karaman Cooler - 5,1 kW Cooling Capacity",
    specifications: "Cooling: 5,1 kW | Capacity: 1400 | Heat Load: 1204 | Airflow: 880 m³/h | Net Airflow: 757 m³/h | Fans: 1 | Voltage: 250V | Power: 460W | Length: 820mm | Width: 120mm | Height: 820mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RNK 1500.1",
    code: "RNK-1500-1",
    brand: "RNK",
    model: "RNK 1500.1",
    category: "RNK SERİSİ KARAMAN SOĞUTUCULARI",
    price: 264.00,
    description: "RNK Series Karaman Cooler - 6,4 kW Cooling Capacity",
    specifications: "Cooling: 6,4 kW | Capacity: 1675 | Heat Load: 1441 | Airflow: 1100 m³/h | Net Airflow: 946 m³/h | Fans: 1 | Voltage: 250V | Power: 460W | Length: 820mm | Width: 150mm | Height: 820mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RNK 1800.1",
    code: "RNK-1800-1",
    brand: "RNK",
    model: "RNK 1800.1",
    category: "RNK SERİSİ KARAMAN SOĞUTUCULARI",
    price: 317.00,
    description: "RNK Series Karaman Cooler - 10,0 kW Cooling Capacity",
    specifications: "Cooling: 10,0 kW | Capacity: 2170 | Heat Load: 1866 | Airflow: 1400 m³/h | Net Airflow: 1204 m³/h | Fans: 1 | Voltage: 250V | Power: 460W | Length: 820mm | Width: 150mm | Height: 820mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RNK 1800.2",
    code: "RNK-1800-2",
    brand: "RNK",
    model: "RNK 1800.2",
    category: "RNK SERİSİ KARAMAN SOĞUTUCULARI",
    price: 417.00,
    description: "RNK Series Karaman Cooler - 7,6 kW Cooling Capacity",
    specifications: "Cooling: 7,6 kW | Capacity: 2155 | Heat Load: 1853 | Airflow: 1440 m³/h | Net Airflow: 1238 m³/h | Fans: 2 | Voltage: 250V | Power: 460W | Length: 1260mm | Width: 150mm | Height: 1260mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RNK 2000.2",
    code: "RNK-2000-2",
    brand: "RNK",
    model: "RNK 2000.2",
    category: "RNK SERİSİ KARAMAN SOĞUTUCULARI",
    price: 439.00,
    description: "RNK Series Karaman Cooler - 8,8 kW Cooling Capacity",
    specifications: "Cooling: 8,8 kW | Capacity: 2440 | Heat Load: 2098 | Airflow: 1550 m³/h | Net Airflow: 1333 m³/h | Fans: 2 | Voltage: 250V | Power: 460W | Length: 1260mm | Width: 150mm | Height: 1260mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RNK 2200.2",
    code: "RNK-2200-2",
    brand: "RNK",
    model: "RNK 2200.2",
    category: "RNK SERİSİ KARAMAN SOĞUTUCULARI",
    price: 464.00,
    description: "RNK Series Karaman Cooler - 10,0 kW Cooling Capacity",
    specifications: "Cooling: 10,0 kW | Capacity: 2580 | Heat Load: 2219 | Airflow: 1620 m³/h | Net Airflow: 1393 m³/h | Fans: 2 | Voltage: 250V | Power: 460W | Length: 1260mm | Width: 150mm | Height: 1260mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRnkSeriesProducts() {
  try {
    console.log('🔄 Starting RNK SERİSİ KARAMAN SOĞUTUCULARI addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rnkSeriesProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RNK SERİSİ KARAMAN SOĞUTUCULARI addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete RNK SERİSİ addition finished! Total: 7 products');
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RNK SERİSİ products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRnkSeriesProducts();