const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RNKY SERİSİ YATIK SOĞUTUCULAR products data (complete series)
const rnkySeriesProducts = [
  {
    name: "RNKY 600",
    code: "RNKY-600",
    brand: "RNKY",
    model: "RNKY 600",
    category: "RNKY SERİSİ YATIK SOĞUTUCULAR",
    price: 150.00,
    description: "RNKY Series Horizontal Cooler - 2,9 kW Cooling Capacity",
    specifications: "Cooling: 2,9 kW | Capacity: 702 | Heat Load: 603 | Airflow: 402 m³/h | Net Airflow: 345 m³/h | Fans: 1 | Voltage: 20V | Power: 460W | Length: 460mm | Width: 140mm | Height: 460mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RNKY 750",
    code: "RNKY-750",
    brand: "RNKY",
    model: "RNKY 750",
    category: "RNKY SERİSİ YATIK SOĞUTUCULAR",
    price: 171.00,
    description: "RNKY Series Horizontal Cooler - 3,4 kW Cooling Capacity",
    specifications: "Cooling: 3,4 kW | Capacity: 872 | Heat Load: 752 | Airflow: 436 m³/h | Net Airflow: 430 m³/h | Fans: 1 | Voltage: 20V | Power: 460W | Length: 460mm | Width: 140mm | Height: 460mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RNKY 800",
    code: "RNKY-800",
    brand: "RNKY",
    model: "RNKY 800",
    category: "RNKY SERİSİ YATIK SOĞUTUCULAR",
    price: 255.00,
    description: "RNKY Series Horizontal Cooler - 3,8 kW Cooling Capacity",
    specifications: "Cooling: 3,8 kW | Capacity: 945 | Heat Load: 812 | Airflow: 480 m³/h | Net Airflow: 412 m³/h | Fans: 2 | Voltage: 20V | Power: 460W | Length: 730mm | Width: 140mm | Height: 730mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRnkySeriesProducts() {
  try {
    console.log('🔄 Starting RNKY SERİSİ YATIK SOĞUTUCULAR addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rnkySeriesProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RNKY SERİSİ YATIK SOĞUTUCULAR addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete RNKY SERİSİ addition finished! Total: 3 products');
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RNKY SERİSİ products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRnkySeriesProducts();