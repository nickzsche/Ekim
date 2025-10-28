import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.db');

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = new Database(dbPath);
    const quoteId = parseInt(params.id);

    // Teklif verisini çek
    const quote = db.prepare(`
      SELECT q.*, c.name as customer_name, c.company, c.email, c.phone
      FROM quotes q
      LEFT JOIN customers c ON q.customer_id = c.id
      WHERE q.id = ?
    `).get(quoteId) as any;

    if (!quote) {
      return NextResponse.json({ error: 'Teklif bulunamadı' }, { status: 404 });
    }

    // Teklif kalemlerini çek
    const items = db.prepare(`
      SELECT qi.*, p.name, p.code, p.brand, p.model
      FROM quote_items qi
      LEFT JOIN products p ON qi.product_id = p.id
      WHERE qi.quote_id = ?
    `).all(quoteId);

    db.close();

    // HTML içeriğini oluştur
    const htmlContent = generateHTML(quote, items);

    // Puppeteer ile PDF oluştur
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        bottom: '15mm',
        left: '15mm',
        right: '15mm'
      }
    });

    await browser.close();

    // PDF'i indir
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Teklif-${quoteId}-${quote.customer_name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Musteri'}.pdf"`
      }
    });

  } catch (error) {
    console.error('PDF oluşturma hatası:', error);
    return NextResponse.json({ error: 'PDF oluşturulamadı' }, { status: 500 });
  }
}

function generateHTML(quote: any, items: any[]): string {
  const projectDetails = JSON.parse(quote.project_details || '{}');
  const schedule = JSON.parse(quote.schedule || '{}');
  const conditions = JSON.parse(quote.conditions || '{}');

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      color: #1a202c;
      line-height: 1.6;
    }
    
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      padding: 40px;
      color: white;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .header-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    
    .company-section h1 {
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 5px;
      letter-spacing: 1px;
    }
    
    .company-section p {
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 15px;
    }
    
    .company-contacts {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 11px;
    }
    
    .customer-section {
      background: rgba(255, 255, 255, 0.15);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 16px;
      padding: 24px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .customer-section h2 {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 16px;
    }
    
    .customer-name {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 16px;
    }
    
    .customer-details {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .customer-detail {
      font-size: 13px;
      font-weight: 500;
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
    
    .quote-meta-item strong {
      display: block;
      font-weight: 600;
      opacity: 0.8;
      font-size: 10px;
    }
    
    .quote-meta-item span {
      font-weight: 700;
      font-size: 13px;
    }
    
    .content {
      padding: 40px;
    }
    
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
    }
    
    .info-value {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
    }
    
    .items-section-title {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 20px;
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
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .items-table th {
      padding: 16px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .items-table tbody tr {
      border-bottom: 1px solid #e2e8f0;
    }
    
    .items-table td {
      padding: 18px 16px;
      font-size: 13px;
      color: #334155;
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
    
    .total-section {
      margin-top: 32px;
      padding: 24px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;
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
    }
    
    .total-row.grand-total span {
      color: #2563eb;
      font-size: 22px;
    }
    
    .signature-section {
      margin-top: 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      padding: 32px 0;
      border-top: 2px solid #e2e8f0;
    }
    
    .signature-label {
      font-size: 13px;
      font-weight: 600;
      color: #475569;
      margin-bottom: 20px;
    }
    
    .signature-line {
      border-top: 2px solid #cbd5e1;
      padding-top: 12px;
      min-width: 220px;
      font-size: 13px;
      font-weight: 600;
    }
    
    .footer {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 32px;
      text-align: center;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .footer-content {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-bottom: 16px;
      font-size: 12px;
    }
    
    .footer-copyright {
      font-size: 11px;
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-content">
      <div class="company-section">
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
        <div class="customer-name">${quote.customer_name || 'MÜŞTERİ ADI'}</div>
        <div class="customer-details">
          ${quote.company ? `<div class="customer-detail">🏢 ${quote.company}</div>` : ''}
          ${quote.phone ? `<div class="customer-detail">📞 ${quote.phone}</div>` : ''}
          ${quote.email ? `<div class="customer-detail">✉️ ${quote.email}</div>` : ''}
        </div>
        <div class="quote-meta">
          <div class="quote-meta-item">
            <strong>TEKLİF NO</strong>
            <span>#${quote.id}</span>
          </div>
          <div class="quote-meta-item">
            <strong>TARİH</strong>
            <span>${new Date(quote.created_at).toLocaleDateString('tr-TR')}</span>
          </div>
          <div class="quote-meta-item">
            <strong>GEÇERLİLİK</strong>
            <span>${conditions.validityPeriod || '-'} Gün</span>
          </div>
          <div class="quote-meta-item">
            <strong>TESLİMAT</strong>
            <span>${conditions.deliveryTime || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="content">
    <div class="project-details">
      <div class="project-title">📋 Proje Detayları</div>
      <div class="project-info-grid">
        <div class="info-item">
          <div class="info-label">Proje Konusu</div>
          <div class="info-value">${projectDetails.projectDesign || '-'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Teslimat Süresi</div>
          <div class="info-value">${conditions.deliveryTime || '-'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Başlangıç Tarihi</div>
          <div class="info-value">${schedule.startDate ? new Date(schedule.startDate).toLocaleDateString('tr-TR') : '-'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Bitiş Tarihi</div>
          <div class="info-value">${schedule.endDate ? new Date(schedule.endDate).toLocaleDateString('tr-TR') : '-'}</div>
        </div>
      </div>
    </div>

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
          ${items.map(item => `
            <tr>
              <td>
                <div class="product-name">${item.custom_name || item.name}</div>
                ${item.brand || item.model ? `<div class="product-meta">${item.brand || ''} ${item.model || ''}</div>` : ''}
                ${item.code ? `<div class="product-meta">Kod: ${item.code}</div>` : ''}
              </td>
              <td style="text-align: center; font-weight: 700; color: #2563eb;">${item.quantity}</td>
              <td style="text-align: right; font-weight: 600; color: #059669;">€${parseFloat(item.unit_price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
              <td style="text-align: right; font-weight: 700; font-size: 14px;">€${parseFloat(item.total).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="total-section">
        <div class="total-row subtotal">
          <strong>Ara Toplam</strong>
          <span>€${items.reduce((sum, item) => sum + parseFloat(item.total), 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
        </div>
        <div class="total-row">
          <strong>KDV (%20)</strong>
          <span>€${(items.reduce((sum, item) => sum + parseFloat(item.total), 0) * 0.2).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
        </div>
        <div class="total-row grand-total">
          <strong>GENEL TOPLAM</strong>
          <span>€${(items.reduce((sum, item) => sum + parseFloat(item.total), 0) * 1.2).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>

    <div class="signature-section">
      <div>
        <div class="signature-label">Ekim Soğutma</div>
      </div>
      <div>
        <div class="signature-label">Müşteri Onayı</div>
        <div class="signature-line">İmza & Kaşe</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-content">
      <div>🌐 www.ekimsogutma.com</div>
      <div>✉️ info@ekimsogutma.com</div>
      <div>📞 +90 532 701 6283 / +90 542 457 2553</div>
    </div>
    <div class="footer-copyright">© ${new Date().getFullYear()} Ekim Soğutma. Tüm hakları saklıdır.</div>
  </div>
</body>
</html>
  `;
}
