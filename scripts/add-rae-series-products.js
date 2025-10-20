const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

// RAE SERİSİ AÇILI ODA SOĞUTUCULARI products data (complete series)
const raeSeriesProducts = [
  {
    name: "RAE-1",
    code: "RAE-1",
    brand: "RAE",
    model: "RAE-1",
    category: "RAE SERİSİ AÇILI ODA SOĞUTUCULARI",
    price: 169.00,
    description: "RAE Series Angled Room Cooler - 3,7 kW Cooling Capacity",
    specifications: "Cooling: 3,7 kW | Capacity: 1600 | Heat Load: 1380 | Airflow: 820 m³/h | Net Airflow: 705 m³/h | Fans: 1 | Voltage: 200V | Power: 480W | Length: 372mm | Width: 415mm | Height: 166mm | Inlet: 3/8 | Outlet: 3/8",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RAE-2",
    code: "RAE-2",
    brand: "RAE",
    model: "RAE-2",
    category: "RAE SERİSİ AÇILI ODA SOĞUTUCULARI",
    price: 295.00,
    description: "RAE Series Angled Room Cooler - 5,5 kW Cooling Capacity",
    specifications: "Cooling: 5,5 kW | Capacity: 1885 | Heat Load: 1625 | Airflow: 1620 m³/h | Net Airflow: 1393 m³/h | Fans: 2 | Voltage: 200V | Power: 960W | Length: 372mm | Width: 740mm | Height: 166mm | Inlet: 1/2 | Outlet: 1/2",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RAE-3",
    code: "RAE-3",
    brand: "RAE",
    model: "RAE-3",
    category: "RAE SERİSİ AÇILI ODA SOĞUTUCULARI",
    price: 417.00,
    description: "RAE Series Angled Room Cooler - 6,9 kW Cooling Capacity",
    specifications: "Cooling: 6,9 kW | Capacity: 2500 | Heat Load: 2150 | Airflow: 2430 m³/h | Net Airflow: 2090 m³/h | Fans: 3 | Voltage: 200V | Power: 1440W | Length: 372mm | Width: 1065mm | Height: 166mm | Inlet: 1/2 | Outlet: 1/2",
    stock_quantity: 10,
    unit: "adet"
  },
  {
    name: "RAE-4",
    code: "RAE-4",
    brand: "RAE",
    model: "RAE-4",
    category: "RAE SERİSİ AÇILI ODA SOĞUTUCULARI",
    price: 560.00,
    description: "RAE Series Angled Room Cooler - 8,3 kW Cooling Capacity",
    specifications: "Cooling: 8,3 kW | Capacity: 3131 | Heat Load: 2695 | Airflow: 3235 m³/h | Net Airflow: 2778 m³/h | Fans: 4 | Voltage: 200V | Power: 1920W | Length: 372mm | Width: 1390mm | Height: 166mm | Inlet: 1/2 | Outlet: 5/8",
    stock_quantity: 10,
    unit: "adet"
  }
];

async function addRaeSeriesProducts() {
  try {
    console.log('🔄 Starting RAE SERİSİ AÇILI ODA SOĞUTUCULARI addition...');
    
    const addResponse = await fetch(`${API_BASE}/products/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(raeSeriesProducts),
    });
    
    const result = await addResponse.json();
    
    if (addResponse.ok) {
      console.log('✅ RAE SERİSİ AÇILI ODA SOĞUTUCULARI addition completed successfully!');
      console.log(`📊 Summary: ${result.summary.success} products added, ${result.summary.errors} errors`);
      console.log('🎯 Complete RAE SERİSİ addition finished! Total: 4 products');
      
      if (result.summary.errors > 0) {
        console.log('❌ Errors encountered:');
        result.results.filter(r => !r.success).forEach(error => {
          console.log(`   - ${error.name}: ${error.error}`);
        });
      }
    } else {
      console.log('❌ Failed to add RAE SERİSİ products:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

addRaeSeriesProducts();