"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

// Müşteri tipi ve cari hareket tipi
type Customer = {
  id: number;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxNumber?: string;
  taxOffice?: string;
  contact?: string;
  balance?: number;
};
type Transaction = {
  id: number;
  date: string;
  type: 'tahsilat' | 'ödeme' | 'çek' | 'borç';
  method: 'nakit' | 'kredi' | 'çek' | 'manuel';
  amount: number;
  description?: string;
  // Çek için ek alanlar
  verilisTarihi?: string;
  vadeTarihi?: string;
  bank?: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer|null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'nakit'|'kredi'|'çek'|'borç'>('nakit');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDesc, setPaymentDesc] = useState('');
  const [search, setSearch] = useState('');
  // Cari hareket düzenleme/silme
  const [editTransaction, setEditTransaction] = useState<Transaction|null>(null);
  const [transactionForm, setTransactionForm] = useState<{
    date: string;
    type: 'tahsilat' | 'ödeme' | 'çek' | 'borç';
    method: 'nakit' | 'kredi' | 'çek' | 'manuel';
    amount: string;
    description: string;
    verilisTarihi: string;
    vadeTarihi: string;
    bank: string;
  }>({
    date: '', type: 'tahsilat', method: 'nakit', amount: '', description: '', verilisTarihi: '', vadeTarihi: '', bank: ''
  });
  const [deleteTransactionId, setDeleteTransactionId] = useState<number|null>(null);
  // Müşteri ekleme/düzenleme modalı
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer|null>(null);
  const [customerForm, setCustomerForm] = useState({
    name: '', company: '', phone: '', email: '', address: '', taxNumber: '', taxOffice: '', contact: '', balance: ''
  });
  const [deleteId, setDeleteId] = useState<number|null>(null);

  // Gerçek müşteri verisini API'den çek
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch('/api/customers');
        if (!res.ok) throw new Error('Müşteriler alınamadı');
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        // Hata durumunda eski dummy veriyi kullan
        setCustomers([
          {id:1, name:'Mega Plaza AVM', company:'Mega Plaza', phone:'0216 987 65 43', email:'teknik@megaplaza.com', address:'İstanbul', taxNumber:'1234567890', taxOffice:'Kadıköy', contact:'Ahmet Yılmaz', balance: 12000},
          {id:2, name:'ABC İnşaat Ltd. Şti.', company:'ABC İnşaat', phone:'0212 123 45 67', email:'info@abcinsaat.com', address:'Ankara', taxNumber:'9876543210', taxOffice:'Çankaya', contact:'Mehmet Kaya', balance: -3500},
          {id:3, name:'Kaya Market', company:'Kaya Market', phone:'0532 111 22 33', email:'kaya@market.com', address:'İzmir', taxNumber:'1112223334', taxOffice:'Konak', contact:'Ali Kaya', balance: 0},
        ]);
      }
    }
    fetchCustomers();
  }, []);

  // Cari hareketleri çek (seçili müşteri için)
  useEffect(() => {
    if(selectedCustomer?.id) {
      async function fetchTransactions() {
        try {
          const res = await fetch(`/api/customers/${selectedCustomer!.id}/transactions`);
          if (res.ok) {
            const data = await res.json();
            setTransactions(data);
          } else {
            setTransactions([]);
          }
        } catch {
          console.error('Cari hareketler alınamadı');
          setTransactions([]);
        }
      }
      fetchTransactions();
    } else {
      setTransactions([]);
    }
  }, [selectedCustomer]);

  // Müşteri arama

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  );

  // Tahsilat/ödeme/çek/borç işlemi ekle/düzenle ve API'ye kaydet
  const handleAddTransaction = async () => {
    if(!selectedCustomer || !selectedCustomer.id) return;
    
    const transactionData = {
      date: transactionForm.date || new Date().toISOString().slice(0,10),
      type: editTransaction ? transactionForm.type : (paymentType==='çek' ? 'çek' : paymentType==='borç' ? 'borç' : 'tahsilat'),
      method: editTransaction ? transactionForm.method : (paymentType==='borç' ? 'manuel' : paymentType),
      amount: Number(transactionForm.amount || paymentAmount),
      description: transactionForm.description || paymentDesc,
      verilis_tarihi: transactionForm.verilisTarihi,
      vade_tarihi: transactionForm.vadeTarihi,
      bank: transactionForm.bank
    };

    try {
      if(editTransaction && editTransaction.id) {
        // Güncelleme
        const res = await fetch(`/api/customers/${selectedCustomer.id}/transactions/${editTransaction.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transactionData)
        });
        if (res.ok) {
          const result = await res.json();
          // Listeyi yenile
          const listRes = await fetch(`/api/customers/${selectedCustomer.id}/transactions`);
          if (listRes.ok) {
            const data = await listRes.json();
            setTransactions(data);
          }
          // Müşteri bakiyesini güncelle
          setCustomers(prev => prev.map(c =>
            c.id === selectedCustomer.id ? { ...c, balance: result.balance } : c
          ));
          setSelectedCustomer(prev => prev ? { ...prev, balance: result.balance } : null);
        }
      } else {
        // Yeni ekleme
        const res = await fetch(`/api/customers/${selectedCustomer.id}/transactions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transactionData)
        });
        if (res.ok) {
          const result = await res.json();
          // Listeyi yenile
          const listRes = await fetch(`/api/customers/${selectedCustomer.id}/transactions`);
          if (listRes.ok) {
            const data = await listRes.json();
            setTransactions(data);
          }
          // Müşteri bakiyesini güncelle
          setCustomers(prev => prev.map(c =>
            c.id === selectedCustomer.id ? { ...c, balance: result.balance } : c
          ));
          setSelectedCustomer(prev => prev ? { ...prev, balance: result.balance } : null);
        }
      }
    } catch (error) {
      console.error('Cari hareket kaydedilemedi:', error);
      alert('Cari hareket kaydedilemedi!');
    }

    setPaymentAmount('');
    setPaymentDesc('');
    setShowPaymentModal(false);
    setEditTransaction(null);
    setTransactionForm({ date: '', type: 'tahsilat', method: 'nakit', amount: '', description: '', verilisTarihi: '', vadeTarihi: '', bank: '' });
  };

  // Cari hareket düzenleme modalını aç
  const openTransactionModal = (t?: Transaction) => {
    if(t) {
      setEditTransaction(t);
      setTransactionForm({
        date: t.date,
        type: t.type,
        method: t.method,
        amount: t.amount.toString(),
        description: t.description || '',
        verilisTarihi: t.verilisTarihi || '',
        vadeTarihi: t.vadeTarihi || '',
        bank: t.bank || ''
      });
      // Manuel method için borç tipine çevir
      if(t.method === 'manuel') {
        setPaymentType('borç');
      } else {
        setPaymentType(t.method);
      }
    } else {
      setEditTransaction(null);
      setTransactionForm({ date: '', type: 'tahsilat', method: 'nakit', amount: '', description: '', verilisTarihi: '', vadeTarihi: '', bank: '' });
      setPaymentType('nakit');
    }
    setShowPaymentModal(true);
  };

  // Cari hareket sil
  const handleDeleteTransaction = async () => {
    if(deleteTransactionId !== null && selectedCustomer && selectedCustomer.id) {
      try {
        const res = await fetch(`/api/customers/${selectedCustomer.id}/transactions/${deleteTransactionId}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          const result = await res.json();
          // Listeyi yenile
          const listRes = await fetch(`/api/customers/${selectedCustomer.id}/transactions`);
          if (listRes.ok) {
            const data = await listRes.json();
            setTransactions(data);
          }
          // Müşteri bakiyesini güncelle
          setCustomers(prev => prev.map(c =>
            c.id === selectedCustomer.id ? { ...c, balance: result.balance } : c
          ));
          setSelectedCustomer(prev => prev ? { ...prev, balance: result.balance } : null);
        }
      } catch (error) {
        console.error('Cari hareket silinemedi:', error);
        alert('Cari hareket silinemedi!');
      }
      setDeleteTransactionId(null);
    }
  };

  // Müşteri ekleme/düzenleme modalını aç
  const openCustomerModal = (customer?: Customer) => {
    if (customer) {
      setEditCustomer(customer);
      setCustomerForm({
        name: customer.name || '',
        company: customer.company || '',
        phone: customer.phone || '',
        email: customer.email || '',
        address: customer.address || '',
        taxNumber: customer.taxNumber || '',
        taxOffice: customer.taxOffice || '',
        contact: customer.contact || '',
        balance: customer.balance?.toString() || ''
      });
    } else {
      setEditCustomer(null);
      setCustomerForm({ name: '', company: '', phone: '', email: '', address: '', taxNumber: '', taxOffice: '', contact: '', balance: '' });
    }
    setShowCustomerModal(true);
  };

  // Müşteri ekle/güncelle
  const handleCustomerSave = async () => {
    if (!customerForm.name) return;
    
    try {
      if (editCustomer && editCustomer.id) {
        // Güncelleme
        const res = await fetch(`/api/customers/${editCustomer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: customerForm.name,
            company: customerForm.company,
            phone: customerForm.phone,
            email: customerForm.email,
            address: customerForm.address,
            tax_number: customerForm.taxNumber,
            tax_office: customerForm.taxOffice,
            balance: Number(customerForm.balance) || 0
          })
        });
        if (res.ok) {
          const result = await res.json();
          setCustomers(prev => prev.map(c => c.id === editCustomer.id ? result.customer : c));
          if (selectedCustomer && selectedCustomer.id === editCustomer.id) {
            setSelectedCustomer(result.customer);
          }
        }
      } else {
        // Yeni ekleme
        const res = await fetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: customerForm.name,
            company: customerForm.company,
            phone: customerForm.phone,
            email: customerForm.email,
            address: customerForm.address,
            tax_number: customerForm.taxNumber,
            tax_office: customerForm.taxOffice,
            balance: Number(customerForm.balance) || 0
          })
        });
        if (res.ok) {
          const newCustomer = await res.json();
          setCustomers(prev => [...prev, newCustomer]);
        }
      }
    } catch (error) {
      console.error('Müşteri kaydedilemedi:', error);
      alert('Müşteri kaydedilemedi!');
    }
    
    setShowCustomerModal(false);
    setEditCustomer(null);
    setCustomerForm({ name: '', company: '', phone: '', email: '', address: '', taxNumber: '', taxOffice: '', contact: '', balance: '' });
  };

  // Müşteri sil
  const handleDeleteCustomer = async () => {
    if (deleteId !== null) {
      try {
        const res = await fetch(`/api/customers/${deleteId}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setCustomers(prev => prev.filter(c => c.id !== deleteId));
          if (selectedCustomer && selectedCustomer.id === deleteId) setSelectedCustomer(null);
        } else {
          const error = await res.json();
          alert(error.error || 'Müşteri silinemedi!');
        }
      } catch (error) {
        console.error('Müşteri silinemedi:', error);
        alert('Müşteri silinemedi!');
      }
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <div className="max-w-6xl mx-auto py-8 px-2">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Müşteri listesi */}
          <div className="flex-1 bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-900">Müşteriler</h2>
              <div className="flex gap-2">
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ara..." className="border px-2 py-1 rounded text-sm text-gray-900 bg-white" />
                <button className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold" onClick={()=>openCustomerModal()}>+ Yeni Müşteri</button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-left p-2 text-gray-900">Adı</th>
                  <th className="text-left p-2 text-gray-900">Firma</th>
                  <th className="text-left p-2 text-gray-900">Telefon</th>
                  <th className="text-left p-2 text-gray-900">Bakiye</th>
                  <th className="text-left p-2 text-gray-900">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c=>(
                  <tr key={c.id} className="border-b hover:bg-blue-50">
                    <td className="p-2 font-bold text-blue-900">{c.name}</td>
                    <td className="p-2 text-gray-800">{c.company}</td>
                    <td className="p-2 text-gray-800">{c.phone}</td>
                    <td className={"p-2 font-bold " + (c.balance && c.balance<0 ? 'text-red-600' : 'text-green-700')}>
                      {c.balance?.toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺
                      {typeof c.balance === 'number' && (
                        <span className="ml-1 text-xs font-bold text-gray-500">
                          {c.balance > 0 ? '(A)' : c.balance < 0 ? '(B)' : ''}
                        </span>
                      )}
                    </td>
                    <td className="p-2 flex gap-2">
                      <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs" onClick={()=>setSelectedCustomer(c)}>Detay</button>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs" onClick={()=>openCustomerModal(c)}>Düzenle</button>
                      <button className="bg-red-600 text-white px-2 py-1 rounded text-xs" onClick={()=>setDeleteId(c.id)}>Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {/* Müşteri ekleme/düzenleme modalı */}
        {showCustomerModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 min-w-[340px] max-w-[95vw]">
              <div className="font-bold text-lg mb-2 text-blue-900">{editCustomer ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}</div>
              <div className="flex flex-col gap-2">
                <input className="border px-2 py-1 rounded w-full text-gray-900" placeholder="Adı*" value={customerForm.name} onChange={e=>setCustomerForm(f=>({...f,name:e.target.value}))} />
                <input className="border px-2 py-1 rounded w-full text-gray-900" placeholder="Firma" value={customerForm.company} onChange={e=>setCustomerForm(f=>({...f,company:e.target.value}))} />
                <input className="border px-2 py-1 rounded w-full text-gray-900" placeholder="Telefon" value={customerForm.phone} onChange={e=>setCustomerForm(f=>({...f,phone:e.target.value}))} />
                <input className="border px-2 py-1 rounded w-full text-gray-900" placeholder="E-posta" value={customerForm.email} onChange={e=>setCustomerForm(f=>({...f,email:e.target.value}))} />
                <input className="border px-2 py-1 rounded w-full text-gray-900" placeholder="Adres" value={customerForm.address} onChange={e=>setCustomerForm(f=>({...f,address:e.target.value}))} />
                <input className="border px-2 py-1 rounded w-full text-gray-900" placeholder="Vergi Numarası" value={customerForm.taxNumber} onChange={e=>setCustomerForm(f=>({...f,taxNumber:e.target.value}))} />
                <input className="border px-2 py-1 rounded w-full text-gray-900" placeholder="Vergi Dairesi" value={customerForm.taxOffice} onChange={e=>setCustomerForm(f=>({...f,taxOffice:e.target.value}))} />
                <input className="border px-2 py-1 rounded w-full text-gray-900" placeholder="İletişim Bilgisi" value={customerForm.contact} onChange={e=>setCustomerForm(f=>({...f,contact:e.target.value}))} />
                <input className="border px-2 py-1 rounded w-full text-gray-900" placeholder="Bakiye" type="number" value={customerForm.balance} onChange={e=>setCustomerForm(f=>({...f,balance:e.target.value}))} />
              </div>
              <div className="flex gap-2 mt-4">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" onClick={handleCustomerSave}>{editCustomer ? 'Kaydet' : 'Ekle'}</button>
                <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-bold" onClick={()=>setShowCustomerModal(false)}>İptal</button>
              </div>
            </div>
          </div>
        )}
        {/* Silme onay modalı */}
        {deleteId !== null && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] max-w-[95vw]">
              <div className="font-bold text-lg mb-2 text-red-700">Müşteri Sil</div>
              <div className="mb-4 text-gray-800">Bu müşteriyi silmek istediğinize emin misiniz?</div>
              <div className="flex gap-2">
                <button className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold" onClick={handleDeleteCustomer}>Evet, Sil</button>
                <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-bold" onClick={()=>setDeleteId(null)}>Vazgeç</button>
              </div>
            </div>
          </div>
        )}
          {/* Müşteri detay ve cari hareketler */}
          <div className="flex-1 bg-white rounded-2xl shadow p-6 min-h-[400px]">
            {selectedCustomer ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-lg font-bold text-blue-900">{selectedCustomer.name}</div>
                    <div className="text-sm text-gray-500">{selectedCustomer.company}</div>
                    <div className="text-xs text-gray-500">{selectedCustomer.phone} | {selectedCustomer.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Bakiye</div>
                    <div className={"text-lg font-bold " + (selectedCustomer.balance && selectedCustomer.balance<0 ? 'text-red-600' : 'text-green-700')}>{selectedCustomer.balance?.toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</div>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-xs" onClick={()=>{setPaymentType('nakit');setShowPaymentModal(true);}}>Nakit Tahsilat</button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded text-xs" onClick={()=>{setPaymentType('kredi');setShowPaymentModal(true);}}>Kredi Kartı</button>
                  <button className="bg-purple-600 text-white px-3 py-1 rounded text-xs" onClick={()=>{setPaymentType('çek');setShowPaymentModal(true);}}>Çek Girişi</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-xs" onClick={()=>{setPaymentType('borç');setShowPaymentModal(true);}}>Borç Girişi</button>
                  <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs" onClick={()=>setSelectedCustomer(null)}>Kapat</button>
                </div>
                <div className="mb-2 font-bold text-blue-800">Cari Hareketler</div>
                <table className="w-full text-xs mb-2">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="text-left p-1 text-gray-900">Tarih</th>
                      <th className="text-left p-1 text-gray-900">Tip</th>
                      <th className="text-left p-1 text-gray-900">Yöntem</th>
                      <th className="text-right p-1 text-gray-900">Tutar</th>
                      <th className="text-left p-1 text-gray-900">Açıklama</th>
                      <th className="text-left p-1 text-gray-900">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(t=>(
                      <tr key={t.id}>
                        <td className="p-1 text-gray-800">{t.date}</td>
                        <td className="p-1 text-gray-800">{t.type}</td>
                        <td className="p-1 text-gray-800">{t.method}</td>
                        <td className="p-1 text-right font-bold text-gray-900">{t.amount.toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</td>
                        <td className="p-1 text-gray-800">{t.description}</td>
                        <td className="p-1 flex gap-1">
                          <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs" onClick={()=>openTransactionModal(t)}>Düzenle</button>
                          <button className="bg-red-600 text-white px-2 py-1 rounded text-xs" onClick={()=>setDeleteTransactionId(t.id)}>Sil</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="text-gray-400 text-center mt-20">Bir müşteri seçin...</div>
            )}
          </div>
        </div>
        {/* Tahsilat/ödeme/çek modalı */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 min-w-[340px] max-w-[95vw]">
              <div className="font-bold mb-2 text-blue-900">
                {paymentType==='çek' ? (editTransaction ? 'Çek Hareketi Düzenle' : 'Çek Girişi') : 
                 paymentType==='borç' ? (editTransaction ? 'Borç Düzenle' : 'Borç Girişi') :
                 paymentType==='kredi' ? 'Kredi Kartı Tahsilat' : 'Nakit Tahsilat'}
              </div>
              <div className="flex flex-col gap-2">
                {paymentType==='çek' ? (
                  <>
                    <label className="text-xs text-gray-700 font-semibold mt-1 mb-0.5">Veriliş Tarihi</label>
                    <input type="date" className="border px-2 py-1 rounded w-full text-gray-900" value={transactionForm.verilisTarihi} onChange={e=>setTransactionForm(f=>({...f,verilisTarihi:e.target.value}))} />
                    <input type="number" className="border px-2 py-1 rounded w-full text-gray-900 mt-2" placeholder="Tutar" value={transactionForm.amount || paymentAmount} onChange={e=>setTransactionForm(f=>({...f,amount:e.target.value}))} />
                    <label className="text-xs text-gray-700 font-semibold mt-2 mb-0.5">Vade Tarihi</label>
                    <input type="date" className="border px-2 py-1 rounded w-full text-gray-900" value={transactionForm.vadeTarihi} onChange={e=>setTransactionForm(f=>({...f,vadeTarihi:e.target.value}))} />
                    <input type="text" className="border px-2 py-1 rounded w-full text-gray-900 mt-2" placeholder="Banka" value={transactionForm.bank} onChange={e=>setTransactionForm(f=>({...f,bank:e.target.value}))} />
                    <input type="text" className="border px-2 py-1 rounded w-full text-gray-900 mt-2" placeholder="Açıklama (opsiyonel)" value={transactionForm.description || paymentDesc} onChange={e=>setTransactionForm(f=>({...f,description:e.target.value}))} />
                  </>
                ) : paymentType==='borç' ? (
                  <>
                    <label className="text-xs text-gray-700 font-semibold mt-1 mb-0.5">Borç Tarihi</label>
                    <input type="date" className="border px-2 py-1 rounded w-full text-gray-900" value={transactionForm.date || new Date().toISOString().slice(0,10)} onChange={e=>setTransactionForm(f=>({...f,date:e.target.value}))} />
                    <input type="number" className="border px-2 py-1 rounded w-full text-gray-900 mt-2" placeholder="Borç Tutarı" value={transactionForm.amount || paymentAmount} onChange={e=>setTransactionForm(f=>({...f,amount:e.target.value}))} />
                    <input type="text" className="border px-2 py-1 rounded w-full text-gray-900 mt-2" placeholder="Açıklama (opsiyonel)" value={transactionForm.description || paymentDesc} onChange={e=>setTransactionForm(f=>({...f,description:e.target.value}))} />
                  </>
                ) : (
                  <>
                    <input type="number" className="border px-2 py-1 rounded w-full text-gray-900" placeholder="Tutar" value={transactionForm.amount || paymentAmount} onChange={e=>setTransactionForm(f=>({...f,amount:e.target.value}))} />
                    <input type="text" className="border px-2 py-1 rounded w-full text-gray-900" placeholder="Açıklama (opsiyonel)" value={transactionForm.description || paymentDesc} onChange={e=>setTransactionForm(f=>({...f,description:e.target.value}))} />
                  </>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs" onClick={handleAddTransaction}>{editTransaction ? 'Kaydet' : 'Ekle'}</button>
                <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs" onClick={()=>{setShowPaymentModal(false);setEditTransaction(null);}}>İptal</button>
              </div>
            </div>
          </div>
        )}
        {/* Cari hareket silme onay modalı */}
        {deleteTransactionId !== null && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] max-w-[95vw]">
              <div className="font-bold text-lg mb-2 text-red-700">Cari Hareket Sil</div>
              <div className="mb-4 text-gray-800">Bu hareketi silmek istediğinize emin misiniz?</div>
              <div className="flex gap-2">
                <button className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold" onClick={handleDeleteTransaction}>Evet, Sil</button>
                <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-bold" onClick={()=>setDeleteTransactionId(null)}>Vazgeç</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

