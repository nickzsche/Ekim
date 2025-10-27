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
    @media print {
      @page {
        size: A4;
        margin: 0;
      }
      body {
        margin: 0;
        padding: 20px;
      }
      .no-print {
        display: none !important;
      }
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: white;
      padding: 20px;
      color: #2c3e50;
      line-height: 1.4;
      font-size: 11px;
    }
    
    .container {
      max-width: 794px;
      margin: 0 auto;
      background: white;
    }
    
    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 12px rgba(30, 64, 175, 0.4);
      z-index: 1000;
      transition: all 0.3s ease;
    }
    
    .print-button:hover {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(30, 64, 175, 0.5);
    }
    
    .print-button:active {
      transform: translateY(0);
    }
    
    /* Mobil ve tablet uyumluluğu */
    @media (max-width: 768px) {
      .print-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        top: auto;
        left: auto;
        padding: 12px 20px;
        font-size: 14px;
        width: auto;
        border-radius: 50px;
      }
    }
    
    .header {
      background: #f8fafc;
      border-bottom: 3px solid #1e40af;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
    }
    
    .header-left {
      flex: 1;
    }
    
    .header-right {
      flex: 1;
      text-align: right;
    }
    
    .logo {
      width: 140px;
      margin-bottom: 8px;
    }
    
    .company-info {
      font-size: 9px;
      color: #334155;
      margin-top: 8px;
    }
    
    .customer-box {
      background: #f0f9ff;
      padding: 20px;
      border-radius: 8px;
      display: inline-block;
      text-align: left;
      min-width: 260px;
      border: 4px solid #1e40af;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
    
    .customer-name {
      font-size: 20px;
      font-weight: 900;
      color: #000000;
      margin-bottom: 14px;
      line-height: 1.8;
      border-bottom: 4px solid #1e40af;
      padding: 12px;
      text-transform: uppercase;
      background: #e0f2fe;
      border-radius: 6px;
    }
    
    .customer-detail {
      font-size: 15px;
      color: #000000;
      font-weight: 700;
      margin-top: 10px;
      line-height: 1.7;
      background: #ffffff;
      padding: 12px;
      border-radius: 6px;
      border: 2px solid #cbd5e1;
    }
    
    .company-detail {
      font-size: 16px;
      border-left: 5px solid #3b82f6;
    }
    
    .quote-info {
      margin-top: 15px;
      font-size: 10px;
    }
    
    .project-details {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 25px;
      border-left: 6px solid #1e40af;
      box-shadow: 0 2px 8px rgba(30, 64, 175, 0.1);
    }
    
    .project-title {
      font-size: 14px;
      color: #0c4a6e;
      font-weight: 800;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #bae6fd;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .project-info-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    
    .project-info-table td {
      padding: 8px 0;
      font-size: 11px;
      width: 25%;
    }
    
    .project-info-table td strong {
      color: #1e40af;
      font-weight: 700;
      display: inline-block;
      min-width: 100px;
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
    
    .items-table {
      border: 1px solid #e5e7eb;
    }
    
    .items-table thead {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
    }
    
    .items-table th {
      padding: 10px;
      text-align: left;
      font-size: 11px;
      font-weight: 700;
      border: 1px solid #1e40af;
    }
    
    .items-table td {
      padding: 10px;
      font-size: 10px;
      border: 1px solid #e5e7eb;
    }
    
    .items-table tbody tr:nth-child(even) {
      background: #f8fafc;
    }
    
    .total-box {
      text-align: right;
      font-size: 11px;
      font-weight: 800;
      color: #1e293b;
      margin-top: 15px;
      padding: 10px;
      background: #f8fafc;
      border-radius: 6px;
    }
    
    .signature-section {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .signature-box {
      text-align: center;
      flex: 1;
    }
    
    .signature-box-left {
      text-align: left;
    }
    
    .signature-box-right {
      text-align: center;
      margin-top: 40px;
    }
    
    .company-signature-title {
      font-size: 12px;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 15px;
    }
    
    .signature-image {
      width: 140px;
      height: auto;
      max-height: 60px;
      object-fit: contain;
      display: block;
    }
    
    .signature-line {
      border-top: 2px solid #1e293b;
      display: inline-block;
      padding-top: 8px;
      min-width: 200px;
      font-size: 11px;
      font-weight: bold;
      color: #1e293b;
      margin-top: 10px;
    }
    
    .footer {
      margin-top: 40px;
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      color: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    
    /* Responsive tasarım */
    @media (max-width: 768px) {
      body {
        padding: 10px;
        font-size: 10px;
      }
      
      .container {
        padding: 0;
      }
      
      .header {
        flex-direction: column;
        padding: 15px;
      }
      
      .header-left,
      .header-right {
        width: 100%;
        text-align: center;
      }
      
      .header-right {
        margin-top: 15px;
      }
      
      .customer-box {
        min-width: auto;
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
</head>
<body>
  <button class="print-button no-print" onclick="window.print()">🖨️ PDF Olarak Kaydet</button>
  
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <img src="/image/49125941466.jpg" alt="Ekim Soğutma Logo" class="logo" />
        <div style="font-size: 9px; color: #64748b; font-weight: 600;">MET GRUP MARKASIDIR</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 8px;">Profesyonel Soğutma ve Klima Sistemleri</div>
        <div class="company-info">
          <div>📞 +90 532 701 6283 / +90 542 457 2553</div>
          <div>✉️ info@ekimsogutma.com</div>
          <div>🌐 www.ekimsogutma.com</div>
        </div>
      </div>
      
      <div class="header-right">
        <div style="font-size: 14px; color: #1e40af; font-weight: 700; margin-bottom: 12px; text-transform: uppercase;">MÜŞTERİ BİLGİLERİ</div>
        <div class="customer-box">
          <div class="customer-name">${data.customerInfo.name || 'MUSTERI ADI YOK'}</div>
          ${data.customerInfo.company ? `<div class="customer-detail company-detail">SIRKET: ${data.customerInfo.company}</div>` : ''}
          ${data.customerInfo.phone ? `<div class="customer-detail">TEL: ${data.customerInfo.phone}</div>` : ''}
          ${data.customerInfo.email ? `<div class="customer-detail">EMAIL: ${data.customerInfo.email}</div>` : ''}
        </div>
        <div class="quote-info">
          <div><strong>Teklif No:</strong> <span style="color: #1e40af; font-weight: 700;">#${data.quoteId}</span></div>
          <div style="margin-top: 4px;"><strong>Tarih:</strong> ${new Date(data.createdAt).toLocaleDateString('tr-TR')}</div>
          <div style="margin-top: 4px;"><strong>Geçerlilik:</strong> <span style="color: #dc2626; font-weight: 600;">${data.conditions.validityPeriod} gün</span></div>
        </div>
      </div>
    </div>

    <!-- Proje Detayları -->
    <div class="project-details">
      <div class="project-title">🏗️ PROJE DETAYLARI VE KOŞULLAR</div>
      <table class="project-info-table">
        <tr>
          <td><strong>📋 Konu:</strong></td>
          <td style="font-weight: 600; color: #1f2937;">${data.projectDetails.projectDesign || '-'}</td>
          <td><strong>🚚 Teslimat Süresi:</strong></td>
          <td style="font-weight: 600; color: #dc2626;">${data.conditions.deliveryTime || '-'}</td>
        </tr>
        <tr>
          <td><strong>📅 Başlangıç Tarihi:</strong></td>
          <td style="font-weight: 600; color: #059669;">${data.schedule.startDate ? new Date(data.schedule.startDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</td>
          <td><strong>🏁 Bitiş Tarihi:</strong></td>
          <td style="font-weight: 600; color: #059669;">${data.schedule.endDate ? new Date(data.schedule.endDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</td>
        </tr>
        <tr>
          <td><strong>⏱️ Geçerlilik Süresi:</strong></td>
          <td style="font-weight: 600; color: #ea580c;">${data.conditions.validityPeriod} gün</td>
          <td><strong>🏷️ Teklif No:</strong></td>
          <td style="font-weight: 700; color: #1e40af; font-size: 12px;">#${data.quoteId}</td>
        </tr>
      </table>
      ${data.projectDetails.projectDescription ? `
        <div class="project-description">
          <strong>📝 PROJE AÇIKLAMASI</strong>
          <div style="color: #334155; margin-top: 5px;">${data.projectDetails.projectDescription}</div>
        </div>
      ` : ''}
    </div>

    <!-- Teklif Kalemleri -->
    <div>
      <h3 style="color: #1e40af; font-size: 13px; margin: 0 0 12px 0; font-weight: 700;">📦 TEKLİF KALEMLERİ</h3>
      <table class="items-table">
        <thead>
          <tr>
            <th>ÜRÜN</th>
            <th style="text-align: center; width: 80px;">ADET</th>
            <th style="text-align: right; width: 120px;">SATIŞ FİYATI</th>
            <th style="text-align: right; width: 120px;">TOPLAM</th>
          </tr>
        </thead>
        <tbody>
          ${data.items.map((item, index) => `
            <tr>
              <td style="vertical-align: top;">
                <div style="font-weight: 700; color: #1f2937;">${item.product.customName || item.product.name}</div>
                ${item.product.brand || item.product.model ? `<div style="font-size: 9px; color: #6b7280; margin-top: 4px;">${item.product.brand || ''} ${item.product.model || ''}</div>` : ''}
                ${item.product.code ? `<div style="font-size: 9px; color: #9ca3af; margin-top: 2px;">Kod: ${item.product.code}</div>` : ''}
              </td>
              <td style="text-align: center; font-weight: 700; color: #1e40af; vertical-align: middle;">${item.quantity}</td>
              <td style="text-align: right; font-weight: 700; color: #059669; vertical-align: middle;">€${item.unitPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
              <td style="text-align: right; font-weight: 800; color: #dc2626; vertical-align: middle;">€${item.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="total-box">
        <div style="margin-bottom: 8px;">Ara Toplam: €${data.items.reduce((sum, item) => sum + item.total, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
        <div style="font-size: 13px;">KDV (%20) Dahil Toplam: <span style="color:#dc2626;">€${(data.items.reduce((sum, item) => sum + item.total, 0) * 1.2).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span></div>
      </div>
      
      <div style="font-size: 9px; margin-top: 10px; color: #64748b;">
        <div>• Ürünlere <strong>2 yıl garanti</strong></div>
        <div>• Teklif sadece belirtilen ürünler için geçerli</div>
      </div>
    </div>

    <!-- İmza Bölümü -->
    <div class="signature-section">
      <div class="signature-box signature-box-left">
        <div class="company-signature-title">Ekim Soğutma</div>
        <img src="/image/imza.png" class="signature-image" alt="İmza" />
      </div>
      <div class="signature-box signature-box-right">
        <div class="signature-line">Müşteri Onayı</div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div style="font-size: 10px; margin-bottom: 8px;">
        <span style="margin: 0 10px;">🌐 www.ekimsogutma.com</span>
        <span style="margin: 0 10px;">✉️ info@ekimsogutma.com</span>
        <span style="margin: 0 10px;">📞 +90 532 701 6283 / +90 542 457 2553</span>
      </div>
      <div style="font-size: 9px; opacity: 0.8;">© ${new Date().getFullYear()} Ekim Soğutma. Tüm hakları saklıdır.</div>
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
