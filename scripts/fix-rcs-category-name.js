const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001/api';

async function fixRcsCategoryName() {
  try {
    console.log('🔄 Starting category name fix: RCS → RSC...');
    
    // Step 1: Get all products
    console.log('📋 Fetching all products...');
    const response = await fetch(`${API_BASE}/products`);
    const allProducts = await response.json();
    
    // Step 2: Find products with wrong category name
    const rcsProducts = allProducts.filter(product => 
      product.category === 'RCS 8MM EVAPORATÖR SERİSİ'
    );
    
    console.log(`🔍 Found ${rcsProducts.length} products with wrong category name`);
    
    if (rcsProducts.length === 0) {
      console.log('✅ No products found with wrong category name');
      return;
    }
    
    // Step 3: Update each product's category
    console.log('🔧 Updating category names...');
    let successCount = 0;
    let errorCount = 0;
    
    for (const product of rcsProducts) {
      try {
        const updateResponse = await fetch(`${API_BASE}/products/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...product,
            category: 'RSC 8MM EVAPORATÖR SERİSİ'
          }),
        });
        
        if (updateResponse.ok) {
          console.log(`   ✅ Updated: ${product.name}`);
          successCount++;
        } else {
          console.log(`   ❌ Failed to update: ${product.name}`);
          errorCount++;
        }
      } catch (error) {
        console.log(`   ❌ Error updating ${product.name}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n📊 Category name fix completed!');
    console.log(`✅ Successfully updated: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    
    if (errorCount === 0) {
      console.log('🎯 All RCS products now have correct RSC category name!');
    }
    
  } catch (error) {
    console.error('❌ Script execution failed:', error.message);
  }
}

// Run the fix
fixRcsCategoryName();