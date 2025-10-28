'use client';
import html2canvas from 'html2canvas';

// Helper function to load image as base64
const loadImageAsBase64 = async (imagePath: string): Promise<string> => {
  try {
    // Tam URL oluştur
    const fullPath = window.location.origin + imagePath;
    console.log('Logo yükleniyor:', fullPath);
    
    const response = await fetch(fullPath);
    if (!response.ok) {
      console.warn('Logo yüklenemedi, HTTP status:', response.status);
      return '';
    }
    
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('Logo başarıyla yüklendi');
        resolve(reader.result as string);
      };
      reader.onerror = (err) => {
        console.error('FileReader hatası:', err);
        resolve(''); // Hata durumunda boş string döndür
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Logo yüklenirken hata:', error);
    return ''; // Return empty string if logo fails to load
  }
};

export interface QuotePDFData {
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
      description?: string; // Yeni eklenen alan
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

export const generateQuotePDF = async (data: QuotePDFData): Promise<void> => {
  try {
    console.log('generateQuotePDF called with data:', data);
    console.log('Customer info received:', data.customerInfo);
    
    const jsPDF = (await import('jspdf')).default;
    console.log('PDF oluşturma başladı...');
    
    // Load logo as base64
    console.log('Logo yükleniyor...');
    const logoBase64 = await loadImageAsBase64('/image/49125941466.jpg');
    console.log('Logo yükleme tamamlandı:', logoBase64 ? 'Başarılı' : 'Logo yok');
    
    // Create a temporary container for the PDF content
    const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  tempDiv.style.width = '794px'; // A4 width in pixels at 96 DPI
  tempDiv.style.backgroundColor = 'white';
  tempDiv.style.fontFamily = 'Arial, sans-serif';
  tempDiv.style.maxHeight = '1050px'; // Tek sayfa için yükseklik sınırı (A4: 1122px, biraz boşluk bırak)
  tempDiv.style.overflow = 'hidden';
  
  // Create the HTML content for the PDF
  
  // Müşteri bilgilerini hazırla
  const customerName = data.customerInfo.name || "Müşteri Adı Belirtilmemiş";
  const customerCompany = data.customerInfo.company || "";
  const customerPhone = data.customerInfo.phone || "";
  const customerEmail = data.customerInfo.email || "";
  
  console.log("PDF'e yazılacak müşteri adı:", customerName);
  console.log("Şirket:", customerCompany);
  console.log("Telefon:", customerPhone);
  
  tempDiv.innerHTML = `
  <div style="padding: 20px; font-family: 'Segoe UI', Arial, sans-serif; color: #2c3e50; line-height: 1.4; font-size: 11px; background: white;">
      <!-- Header -->
  <div style="background: #f8fafc; border-bottom: 3px solid #1e40af; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 50%; vertical-align: top;">
          ${logoBase64 ? `
            <img src="${logoBase64}" style="width: 140px; height: 70px; border-radius: 8px; object-fit: cover; border: 2px solid #1e40af; background: white; display: block; margin-bottom: 8px;" alt="Logo" />
            <div style="font-size: 9px; color: #64748b; font-weight: 600;">MET GRUP MARKASIDIR</div>
          ` : ''}
          <div style="font-size: 10px; color: #64748b; margin-top: 8px;">Profesyonel Soğutma ve Klima Sistemleri</div>
          <div style="font-size: 9px; color: #334155; margin-top: 8px;">
            <div>📞 +90 532 701 6283 / +90 542 457 2553</div>
            <div>✉️ info@ekimsogutma.com</div>
            <div>🌐 www.ekimsogutma.com</div>
          </div>
        </td>
        <td style="width: 50%; vertical-align: top; text-align: right;">
          <div style="font-size: 14px; color: #1e40af; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">MÜŞTERİ BİLGİLERİ</div>
          <div style="background: #ffffff; padding: 15px; border-radius: 8px; display: inline-block; text-align: left; min-width: 220px; border: 2px solid #1e40af; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 10px; line-height: 1.5; border-bottom: 2px solid #1e40af; padding: 8px; text-transform: uppercase; background: #f8fafc; border-radius: 4px;">${customerName}</div>
            ${customerCompany ? `<div style="font-size: 14px; color: #1e293b; font-weight: 700; margin-bottom: 8px; line-height: 1.5; background: #f8fafc; padding: 8px; border-radius: 4px; border-left: 3px solid #3b82f6;">ŞİRKET: ${customerCompany}</div>` : ""}
            ${customerPhone ? `<div style="font-size: 13px; color: #1e293b; font-weight: 700; margin-top: 8px; line-height: 1.5; background: #f8fafc; padding: 8px; border-radius: 4px; border: 1px solid #e2e8f0;">TEL: ${customerPhone}</div>` : ""}
            ${customerEmail ? `<div style="font-size: 12px; margin-top: 6px; color: #1e293b; font-weight: 600; line-height: 1.5; background: #f8fafc; padding: 8px; border-radius: 4px; border: 1px solid #e2e8f0;">E-POSTA: ${customerEmail}</div>` : ""}
          </div>
          <div style="margin-top: 15px; font-size: 10px;">
            <div><strong>Teklif No:</strong> <span style="color: #1e40af; font-weight: 700;">#${data.quoteId}</span></div>
            <div style="margin-top: 4px;"><strong>Tarih:</strong> ${new Date(data.createdAt).toLocaleDateString('tr-TR')}</div>
            <div style="margin-top: 4px;"><strong>Geçerlilik:</strong> <span style="color: #dc2626; font-weight: 600;">${data.conditions.validityPeriod} gün</span></div>
          </div>
        </td>
      </tr>
    </table>
  </div>

      <!-- Project Details -->
  <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #1e40af;">
    <div style="font-size: 12px; color: #0c4a6e; font-weight: 700; margin-bottom: 10px;">🏗️ PROJE DETAYLARI</div>
    <table style="width: 100%; font-size: 10px;">
      <tr>
        <td style="width: 25%; padding: 4px 0;"><strong>Konu:</strong></td>
        <td style="width: 25%; padding: 4px 0;">${data.projectDetails.projectDesign || '-'}</td>
        <td style="width: 25%; padding: 4px 0;"><strong>Teslimat:</strong></td>
        <td style="width: 25%; padding: 4px 0;">${data.conditions.deliveryTime || '-'}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0;"><strong>Başlangıç:</strong></td>
        <td style="padding: 4px 0;">${data.schedule.startDate ? new Date(data.schedule.startDate).toLocaleDateString('tr-TR') : '-'}</td>
        <td style="padding: 4px 0;"><strong>Bitiş:</strong></td>
        <td style="padding: 4px 0;">${data.schedule.endDate ? new Date(data.schedule.endDate).toLocaleDateString('tr-TR') : '-'}</td>
      </tr>
    </table>
    ${data.projectDetails.projectDescription ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #bae6fd; font-size: 10px;"><strong>Açıklama:</strong> ${data.projectDetails.projectDescription}</div>` : ''}
  </div>

      <!-- Items Table -->
  <div style="margin-bottom: 20px;">
    <h3 style="color: #1e40af; font-size: 13px; margin: 0 0 12px 0; font-weight: 700;">📦 TEKLİF KALEMLERİ</h3>
  <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; font-size: 11px;">
      <thead>
        <tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">
          <th style="padding: 10px; text-align: left; font-size: 11px; font-weight: 700; border: 1px solid #1e40af;">ÜRÜN</th>
          <th style="padding: 10px; text-align: center; font-size: 11px; font-weight: 700; border: 1px solid #1e40af; width: 80px;">ADET</th>
          <th style="padding: 10px; text-align: right; font-size: 11px; font-weight: 700; border: 1px solid #1e40af; width: 120px;">SATIŞ FİYATI</th>
          <th style="padding: 10px; text-align: right; font-size: 11px; font-weight: 700; border: 1px solid #1e40af; width: 120px;">TOPLAM</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map((item, index) => `
          <tr style="background: ${index % 2 === 0 ? '#f8fafc' : 'white'};">
            <td style="padding: 10px; font-size: 10px; border: 1px solid #e5e7eb; vertical-align: top;">
              <div style="font-weight: 700; color: #1f2937;">${item.product.customName || item.product.name}</div>
              ${item.product.brand || item.product.model ? `<div style="font-size: 9px; color: #6b7280; margin-top: 4px;">${item.product.brand || ''} ${item.product.model || ''}</div>` : ''}
              ${item.product.code ? `<div style="font-size: 9px; color: #9ca3af; margin-top: 2px;">Kod: ${item.product.code}</div>` : ''}
            </td>
            <td style="padding: 10px; text-align: center; font-size: 11px; font-weight: 700; color: #1e40af; border: 1px solid #e5e7eb; vertical-align: middle;">${item.quantity}</td>
            <td style="padding: 10px; text-align: right; font-size: 11px; font-weight: 700; color: #059669; border: 1px solid #e5e7eb; vertical-align: middle;">€${item.unitPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
            <td style="padding: 10px; text-align: right; font-size: 11px; font-weight: 800; color: #dc2626; border: 1px solid #e5e7eb; vertical-align: middle;">€${item.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div style="width: 100%; text-align: right; font-size: 11px; font-weight: 800; color: #1e293b; margin-top: 15px; padding: 10px; background: #f8fafc; border-radius: 6px;">
      <div style="margin-bottom: 8px;">Ara Toplam: €${data.items.reduce((sum, item) => sum + item.total, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
      <div style="font-size: 13px;">KDV (%20) Dahil Toplam: <span style="color:#dc2626;">€${(data.items.reduce((sum, item) => sum + item.total, 0) * 1.2).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span></div>
    </div>
    <div style="font-size: 9px; margin-top: 10px; color: #64748b;">
      <div>• Ürünlere <strong>2 yıl garanti</strong></div>
      <div>• Teklif sadece belirtilen ürünler için geçerli</div>
    </div>
  </div>

      <!-- İmza Bölümü (Sadece metin) -->
      <div style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <table style="width: 100%;">
          <tr>
            <td style="width: 50%; vertical-align: bottom; padding-bottom: 10px;">
              <div style="font-size: 11px; font-weight: bold; color: #1e293b; margin-top: 8px; border-top: 1px solid #1e293b; display: inline-block; padding-top: 4px; min-width: 150px; text-align: center;">Ekim Soğutma</div>
            </td>
            <td style="width: 50%; vertical-align: bottom; text-align: right; padding-bottom: 10px;">
              <div style="font-size: 11px; font-weight: bold; color: #1e293b; border-top: 1px solid #1e293b; display: inline-block; padding-top: 4px; min-width: 150px; text-align: center;">Müşteri Onayı</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Footer -->
      <div style="margin-top: 40px; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 15px; border-radius: 8px; text-align: center;">
        <div style="font-size: 10px; margin-bottom: 8px;">
          <span style="margin: 0 10px;">🌐 www.ekimsogutma.com</span>
          <span style="margin: 0 10px;">✉️ info@ekimsogutma.com</span>
          <span style="margin: 0 10px;">📞 +90 532 701 6283 / +90 542 457 2553</span>
        </div>
        <div style="font-size: 9px; opacity: 0.8;">© ${new Date().getFullYear()} Ekim Soğutma. Tüm hakları saklıdır.</div>
      </div>
    </div>
  `;

  // Add the temporary div to the document
  document.body.appendChild(tempDiv);

  try {
    // Convert HTML to canvas
    console.log('HTML canvas\'a dönüştürülüyor...');
    const canvas = await html2canvas(tempDiv, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    console.log('Canvas oluşturuldu');

    // Create PDF (tek sayfa)
    console.log('PDF oluşturuluyor...');
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = 297; // A4 height in mm
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Download the PDF
    const fileName = `Teklif_${data.quoteId}_${data.customerInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    console.log('PDF indiriliyor:', fileName);
    pdf.save(fileName);
    console.log('PDF başarıyla oluşturuldu!');
  } catch (error) {
    console.error('PDF oluşturma hatası:', error);
    throw error;
  } finally {
    // Clean up: remove the temporary div
    document.body.removeChild(tempDiv);
  }
  } catch (error) {
    console.error('generateQuotePDF genel hatası:', error);
    throw error;
  }
};