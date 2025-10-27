"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateQuotePDF, QuotePDFData } from '@/lib/pdfGenerator';
import { generateQuoteHTML, QuoteHTMLData } from '@/lib/htmlQuoteGenerator';

interface QuoteItem {
  id?: number;
  quote_id: number;
  product_id: number;
  product_name?: string;
  brand?: string;
  model?: string;
  code?: string;
  quantity: number;
  unit_price: number;
}

interface Quote {
  id: number;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  company?: string;
  total_amount: number;
  status: string;
  notes?: string;
  created_at: string;
  item_count: number;
  items?: QuoteItem[];
}

const statusConfig = {
  draft: { label: 'Taslak', color: 'bg-gray-100 text-gray-800', icon: '📝' },
  sent: { label: 'Gönderildi', color: 'bg-blue-100 text-blue-800', icon: '📤' },
  approved: { label: 'Onaylandı', color: 'bg-green-100 text-green-800', icon: '✅' },
  rejected: { label: 'Reddedildi', color: 'bg-red-100 text-red-800', icon: '❌' },
  expired: { label: 'Süresi Doldu', color: 'bg-orange-100 text-orange-800', icon: '⏰' }
};

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Teklifler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (quote.company && quote.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = !statusFilter || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'amount-high':
        return b.total_amount - a.total_amount;
      case 'amount-low':
        return a.total_amount - b.total_amount;
      case 'customer':
        return a.customer_name.localeCompare(b.customer_name);
      default:
        return 0;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const updateQuoteStatus = async (quoteId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Teklifleri yeniden yükle
        fetchQuotes();
      } else {
        alert('Durum güncellenirken hata oluştu!');
      }
    } catch (error) {
      console.error('Durum güncelleme hatası:', error);
      alert('Durum güncellenirken hata oluştu!');
    }
  };

  const generatePDFForQuote = async (quote: Quote) => {
    try {
      console.log('Starting PDF generation for quote:', quote.id);
      console.log('Quote data:', quote);
      
      // Fetch quote details with items
      const response = await fetch(`/api/quotes/${quote.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quote details');
      }
      
      const quoteDetails = await response.json();
      console.log('Quote details from API:', quoteDetails);
      
      // Parse notes to extract project details
      const notes = quoteDetails.notes || '';
      const projectDesign = notes.match(/Proje Tasarım: ([^\n]*)/)?.[1] || '';
      const projectDescription = notes.match(/Proje Açıklama: ([^\n]*)/)?.[1] || '';
      const startDate = notes.match(/Başlangıç: ([^\n]*)/)?.[1] || '';
      const endDate = notes.match(/Bitiş: ([^\n]*)/)?.[1] || '';
      const validityPeriod = notes.match(/Geçerlilik: ([^\n]*)/)?.[1] || '30 gün';
      const deliveryTime = notes.match(/Teslim: ([^\n]*)/)?.[1] || '';

      const subtotal = quoteDetails.total_amount / 1.20; // Remove VAT to get subtotal
      const kdv = quoteDetails.total_amount - subtotal;

      const pdfData: QuotePDFData = {
        quoteId: quoteDetails.id,
        customerInfo: {
          name: (quoteDetails.customer_name || 'Müşteri adı yok').trim(),
          company: (quoteDetails.company || '').trim(),
          email: (quoteDetails.customer_email || '').trim(),
          phone: (quoteDetails.customer_phone || '').trim(),
          address: '' // Address not stored in current quotes
        },
        projectDetails: {
          projectDesign: projectDesign,
          projectDescription: projectDescription
        },
        schedule: {
          startDate: startDate,
          endDate: endDate
        },
        conditions: {
          validityPeriod: validityPeriod.replace(' gün', ''),
          deliveryTime: deliveryTime
        },
        items: quoteDetails.items?.map((item: QuoteItem) => ({
          product: {
            name: item.product_name || 'Unknown Product',
            brand: item.brand || '',
            model: item.model || '',
            code: item.code || ''
          },
          quantity: item.quantity,
          unitPrice: item.unit_price,
          total: item.unit_price * item.quantity
        })) || [],
        subtotal: subtotal,
        kdv: kdv,
        total: quoteDetails.total_amount,
        createdAt: quoteDetails.created_at
      };

      console.log('PDF Data being sent:', pdfData);
      console.log('Customer Info:', pdfData.customerInfo);

      await generateQuotePDF(pdfData);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('PDF oluşturulurken hata oluştu!');
    }
  };

  const generateHTMLForQuote = async (quote: Quote) => {
    try {
      console.log('Starting HTML generation for quote:', quote.id);
      
      // Fetch quote details with items
      const response = await fetch(`/api/quotes/${quote.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quote details');
      }
      
      const quoteDetails = await response.json();
      
      // Parse notes to extract project details
      const notes = quoteDetails.notes || '';
      const projectDesign = notes.match(/Proje Tasarım: ([^\n]*)/)?.[1] || '';
      const projectDescription = notes.match(/Proje Açıklama: ([^\n]*)/)?.[1] || '';
      const startDate = notes.match(/Başlangıç: ([^\n]*)/)?.[1] || '';
      const endDate = notes.match(/Bitiş: ([^\n]*)/)?.[1] || '';
      const validityPeriod = notes.match(/Geçerlilik: ([^\n]*)/)?.[1] || '30 gün';
      const deliveryTime = notes.match(/Teslim: ([^\n]*)/)?.[1] || '';

      const subtotal = quoteDetails.total_amount / 1.20;
      const kdv = quoteDetails.total_amount - subtotal;

      const htmlData: QuoteHTMLData = {
        quoteId: quoteDetails.id,
        customerInfo: {
          name: (quoteDetails.customer_name || 'Müşteri adı yok').trim(),
          company: (quoteDetails.company || '').trim(),
          email: (quoteDetails.customer_email || '').trim(),
          phone: (quoteDetails.customer_phone || '').trim(),
          address: ''
        },
        projectDetails: {
          projectDesign: projectDesign,
          projectDescription: projectDescription
        },
        schedule: {
          startDate: startDate,
          endDate: endDate
        },
        conditions: {
          validityPeriod: validityPeriod.replace(' gün', ''),
          deliveryTime: deliveryTime
        },
        items: quoteDetails.items?.map((item: QuoteItem) => ({
          product: {
            name: item.product_name || 'Unknown Product',
            brand: item.brand || '',
            model: item.model || '',
            code: item.code || ''
          },
          quantity: item.quantity,
          unitPrice: item.unit_price,
          total: item.unit_price * item.quantity
        })) || [],
        subtotal: subtotal,
        kdv: kdv,
        total: quoteDetails.total_amount,
        createdAt: quoteDetails.created_at
      };

      generateQuoteHTML(htmlData);
    } catch (error) {
      console.error('HTML generation error:', error);
      alert('HTML oluşturulurken hata oluştu!');
    }
  };

  const viewQuote = async (quote: Quote) => {
    try {
      const response = await fetch(`/api/quotes/${quote.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quote details');
      }
      
      const quoteDetails = await response.json();
      setSelectedQuote(quoteDetails);
      setShowQuoteModal(true);
    } catch (error) {
      console.error('Error fetching quote details:', error);
      alert('Teklif detayları getirilirken hata oluştu!');
    }
  };

  const editQuote = (quote: Quote) => {
    // Redirect to main page with quote data for editing
    const quoteData = {
      id: quote.id,
      customer_name: quote.customer_name,
      customer_email: quote.customer_email,
      customer_phone: quote.customer_phone,
      company: quote.company,
      total_amount: quote.total_amount,
      status: quote.status,
      notes: quote.notes
    };
    
    // Store in sessionStorage to pass to main page
    sessionStorage.setItem('editQuote', JSON.stringify(quoteData));
    window.location.href = '/?edit=true';
  };

  const deleteQuote = async (quote: Quote) => {
    if (!confirm(`"${quote.customer_name}" müşterisine ait #${quote.id} numaralı teklifi silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/quotes/${quote.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Teklif başarıyla silindi!');
        fetchQuotes(); // Refresh the list
      } else {
        alert('Teklif silinirken hata oluştu!');
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
      alert('Teklif silinirken hata oluştu!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <Header />
        <div className="flex items-center justify-center h-96 relative z-10">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin mx-auto"></div>
              <div className="absolute top-2 left-2 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-premium">
              <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Teklifler yükleniyor...</h2>
              <p className="text-gray-600 font-medium">Lütfen bekleyin</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden page-transition">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Header />
      
      {/* Enhanced Page Header */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent relative z-10">📋 Teklifler</h1>
              <p className="text-gray-700 mt-3 text-lg font-medium relative z-10">Tüm tekliflerinizi görüntüleyin ve yönetin</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 border border-indigo-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                  <span className="text-indigo-600 font-bold text-lg">Toplam: {quotes.length} Teklif</span>
                </div>
              </div>
              <Link
                href="/"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 btn-hover shadow-lg flex items-center space-x-3"
              >
                <span>✨</span>
                <span>Yeni Teklif</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-premium p-8 mb-8 border border-white/20 hover:shadow-premium-hover transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group">
              <label className="block text-sm font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">Arama</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Müşteri adı veya firma ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm text-gray-900 form-input-premium hover:border-indigo-300 transition-all duration-300"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <span className="text-indigo-400 text-xl">🔍</span>
                </div>
              </div>
            </div>
            
            <div className="group">
              <label className="block text-sm font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">Durum</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm text-gray-900 form-input-premium hover:border-indigo-300 transition-all duration-300"
              >
                <option value="">Tüm Durumlar</option>
                <option value="draft">Taslak</option>
                <option value="sent">Gönderildi</option>
                <option value="approved">Onaylandı</option>
                <option value="rejected">Reddedildi</option>
                <option value="expired">Süresi Doldu</option>
              </select>
            </div>
            
            <div className="group">
              <label className="block text-sm font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">Sıralama</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm text-gray-900 form-input-premium hover:border-indigo-300 transition-all duration-300"
              >
                <option value="newest">En Yeni</option>
                <option value="oldest">En Eski</option>
                <option value="amount-high">Tutar (Yüksek)</option>
                <option value="amount-low">Tutar (Düşük)</option>
                <option value="customer">Müşteri (A-Z)</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={fetchQuotes}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 btn-hover shadow-lg flex items-center justify-center space-x-2"
              >
                <span>🔄</span>
                <span>Yenile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Quotes Grid */}
        {sortedQuotes.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-premium p-16 text-center border border-white/20 hover:shadow-premium-hover transition-all duration-500">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-5xl">📋</span>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">Henüz teklif yok</h3>
            <p className="text-gray-600 mb-8 text-lg">İlk teklifinizi oluşturmak için yeni teklif butonuna tıklayın</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 btn-hover shadow-lg"
            >
              <span className="flex items-center space-x-2">
                <span>✨</span>
                <span>Yeni Teklif Oluştur</span>
              </span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedQuotes.map((quote, index) => {
              const status = statusConfig[quote.status as keyof typeof statusConfig] || statusConfig.draft;
              return (
                <div 
                  key={quote.id} 
                  className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-premium hover:shadow-premium-hover transition-all duration-500 overflow-hidden border border-white/20 card-hover interactive-card"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="p-8 relative">
                    {/* Decorative Element */}
                    <div className={`absolute top-4 right-4 w-20 h-20 rounded-full blur-2xl opacity-20 ${
                      status.color.includes('green') ? 'bg-green-300' :
                      status.color.includes('blue') ? 'bg-blue-300' :
                      status.color.includes('red') ? 'bg-red-300' :
                      status.color.includes('orange') ? 'bg-orange-300' :
                      'bg-gray-300'
                    }`}></div>
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">#{quote.id}</span>
                          </div>
                          <h3 className="text-xl font-black text-gray-900">Teklif #{quote.id}</h3>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">{formatDate(quote.created_at)}</p>
                      </div>
                      <div className="relative group">
                        <select
                          value={quote.status}
                          onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                          className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold shadow-sm cursor-pointer transition-all duration-200 border-2 border-transparent hover:border-gray-300 ${status.color}`}
                        >
                          <option value="draft">📝 Taslak</option>
                          <option value="sent">📤 Gönderildi</option>
                          <option value="approved">✅ Onaylandı</option>
                          <option value="rejected">❌ Reddedildi</option>
                          <option value="expired">⏰ Süresi Doldu</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {quote.customer_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <h4 className="font-black text-gray-900 text-lg">{quote.customer_name}</h4>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        {quote.company && (
                          <div className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                            <span className="font-bold text-gray-700">🏢 {quote.company}</span>
                          </div>
                        )}
                        {quote.customer_email && (
                          <div className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                            <span className="font-bold text-gray-700">📧 {quote.customer_email}</span>
                          </div>
                        )}
                        {quote.customer_phone && (
                          <div className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                            <span className="font-bold text-gray-700">📞 {quote.customer_phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quote Details */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-black text-gray-800">Toplam Tutar:</span>
                        <span className="font-black text-2xl text-green-600">
                          €{quote.total_amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-black text-gray-800">Ürün Sayısı:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-black text-blue-600">{quote.item_count}</span>
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">ürün</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes Preview */}
                    {quote.notes && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-sm font-bold text-gray-700 line-clamp-2">{quote.notes}</p>
                      </div>
                    )}

                    {/* Enhanced Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => viewQuote(quote)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 btn-hover shadow-lg flex items-center justify-center space-x-2"
                      >
                        <span>👁️</span>
                        <span>Görüntüle</span>
                      </button>
                      <button 
                        onClick={() => editQuote(quote)}
                        className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 btn-hover shadow-lg flex items-center justify-center space-x-2"
                      >
                        <span>✏️</span>
                        <span>Düzenle</span>
                      </button>
                      <button 
                        onClick={() => generateHTMLForQuote(quote)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 btn-hover shadow-lg flex items-center justify-center space-x-2"
                      >
                        <span>🌐</span>
                        <span>HTML</span>
                      </button>
                      <button 
                        onClick={() => generatePDFForQuote(quote)}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 btn-hover shadow-lg flex items-center justify-center space-x-2"
                      >
                        <span>📄</span>
                        <span>PDF</span>
                      </button>
                      <button 
                        onClick={() => deleteQuote(quote)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 btn-hover shadow-lg flex items-center justify-center space-x-2"
                      >
                        <span>🗑️</span>
                        <span>Sil</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quote View Modal */}
      {showQuoteModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Teklif Detayları - #{selectedQuote.id}</h2>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Customer Info */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">👤 Müşteri Bilgileri</h3>
                  <div className="space-y-2">
                    <p><span className="font-bold text-gray-700">Ad:</span> {selectedQuote.customer_name}</p>
                    {selectedQuote.company && (
                      <p><span className="font-bold text-gray-700">Firma:</span> {selectedQuote.company}</p>
                    )}
                    {selectedQuote.customer_email && (
                      <p><span className="font-bold text-gray-700">E-posta:</span> {selectedQuote.customer_email}</p>
                    )}
                    {selectedQuote.customer_phone && (
                      <p><span className="font-bold text-gray-700">Telefon:</span> {selectedQuote.customer_phone}</p>
                    )}
                  </div>
                </div>
                
                {/* Quote Info */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">📋 Teklif Bilgileri</h3>
                  <div className="space-y-2">
                    <p><span className="font-bold text-gray-700">Durum:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        statusConfig[selectedQuote.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800'
                      }`}>
                        {statusConfig[selectedQuote.status as keyof typeof statusConfig]?.label || selectedQuote.status}
                      </span>
                    </p>
                    <p><span className="font-bold text-gray-700">Tarih:</span> {formatDate(selectedQuote.created_at)}</p>
                    <p><span className="font-bold text-gray-700">Toplam Tutar:</span> 
                      <span className="font-bold text-green-600">
                        €{selectedQuote.total_amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Project Notes */}
              {selectedQuote.notes && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">📄 Proje Notları</h3>
                  <div className="whitespace-pre-wrap text-sm text-gray-700">{selectedQuote.notes}</div>
                </div>
              )}
              
              {/* Quote Items */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">🛍️ Teklif Kalemleri</h3>
                </div>
                
                {selectedQuote.items && selectedQuote.items.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Ürün</th>
                          <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Miktar</th>
                          <th className="px-4 py-3 text-right text-sm font-bold text-gray-900">Birim Fiyat</th>
                          <th className="px-4 py-3 text-right text-sm font-bold text-gray-900">Toplam</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedQuote.items.map((item: QuoteItem, index: number) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="font-bold text-gray-900">{item.product_name || 'Unknown Product'}</div>
                              {item.brand && <div className="text-sm text-gray-600">{item.brand} {item.model}</div>}
                              {item.code && <div className="text-xs text-gray-500">Kod: {item.code}</div>}
                            </td>
                            <td className="px-4 py-3 text-center font-bold text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-3 text-right font-bold text-gray-900">
                              €{item.unit_price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-lg text-green-600">
                              €{(item.unit_price * item.quantity).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <div className="text-4xl mb-2">😊</div>
                    <p>Bu teklif için ürün kalemi bulunamadı.</p>
                  </div>
                )}
              </div>
              
              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => editQuote(selectedQuote)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => generatePDFForQuote(selectedQuote)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  PDF İndir
                </button>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}