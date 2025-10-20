import jsPDF from 'jspdf';
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
  tempDiv.innerHTML = `
  <div style="padding: 0; font-family: 'Segoe UI', Arial, sans-serif; color: #2c3e50; line-height: 1.2; font-size: 7px; min-height: 1122px; position: relative;">
      <!-- Modern Header with Logo -->
  <div style="background: #f8fafc; border-bottom: 2.5px solid #1e40af; padding: 0 0 8px 0; margin-bottom: 6px;">
    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
      <div style="padding: 12px 18px 0 18px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          ${logoBase64 ? `
            <div style="text-align: center;">
              <img src="${logoBase64}" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover; border: 1.5px solid #1e40af; background: white; display: block;" alt="Ekim Soğutma Logo" />
              <div style="font-size: 5px; color: #64748b; font-weight: 600; margin-top: 2px; letter-spacing: 0.3px;">MET GRUP MARKASIDIR</div>
            </div>
          ` : ''}
          <div>
            <h1 style="font-size: 13px; margin: 0; font-weight: 800; color: #1e40af; letter-spacing: 0.5px;">EKİM SOĞUTMA</h1>
            <div style="font-size: 7px; color: #64748b; font-weight: 500; margin-top: 1px;">Profesyonel Soğutma ve Klima Sistemleri</div>
          </div>
        </div>
        <div style="font-size: 6.5px; color: #334155; margin-top: 4px;">
          <span>📞 +90 (532) 123 45 67</span> &nbsp;|&nbsp; <span>✉️ info@ekimsogutma.com</span> &nbsp;|&nbsp; <span>🌐 www.ekimsogutma.com</span>
        </div>
      </div>
      <div style="padding: 10px 18px 0 0; text-align: right; min-width: 180px;">
        <div style="font-size: 7.5px; color: #1e40af; font-weight: 700; letter-spacing: 0.2px; margin-bottom: 2px;">MÜŞTERİ BİLGİLERİ</div>
        <div style="background: white; padding: 6px 8px; border-radius: 6px; box-shadow: 0 1px 4px rgba(30,64,175,0.06);">
          <div style="font-size: 7.5px; font-weight: 700; color: #0f172a; margin-bottom: 1px;">${data.customerInfo.name}</div>
          ${data.customerInfo.company ? `<div style=\"font-size: 6.5px; color: #64748b;\">${data.customerInfo.company}</div>` : ''}
          ${data.customerInfo.email ? `<div style=\"font-size: 6.5px;\">📧 ${data.customerInfo.email}</div>` : ''}
          ${data.customerInfo.phone ? `<div style=\"font-size: 6.5px;\">📱 ${data.customerInfo.phone}</div>` : ''}
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 18px 0 18px; margin-top: 2px;">
      <div style="font-size: 8px; color: #1e40af; font-weight: 700;">� TEKLİF</div>
      <div style="font-size: 7px; color: #0f172a; font-weight: 500; text-align: right;">
        <span style="margin-right: 10px;"><strong>Teklif No:</strong> <span style="color: #1e40af; font-weight: 700;">#${data.quoteId}</span></span>
        <span style="margin-right: 10px;"><strong>Tarih:</strong> ${new Date(data.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <span><strong>Geçerlilik:</strong> <span style="color: #dc2626; font-weight: 600;">${data.conditions.validityPeriod} gün</span></span>
      </div>
    </div>
  </div>

      <!-- Quote Info Section -->

      <!-- Project Details -->
  <div style="background: #f1f5f9; padding: 6px 18px 6px 18px; border-radius: 6px; margin-bottom: 7px; border-left: 3px solid #1e40af; font-size: 7px;">
    <div style="font-size: 8px; color: #0c4a6e; font-weight: 700; margin-bottom: 2px;">🏗️ PROJE DETAYLARI</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; font-size: 7px;">
      <div><strong>Konu:</strong> ${data.projectDetails.projectDesign || '-'}</div>
      <div><strong>Teslimat:</strong> ${data.conditions.deliveryTime || '-'}</div>
      <div><strong>Başlangıç:</strong> ${data.schedule.startDate ? new Date(data.schedule.startDate).toLocaleDateString('tr-TR') : '-'}</div>
      <div><strong>Bitiş:</strong> ${data.schedule.endDate ? new Date(data.schedule.endDate).toLocaleDateString('tr-TR') : '-'}</div>
    </div>
    ${data.projectDetails.projectDescription ? `<div style="margin-top: 5px; padding-top: 5px; border-top: 1px solid #bae6fd; font-size: 7px;"><strong>Açıklama:</strong><br>${data.projectDetails.projectDescription}</div>` : ''}
  </div>

      <!-- Items Table -->
  <div style="margin-bottom: 4px;">
    <h3 style="color: #1e40af; font-size: 10px; margin: 0 0 6px 0; font-weight: 700;">📦 TEKLİF KALEMLERİ</h3>
  <table style="width: 100%; border-collapse: collapse; border-radius: 1px; overflow: hidden; box-shadow: 0 1px 1px rgba(0,0,0,0.02); table-layout: fixed; font-size: 9.5px;">
      <thead>
        <tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">
          <th style="padding: 4px 3px; text-align: left; font-size: 10px; font-weight: 700; width: 40%;">ÜRÜN</th>
          <th style="padding: 4px 2px; text-align: center; font-size: 10px; font-weight: 700; width: 10%;">ADET</th>
          <th style="padding: 4px 2px; text-align: right; font-size: 10px; font-weight: 700; width: 18%;">SATIŞ FİYATI</th>
          <th style="padding: 4px 2px; text-align: right; font-size: 10px; font-weight: 700; width: 18%;">TOPLAM FİYAT</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map((item, index) => `
          <tr style="background: ${index % 2 === 0 ? '#f8fafc' : 'white'}; border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 4px 3px; font-size: 10px; word-wrap: break-word; vertical-align: top;">
              <div style="font-weight: 700; color: #1f2937; line-height: 1.08;">${item.product.customName || item.product.name}</div>
              ${item.product.name.includes('Tavan') || item.product.name.includes('Zemin') || item.product.name.includes('Duvar') ? 
                `<div style="font-size: 7px; color: #6b7280; margin-top: 1px;">${item.product.description || 'Metrekare hesaplaması'}</div>` : 
                `${item.product.brand || item.product.model ? `<div style=\"font-size: 7.5px; color: #6b7280; margin-top: 1px;\">${item.product.brand || ''} ${item.product.model || ''}</div>` : ''}`
              }
              ${item.product.code ? `<div style=\"font-size: 7px; color: #9ca3af; margin-top: 1px;\">Kod: ${item.product.code}</div>` : ''}
            </td>
            <td style="padding: 4px 2px; text-align: center; font-size: 10px; font-weight: 700; color: #1e40af; vertical-align: middle;">${item.quantity}</td>
            <td style="padding: 4px 2px; text-align: right; font-size: 10px; font-weight: 700; color: #059669; vertical-align: middle; white-space: nowrap;">€${item.unitPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
            <td style="padding: 4px 2px; text-align: right; font-size: 10px; font-weight: 800; color: #dc2626; vertical-align: middle; white-space: nowrap;">€${item.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div style="width: 100%; text-align: right; font-size: 7.5px; font-weight: 800; color: #1e293b; margin-top: 4px; margin-bottom: 0;">
      Ara Toplam: €${data.items.reduce((sum, item) => sum + item.total, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}<br/>
      KDV (%20) Dahil Toplam: <span style="color:#dc2626;">€${(data.items.reduce((sum, item) => sum + item.total, 0) * 1.2).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
    </div>
    <div style="font-size: 5px; margin-top: 1px;">• Ürünlere <strong>2 yıl garanti</strong></div>
    <div style="font-size: 5px;">• Teklif sadece belirtilen ürünler için geçerli</div>
    
    <!-- Metrekare hesaplama detayları -->
    ${data.items.some(item => item.product.name.includes('Metrekare Hesaplama')) ? `
      <div style="margin-top: 10px; padding: 8px; background-color: #f0f9ff; border-radius: 6px; border: 1px solid #bae6fd;">
        <div style="font-size: 8px; font-weight: 700; color: #0c4a6e; margin-bottom: 4px;">📐 Metrekare Hesaplama Detayları:</div>
        <div style="font-size: 7px; color: #0c4a6e;">
          Bu teklif, tavan, zemin ve duvar alanlarının ayrı ayrı hesaplanmasından oluşmaktadır. 
          Her bir alan için en, boy ve adet değerleri girilerek toplam metrekare hesaplanmıştır.
        </div>
      </div>
    ` : ''}
  </div>

      <!-- İmza için daha geniş boşluk ve yazılar -->
      <div style="height: 60px; position: relative;">
        <div style="position: absolute; left: 24px; bottom: 6px; font-size: 9px; font-weight: bold; color: #1e293b;">Ekim Soğutma</div>
        <div style="position: absolute; right: 24px; bottom: 6px; font-size: 9px; font-weight: bold; color: #1e293b;">Müşteri Onayı</div>
      </div>

      <!-- Footer -->
      <div style="position: absolute; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 12px 0 8px 0; border-radius: 10px 10px 0 0; text-align: center; font-size: 10px; width: 100%; margin: 0; z-index: 10; display: block;">
        <div style="font-size: 10px; opacity: 0.9; display: flex; justify-content: center; gap: 10px;">
          <span>🌐 www.ekimsogutma.com</span>
          <span>✉️ info@ekimsogutma.com</span>
          <span>📞 +90 (532) 123 45 67</span>
        </div>
        <p style="margin: 4px 0 0 0; font-size: 9px; opacity: 0.7;">© ${new Date().getFullYear()} Ekim Soğutma. Tüm hakları saklıdır.</p>
      </div>
    </div>
  `;

  // Add the temporary div to the document
  document.body.appendChild(tempDiv);

  try {
    // Convert HTML to canvas (tek sayfa için yükseklik sınırı)
    console.log('HTML canvas\'a dönüştürülüyor...');
    const canvas = await html2canvas(tempDiv, {
      useCORS: true,
      allowTaint: true,
      background: '#ffffff',
      width: 794,
      height: 1050 // Tek sayfa için sabit yükseklik
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