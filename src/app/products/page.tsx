"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { Product } from '@/lib/database';

export default function ProductsPage() {
  // Sayfa açıldığında ürünleri otomatik yükle
  useEffect(() => {
    fetchProducts();
  }, []);
  // Kategorilere göre ürünleri grupla
  const groupProductsByCategory = () => {
    const grouped: { [key: string]: Product[] } = {};
    (filteredProducts.length ? filteredProducts : products).forEach(product => {
      const category = product.category || 'Diğer';
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(product);
    });
    return grouped;
  };

  // Tüm kategorileri aç/kapat
  const toggleAllCategories = () => {
    const grouped = groupProductsByCategory();
    const allOpen = Object.keys(grouped).every(cat => expandedCategories[cat]);
    const newState: { [key: string]: boolean } = {};
    Object.keys(grouped).forEach(cat => {
      newState[cat] = !allOpen;
    });
    setExpandedCategories(newState);
  };

  // Tek bir kategoriyi aç/kapat
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bulkProductsText, setBulkProductsText] = useState('');
  const [editingStock, setEditingStock] = useState<{[key: number]: boolean}>({});
  const [editingPrice, setEditingPrice] = useState<{[key: number]: boolean}>({});
  const [tempValues, setTempValues] = useState<{[key: number]: {stock?: number, price?: number}}>({});
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});
  // Manuel ürün ekleme formu için sadece gerekli alanlar
  const [singleProduct, setSingleProduct] = useState<{
    name: string;
    code: string;
    category: string;
    price: number;
    stock_quantity: number;
  }>({
    name: '',
    code: '',
    category: '',
    price: 0,
    stock_quantity: 0
  });

  // Kategori seçimi için mevcut kategoriler ve yeni kategori inputu
  const [categoryMode, setCategoryMode] = useState<'select'|'new'>('select');
  const [newCategory, setNewCategory] = useState('');
  const categoryList = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  // Ürünleri yükle
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    }
  };

  // Ürün arama fonksiyonu
  const handleProductSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    if (!searchValue.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        (product.code && product.code.toLowerCase().includes(searchValue.toLowerCase())) ||
        (product.brand && product.brand.toLowerCase().includes(searchValue.toLowerCase())) ||
        (product.model && product.model.toLowerCase().includes(searchValue.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchValue.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  };

  // Fiyat düzenleme başlat
  function startEditingPrice(id: number, price: number) {
    setEditingPrice({ [id]: true });
    setTempValues(prev => ({ ...prev, [id]: { ...prev[id], price } }));
  }

  function startEditingStock(id: number, stock: number) {
    setEditingStock({ [id]: true });
    setTempValues(prev => ({ ...prev, [id]: { ...prev[id], stock } }));
  }

  function savePrice(id: number) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price: tempValues[id]?.price } : p));
    setFilteredProducts(prev => prev.map(p => p.id === id ? { ...p, price: tempValues[id]?.price } : p));
    setEditingPrice({});
    setTempValues(prev => ({ ...prev, [id]: { ...prev[id], price: undefined } }));
  }

  function cancelEditingPrice(id: number) {
    setEditingPrice({});
    setTempValues(prev => ({ ...prev, [id]: { ...prev[id], price: undefined } }));
  }

  function saveStock(id: number) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock_quantity: tempValues[id]?.stock } : p));
    setFilteredProducts(prev => prev.map(p => p.id === id ? { ...p, stock_quantity: tempValues[id]?.stock } : p));
    setEditingStock({});
    setTempValues(prev => ({ ...prev, [id]: { ...prev[id], stock: undefined } }));
  }

  function cancelEditingStock(id: number) {
    setEditingStock({});
    setTempValues(prev => ({ ...prev, [id]: { ...prev[id], stock: undefined } }));
  }


  // Ürün silme fonksiyonu
  async function handleDeleteProduct(id: number) {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;
    // API varsa backend'e silme isteği gönder
    try {
      // Eğer bir API endpoint'iniz varsa burayı açın:
      // await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p.id !== id));
      setFilteredProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      alert('Ürün silinirken hata oluştu.');
    }
  }

  function addBulkProducts() {
    alert('Toplu ürün ekleme özelliği yakında!');
  }

  // --- RETURN ---
  return (
    <React.Fragment>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white py-10 px-2 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Bulk + Manual Product Forms Row */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Toplu Ürün Ekleme (yarı boy) */}
          <div className="flex-1 bg-white/95 backdrop-blur-lg rounded-3xl shadow-premium p-6 border border-white/20 hover:shadow-premium-hover transition-all duration-500 card-hover relative overflow-hidden min-w-[260px] max-w-xl">
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full blur-2xl opacity-30 -translate-y-10 -translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">∞</span>
                </div>
                <h2 className="text-xl font-black text-gray-900">Toplu Ürün Ekleme</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-2 border border-blue-100 text-xs text-gray-700">
                  <div><strong>Format 1:</strong> Google Sheets (Tab ile ayrılmış)</div>
                  <div><strong>Format 2:</strong> JSON</div>
                  <div><strong>Sütunlar:</strong> Ad, Kod, Marka, Model, Kategori, Fiyat, Açıklama, Özellikler, Stok, Birim</div>
                </div>
                <textarea
                  placeholder="Google Sheets verilerini buraya yapıştırın veya JSON formatı kullanın"
                  value={bulkProductsText}
                  onChange={(e) => setBulkProductsText(e.target.value)}
                  rows={7}
                  className="w-full px-2 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-xs text-gray-900 placeholder-gray-500 form-input-premium hover:border-blue-300 transition-all duration-300 resize-none"
                />
                <button
                  onClick={addBulkProducts}
                  disabled={isLoading || !bulkProductsText.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-xl font-bold text-sm transition-all duration-300 btn-hover shadow-lg relative overflow-hidden"
                >
                  {isLoading ? 'Ekleniyor...' : 'Toplu Ekle'}
                </button>
              </div>
            </div>
          </div>
          {/* Manuel Ürün Ekleme */}
          <div className="flex-1 bg-white/95 backdrop-blur-lg rounded-3xl shadow-premium p-6 border border-white/20 hover:shadow-premium-hover transition-all duration-500 card-hover relative overflow-hidden min-w-[260px] max-w-xl">
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-green-200 to-blue-300 rounded-full blur-2xl opacity-30 -translate-y-10 -translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">+</span>
                </div>
                <h2 className="text-xl font-black text-gray-900">Manuel Ürün Ekle</h2>
              </div>
              <form className="space-y-4">
                {/* Ürün Kodu */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="code">Ürün Kodu *</label>
                  <input id="code" className="w-full border px-3 py-2 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="Örn: PRD-001" value={singleProduct.code} onChange={e=>setSingleProduct(f=>({...f,code:e.target.value}))} />
                </div>
                {/* Ürün Adı */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="name">Ürün Adı *</label>
                  <input id="name" className="w-full border px-3 py-2 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="Örn: Soğutucu Fan" value={singleProduct.name} onChange={e=>setSingleProduct(f=>({...f,name:e.target.value}))} />
                </div>
                {/* Kategori */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="category">Kategori *</label>
                  {categoryMode === 'select' ? (
                    <div className="flex gap-2">
                      <select
                        id="category"
                        className="flex-1 border px-3 py-2 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        value={singleProduct.category || ''}
                        onChange={e => {
                          if (e.target.value === '__new__') {
                            setCategoryMode('new');
                            setSingleProduct(f => ({ ...f, category: '' }));
                          } else {
                            setSingleProduct(f => ({ ...f, category: e.target.value }));
                          }
                        }}
                        style={{ textTransform: 'uppercase' }}
                      >
                        <option value="">KATEGORİ SEÇİN</option>
                        <option value="__new__">+ YENİ KATEGORİ EKLE</option>
                        {categoryList.length > 0 && categoryList.filter((cat): cat is string => typeof cat === 'string').map(cat => (
                          <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        id="category-new"
                        className="flex-1 border px-3 py-2 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        placeholder="Yeni kategori adı"
                        value={newCategory}
                        onChange={e => {
                          setNewCategory(e.target.value);
                          setSingleProduct(f => ({ ...f, category: e.target.value }));
                        }}
                      />
                      <button
                        type="button"
                        className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-xs font-bold text-gray-700"
                        onClick={() => {
                          setCategoryMode('select');
                          setNewCategory('');
                        }}
                      >Vazgeç</button>
                    </div>
                  )}
                </div>
                {/* Fiyat */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="price">Fiyat (€) *</label>
                  <input id="price" type="number" className="w-full border px-3 py-2 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="Örn: 100" value={singleProduct.price} onChange={e=>setSingleProduct(f=>({...f,price:Number(e.target.value)}))} />
                </div>
                {/* Stok */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="stock">Stok *</label>
                  <input id="stock" type="number" className="w-full border px-3 py-2 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="Örn: 50" value={singleProduct.stock_quantity} onChange={e=>setSingleProduct(f=>({...f,stock_quantity:Number(e.target.value)}))} />
                </div>
                <button type="button" className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-2 px-4 rounded-xl font-bold text-base transition-all duration-300 btn-hover shadow-lg mt-2">Ekle</button>
              </form>
            </div>
          </div>
        </div>

        {/* Minimal, collapsible, inline-editable Product List */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-premium p-8 border border-white/20 hover:shadow-premium-hover transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full blur-2xl opacity-20 -translate-y-16 translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">📦</span>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Mevcut Ürünler</h2>
                  <p className="text-gray-600 font-medium">Toplam {products.length} ürün</p>
                </div>
              </div>
              <div className="flex space-x-4">
                {products.length > 0 && (
                  <button
                    onClick={toggleAllCategories}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all duration-300 btn-hover font-bold shadow-lg flex items-center space-x-2"
                  >
                    <span>{Object.keys(groupProductsByCategory()).every(cat => expandedCategories[cat]) ? '🔼' : '🔽'}</span>
                    <span>{Object.keys(groupProductsByCategory()).every(cat => expandedCategories[cat]) ? 'Hepsini Kapat' : 'Hepsini Aç'}</span>
                  </button>
                )}
                <button
                  onClick={fetchProducts}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl transition-all duration-300 btn-hover font-bold shadow-lg flex items-center space-x-2"
                >
                  <span>🔄</span>
                  <span>Yenile</span>
                </button>
              </div>
            </div>
            {/* Product Search Section */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün adı, kod, marka, model veya kategori ile ara..."
                  value={searchTerm}
                  onChange={(e) => handleProductSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm text-gray-900 placeholder-gray-700 font-semibold form-input-premium hover:border-indigo-300 transition-all duration-300"
                  style={{ fontWeight: 600, color: '#22292f', fontSize: '1.08rem', letterSpacing: '0.01em' }}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <span className="text-indigo-400 text-xl">🔍</span>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => handleProductSearch('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="text-xl">✕</span>
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="mt-3 text-sm text-gray-600 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
                  <span className="font-bold">
                    "{searchTerm}" için {filteredProducts.length} ürün bulundu
                  </span>
                </div>
              )}
            </div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-5xl text-gray-400">📦</span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">
                  {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz ürün eklenmemiş'}
                </h3>
                <p className="text-gray-600 text-lg">
                  {searchTerm ? 'Farklı bir arama terimi deneyin' : 'Yukarıdan ilk ürününüzü ekleyebilirsiniz'}
                </p>
              </div>
            ) : (
              <>
                {Object.entries(groupProductsByCategory()).map(([category, categoryProducts]) => (
                  <div key={category} className="mb-8">
                    {/* Collapsible Category Header */}
                    <div
                      className="flex items-center justify-between cursor-pointer select-none px-2 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 hover:shadow transition-all mb-2"
                      onClick={() => toggleCategory(category)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xs">
                            {category.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-black text-gray-900">{category.toLowerCase() === 'alçak kondanser' ? category.toUpperCase() : category}</span>
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                          {categoryProducts.length}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold text-gray-700">
                          {expandedCategories[category] ? 'Gizle' : 'Göster'}
                        </span>
                        <svg
                          className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${expandedCategories[category] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {/* Collapsible Category Content */}
                    {expandedCategories[category] && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-6">
                        {categoryProducts.map(product => (
                          <div key={product.id} className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4 flex flex-col gap-2 relative group">
                            {/* Ürün adı ve kodu */}
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-gray-900 text-base truncate" title={product.name}>{product.name}</span>
                              <span className="text-xs text-gray-500 font-mono">{product.code || '-'}</span>
                            </div>
                            {/* Kategori */}
                            <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{product.category || 'Diğer'}</span>
                            </div>
                            {/* Fiyat ve stok */}
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className="cursor-pointer px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 font-extrabold text-lg shadow-sm hover:bg-green-100 hover:border-green-300 transition-all"
                                style={{color:'#15803d', opacity:1, fontWeight:800, fontSize:'1.08rem'}} 
                                onClick={() => startEditingPrice(product.id!, product.price || 0)}
                                title="Fiyatı düzenlemek için tıklayın"
                              >
                                €{product.price?.toLocaleString('tr-TR', {minimumFractionDigits:2})}
                              </span>
                              <span className="text-xs text-gray-700 font-bold" style={{opacity:1}}>{product.unit || 'adet'}</span>
                              <span className="text-blue-700 font-bold ml-2">Stok:</span>
                              <span
                                className="cursor-pointer px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-extrabold shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-all"
                                style={{color:'#1e293b', opacity:1, fontWeight:800, fontSize:'1.08rem'}} 
                                onClick={() => startEditingStock(product.id!, product.stock_quantity || 0)}
                                title="Stok miktarını düzenlemek için tıklayın"
                              >
                                {product.stock_quantity || 0}
                              </span>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleDeleteProduct(product.id!)}
                                className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold py-1 px-2 rounded text-xs border border-red-200 transition-all"
                              >Sil</button>
                              <a
                                href={`/products/${product.id}`}
                                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-1 px-2 rounded text-xs border border-blue-200 transition-all text-center"
                                target="_blank"
                                rel="noopener noreferrer"
                              >Detay</a>
                            </div>
                            {/* Inline edit for price */}
                            {editingPrice[product.id!] && (
                              <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-20 rounded-xl border-2 border-blue-400 shadow-lg">
                                <div className="mb-2 text-sm font-bold text-blue-700">Fiyatı Düzenle</div>
                                <input
                                  type="number"
                                  value={tempValues[product.id!]?.price || ''}
                                  onChange={(e) => setTempValues(prev => ({
                                    ...prev,
                                    [product.id!]: {
                                      ...prev[product.id!],
                                      price: parseFloat(e.target.value) || 0
                                    }
                                  }))}
                                  className="w-24 px-2 py-1 text-right border-2 border-blue-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 font-semibold text-sm mb-2"
                                  step="0.01"
                                  placeholder="0.00"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => savePrice(product.id!)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-bold"
                                  >Kaydet</button>
                                  <button
                                    onClick={() => cancelEditingPrice(product.id!)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-xs font-bold"
                                  >İptal</button>
                                </div>
                              </div>
                            )}
                            {/* Inline edit for stock */}
                            {editingStock[product.id!] && (
                              <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-20 rounded-xl border-2 border-orange-400 shadow-lg">
                                <div className="mb-2 text-sm font-bold text-orange-700">Stok Düzenle</div>
                                <input
                                  type="number"
                                  value={tempValues[product.id!]?.stock || ''}
                                  onChange={(e) => setTempValues(prev => ({
                                    ...prev,
                                    [product.id!]: {
                                      ...prev[product.id!],
                                      stock: parseInt(e.target.value) || 0
                                    }
                                  }))}
                                  className="w-24 px-2 py-1 text-right border-2 border-orange-300 rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900 font-semibold text-sm mb-2"
                                  min="0"
                                  placeholder="0"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => saveStock(product.id!)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-bold"
                                  >Kaydet</button>
                                  <button
                                    onClick={() => cancelEditingStock(product.id!)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-xs font-bold"
                                  >İptal</button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      </main>
    </React.Fragment>
  );
}