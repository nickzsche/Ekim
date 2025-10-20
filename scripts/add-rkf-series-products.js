const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RKF SERİSİ products data (complete series)
const rkfSeriesProducts = [
  {
    name: "RKF 650-1",
    code: "RKF-650-1",
    brand: "RKF",
    model: "RKF 650-1",
    category: "RKF SERİSİ",
    price: 131.00,
    description: "RKF Series - 3,3 kW Cooling Capacity",
    specifications: "Cooling: 3,3 kW | Fans: 2 | Voltage: 120V | Capacity: 760 | Airflow: 380 m³/h | Net Airflow: 360 m³/h | Power: 90W | Length: 460mm | Inlet: 3/8'' | Outlet: 3/8''",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RKF 850-1",
    code: "RKF-850-1",
    brand: "RKF",
    model: "RKF 850-1",
    category: "RKF SERİSİ",
    price: 145.00,
    description: "RKF Series - 3,8 kW Cooling Capacity",
    specifications: "Cooling: 3,8 kW | Fans: 2 | Voltage: 120V | Capacity: 992 | Airflow: 492 m³/h | Net Airflow: 360 m³/h | Power: 90W | Length: 510mm | Inlet: 3/8'' | Outlet: 3/8''",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RKF 1.200-1",
    code: "RKF-1200-1",
    brand: "RKF",
    model: "RKF 1.200-1",
    category: "RKF SERİSİ",
    price: 187.00,
    description: "RKF Series - 5,3 kW Cooling Capacity",
    specifications: "Cooling: 5,3 kW | Fans: 2 | Voltage: 120V | Capacity: 1400 | Airflow: 569 m³/h | Net Airflow: 360 m³/h | Power: 90W | Length: 560mm | Inlet: 3/8'' | Outlet: 3/8''",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRkfSeriesProducts() {
  try {
    console.log('🔄 Starting RKF SERİSİ addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rkfSeriesProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RKF SERİSİ addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete RKF SERİSİ addition finished! Total: 3 products');
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RKF SERİSİ products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRkfSeriesProducts();