'use client';

export interface QuoteHTMLData {
  quoteId: number;
  customerInfo: {
    name: string;
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  projectDetails: {
    projectDesign: string;
    projectDescription: string;
  };
  schedule: {
    startDate: string;
    endDate: string;
  };
  conditions: {
    validityPeriod: string;
    deliveryTime: string;
  };
  items: Array<{
    product: {
      name: string;
      customName?: string;
      brand?: string;
      model?: string;
      code?: string;
      description?: string;
    };
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  kdv: number;
  total: number;
  createdAt: string;
}

export const generateQuoteHTML = (data: QuoteHTMLData): void => {
  // Yeni pencere aç
  const printWindow = window.open('', '_blank', 'width=800,height=1000');
  
  if (!printWindow) {
    alert('Pop-up engelleyici aktif! Lütfen pop-up\'lara izin verin.');
    return;
  }

  // HTML içeriği
  const htmlContent = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teklif #${data.quoteId} - ${data.customerInfo.name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    @media print {
      @page {
        size: A4;
        margin: 15mm;
      }
      body {
        margin: 0;
        padding: 0;
        background: white;
      }
      .no-print {
        display: none !important;
      }
      .container {
        box-shadow: none !important;
        margin-bottom: 0 !important;
      }
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
      padding: 30px 20px;
      color: #1a202c;
      line-height: 1.6;
      min-height: auto;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 30px;
    }
    
    .print-button {
      position: fixed;
      top: 30px;
      right: 30px;
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      border: none;
      padding: 14px 28px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: 'Inter', sans-serif;
    }
    
    .print-button:hover {
      background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(37, 99, 235, 0.5);
    }
    
    .print-button:active {
      transform: translateY(0);
    }
    
    .print-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    /* Header - Modern & Elegant */
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      padding: 40px;
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 300px;
      height: 300px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      transform: translate(50%, -50%);
    }
    
    .header-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      position: relative;
      z-index: 1;
    }
    
    .company-section .logo {
      width: 160px;
      height: auto;
      margin-bottom: 15px;
      filter: brightness(0) invert(1);
    }
    
    .company-section h1 {
      font-size: 11px;
      font-weight: 600;
      opacity: 0.9;
      margin-bottom: 5px;
      letter-spacing: 1px;
    }
    
    .company-section p {
      font-size: 13px;
      opacity: 0.85;
      font-weight: 500;
    }
    
    .company-contacts {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 11px;
      opacity: 0.9;
    }
    
    .company-contacts div {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* Customer Info - Elegant Card */
    .customer-section {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 16px;
      padding: 24px;
    }
    
    .customer-section h2 {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 16px;
      opacity: 0.9;
    }
    
    .customer-name {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 16px;
      line-height: 1.2;
    }
    
    .customer-details {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .customer-detail {
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .quote-meta {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      font-size: 11px;
    }
    
    .quote-meta-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .quote-meta-item strong {
      font-weight: 600;
      opacity: 0.8;
      font-size: 10px;
    }
    
    .quote-meta-item span {
      font-weight: 700;
      font-size: 13px;
    }
    
    /* Content Area */
    .content {
      padding: 40px;
    }
    
    /* Project Details - Clean & Professional */
    .project-details {
      background: #f8fafc;
      border-radius: 12px;
      padding: 28px;
      margin-bottom: 32px;
      border: 1px solid #e2e8f0;
    }
    
    .project-title {
      font-size: 16px;
      color: #1e293b;
      font-weight: 700;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .project-info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .info-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    .info-label {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .info-value {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
    }
    
    .project-description-box {
      background: white;
      border-radius: 8px;
      padding: 20px;
      border-left: 4px solid #2563eb;
      margin-top: 16px;
    }
    
    .project-description-box strong {
      font-size: 12px;
      color: #2563eb;
      display: block;
      margin-bottom: 8px;
      font-weight: 700;
    }
    
    .project-description-box p {
      font-size: 13px;
      color: #475569;
      line-height: 1.6;
    }
    
    /* Print modunda KESINLIKLE yan yana kalsın - HİÇBİR ZAMAN alt alta olmasın */
    @media print {
      .project-info-table {
        page-break-inside: avoid;
        display: table !important;
        width: 100% !important;
      }
      
      .project-info-table tbody {
        display: table-row-group !important;
      }
      
      .project-info-table tr {
        display: table-row !important;
        page-break-inside: avoid;
      }
      
      .project-info-table td {
        display: table-cell !important;
        width: 25% !important;
        padding: 8px 5px !important;
        vertical-align: top;
      }
    }
    
    .project-description {
      margin-top: 15px;
      padding: 15px;
      background: white;
      border-radius: 8px;
      border: 2px dashed #bae6fd;
      font-size: 11px;
      line-height: 1.6;
    }
    
    .project-description strong {
      color: #1e40af;
      font-size: 12px;
      display: block;
      margin-bottom: 8px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    
    /* Items Section - Modern Table */
    .items-section-title {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-bottom: 24px;
    }
    
    .items-table {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .items-table thead {
      background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
      color: white;
    }
    
    .items-table th {
      padding: 16px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .items-table th:first-child {
      padding-left: 24px;
    }
    
    .items-table th:last-child {
      padding-right: 24px;
    }
    
    .items-table tbody tr {
      border-bottom: 1px solid #e2e8f0;
      transition: background-color 0.2s;
    }
    
    .items-table tbody tr:hover {
      background: #f8fafc;
    }
    
    .items-table tbody tr:last-child {
      border-bottom: none;
    }
    
    .items-table td {
      padding: 18px 16px;
      font-size: 13px;
      color: #334155;
    }
    
    .items-table td:first-child {
      padding-left: 24px;
    }
    
    .items-table td:last-child {
      padding-right: 24px;
    }
    
    .product-name {
      font-weight: 600;
      color: #1e293b;
      font-size: 14px;
      margin-bottom: 4px;
    }
    
    .product-meta {
      font-size: 11px;
      color: #64748b;
      margin-top: 4px;
    }
    
    /* Total Section - Elegant */
    .total-section {
      margin-top: 32px;
      padding: 24px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }
    
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;
      color: #475569;
    }
    
    .total-row.subtotal {
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 16px;
      margin-bottom: 12px;
    }
    
    .total-row.grand-total {
      border-top: 2px solid #2563eb;
      padding-top: 16px;
      margin-top: 12px;
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
    }
    
    .total-row strong {
      font-weight: 600;
    }
    
    .total-row span {
      font-weight: 700;
    }
    
    .total-row.grand-total span {
      color: #2563eb;
      font-size: 22px;
    }
    
    .warranty-note {
      margin-top: 20px;
      padding: 16px;
      background: #fefce8;
      border-left: 4px solid #eab308;
      border-radius: 8px;
      font-size: 12px;
      color: #713f12;
    }
    
    .warranty-note strong {
      font-weight: 600;
    }
    
    /* Signature Section - Professional */
    .signature-section {
      margin-top: 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      padding: 32px 0;
      border-top: 2px solid #e2e8f0;
    }
    
    .signature-box {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .signature-label {
      font-size: 13px;
      font-weight: 600;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .signature-image {
      width: 160px;
      height: auto;
      max-height: 70px;
      object-fit: contain;
    }
    
    .signature-line {
      border-top: 2px solid #cbd5e1;
      padding-top: 12px;
      min-width: 220px;
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
    }
    
    /* Footer - Elegant */
    .footer {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 32px;
      margin-top: 0;
      text-align: center;
      border-radius: 0 0 16px 16px;
    }
    
    .footer-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px;
      margin-bottom: 16px;
      font-size: 12px;
    }
    
    .footer-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .footer-copyright {
      font-size: 11px;
      opacity: 0.7;
      margin-top: 12px;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      body {
        padding: 15px;
      }
      
      .container {
        border-radius: 12px;
      }
      
      .print-button {
        bottom: 20px;
        right: 20px;
        top: auto;
        padding: 12px 24px;
        font-size: 14px;
      }
      
      .header {
        padding: 24px 20px;
      }
      
      .header-content {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      
      .content {
        padding: 24px 20px;
      }
      
      .project-info-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .items-table th,
      .items-table td {
        padding: 12px;
        font-size: 11px;
      }
      
      .signature-section {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .footer {
        padding: 24px 20px;
      }
    }
    
    @media print {
      body {
        background: white;
      }
      
      .print-button {
        display: none !important;
      }
      
      .project-info-grid {
        page-break-inside: avoid;
      }
      
      .items-table {
        page-break-inside: auto;
      }
      
      .items-table tr {
        page-break-inside: avoid;
      }
    }
        width: 100%;
      }
      
      .customer-name {
        font-size: 16px;
      }
      
      .customer-detail {
        font-size: 12px;
      }
      
      /* Sadece ekranda görüntülerken küçük mobillerde alt alta - PRINT'te DEĞİL */
      .project-info-table tr {
        display: block;
        margin-bottom: 10px;
      }
      
      .project-info-table td {
        display: block;
        width: 100% !important;
        padding: 4px 0;
      }
    }
    
    /* Tablet ve masaüstü ekranda yan yana */
    @media (min-width: 769px) {
      .project-info-table tr {
        display: table-row !important;
      }
      
      .project-info-table td {
        display: table-cell !important;
        width: 25% !important;
      }
    }
      
      .items-table th,
      .items-table td {
        font-size: 9px;
        padding: 6px;
      }
      
      .signature-section {
        flex-direction: column;
        gap: 20px;
        align-items: center;
      }
      
      .signature-box-left,
      .signature-box-right {
        width: 100%;
        text-align: center;
      }
      
      .signature-box-right {
        margin-top: 20px;
      }
    }
    
    @media print {
      .print-button {
        display: none !important;
      }
    }
  </style>
  <script>
    function downloadPDF() {
      window.print();
    }
  </script>
</head>
<body>
  <button class="print-button no-print" onclick="downloadPDF()">🖨️ PDF Olarak Kaydet</button>
  
  <div class="container">
    <!-- Header Section -->
    <div class="header">
      <div class="header-content">
        <div class="company-section">
          <img src="/image/49125941466.jpg" alt="Ekim Soğutma Logo" class="logo" />
          <h1>MET GRUP MARKASIDIR</h1>
          <p>Profesyonel Soğutma ve Klima Sistemleri</p>
          <div class="company-contacts">
            <div>📞 +90 532 701 6283 / +90 542 457 2553</div>
            <div>✉️ info@ekimsogutma.com</div>
            <div>🌐 www.ekimsogutma.com</div>
          </div>
        </div>
        
        <div class="customer-section">
          <h2>MÜŞTERİ BİLGİLERİ</h2>
          <div class="customer-name">${data.customerInfo.name || 'MÜŞTERİ ADI'}</div>
          <div class="customer-details">
            ${data.customerInfo.company ? `<div class="customer-detail">🏢 ${data.customerInfo.company}</div>` : ''}
            ${data.customerInfo.phone ? `<div class="customer-detail">📞 ${data.customerInfo.phone}</div>` : ''}
            ${data.customerInfo.email ? `<div class="customer-detail">✉️ ${data.customerInfo.email}</div>` : ''}
          </div>
          <div class="quote-meta">
            <div class="quote-meta-item">
              <strong>TEKLİF NO</strong>
              <span>#${data.quoteId}</span>
            </div>
            <div class="quote-meta-item">
              <strong>TARİH</strong>
              <span>${new Date(data.createdAt).toLocaleDateString('tr-TR')}</span>
            </div>
            <div class="quote-meta-item">
              <strong>GEÇERLİLİK</strong>
              <span>${data.conditions.validityPeriod} Gün</span>
            </div>
            <div class="quote-meta-item">
              <strong>TESLİMAT</strong>
              <span>${data.conditions.deliveryTime || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <!-- Project Details -->
      <div class="project-details">
        <div class="project-title">📋 Proje Detayları</div>
        <div class="project-info-grid">
          <div class="info-item">
            <div class="info-label">Proje Konusu</div>
            <div class="info-value">${data.projectDetails.projectDesign || '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Teslimat Süresi</div>
            <div class="info-value">${data.conditions.deliveryTime || '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Başlangıç Tarihi</div>
            <div class="info-value">${data.schedule.startDate ? new Date(data.schedule.startDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Bitiş Tarihi</div>
            <div class="info-value">${data.schedule.endDate ? new Date(data.schedule.endDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</div>
          </div>
        </div>
        ${data.projectDetails.projectDescription ? `
          <div class="project-description-box">
            <strong>📝 Proje Açıklaması</strong>
            <p>${data.projectDetails.projectDescription}</p>
          </div>
        ` : ''}
      </div>

      <!-- Items Table -->
      <div>
        <div class="items-section-title">📦 Teklif Kalemleri</div>
        <table class="items-table">
          <thead>
            <tr>
              <th>Ürün Bilgisi</th>
              <th style="text-align: center; width: 100px;">Miktar</th>
              <th style="text-align: right; width: 140px;">Birim Fiyat</th>
              <th style="text-align: right; width: 140px;">Toplam</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map((item, index) => `
              <tr>
                <td>
                  <div class="product-name">${item.product.customName || item.product.name}</div>
                  ${item.product.brand || item.product.model ? `<div class="product-meta">${item.product.brand || ''} ${item.product.model || ''}</div>` : ''}
                  ${item.product.code ? `<div class="product-meta">Kod: ${item.product.code}</div>` : ''}
                </td>
                <td style="text-align: center; font-weight: 700; color: #2563eb;">${item.quantity}</td>
                <td style="text-align: right; font-weight: 600; color: #059669;">€${item.unitPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                <td style="text-align: right; font-weight: 700; color: #1e293b; font-size: 14px;">€${item.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <!-- Total Section -->
        <div class="total-section">
          <div class="total-row subtotal">
            <strong>Ara Toplam</strong>
            <span>€${data.items.reduce((sum, item) => sum + item.total, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="total-row">
            <strong>KDV (%20)</strong>
            <span>€${(data.items.reduce((sum, item) => sum + item.total, 0) * 0.2).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="total-row grand-total">
            <strong>GENEL TOPLAM</strong>
            <span>€${(data.items.reduce((sum, item) => sum + item.total, 0) * 1.2).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        
        <div class="warranty-note">
          <div><strong>✅ 2 Yıl Garanti</strong> - Tüm ürünler 2 yıl garanti kapsamındadır.</div>
          <div style="margin-top: 8px;">ℹ️ Bu teklif sadece belirtilen ürünler için geçerlidir.</div>
        </div>
      </div>

      <!-- Signature Section -->
      <div class="signature-section">
        <div class="signature-box">
          <div class="signature-label">Ekim Soğutma</div>
          <img src="/image/imza.png" class="signature-image" alt="İmza" />
        </div>
        <div class="signature-box">
          <div class="signature-label">Müşteri Onayı</div>
          <div class="signature-line">İmza & Kaşe</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-content">
        <div class="footer-item">🌐 www.ekimsogutma.com</div>
        <div class="footer-item">✉️ info@ekimsogutma.com</div>
        <div class="footer-item">📞 +90 532 701 6283 / +90 542 457 2553</div>
      </div>
      <div class="footer-copyright">© ${new Date().getFullYear()} Ekim Soğutma. Tüm hakları saklıdır.</div>
    </div>
  </div>
</body>
</html>
  `;

  // HTML'i yeni pencereye yaz
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  console.log('✅ Teklif HTML sayfası oluşturuldu!');
};
