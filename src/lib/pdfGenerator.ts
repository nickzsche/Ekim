'use client';
import html2canvas from 'html2canvas';

// Updated: 2025-10-28 - Excel format (simple black/white tables)
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
  // Daha küçük fontlarla daha az sayfa tüketmek için temel font küçültüldü
  tempDiv.style.maxHeight = 'none';
  tempDiv.style.overflow = 'visible';
  
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
  <div style="position: relative; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif; color: #000; line-height: 1.4; font-size: 11px; background: white;">
    
    <!-- Watermark Logo (Antet) -->
    ${logoBase64 ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.04; z-index: 0; pointer-events: none;">
      <img src="${logoBase64}" style="width: 700px; height: auto;" alt="Watermark" />
    </div>` : ''}
    
    <!-- Content (positioned above watermark) -->
    <div style="position: relative; z-index: 1;">
    
    <!-- Header with Logo and Company Info -->
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; border: none;">
      <tr>
        <td style="width: 20%; vertical-align: top; border: none;">
          ${logoBase64 ? `<img src="${logoBase64}" style="width: 100px; height: auto; display: block;" alt="Logo" />` : ''}
          <div style="font-size: 7px; font-weight: 500; margin-top: 4px; color: #555;">EKİM SOĞUTMA MET GRUP MARKASIDIR</div>
        </td>
        <td style="width: 80%; vertical-align: top; font-size: 9px; text-align: right; padding-left: 15px; border: none;">
          <div style="margin-bottom: 3px;"><strong>ADRES:</strong> Yeniçamlıca mah. Leman Ana cad. No:39/1-2 Ataşehir / İstanbul</div>
          <div style="margin-bottom: 3px;"><strong>TELEFON:</strong> 0532 701 62 83</div>
          <div><strong>WEB:</strong> http://ekimsogutma.com/</div>
        </td>
      </tr>
    </table>

    <!-- Form Title -->
    <div style="text-align: center; font-size: 12px; font-weight: 700; margin-bottom: 12px; border: 1.5px solid #333; padding: 8px; background: #f8f9fa;">
      MÜŞTERİ TEKLİF VE SİPARİŞ FORMU
    </div>

    <!-- Customer Info Table -->
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #666; margin-bottom: 12px; font-size: 10px;">
      <tr>
        <td style="border: 1px solid #666; padding: 6px; width: 15%; background: #f8f9fa; font-weight: 600; vertical-align: middle;">FİRMA ADI</td>
        <td style="border: 1px solid #666; padding: 6px; width: 35%; vertical-align: middle;">${data.customerInfo.company || ''}</td>
        <td style="border: 1px solid #666; padding: 6px; width: 20%; background: #f8f9fa; font-weight: 600; vertical-align: middle;">TEKLİF / SİPARİŞ NO</td>
        <td style="border: 1px solid #666; padding: 6px; width: 30%; vertical-align: middle;">${data.quoteId}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #666; padding: 6px; background: #f8f9fa; font-weight: 600; vertical-align: middle;">FİRMA YETKİLİSİ</td>
        <td style="border: 1px solid #666; padding: 6px; vertical-align: middle;">${data.customerInfo.name || ''}</td>
        <td style="border: 1px solid #666; padding: 6px; background: #f8f9fa; font-weight: 600; vertical-align: middle;">TEKLİF TARİHİ</td>
        <td style="border: 1px solid #666; padding: 6px; vertical-align: middle;">${new Date(data.createdAt).toLocaleDateString('tr-TR')}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #666; padding: 6px; background: #f8f9fa; font-weight: 600; vertical-align: middle;">TELEFON</td>
        <td style="border: 1px solid #666; padding: 6px; vertical-align: middle;">${data.customerInfo.phone || ''}</td>
        <td style="border: 1px solid #666; padding: 6px; background: #f8f9fa; font-weight: 600; vertical-align: middle;">TEKLİF SÜRESİ</td>
        <td style="border: 1px solid #666; padding: 6px; vertical-align: middle;">${data.conditions.validityPeriod} GÜNDÜR</td>
      </tr>
      <tr>
        <td style="border: 1px solid #666; padding: 6px; background: #f8f9fa; font-weight: 600; vertical-align: middle;">ÖDEME ŞEKLİ</td>
        <td style="border: 1px solid #666; padding: 6px; vertical-align: middle; white-space: pre-line;">${(data.projectDetails.projectDesign || '').replace(/\n/g, '<br/>')}</td>
        <td style="border: 1px solid #666; padding: 6px; background: #f8f9fa; font-weight: 600; vertical-align: middle;">BANKA HESAP BİLGİLERİ</td>
        <td style="border: 1px solid #666; padding: 6px; vertical-align: middle;"><strong>Garanti Bankası:</strong> TR23 0006 2000 2050 0006 2867 25</td>
      </tr>
      <tr>
        <td style="border: 1px solid #666; padding: 6px; background: #f8f9fa; font-weight: 600; vertical-align: middle;">PROJE AÇIKLAMASI</td>
        <td style="border: 1px solid #666; padding: 6px; vertical-align: middle; white-space: pre-line;" colspan="3">${(data.projectDetails.projectDescription || '').replace(/\n/g, '<br/>')}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #666; padding: 6px; background: #f8f9fa; font-weight: 600; vertical-align: middle;">YÜKLENİCİ FİRMA</td>
        <td style="border: 1px solid #666; padding: 6px;" colspan="3">MET GRUP DB TİCARET LİMİTED ŞİRKETİ</td>
      </tr>
    </table>

    <!-- Items Table -->
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #666; margin-bottom: 12px; font-size: 10px;">
      <thead>
        <tr style="background: #cfe2ff;">
          <th style="border: 1px solid #666; padding: 6px; text-align: center; width: 5%; font-weight: 700;">NO</th>
          <th style="border: 1px solid #666; padding: 6px; text-align: left; width: 50%; font-weight: 700;">ÜRÜN TANIMI</th>
          <th style="border: 1px solid #666; padding: 6px; text-align: center; width: 10%; font-weight: 700;">MİKTARI</th>
          <th style="border: 1px solid #666; padding: 6px; text-align: right; width: 17%; font-weight: 700;">BR.FİYATI</th>
          <th style="border: 1px solid #666; padding: 6px; text-align: right; width: 18%; font-weight: 700;">TUTARI</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map((item, index) => `
          <tr>
            <td style="border: 1px solid #666; padding: 6px; text-align: center; vertical-align: middle;">${index + 1}</td>
            <td style="border: 1px solid #666; padding: 6px; vertical-align: middle;">
              <strong>${item.product.customName || item.product.name}</strong>
              ${item.product.brand || item.product.model ? `<div style="font-size: 9px; color: #666; margin-top: 2px;">${item.product.brand || ''} ${item.product.model || ''}</div>` : ''}
            </td>
            <td style="border: 1px solid #666; padding: 6px; text-align: center; vertical-align: middle; font-weight: 600;">${item.quantity}</td>
            <td style="border: 1px solid #666; padding: 6px; text-align: right; vertical-align: middle;">${item.unitPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} €</td>
            <td style="border: 1px solid #666; padding: 6px; text-align: right; vertical-align: middle; font-weight: 700;">${item.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} €</td>
          </tr>
        `).join('')}
        
        <!-- Subtotal Row -->
        <tr style="background: #ffeb3b;">
          <td colspan="4" style="border: 1px solid #666; padding: 6px; text-align: right; font-weight: 700; vertical-align: middle;">TOPLAM TUTAR</td>
          <td style="border: 1px solid #666; padding: 6px; text-align: right; font-weight: 700; vertical-align: middle;">${data.items.reduce((sum, item) => sum + item.total, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} €</td>
        </tr>
        
        <!-- Empty separator row -->
        <tr>
          <td colspan="5" style="border: 1px solid #666; padding: 4px;"></td>
        </tr>
        
        <!-- General Total Row -->
        <tr style="background: #ffeb3b;">
          <td colspan="4" style="border: 1px solid #666; padding: 6px; text-align: right; font-weight: 700; vertical-align: middle;">GENEL TOPLAM</td>
          <td style="border: 1px solid #666; padding: 6px; text-align: right; font-weight: 700; vertical-align: middle;">${data.items.reduce((sum, item) => sum + item.total, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} €</td>
        </tr>
      </tbody>
    </table>

    <!-- Note Box -->
    <div style="font-size: 9px; margin-bottom: 12px; padding: 8px; border: 1px solid #dc3545; background: #fff5f5; color: #dc3545;">
      Cihazlarımız 2 yıl garantilidir. Teklifimize nakliye, su gideri, cihazlara gelecek besleme hattı ve inşai işler dahil değildir.<br/>
      <strong>Teklifimiz ${data.conditions.validityPeriod} gün geçerlidir.</strong>
    </div>

    <!-- Final Totals Table -->
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #666; font-size: 10px; margin-bottom: 12px;">
      <tr style="background: #ffeb3b;">
        <td colspan="4" style="border: 1px solid #666; padding: 6px; text-align: right; font-weight: 700; vertical-align: middle;">TOPLAM TUTAR</td>
        <td style="border: 1px solid #666; padding: 6px; text-align: right; font-weight: 700; width: 18%; vertical-align: middle;">${data.items.reduce((sum, item) => sum + item.total, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} €</td>
      </tr>
      <tr style="background: #ffeb3b;">
        <td colspan="4" style="border: 1px solid #666; padding: 6px; text-align: right; font-weight: 700; vertical-align: middle;">%20 KDV</td>
        <td style="border: 1px solid #666; padding: 6px; text-align: right; font-weight: 700; vertical-align: middle;">${(data.items.reduce((sum, item) => sum + item.total, 0) * 0.20).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} €</td>
      </tr>
      <tr style="background: #ffeb3b;">
        <td colspan="4" style="border: 1px solid #666; padding: 6px; text-align: right; font-weight: 700; font-size: 11px; vertical-align: middle;">GENEL TOPLAM</td>
        <td style="border: 1px solid #666; padding: 6px; text-align: right; font-weight: 700; font-size: 11px; vertical-align: middle;">${(data.items.reduce((sum, item) => sum + item.total, 0) * 1.20).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} €</td>
      </tr>
    </table>

    <!-- Signature Section -->
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #666; font-size: 10px;">
      <tr>
        <td style="border: 1px solid #666; padding: 25px 10px 10px 10px; width: 50%; vertical-align: top;">
          <div style="font-weight: 700; margin-bottom: 20px;">SİPARİŞ ALAN / TEKLİF VEREN</div>
          <div style="margin-top: 8px;">Ad-Soyad:</div>
          <div style="margin-top: 8px;">İmza:</div>
        </td>
        <td style="border: 1px solid #666; padding: 25px 10px 10px 10px; width: 50%; vertical-align: top;">
          <div style="font-weight: 700; margin-bottom: 20px;">MÜŞTERİ ONAYI</div>
          <div style="margin-top: 8px;">Ad-Soyad:</div>
          <div style="margin-top: 8px;">İmza:</div>
          <div style="margin-top: 15px; text-align: center; font-size: 9px;">( LÜTFEN TEYİT EDİNİZ )</div>
        </td>
      </tr>
    </table>

    </div>
    <!-- End Content Wrapper -->
  </div>
  <!-- End Main Container -->
  `;

  // Add the temporary div to the document
  document.body.appendChild(tempDiv);

  try {
    // Convert HTML to canvas with high quality settings
    console.log('HTML canvas\'a dönüştürülüyor...');
    const canvas = await html2canvas(tempDiv, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scale: 5, // Yüksek kalite için scale arttırıldı (2x veya 3x önerilir)
      logging: false,
      windowWidth: tempDiv.scrollWidth,
      windowHeight: tempDiv.scrollHeight,
      imageTimeout: 0
    });
    console.log('Canvas oluşturuldu, boyut:', canvas.width, 'x', canvas.height);

    // Create PDF with high quality
    console.log('PDF oluşturuluyor...');
    const imgData = canvas.toDataURL('image/jpeg', 1.0); // JPEG format, maksimum kalite
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = 297; // A4 height in mm
    
    // Yüksek kalitede resim ekle
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

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