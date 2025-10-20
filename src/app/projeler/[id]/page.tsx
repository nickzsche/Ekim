"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Product } from '@/lib/database';

interface CartItem {
  id: number;
  product: Product;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  margin?: number;
  salesPrice?: number;
  squareMeters?: number;
  groupItems?: CartItem[];
}

export default function ProjectEditPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Tedarikçi bazlı ürün seçimi
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const [supplierCategories, setSupplierCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [viewingGroupId, setViewingGroupId] = useState<number | null>(null);
  const [groupSearchQuery, setGroupSearchQuery] = useState('');
  const [showGroupProductDropdown, setShowGroupProductDropdown] = useState(false);
  
  // m² hesaplayıcı state'leri
  const [showM2Calculator, setShowM2Calculator] = useState(false);
  const [m2Width, setM2Width] = useState<number>(0);
  const [m2Height, setM2Height] = useState<number>(0);
  const [m2Count, setM2Count] = useState<number>(1);
  const [m2PricePerUnit, setM2PricePerUnit] = useState<number>(0);
  const [m2Type, setM2Type] = useState<'tavan' | 'zemin' | 'duvar'>('tavan');

  useEffect(() => {
    loadProject();
    loadProducts();
    loadSuppliers();
  }, [projectId]);

  async function loadSuppliers() {
    try {
      const res = await fetch('/api/suppliers');
      if (res.ok) {
        const data = await res.json();
        setSuppliers(data);
      }
    } catch (error) {
      console.error('Tedarikçiler yüklenirken hata:', error);
    }
  }

  async function loadSupplierProducts(supplierId: number) {
    try {
      const res = await fetch(`/api/suppliers/${supplierId}/products`);
      if (res.ok) {
        const data = await res.json();
        const cats = Object.keys(data.categories);
        setSupplierCategories(cats);
        setSelectedCategory('');
        setCategoryProducts([]);
      }
    } catch (error) {
      console.error('Tedarikçi ürünleri yüklenirken hata:', error);
    }
  }

  async function loadCategoryProducts(supplierId: number, category: string) {
    try {
      const res = await fetch(`/api/suppliers/${supplierId}/products`);
      if (res.ok) {
        const data = await res.json();
        setCategoryProducts(data.categories[category] || []);
      }
    } catch (error) {
      console.error('Kategori ürünleri yüklenirken hata:', error);
    }
  }

  function handleSupplierChange(supplierId: number) {
    setSelectedSupplierId(supplierId);
    setSelectedCategory('');
    setCategoryProducts([]);
    loadSupplierProducts(supplierId);
  }

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    if (selectedSupplierId) {
      loadCategoryProducts(selectedSupplierId, category);
    }
  }

  async function loadProject() {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (res.ok) {
        const data = await res.json();
        setProjectName(data.name);
        setProjectDescription(data.description || '');
        
        if (data.items && data.items.length > 0) {
          const cartItems: CartItem[] = [];
          const groupMap = new Map();
          
          if (data.groups) {
            data.groups.forEach((g: any) => {
              groupMap.set(g.id, {
                id: g.id,
                name: g.name,
                items: []
              });
            });
          }
          
          data.items.forEach((item: any, index: number) => {
            const cartItem: CartItem = {
              id: Date.now() + index,
              product: { id: item.product_id, name: item.product_name } as Product,
              productName: item.product_name,
              quantity: item.quantity,
              unitPrice: item.unit_price,
              discount: item.discount,
              margin: item.margin,
              salesPrice: item.sales_price,
              squareMeters: item.square_meters
            };
            
            if (item.group_id && groupMap.has(item.group_id)) {
              groupMap.get(item.group_id).items.push(cartItem);
            } else {
              cartItems.push(cartItem);
            }
          });
          
          groupMap.forEach((group: any) => {
            if (group.items.length > 0) {
              cartItems.push({
                id: group.id,
                product: { id: 0, name: group.name } as Product,
                productName: group.name,
                quantity: 1,
                unitPrice: 0,
                groupItems: group.items
              });
            }
          });
          
          setCart(cartItems);
        }
      }
    } catch (error) {
      console.error('Proje yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadProducts() {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Ürünler yüklenemedi:', error);
    }
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  function addToCart(product: Product) {
    const newItem: CartItem = {
      id: Date.now(),
      product,
      productName: product.name,
      quantity: 1,
      unitPrice: product.price || 0,
      discount: 0,
      margin: 0,
      salesPrice: product.price || 0,
      squareMeters: 0
    };
    setCart([...cart, newItem]);
    setSearchQuery('');
    setShowProductDropdown(false);
  }

  function removeFromCart(id: number) {
    setCart(cart.filter(item => item.id !== id));
  }

  function calculateSalesPrice(unitPrice: number, discount: number = 0, margin: number = 0): number {
    const discountedPrice = unitPrice * (1 - discount / 100);
    return discountedPrice * (1 + margin / 100);
  }

  function updateCartItem(id: number, field: keyof CartItem, value: any) {
    setCart(cart.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        
        if (field === 'unitPrice' || field === 'discount' || field === 'margin') {
          updated.salesPrice = calculateSalesPrice(
            field === 'unitPrice' ? value : item.unitPrice,
            field === 'discount' ? value : (item.discount || 0),
            field === 'margin' ? value : (item.margin || 0)
          );
        }
        
        return updated;
      }
      return item;
    }));
  }

  function handleGroupProducts() {
    if (selectedItems.length === 0) {
      alert('Lütfen en az bir ürün seçin!');
      return;
    }
    setShowGroupModal(true);
  }

  function createGroup() {
    if (!groupName.trim()) {
      alert('Lütfen grup adı girin!');
      return;
    }

    const selectedCartItems = cart.filter(item => selectedItems.includes(item.id));
    const remainingItems = cart.filter(item => !selectedItems.includes(item.id));

    const groupItem: CartItem = {
      id: Date.now(),
      product: { id: 0, name: groupName } as Product,
      productName: groupName,
      quantity: 1,
      unitPrice: 0,
      groupItems: selectedCartItems
    };

    setCart([...remainingItems, groupItem]);
    setSelectedItems([]);
    setGroupName('');
    setShowGroupModal(false);
  }

  function addProductToGroup(product: Product) {
    if (viewingGroupId === null) return;

    const newItem: CartItem = {
      id: Date.now(),
      product,
      productName: product.name,
      quantity: 1,
      unitPrice: product.price || 0,
      discount: 0,
      margin: 0,
      salesPrice: product.price || 0,
      squareMeters: 0
    };

    setCart(cart.map(item => {
      if (item.id === viewingGroupId && item.groupItems) {
        return {
          ...item,
          groupItems: [...item.groupItems, newItem]
        };
      }
      return item;
    }));

    setGroupSearchQuery('');
    setShowGroupProductDropdown(false);
  }

  function removeFromGroup(groupId: number, itemId: number) {
    setCart(cart.map(item => {
      if (item.id === groupId && item.groupItems) {
        return {
          ...item,
          groupItems: item.groupItems.filter(gi => gi.id !== itemId)
        };
      }
      return item;
    }));
  }

  function updateGroupItem(groupId: number, itemId: number, field: keyof CartItem, value: any) {
    setCart(cart.map(item => {
      if (item.id === groupId && item.groupItems) {
        return {
          ...item,
          groupItems: item.groupItems.map(gi => {
            if (gi.id === itemId) {
              const updated = { ...gi, [field]: value };
              
              if (field === 'unitPrice' || field === 'discount' || field === 'margin') {
                updated.salesPrice = calculateSalesPrice(
                  field === 'unitPrice' ? value : gi.unitPrice,
                  field === 'discount' ? value : (gi.discount || 0),
                  field === 'margin' ? value : (gi.margin || 0)
                );
              }
              
              return updated;
            }
            return gi;
          })
        };
      }
      return item;
    }));
  }

  async function handleSaveProject() {
    if (!projectName.trim()) {
      alert('Proje adı gereklidir!');
      return;
    }

    try {
      await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName,
          description: projectDescription
        })
      });

      const groups: any[] = [];
      const items: any[] = [];
      let sortOrder = 0;

      cart.forEach(item => {
        if (item.groupItems && item.groupItems.length > 0) {
          const groupName = item.productName;
          groups.push({ name: groupName });
          
          item.groupItems.forEach(gi => {
            items.push({
              product_id: gi.product.id,
              product_name: gi.productName,
              quantity: gi.quantity,
              unit_price: gi.unitPrice,
              discount: gi.discount || 0,
              margin: gi.margin || 0,
              sales_price: gi.salesPrice || gi.unitPrice,
              square_meters: gi.squareMeters || 0,
              groupName: groupName,
              sort_order: sortOrder++
            });
          });
        } else {
          items.push({
            product_id: item.product.id,
            product_name: item.productName,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            discount: item.discount || 0,
            margin: item.margin || 0,
            sales_price: item.salesPrice || item.unitPrice,
            square_meters: item.squareMeters || 0,
            sort_order: sortOrder++
          });
        }
      });

      await fetch(`/api/projects/${projectId}/items`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groups, items })
      });

      alert('Proje başarıyla kaydedildi!');
      router.push('/projeler');
    } catch (error) {
      console.error('Proje kaydedilemedi:', error);
      alert('Proje kaydedilemedi!');
    }
  }

  function handleM2Calculate() {
    const totalM2 = m2Width * m2Height * m2Count;
    const totalPrice = totalM2 * m2PricePerUnit;
    
    const newItem: CartItem = {
      id: Date.now(),
      product: { id: 0, name: `${m2Type.toUpperCase()} - ${m2Width}m × ${m2Height}m × ${m2Count} adet` } as Product,
      productName: `${m2Type.toUpperCase()} - ${m2Width}m × ${m2Height}m × ${m2Count} adet`,
      quantity: 1,
      unitPrice: totalPrice,
      discount: 0,
      margin: 0,
      salesPrice: totalPrice,
      squareMeters: totalM2
    };
    
    setCart([...cart, newItem]);
    setShowM2Calculator(false);
    setM2Width(0);
    setM2Height(0);
    setM2Count(1);
    setM2PricePerUnit(0);
  }

  const filteredGroupProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(groupSearchQuery.toLowerCase()) ||
      p.code?.toLowerCase().includes(groupSearchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-2xl font-bold text-gray-600">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Proje Düzenle</h1>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/projeler')}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-bold"
              >
                İptal
              </button>
              <button
                onClick={handleSaveProject}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg font-bold"
              >
                💾 Kaydet
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Proje Adı *
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Açıklama
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">🔍 Ürün/Alan Ekle</h2>
            <button
              onClick={() => setShowM2Calculator(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"
            >
              � Tavan/Zemin/Duvar m² Hesapla
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                1️⃣ Tedarikçi Seç
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={selectedSupplierId || ''}
                onChange={(e) => handleSupplierChange(parseInt(e.target.value))}
              >
                <option value="">Tedarikçi seçin...</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                2️⃣ Kategori Seç
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={!selectedSupplierId}
              >
                <option value="">Kategori seçin...</option>
                {supplierCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                3️⃣ Ürün Seç
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const productId = parseInt(e.target.value);
                  const product = categoryProducts.find(p => p.id === productId);
                  if (product) {
                    addToCart(product);
                    e.target.value = '';
                  }
                }}
                disabled={!selectedCategory || categoryProducts.length === 0}
              >
                <option value="">Ürün seçin...</option>
                {categoryProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} {product.price && product.price > 0 ? `- ${product.price.toFixed(2)} ₺` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {selectedSupplierId && !selectedCategory && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
              💡 Lütfen bir kategori seçin
            </div>
          )}
          
          {selectedCategory && categoryProducts.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
              ⚠️ Bu kategoride ürün bulunmuyor
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">🛒 Proje Ürünleri</h2>
            {selectedItems.length > 0 && (
              <button
                onClick={handleGroupProducts}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"
              >
                📁 Kategori Oluştur ({selectedItems.length})
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-xl">
              <p className="text-xl font-semibold mb-2">📦 Henüz ürün eklenmedi</p>
              <p className="text-sm">Yukarıdaki arama kutusundan ürün arayıp ekleyebilirsiniz.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <th className="text-left p-3 font-bold">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(cart.filter(item => !item.groupItems).map(item => item.id));
                          } else {
                            setSelectedItems([]);
                          }
                        }}
                      />
                    </th>
                    <th className="text-left p-3 font-bold">Ürün Adı</th>
                    <th className="text-left p-3 font-bold">Adet</th>
                    <th className="text-left p-3 font-bold">Birim €</th>
                    <th className="text-left p-3 font-bold">İsk. %</th>
                    <th className="text-left p-3 font-bold">İsk. Sonrası</th>
                    <th className="text-left p-3 font-bold">Kar %</th>
                    <th className="text-left p-3 font-bold">Satış €</th>
                    <th className="text-left p-3 font-bold">Toplam €</th>
                    <th className="text-left p-3 font-bold">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <React.Fragment key={item.id}>
                      {item.groupItems ? (
                        <tr className="bg-gradient-to-r from-purple-100 to-purple-50 border-t-4 border-purple-400">
                          <td className="p-3"></td>
                          <td className="p-3 font-bold text-purple-900 text-lg" colSpan={9}>
                            📁 {item.productName}
                            <span className="ml-2 text-sm text-purple-600">
                              ({item.groupItems.length} ürün)
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setViewingGroupId(item.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
                              >
                                👁️ Görüntüle
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr className={`border-b hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="p-3">
                            <input
                              type="checkbox"
                              className="w-4 h-4"
                              checked={selectedItems.includes(item.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedItems([...selectedItems, item.id]);
                                } else {
                                  setSelectedItems(selectedItems.filter(id => id !== item.id));
                                }
                              }}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              className="w-full border rounded-lg px-3 py-2 text-gray-800"
                              value={item.productName}
                              onChange={(e) => updateCartItem(item.id, 'productName', e.target.value)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              min="1"
                              className="w-24 border rounded-lg px-3 py-2 text-gray-800"
                              value={item.quantity}
                              onChange={(e) => updateCartItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className="w-28 border rounded-lg px-3 py-2 text-gray-800"
                              value={item.unitPrice}
                              onChange={(e) => updateCartItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="100"
                              className="w-20 border rounded-lg px-3 py-2 text-gray-800"
                              value={item.discount || 0}
                              onChange={(e) => updateCartItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-3 font-semibold text-gray-800">
                            €{(item.unitPrice * (1 - (item.discount || 0) / 100)).toFixed(2)}
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              className="w-20 border rounded-lg px-3 py-2 text-gray-800"
                              value={item.margin || 0}
                              onChange={(e) => updateCartItem(item.id, 'margin', parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className="w-28 border rounded-lg px-3 py-2 text-gray-800"
                              value={item.salesPrice || 0}
                              onChange={(e) => updateCartItem(item.id, 'salesPrice', parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-3 font-bold text-gray-900">
                            €{((item.salesPrice || item.unitPrice) * item.quantity).toFixed(2)}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📁 Kategori Oluştur</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori Adı
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Örn: Tavan Panelleri"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createGroup()}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={createGroup}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-bold"
              >
                ✓ Oluştur
              </button>
              <button
                onClick={() => {
                  setShowGroupModal(false);
                  setGroupName('');
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-3 rounded-lg font-bold"
              >
                ✕ İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {showM2Calculator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📐 Tavan/Zemin/Duvar m² Hesapla</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Alan Tipi
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setM2Type('tavan')}
                    className={`flex-1 px-4 py-3 rounded-lg font-bold transition-colors ${
                      m2Type === 'tavan' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    🏠 Tavan
                  </button>
                  <button
                    onClick={() => setM2Type('zemin')}
                    className={`flex-1 px-4 py-3 rounded-lg font-bold transition-colors ${
                      m2Type === 'zemin' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    ⬛ Zemin
                  </button>
                  <button
                    onClick={() => setM2Type('duvar')}
                    className={`flex-1 px-4 py-3 rounded-lg font-bold transition-colors ${
                      m2Type === 'duvar' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    🧱 Duvar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    En (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    value={m2Width || ''}
                    onChange={(e) => setM2Width(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Boy (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    value={m2Height || ''}
                    onChange={(e) => setM2Height(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Adet
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    value={m2Count || ''}
                    onChange={(e) => setM2Count(parseInt(e.target.value) || 1)}
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Hesaplama:</strong> {m2Width} m × {m2Height} m × {m2Count} adet
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  Toplam Alan: {(m2Width * m2Height * m2Count).toFixed(2)} m²
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  m² Birim Fiyatı (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  value={m2PricePerUnit || ''}
                  onChange={(e) => setM2PricePerUnit(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Fiyat Hesaplama:</strong> {(m2Width * m2Height * m2Count).toFixed(2)} m² × €{m2PricePerUnit.toFixed(2)}
                </div>
                <div className="text-2xl font-bold text-green-600">
                  Toplam Fiyat: €{((m2Width * m2Height * m2Count) * m2PricePerUnit).toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleM2Calculate}
                disabled={!m2Width || !m2Height || !m2Count || !m2PricePerUnit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✓ Ekle
              </button>
              <button
                onClick={() => {
                  setShowM2Calculator(false);
                  setM2Width(0);
                  setM2Height(0);
                  setM2Count(1);
                  setM2PricePerUnit(0);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-3 rounded-lg font-bold"
              >
                ✕ İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingGroupId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-7xl my-8">
            {cart.filter(c => c.id === viewingGroupId).map(group => (
              <div key={group.id}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-gray-900">📁 {group.productName}</h3>
                  <button
                    onClick={() => setViewingGroupId(null)}
                    className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6 bg-blue-50 p-4 rounded-xl">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">🔍 Kategoriye Ürün Ekle</h4>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                      placeholder="Ürün ara..."
                      value={groupSearchQuery}
                      onChange={(e) => {
                        setGroupSearchQuery(e.target.value);
                        setShowGroupProductDropdown(e.target.value.length > 0);
                      }}
                      onFocus={() => setShowGroupProductDropdown(groupSearchQuery.length > 0)}
                    />
                    
                    {showGroupProductDropdown && filteredGroupProducts.length > 0 && (
                      <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                        {filteredGroupProducts.slice(0, 10).map(product => (
                          <div
                            key={product.id}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                            onClick={() => addProductToGroup(product)}
                          >
                            <div className="font-semibold text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-600">
                              {product.code} | €{product.price?.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                        <th className="text-left p-3 font-bold">Ürün Adı</th>
                        <th className="text-left p-3 font-bold">Adet</th>
                        <th className="text-left p-3 font-bold">Birim €</th>
                        <th className="text-left p-3 font-bold">İsk. %</th>
                        <th className="text-left p-3 font-bold">Kar %</th>
                        <th className="text-left p-3 font-bold">Satış €</th>
                        <th className="text-left p-3 font-bold">Toplam €</th>
                        <th className="text-left p-3 font-bold">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.groupItems && group.groupItems.map((item, index) => (
                        <tr key={item.id} className={`border-b hover:bg-purple-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="p-3">
                            <input
                              type="text"
                              className="w-full border rounded-lg px-3 py-2 text-gray-800"
                              value={item.productName}
                              onChange={(e) => updateGroupItem(group.id, item.id, 'productName', e.target.value)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              min="1"
                              className="w-24 border rounded-lg px-3 py-2 text-gray-800"
                              value={item.quantity}
                              onChange={(e) => updateGroupItem(group.id, item.id, 'quantity', parseInt(e.target.value) || 1)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className="w-28 border rounded-lg px-3 py-2 text-gray-800"
                              value={item.unitPrice}
                              onChange={(e) => updateGroupItem(group.id, item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="100"
                              className="w-20 border rounded-lg px-3 py-2 text-gray-800"
                              value={item.discount || 0}
                              onChange={(e) => updateGroupItem(group.id, item.id, 'discount', parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              className="w-20 border rounded-lg px-3 py-2 text-gray-800"
                              value={item.margin || 0}
                              onChange={(e) => updateGroupItem(group.id, item.id, 'margin', parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className="w-28 border rounded-lg px-3 py-2 text-gray-800"
                              value={item.salesPrice || 0}
                              onChange={(e) => updateGroupItem(group.id, item.id, 'salesPrice', parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-3 font-bold text-gray-900">
                            €{((item.salesPrice || item.unitPrice) * item.quantity).toFixed(2)}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => removeFromGroup(group.id, item.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                      {(!group.groupItems || group.groupItems.length === 0) && (
                        <tr>
                          <td colSpan={9} className="p-8 text-center text-gray-500">
                            <p className="text-lg mb-2">Bu kategoride henüz ürün yok.</p>
                            <p className="text-sm">Yukarıdaki arama kutusundan ürün ekleyebilirsiniz.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
