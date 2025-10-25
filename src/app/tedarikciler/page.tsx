'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Supplier {
  id: number;
  name: string;
  description: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
}

interface Product {
  id: number;
  name: string;
  code: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  description: string;
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [categories, setCategories] = useState<Record<string, Product[]>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [supplierSearch, setSupplierSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  
  // Modal states
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Form states
  const [supplierForm, setSupplierForm] = useState({
    name: '',
    description: '',
    contact_name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [productForm, setProductForm] = useState({
    name: '',
    code: '',
    brand: '',
    model: '',
    category: '',
    price: 0,
    description: ''
  });

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Tedarikçiler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSupplierProducts = async (supplierId: number) => {
    try {
      setSelectedSupplier(supplierId);
      setExpandedCategory(null);
      const response = await fetch(`/api/suppliers/${supplierId}/products`);
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Tedarikçi ürünleri yüklenirken hata:', error);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Tedarikçi CRUD
  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setSupplierForm({ name: '', description: '', contact_name: '', email: '', phone: '', address: '' });
    setShowSupplierModal(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setSupplierForm({
      name: supplier.name,
      description: supplier.description || '',
      contact_name: supplier.contact_name || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || ''
    });
    setShowSupplierModal(true);
  };

  const handleSaveSupplier = async () => {
    try {
      if (editingSupplier) {
        await fetch(`/api/suppliers/${editingSupplier.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(supplierForm)
        });
      } else {
        await fetch('/api/suppliers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(supplierForm)
        });
      }
      setShowSupplierModal(false);
      loadSuppliers();
    } catch (error) {
      console.error('Tedarikçi kaydedilirken hata:', error);
      alert('Hata oluştu!');
    }
  };

  const handleDeleteSupplier = async (id: number) => {
    if (!confirm('Bu tedarikçiyi silmek istediğinizden emin misiniz?')) return;
    try {
      await fetch(`/api/suppliers/${id}`, { method: 'DELETE' });
      loadSuppliers();
      if (selectedSupplier === id) {
        setSelectedSupplier(null);
        setCategories({});
      }
    } catch (error) {
      console.error('Tedarikçi silinirken hata:', error);
      alert('Hata oluştu!');
    }
  };

  // Kategori CRUD  
  const handleAddCategory = () => {
    // Yeni kategori için direkt ürün ekleme modalını aç
    setEditingProduct(null);
    setProductForm({ name: '', code: '', brand: '', model: '', category: '', price: 0, description: '' });
    setShowProductModal(true);
  };

  const handleSaveCategory = () => {
    // Artık kullanılmıyor - ürün eklendiğinde kategori otomatik oluşuyor
    if (!newCategoryName.trim()) return;
    if (!categories[newCategoryName]) {
      setCategories({ ...categories, [newCategoryName]: [] });
    }
    setShowCategoryModal(false);
  };

  const handleDeleteCategory = async (category: string) => {
    if (!confirm(`"${category}" kategorisini ve içindeki tüm ürünleri silmek istediğinizden emin misiniz?`)) return;
    
    try {
      // Bu kategorideki tüm ürünleri sil
      const productsToDelete = categories[category] || [];
      for (const product of productsToDelete) {
        await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
      }
      
      // Kategorileri yeniden yükle
      if (selectedSupplier) {
        loadSupplierProducts(selectedSupplier);
      }
    } catch (error) {
      console.error('Kategori silinirken hata:', error);
      alert('Hata oluştu!');
    }
  };

  // Ürün CRUD
  const handleAddProduct = (category: string) => {
    setEditingProduct(null);
    setProductForm({ name: '', code: '', brand: '', model: '', category, price: 0, description: '' });
    setShowProductModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      code: product.code || '',
      brand: product.brand || '',
      model: product.model || '',
      category: product.category || '',
      price: product.price || 0,
      description: product.description || ''
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...productForm, supplier_id: selectedSupplier })
        });
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...productForm, supplier_id: selectedSupplier })
        });
      }
      setShowProductModal(false);
      if (selectedSupplier) loadSupplierProducts(selectedSupplier);
    } catch (error) {
      console.error('Ürün kaydedilirken hata:', error);
      alert('Hata oluştu!');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (selectedSupplier) loadSupplierProducts(selectedSupplier);
    } catch (error) {
      console.error('Ürün silinirken hata:', error);
      alert('Hata oluştu!');
    }
  };

  // Tedarikçi filtreleme
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(supplierSearch.toLowerCase()) ||
    (supplier.description && supplier.description.toLowerCase().includes(supplierSearch.toLowerCase()))
  );

  // Ürün filtreleme (tüm kategorilerde)
  const filteredCategories = Object.entries(categories).reduce((acc, [category, products]) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      (product.code && product.code.toLowerCase().includes(productSearch.toLowerCase())) ||
      (product.brand && product.brand.toLowerCase().includes(productSearch.toLowerCase())) ||
      (product.model && product.model.toLowerCase().includes(productSearch.toLowerCase()))
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, Product[]>);

  const displayCategories = productSearch ? filteredCategories : categories;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Yükleniyor...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏭 Tedarikçiler</h1>
          <p className="text-gray-600">Tedarikçilerinizi ve ürünlerini yönetin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Panel - Tedarikçiler */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">📋 Tedarikçi Listesi</h2>
                <button
                  onClick={handleAddSupplier}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold transition-colors"
                >
                  ➕ Ekle
                </button>
              </div>
              
              {/* Tedarikçi Arama */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={supplierSearch}
                    onChange={(e) => setSupplierSearch(e.target.value)}
                    placeholder="🔍 Tedarikçi ara..."
                    className="w-full px-4 py-2 pl-10 border-2 border-black bg-black text-white rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                  {supplierSearch && (
                    <button
                      onClick={() => setSupplierSearch('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              
              {filteredSuppliers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>{supplierSearch ? 'Tedarikçi bulunamadı' : 'Henüz tedarikçi bulunmuyor'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredSuppliers.map((supplier) => (
                    <div
                      key={supplier.id}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        selectedSupplier === supplier.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div 
                        onClick={() => loadSupplierProducts(supplier.id)}
                        className="cursor-pointer"
                      >
                        <div className="font-bold text-lg text-gray-800">{supplier.name}</div>
                        {supplier.description && (
                          <div className="text-sm text-gray-600 mt-1">{supplier.description}</div>
                        )}
                        {supplier.contact_name && (
                          <div className="text-xs text-gray-500 mt-2">
                            👤 {supplier.contact_name}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditSupplier(supplier); }}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold"
                        >
                          ✏️ Düzenle
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteSupplier(supplier.id); }}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-bold"
                        >
                          🗑️ Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sağ Panel - Kategoriler ve Ürünler */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {!selectedSupplier ? (
                <div className="text-center py-16 text-gray-500">
                  <div className="text-6xl mb-4">🏭</div>
                  <p className="text-xl">Bir tedarikçi seçin</p>
                  <p className="text-sm mt-2">Kategoriler ve ürünler burada görünecek</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-gray-800">📦 Kategoriler ve Ürünler</h2>
                      <button
                        onClick={handleAddCategory}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold transition-colors"
                      >
                        ➕ Ürün Ekle
                      </button>
                    </div>
                    
                    {/* Ürün Arama */}
                    <div className="relative w-96">
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="🔍 Ürün ara (isim, kod, marka, model)..."
                        className="w-full px-4 py-2 pl-10 border-2 border-black bg-black text-white rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                      {productSearch && (
                        <button
                          onClick={() => setProductSearch('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {Object.keys(categories).length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                      <div className="text-6xl mb-4">�</div>
                      <p className="text-xl font-bold">Bu tedarikçiye henüz ürün eklenmemiş</p>
                      <p className="text-sm mt-2">Yukarıdaki "➕ Ürün Ekle" butonuna tıklayarak ilk ürününüzü ekleyin</p>
                      <p className="text-xs mt-2 text-gray-400">Ürün eklerken yeni bir kategori de oluşturabilirsiniz</p>
                    </div>
                  ) : Object.keys(displayCategories).length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                      <div className="text-6xl mb-4">🔍</div>
                      <p className="text-xl">Ürün bulunamadı</p>
                      <p className="text-sm mt-2">Farklı bir arama terimi deneyin</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(displayCategories).map(([category, products]) => (
                      <div key={category} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                        {/* Kategori Başlığı */}
                        <div className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                          <button
                            onClick={() => toggleCategory(category)}
                            className="flex-1 flex items-center justify-between p-4 hover:from-blue-600 hover:to-indigo-700 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">📁</span>
                              <span className="font-bold text-lg">{category}</span>
                              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                {products.length} ürün
                              </span>
                            </div>
                            <span className="text-2xl">
                              {expandedCategory === category ? '▼' : '▶'}
                            </span>
                          </button>
                          <div className="flex gap-2 pr-4">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleAddProduct(category); }}
                              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm font-bold"
                            >
                              ➕ Ürün
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category); }}
                              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-bold"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        {/* Ürünler Listesi */}
                        {expandedCategory === category && (
                          <div className="bg-gray-50">
                            {products.map((product, index) => (
                              <div
                                key={product.id}
                                className={`p-4 ${
                                  index !== products.length - 1 ? 'border-b border-gray-200' : ''
                                } hover:bg-blue-50 transition-colors`}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="font-bold text-gray-800">{product.name}</div>
                                    <div className="text-sm text-gray-600 mt-1">
                                      {product.brand && <span>🏷️ {product.brand}</span>}
                                      {product.brand && product.model && <span className="mx-2">|</span>}
                                      {product.model && <span>📦 {product.model}</span>}
                                    </div>
                                    {product.code && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        Kod: {product.code}
                                      </div>
                                    )}
                                    {product.description && (
                                      <div className="text-sm text-gray-600 mt-2">
                                        {product.description}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    {product.price > 0 && (
                                      <div className="text-right">
                                        <div className="font-bold text-green-600 text-lg">
                                          €{product.price.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-gray-500">Birim Fiyat</div>
                                      </div>
                                    )}
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => handleEditProduct(product)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold"
                                      >
                                        ✏️ Düzenle
                                      </button>
                                      <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-bold"
                                      >
                                        🗑️ Sil
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Tedarikçi Modal */}
      {showSupplierModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingSupplier ? '✏️ Tedarikçi Düzenle' : '➕ Yeni Tedarikçi'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Tedarikçi Adı *</label>
                <input
                  type="text"
                  value={supplierForm.name}
                  onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Açıklama</label>
                <textarea
                  value={supplierForm.description}
                  onChange={(e) => setSupplierForm({ ...supplierForm, description: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">İletişim Kişisi</label>
                  <input
                    type="text"
                    value={supplierForm.contact_name}
                    onChange={(e) => setSupplierForm({ ...supplierForm, contact_name: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Email</label>
                  <input
                    type="email"
                    value={supplierForm.email}
                    onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Telefon</label>
                <input
                  type="tel"
                  value={supplierForm.phone}
                  onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Adres</label>
                <textarea
                  value={supplierForm.address}
                  onChange={(e) => setSupplierForm({ ...supplierForm, address: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveSupplier}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold"
              >
                💾 Kaydet
              </button>
              <button
                onClick={() => setShowSupplierModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-bold"
              >
                ✕ İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kategori Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">➕ Yeni Kategori</h2>
            <div>
              <label className="block text-sm font-bold mb-1">Kategori Adı *</label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                placeholder="Örn: Yeni Seri Ürünler"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveCategory}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold"
              >
                💾 Kaydet
              </button>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-bold"
              >
                ✕ İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ürün Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? '✏️ Ürün Düzenle' : '➕ Yeni Ürün'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Ürün Adı *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Ürün Kodu</label>
                  <input
                    type="text"
                    value={productForm.code}
                    onChange={(e) => setProductForm({ ...productForm, code: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Fiyat (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Marka</label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Model</label>
                  <input
                    type="text"
                    value={productForm.model}
                    onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Kategori *</label>
                <div className="relative">
                  <input
                    type="text"
                    list="categories"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    placeholder="Kategori seçin veya yeni kategori yazın"
                    className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                  />
                  <datalist id="categories">
                    {Object.keys(categories).map(cat => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Mevcut kategorilerden birini seçin veya yeni bir kategori adı yazın
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Açıklama</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveProduct}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold"
              >
                💾 Kaydet
              </button>
              <button
                onClick={() => setShowProductModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-bold"
              >
                ✕ İptal
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
