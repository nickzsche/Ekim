"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Product } from "@/lib/database";
import { generateQuotePDF } from '@/lib/pdfGenerator';

type Project = {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
};

type Customer = {
  id: number;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
};

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  
  // PDF için müşteri seçim modalı
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [validityPeriod, setValidityPeriod] = useState('15');
  const [deliveryTime, setDeliveryTime] = useState('2 hafta');

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (showCustomerModal) {
      loadCustomers();
    }
  }, [showCustomerModal]);

  async function loadProjects() {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Projeler yüklenemedi:', error);
    }
  }

  async function loadCustomers() {
    try {
      const res = await fetch('/api/customers');
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Müşteriler yüklenemedi:', error);
    }
  }

  function handlePDFClick(projectId: number) {
    setSelectedProjectId(projectId);
    setShowCustomerModal(true);
  }

  async function handleGeneratePDF() {
    if (!selectedCustomerId || !selectedProjectId) {
      alert('Lütfen bir müşteri seçin!');
      return;
    }

    try {
      // Proje detaylarını yükle
      const projectRes = await fetch(`/api/projects/${selectedProjectId}`);
      if (!projectRes.ok) {
        const errorText = await projectRes.text();
        console.error('Proje API hatası:', errorText);
        throw new Error('Proje yüklenemedi');
      }
      
      const projectData = await projectRes.json();
      console.log('Proje verisi:', projectData);
      
      const customer = customers.find(c => c.id === selectedCustomerId);
      
      if (!customer) throw new Error('Müşteri bulunamadı');

      // PDF için ürün listesini hazırla - items yoksa boş array kullan
      const items = (projectData.items || []).map((item: any) => ({
        product: {
          name: item.product_name || 'İsimsiz Ürün',
          brand: item.brand || '',
          model: item.model || '',
          code: item.code || '',
        },
        quantity: item.quantity || 1,
        unitPrice: item.sales_price || item.unit_price || 0,
        total: (item.sales_price || item.unit_price || 0) * (item.quantity || 1),
      }));

      console.log('PDF için hazırlanan items:', items);

      const subtotal = items.reduce((sum: number, item: any) => sum + item.total, 0);
      const kdv = subtotal * 0.2;
      const total = subtotal + kdv;

      console.log('Hesaplamalar - Subtotal:', subtotal, 'KDV:', kdv, 'Total:', total);

      // PDF oluştur
      await generateQuotePDF({
        quoteId: selectedProjectId,
        customerInfo: {
          name: customer.name || '',
          company: customer.company || '',
          email: customer.email || '',
          phone: customer.phone || '',
        },
        projectDetails: {
          projectDesign: projectData.name || 'İsimsiz Proje',
          projectDescription: projectData.description || '',
        },
        schedule: {
          startDate: '',
          endDate: '',
        },
        conditions: {
          validityPeriod: validityPeriod || '15',
          deliveryTime: deliveryTime || '2 hafta',
        },
        items: items,
        subtotal: subtotal,
        kdv: kdv,
        total: total,
        createdAt: new Date().toISOString(),
      });

      console.log('PDF başarıyla oluşturuldu!');

      // Modal'ı kapat ve state'i temizle
      setShowCustomerModal(false);
      setSelectedProjectId(null);
      setSelectedCustomerId(null);
      setValidityPeriod('15');
      setDeliveryTime('2 hafta');
      
    } catch (error) {
      console.error('PDF oluşturma hatası:', error);
      alert(`PDF oluşturulamadı! Hata: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  }

  async function handleCreateProject() {
    if (!projectName.trim()) {
      alert('Proje adı gereklidir!');
      return;
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: projectName, 
          description: projectDescription 
        }),
      });
      
      if (res.ok) {
        const newProject = await res.json();
        // Yeni projeyi düzenleme sayfasına yönlendir
        router.push(`/projeler/${newProject.id}`);
      }
    } catch (error) {
      console.error('Proje oluşturulamadı:', error);
      alert('Proje oluşturulamadı!');
    }
  }

  async function handleDeleteProject(id: number) {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Proje silinemedi:', error);
      alert('Proje silinemedi!');
    }
  }

  return (
    <React.Fragment>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white py-10 px-2 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="bg-white/95 rounded-3xl shadow-premium p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">Tanımlı Projeler</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm"
              >
                + Yeni Proje Oluştur
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/projeler/${project.id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-bold text-sm"
                    >
                      📝 Düzenle
                    </button>
                    <button
                      onClick={() => handlePDFClick(project.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-bold text-sm"
                    >
                      📄 PDF
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-bold text-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {projects.length === 0 && (
              <div className="py-16 text-center text-gray-500">
                <p className="text-lg mb-4">Henüz tanımlı proje yok.</p>
                <p className="text-sm">Yeni bir proje oluşturarak başlayın.</p>
              </div>
            )}
          </div>
        </div>

        {/* Proje oluşturma modalı */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Yeni Proje Oluştur</h3>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Proje Adı *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Örn: Villa Projesi"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Açıklama (Opsiyonel)
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Proje hakkında kısa açıklama..."
                    rows={3}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCreateProject}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Oluştur
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setProjectName("");
                    setProjectDescription("");
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-bold"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Müşteri seçim modalı (PDF için) */}
        {showCustomerModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">PDF İçin Müşteri Seçin</h3>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Müşteri *
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={selectedCustomerId || ''}
                    onChange={(e) => setSelectedCustomerId(Number(e.target.value))}
                  >
                    <option value="">Müşteri Seçin</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.company ? `(${c.company})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCustomerId && (
                  <>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      {customers.find(c => c.id === selectedCustomerId) && (
                        <div className="text-sm text-gray-700 space-y-1">
                          <div><strong>Ad Soyad:</strong> {customers.find(c => c.id === selectedCustomerId)?.name}</div>
                          {customers.find(c => c.id === selectedCustomerId)?.company && (
                            <div><strong>Firma:</strong> {customers.find(c => c.id === selectedCustomerId)?.company}</div>
                          )}
                          {customers.find(c => c.id === selectedCustomerId)?.email && (
                            <div><strong>E-posta:</strong> {customers.find(c => c.id === selectedCustomerId)?.email}</div>
                          )}
                          {customers.find(c => c.id === selectedCustomerId)?.phone && (
                            <div><strong>Telefon:</strong> {customers.find(c => c.id === selectedCustomerId)?.phone}</div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Geçerlilik (gün)
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
                          value={validityPeriod}
                          onChange={(e) => setValidityPeriod(e.target.value)}
                          placeholder="15"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Teslim Süresi
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          placeholder="2 hafta"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleGeneratePDF}
                  disabled={!selectedCustomerId}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📄 PDF Oluştur
                </button>
                <button
                  onClick={() => {
                    setShowCustomerModal(false);
                    setSelectedProjectId(null);
                    setSelectedCustomerId(null);
                    setValidityPeriod('15');
                    setDeliveryTime('2 hafta');
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-bold"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
}
