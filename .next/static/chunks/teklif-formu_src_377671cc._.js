(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/teklif-formu/src/lib/pdfGenerator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateQuotePDF",
    ()=>generateQuotePDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
;
// Helper function to load image as base64
const loadImageAsBase64 = async (imagePath)=>{
    try {
        const response = await fetch(imagePath);
        const blob = await response.blob();
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = ()=>resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Logo yüklenirken hata:', error);
        return ''; // Return empty string if logo fails to load
    }
};
const generateQuotePDF = async (data)=>{
    // Load logo as base64
    const logoBase64 = await loadImageAsBase64('/image/49125941466.jpg');
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
    tempDiv.innerHTML = '\n  <div style="padding: 0; font-family: \'Segoe UI\', Arial, sans-serif; color: #2c3e50; line-height: 1.2; font-size: 7px; min-height: 1122px; position: relative;">\n      <!-- Modern Header with Logo -->\n  <div style="background: #f8fafc; border-bottom: 2.5px solid #1e40af; padding: 0 0 8px 0; margin-bottom: 6px;">\n    <div style="display: flex; justify-content: space-between; align-items: flex-end;">\n      <div style="padding: 12px 18px 0 18px;">\n        <div style="display: flex; align-items: center; gap: 10px;">\n          '.concat(logoBase64 ? '<img src="'.concat(logoBase64, '" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover; border: 1.5px solid #1e40af; background: white;" alt="Ekim Soğutma Logo" />') : '', '\n          <div>\n            <h1 style="font-size: 13px; margin: 0; font-weight: 800; color: #1e40af; letter-spacing: 0.5px;">EKİM SOĞUTMA</h1>\n            <div style="font-size: 7px; color: #64748b; font-weight: 500; margin-top: 1px;">Profesyonel Soğutma ve Klima Sistemleri</div>\n          </div>\n        </div>\n        <div style="font-size: 6.5px; color: #334155; margin-top: 4px;">\n          <span>📞 +90 (532) 123 45 67</span> &nbsp;|&nbsp; <span>✉️ info@ekimsogutma.com</span> &nbsp;|&nbsp; <span>🌐 www.ekimsogutma.com</span>\n        </div>\n      </div>\n      <div style="padding: 10px 18px 0 0; text-align: right; min-width: 180px;">\n        <div style="font-size: 7.5px; color: #1e40af; font-weight: 700; letter-spacing: 0.2px; margin-bottom: 2px;">MÜŞTERİ BİLGİLERİ</div>\n        <div style="background: white; padding: 6px 8px; border-radius: 6px; box-shadow: 0 1px 4px rgba(30,64,175,0.06);">\n          <div style="font-size: 7.5px; font-weight: 700; color: #0f172a; margin-bottom: 1px;">').concat(data.customerInfo.name, "</div>\n          ").concat(data.customerInfo.company ? '<div style="font-size: 6.5px; color: #64748b;">'.concat(data.customerInfo.company, "</div>") : '', "\n          ").concat(data.customerInfo.email ? '<div style="font-size: 6.5px;">📧 '.concat(data.customerInfo.email, "</div>") : '', "\n          ").concat(data.customerInfo.phone ? '<div style="font-size: 6.5px;">📱 '.concat(data.customerInfo.phone, "</div>") : '', '\n        </div>\n      </div>\n    </div>\n    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 18px 0 18px; margin-top: 2px;">\n      <div style="font-size: 8px; color: #1e40af; font-weight: 700;">� TEKLİF</div>\n      <div style="font-size: 7px; color: #0f172a; font-weight: 500; text-align: right;">\n        <span style="margin-right: 10px;"><strong>Teklif No:</strong> <span style="color: #1e40af; font-weight: 700;">#').concat(data.quoteId, '</span></span>\n        <span style="margin-right: 10px;"><strong>Tarih:</strong> ').concat(new Date(data.createdAt).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }), '</span>\n        <span><strong>Geçerlilik:</strong> <span style="color: #dc2626; font-weight: 600;">').concat(data.conditions.validityPeriod, ' gün</span></span>\n      </div>\n    </div>\n  </div>\n\n      <!-- Quote Info Section -->\n\n      <!-- Project Details -->\n  <div style="background: #f1f5f9; padding: 6px 18px 6px 18px; border-radius: 6px; margin-bottom: 7px; border-left: 3px solid #1e40af; font-size: 7px;">\n    <div style="font-size: 8px; color: #0c4a6e; font-weight: 700; margin-bottom: 2px;">🏗️ PROJE DETAYLARI</div>\n    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; font-size: 7px;">\n      <div><strong>Konu:</strong> ').concat(data.projectDetails.projectDesign || '-', "</div>\n      <div><strong>Teslimat:</strong> ").concat(data.conditions.deliveryTime || '-', "</div>\n      <div><strong>Başlangıç:</strong> ").concat(data.schedule.startDate ? new Date(data.schedule.startDate).toLocaleDateString('tr-TR') : '-', "</div>\n      <div><strong>Bitiş:</strong> ").concat(data.schedule.endDate ? new Date(data.schedule.endDate).toLocaleDateString('tr-TR') : '-', "</div>\n    </div>\n    ").concat(data.projectDetails.projectDescription ? '<div style="margin-top: 5px; padding-top: 5px; border-top: 1px solid #bae6fd; font-size: 7px;"><strong>Açıklama:</strong><br>'.concat(data.projectDetails.projectDescription, "</div>") : '', '\n  </div>\n\n      <!-- Items Table -->\n  <div style="margin-bottom: 4px;">\n    <h3 style="color: #1e40af; font-size: 10px; margin: 0 0 6px 0; font-weight: 700;">📦 TEKLİF KALEMLERİ</h3>\n  <table style="width: 100%; border-collapse: collapse; border-radius: 1px; overflow: hidden; box-shadow: 0 1px 1px rgba(0,0,0,0.02); table-layout: fixed; font-size: 9.5px;">\n      <thead>\n        <tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">\n          <th style="padding: 4px 3px; text-align: left; font-size: 10px; font-weight: 700; width: 40%;">ÜRÜN</th>\n          <th style="padding: 4px 2px; text-align: center; font-size: 10px; font-weight: 700; width: 10%;">ADET</th>\n          <th style="padding: 4px 2px; text-align: right; font-size: 10px; font-weight: 700; width: 18%;">SATIŞ FİYATI</th>\n          <th style="padding: 4px 2px; text-align: right; font-size: 10px; font-weight: 700; width: 18%;">TOPLAM FİYAT</th>\n        </tr>\n      </thead>\n      <tbody>\n        ').concat(data.items.map((item, index)=>'\n          <tr style="background: '.concat(index % 2 === 0 ? '#f8fafc' : 'white', '; border-bottom: 1px solid #e5e7eb;">\n            <td style="padding: 4px 3px; font-size: 10px; word-wrap: break-word; vertical-align: top;">\n              <div style="font-weight: 700; color: #1f2937; line-height: 1.08;">').concat(item.product.customName || item.product.name, "</div>\n              ").concat(item.product.name.includes('Tavan') || item.product.name.includes('Zemin') || item.product.name.includes('Duvar') ? '<div style="font-size: 7px; color: #6b7280; margin-top: 1px;">'.concat(item.product.description || 'Metrekare hesaplaması', "</div>") : "".concat(item.product.brand || item.product.model ? '<div style="font-size: 7.5px; color: #6b7280; margin-top: 1px;">'.concat(item.product.brand || '', " ").concat(item.product.model || '', "</div>") : ''), "\n              ").concat(item.product.code ? '<div style="font-size: 7px; color: #9ca3af; margin-top: 1px;">Kod: '.concat(item.product.code, "</div>") : '', '\n            </td>\n            <td style="padding: 4px 2px; text-align: center; font-size: 10px; font-weight: 700; color: #1e40af; vertical-align: middle;">').concat(item.quantity, '</td>\n            <td style="padding: 4px 2px; text-align: right; font-size: 10px; font-weight: 700; color: #059669; vertical-align: middle; white-space: nowrap;">€').concat(item.unitPrice.toLocaleString('tr-TR', {
            minimumFractionDigits: 2
        }), '</td>\n            <td style="padding: 4px 2px; text-align: right; font-size: 10px; font-weight: 800; color: #dc2626; vertical-align: middle; white-space: nowrap;">€').concat(item.total.toLocaleString('tr-TR', {
            minimumFractionDigits: 2
        }), "</td>\n          </tr>\n        ")).join(''), '\n      </tbody>\n    </table>\n    <div style="width: 100%; text-align: right; font-size: 7.5px; font-weight: 800; color: #1e293b; margin-top: 4px; margin-bottom: 0;">\n      Ara Toplam: €').concat(data.items.reduce((sum, item)=>sum + item.total, 0).toLocaleString('tr-TR', {
        minimumFractionDigits: 2
    }), '<br/>\n      KDV (%20) Dahil Toplam: <span style="color:#dc2626;">€').concat((data.items.reduce((sum, item)=>sum + item.total, 0) * 1.2).toLocaleString('tr-TR', {
        minimumFractionDigits: 2
    }), '</span>\n    </div>\n    <div style="font-size: 5px; margin-top: 1px;">• Ürünlere <strong>2 yıl garanti</strong></div>\n    <div style="font-size: 5px;">• Teklif sadece belirtilen ürünler için geçerli</div>\n    \n    <!-- Metrekare hesaplama detayları -->\n    ').concat(data.items.some((item)=>item.product.name.includes('Metrekare Hesaplama')) ? '\n      <div style="margin-top: 10px; padding: 8px; background-color: #f0f9ff; border-radius: 6px; border: 1px solid #bae6fd;">\n        <div style="font-size: 8px; font-weight: 700; color: #0c4a6e; margin-bottom: 4px;">📐 Metrekare Hesaplama Detayları:</div>\n        <div style="font-size: 7px; color: #0c4a6e;">\n          Bu teklif, tavan, zemin ve duvar alanlarının ayrı ayrı hesaplanmasından oluşmaktadır. \n          Her bir alan için en, boy ve adet değerleri girilerek toplam metrekare hesaplanmıştır.\n        </div>\n      </div>\n    ' : '', '\n  </div>\n\n      <!-- İmza için daha geniş boşluk ve yazılar -->\n      <div style="height: 60px; position: relative;">\n        <div style="position: absolute; left: 24px; bottom: 6px; font-size: 9px; font-weight: bold; color: #1e293b;">Ekim Soğutma</div>\n        <div style="position: absolute; right: 24px; bottom: 6px; font-size: 9px; font-weight: bold; color: #1e293b;">Müşteri Onayı</div>\n      </div>\n\n      <!-- Footer -->\n      <div style="position: absolute; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 12px 0 8px 0; border-radius: 10px 10px 0 0; text-align: center; font-size: 10px; width: 100%; margin: 0; z-index: 10; display: block;">\n        <div style="font-size: 10px; opacity: 0.9; display: flex; justify-content: center; gap: 10px;">\n          <span>🌐 www.ekimsogutma.com</span>\n          <span>✉️ info@ekimsogutma.com</span>\n          <span>📞 +90 (532) 123 45 67</span>\n        </div>\n        <p style="margin: 4px 0 0 0; font-size: 9px; opacity: 0.7;">© ').concat(new Date().getFullYear(), " Ekim Soğutma. Tüm hakları saklıdır.</p>\n      </div>\n    </div>\n  ");
    // Add the temporary div to the document
    document.body.appendChild(tempDiv);
    try {
        // Convert HTML to canvas (tek sayfa için yükseklik sınırı)
        const canvas = await html2canvas(tempDiv, {
            useCORS: true,
            allowTaint: true,
            background: '#ffffff',
            width: 794,
            height: 1050 // Tek sayfa için sabit yükseklik
        });
        // Create PDF (tek sayfa)
        const imgData = canvas.toDataURL('image/png');
        const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = 297; // A4 height in mm
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        // Download the PDF
        pdf.save("Teklif_".concat(data.quoteId, "_").concat(data.customerInfo.name.replace(/[^a-zA-Z0-9]/g, '_'), ".pdf"));
    } finally{
        // Clean up: remove the temporary div
        document.body.removeChild(tempDiv);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/teklif-formu/src/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
;
function Header() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "bg-white/95 backdrop-blur-lg shadow-premium border-b border-gray-200/50 sticky top-0 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center space-x-4 group",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/image/49125941466.jpg",
                                alt: "Ekim Soğutma Logo",
                                width: 220,
                                height: 220,
                                className: "rounded-xl shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 group-hover:scale-105"
                            }, void 0, false, {
                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                lineNumber: 11,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/teklif-formu/src/components/Header.tsx",
                            lineNumber: 10,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                        lineNumber: 9,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden md:flex items-center space-x-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/products",
                                className: "group relative px-3 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl group-hover:scale-110 transition-transform duration-300",
                                                children: "📦"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                                lineNumber: 28,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm text-gray-800 group-hover:text-green-600 transition-colors duration-300",
                                                children: "Ürünler"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                                lineNumber: 29,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 27,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300 group-hover:w-full group-hover:left-0"
                                    }, void 0, false, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 31,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                lineNumber: 23,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/customers",
                                className: "group relative px-3 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl group-hover:scale-110 transition-transform duration-300",
                                                children: "👥"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                                lineNumber: 39,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm text-gray-800 group-hover:text-blue-600 transition-colors duration-300",
                                                children: "Müşteriler"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                                lineNumber: 40,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full group-hover:left-0"
                                    }, void 0, false, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/quotes",
                                className: "group relative px-3 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl group-hover:scale-110 transition-transform duration-300",
                                                children: "📋"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                                lineNumber: 50,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm text-gray-800 group-hover:text-purple-600 transition-colors duration-300",
                                                children: "Teklifler"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                                lineNumber: 51,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-300 group-hover:w-full group-hover:left-0"
                                    }, void 0, false, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/tedarikciler",
                                className: "group relative px-3 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl group-hover:scale-110 transition-transform duration-300",
                                                children: "🏭"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                                lineNumber: 61,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm text-gray-800 group-hover:text-orange-600 transition-colors duration-300",
                                                children: "Tedarikçiler"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                                lineNumber: 62,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 60,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300 group-hover:w-full group-hover:left-0"
                                    }, void 0, false, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/projeler",
                                className: "group relative px-3 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl group-hover:scale-110 transition-transform duration-300",
                                                children: "🏗️"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                                lineNumber: 72,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm text-gray-800 group-hover:text-yellow-600 transition-colors duration-300",
                                                children: "Tanımlı Projeler"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                                lineNumber: 73,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 group-hover:w-full group-hover:left-0"
                                    }, void 0, false, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "group relative p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-lg hover:shadow-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M4 6h16M4 12h16M4 18h16"
                                    }, void 0, false, {
                                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                        lineNumber: 83,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                }, void 0, false, {
                                    fileName: "[project]/teklif-formu/src/components/Header.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/teklif-formu/src/components/Header.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/teklif-formu/src/components/Header.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/teklif-formu/src/components/Header.tsx",
                lineNumber: 8,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/teklif-formu/src/components/Header.tsx",
            lineNumber: 7,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/teklif-formu/src/components/Header.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/teklif-formu/src/app/projeler/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$pdfGenerator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/src/lib/pdfGenerator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/src/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ProjectDetailPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const projectId = Number(params === null || params === void 0 ? void 0 : params.id);
    const [project, setProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editProjectName, setEditProjectName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [projectProducts, setProjectProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Inline edit state (her hücre için ayrı)
    const [editingCell, setEditingCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editCellValue, setEditCellValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [addProductId, setAddProductId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [addQuantity, setAddQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [categoryFilter, setCategoryFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [productSearch, setProductSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [allProducts, setAllProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingProducts, setIsLoadingProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Projeyi kaydet (her zaman güncel ürünlerle kaydeder)
    async function handleSaveProject() {
        setIsSaving(true);
        try {
            const res = await fetch("/api/projects/".concat(projectId), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editProjectName || "Proje ".concat(projectId),
                    products: projectProducts.map((p)=>{
                        var _p_id, _p_discount, _p_margin;
                        return {
                            productId: (_p_id = p.id) !== null && _p_id !== void 0 ? _p_id : p.productId,
                            quantity: p.quantity,
                            discount: (_p_discount = p.discount) !== null && _p_discount !== void 0 ? _p_discount : 0,
                            margin: (_p_margin = p.margin) !== null && _p_margin !== void 0 ? _p_margin : 0
                        };
                    })
                })
            });
            if (!res.ok) throw new Error('Kayıt başarısız');
            router.push('/projeler');
        } catch (e) {
            alert('Proje kaydedilemedi!');
        } finally{
            setIsSaving(false);
        }
    }
    // Teklif PDF için müşteri modalı
    const [showCustomerModal, setShowCustomerModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customerList, setCustomerList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCustomerId, setSelectedCustomerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [customerName, setCustomerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [customerCompany, setCustomerCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [customerEmail, setCustomerEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [customerPhone, setCustomerPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Teklif geçerlilik ve teslim süresi
    const [validityPeriod, setValidityPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('15');
    const [deliveryTime, setDeliveryTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('2 hafta');
    // Müşteri listesini çek
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectDetailPage.useEffect": ()=>{
            if (showCustomerModal) {
                fetch('/api/customers').then({
                    "ProjectDetailPage.useEffect": (res)=>res.json()
                }["ProjectDetailPage.useEffect"]).then({
                    "ProjectDetailPage.useEffect": (data)=>setCustomerList(data)
                }["ProjectDetailPage.useEffect"]);
            }
        }
    }["ProjectDetailPage.useEffect"], [
        showCustomerModal
    ]);
    // Proje ve ürünleri yükle
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectDetailPage.useEffect": ()=>{
            async function fetchProjectAndProducts() {
                try {
                    // Hem projeyi hem ürünleri paralel çek
                    const [projectRes, productsRes] = await Promise.all([
                        fetch("/api/projects/".concat(projectId)),
                        fetch('/api/products')
                    ]);
                    if (!projectRes.ok) throw new Error('Proje bulunamadı');
                    const projectData = await projectRes.json();
                    const allProductsData = productsRes.ok ? await productsRes.json() : [];
                    setProject({
                        id: projectData.id,
                        name: projectData.name
                    });
                    setEditProjectName(projectData.name || "");
                    // Proje ürünlerini detaylarla birleştir
                    const mergedProducts = Array.isArray(projectData.products) ? projectData.products.map({
                        "ProjectDetailPage.useEffect.fetchProjectAndProducts": (p)=>{
                            const prod = allProductsData.find({
                                "ProjectDetailPage.useEffect.fetchProjectAndProducts.prod": (ap)=>{
                                    var _p_productId;
                                    return ap.id === ((_p_productId = p.productId) !== null && _p_productId !== void 0 ? _p_productId : p.id);
                                }
                            }["ProjectDetailPage.useEffect.fetchProjectAndProducts.prod"]);
                            var _p_productId;
                            return {
                                ...prod,
                                ...p,
                                id: (_p_productId = p.productId) !== null && _p_productId !== void 0 ? _p_productId : p.id
                            };
                        }
                    }["ProjectDetailPage.useEffect.fetchProjectAndProducts"]) : [];
                    setProjectProducts(mergedProducts);
                } catch (e) {
                    setProject({
                        id: projectId,
                        name: "Proje ".concat(projectId)
                    });
                    setProjectProducts([]);
                }
            }
            fetchProjectAndProducts();
        }
    }["ProjectDetailPage.useEffect"], [
        projectId
    ]);
    // Ürünleri API'den çek
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectDetailPage.useEffect": ()=>{
            async function fetchProducts() {
                setIsLoadingProducts(true);
                try {
                    const res = await fetch('/api/products');
                    const data = await res.json();
                    setAllProducts(data);
                } catch (err) {
                    setAllProducts([]);
                } finally{
                    setIsLoadingProducts(false);
                }
            }
            fetchProducts();
        }
    }["ProjectDetailPage.useEffect"], []);
    // Ürün ekle
    function addProductToProject() {
        if (!addProductId) return;
        const prod = allProducts.find((p)=>p.id === addProductId);
        if (!prod) return;
        setProjectProducts((prev)=>[
                ...prev,
                {
                    ...prod,
                    quantity: addQuantity,
                    discount: 0,
                    margin: 0
                }
            ]);
        setAddProductId(0);
        setAddQuantity(1);
        setProductSearch('');
    }
    // Inline edit handlers (her hücre için)
    function startEditCell(row, field, value) {
        setEditingCell({
            row,
            field
        });
        setEditCellValue(value);
    }
    function saveEditCell(row, field) {
        setProjectProducts((prev)=>prev.map((item, i)=>i === row ? {
                    ...item,
                    [field]: Number(editCellValue)
                } : item));
        setEditingCell(null);
        setEditCellValue('');
    }
    // Hesaplamalar
    const totalCost = projectProducts.reduce((sum, p)=>sum + p.price * p.quantity * (1 - p.discount / 100), 0);
    const totalSales = projectProducts.reduce((sum, p)=>sum + p.price * p.quantity * (1 - p.discount / 100) * (1 + p.margin / 100), 0);
    const totalProfit = totalSales - totalCost;
    // Proje ürününden silme fonksiyonu
    function handleDeleteProjectProduct(index) {
        setProjectProducts((prev)=>prev.filter((_, i)=>i !== index));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white py-10 px-2 md:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto flex flex-col gap-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/95 rounded-3xl shadow-premium p-8 border border-white/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    className: "text-2xl font-black text-gray-900 bg-white border-b-2 border-yellow-300 focus:border-orange-500 outline-none px-2 py-1 rounded transition-all min-w-[180px]",
                                    value: editProjectName,
                                    onChange: (e)=>setEditProjectName(e.target.value),
                                    placeholder: "Proje Adı",
                                    style: {
                                        maxWidth: '70%'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/projeler",
                                    className: "text-sm text-orange-600 font-bold",
                                    children: "← Projelere Dön"
                                }, void 0, false, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 flex flex-col md:flex-row gap-2 md:gap-4 items-end relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "w-48 border px-3 py-2 rounded-lg text-sm text-gray-900 bg-white",
                                    value: categoryFilter,
                                    onChange: (e)=>setCategoryFilter(e.target.value),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Tüm Kategoriler"
                                        }, void 0, false, {
                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                            lineNumber: 199,
                                            columnNumber: 15
                                        }, this),
                                        [
                                            ...new Set(allProducts.map((p)=>p.category).filter(Boolean))
                                        ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: cat,
                                                children: cat
                                            }, cat, false, {
                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: productSearch,
                                    onChange: (e)=>setProductSearch(e.target.value),
                                    className: "w-64 border px-3 py-2 rounded-lg text-sm text-gray-900",
                                    placeholder: "Ürün ara..."
                                }, void 0, false, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 205,
                                    columnNumber: 13
                                }, this),
                                productSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-0 right-0 top-full bg-white border border-gray-200 rounded-lg shadow z-20 max-h-60 overflow-y-auto",
                                    children: [
                                        allProducts.filter((p)=>(!categoryFilter || p.category === categoryFilter) && p.name.toLowerCase().includes(productSearch.toLowerCase())).slice(0, 15).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2 cursor-pointer hover:bg-yellow-100 ".concat(addProductId === p.id ? 'bg-yellow-50' : ''),
                                                onClick: ()=>{
                                                    setAddProductId(p.id);
                                                    setProductSearch(p.name);
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-gray-900 font-bold text-base leading-tight",
                                                        children: p.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-xs text-gray-500 font-mono",
                                                        children: p.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, p.id, true, {
                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                lineNumber: 222,
                                                columnNumber: 21
                                            }, this)),
                                        allProducts.filter((p)=>(!categoryFilter || p.category === categoryFilter) && p.name.toLowerCase().includes(productSearch.toLowerCase())).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-4 py-2 text-gray-400",
                                            children: "Ürün bulunamadı"
                                        }, void 0, false, {
                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                            lineNumber: 236,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    min: 1,
                                    value: addQuantity,
                                    onChange: (e)=>setAddQuantity(Number(e.target.value)),
                                    className: "w-20 border px-3 py-2 rounded-lg text-sm text-gray-900",
                                    placeholder: "Adet"
                                }, void 0, false, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addProductToProject,
                                    className: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm",
                                    disabled: !addProductId || addQuantity < 1,
                                    children: "Ekle"
                                }, void 0, false, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "min-w-full text-sm border rounded-xl overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "bg-yellow-100 text-gray-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: "Ürün"
                                                }, void 0, false, {
                                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: "Kod"
                                                }, void 0, false, {
                                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: "Adet"
                                                }, void 0, false, {
                                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: "Liste Fiyatı"
                                                }, void 0, false, {
                                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: "İskonto (%)"
                                                }, void 0, false, {
                                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: "Kar Marjı (%)"
                                                }, void 0, false, {
                                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: "Satış Fiyatı"
                                                }, void 0, false, {
                                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: "Toplam"
                                                }, void 0, false, {
                                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                            lineNumber: 262,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: [
                                            projectProducts.map((p, i)=>{
                                                var _p_price;
                                                var _p_discount, _p_margin, _p_discount1, _p_margin1, _p_discount2, _p_margin2;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-b",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-2 font-bold text-gray-900",
                                                            children: p.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-2 text-gray-700",
                                                            children: p.code
                                                        }, void 0, false, {
                                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-2 text-center",
                                                            children: (editingCell === null || editingCell === void 0 ? void 0 : editingCell.row) === i && editingCell.field === 'quantity' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: 1,
                                                                value: editCellValue,
                                                                onChange: (e)=>setEditCellValue(e.target.value),
                                                                onBlur: ()=>saveEditCell(i, 'quantity'),
                                                                onKeyDown: (e)=>{
                                                                    if (e.key === 'Enter') saveEditCell(i, 'quantity');
                                                                },
                                                                className: "w-16 border px-2 py-1 rounded text-gray-900 font-bold text-center",
                                                                autoFocus: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 281,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-gray-900 cursor-pointer",
                                                                onClick: ()=>startEditCell(i, 'quantity', p.quantity),
                                                                children: p.quantity
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 292,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-2 text-right",
                                                            children: (editingCell === null || editingCell === void 0 ? void 0 : editingCell.row) === i && editingCell.field === 'price' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: 0,
                                                                value: editCellValue,
                                                                onChange: (e)=>setEditCellValue(e.target.value),
                                                                onBlur: ()=>saveEditCell(i, 'price'),
                                                                onKeyDown: (e)=>{
                                                                    if (e.key === 'Enter') saveEditCell(i, 'price');
                                                                },
                                                                className: "w-24 border px-2 py-1 rounded text-green-800 font-bold text-right",
                                                                autoFocus: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 298,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-green-800 cursor-pointer",
                                                                onClick: ()=>startEditCell(i, 'price', p.price),
                                                                children: [
                                                                    "€",
                                                                    (_p_price = p.price) === null || _p_price === void 0 ? void 0 : _p_price.toLocaleString("tr-TR", {
                                                                        minimumFractionDigits: 2
                                                                    })
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 309,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-2 text-center",
                                                            children: (editingCell === null || editingCell === void 0 ? void 0 : editingCell.row) === i && editingCell.field === 'discount' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: 0,
                                                                max: 100,
                                                                value: editCellValue,
                                                                onChange: (e)=>setEditCellValue(e.target.value),
                                                                onBlur: ()=>saveEditCell(i, 'discount'),
                                                                onKeyDown: (e)=>{
                                                                    if (e.key === 'Enter') saveEditCell(i, 'discount');
                                                                },
                                                                className: "w-14 border px-2 py-1 rounded text-blue-800 font-bold text-center",
                                                                autoFocus: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 317,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-blue-800 cursor-pointer",
                                                                onClick: ()=>{
                                                                    var _p_discount;
                                                                    return startEditCell(i, 'discount', (_p_discount = p.discount) !== null && _p_discount !== void 0 ? _p_discount : 0);
                                                                },
                                                                children: (_p_discount = p.discount) !== null && _p_discount !== void 0 ? _p_discount : 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-2 text-center",
                                                            children: (editingCell === null || editingCell === void 0 ? void 0 : editingCell.row) === i && editingCell.field === 'margin' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: 0,
                                                                max: 100,
                                                                value: editCellValue,
                                                                onChange: (e)=>setEditCellValue(e.target.value),
                                                                onBlur: ()=>saveEditCell(i, 'margin'),
                                                                onKeyDown: (e)=>{
                                                                    if (e.key === 'Enter') saveEditCell(i, 'margin');
                                                                },
                                                                className: "w-14 border px-2 py-1 rounded text-orange-800 font-bold text-center",
                                                                autoFocus: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 335,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-orange-800 cursor-pointer",
                                                                onClick: ()=>{
                                                                    var _p_margin;
                                                                    return startEditCell(i, 'margin', (_p_margin = p.margin) !== null && _p_margin !== void 0 ? _p_margin : 0);
                                                                },
                                                                children: (_p_margin = p.margin) !== null && _p_margin !== void 0 ? _p_margin : 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                            lineNumber: 333,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-2 text-right font-bold text-green-700",
                                                            children: [
                                                                "€",
                                                                (p.price * (1 - ((_p_discount1 = p.discount) !== null && _p_discount1 !== void 0 ? _p_discount1 : 0) / 100) * (1 + ((_p_margin1 = p.margin) !== null && _p_margin1 !== void 0 ? _p_margin1 : 0) / 100)).toLocaleString("tr-TR", {
                                                                    minimumFractionDigits: 2
                                                                })
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-2 text-right font-bold text-blue-700",
                                                            children: [
                                                                "€",
                                                                (p.price * p.quantity * (1 - ((_p_discount2 = p.discount) !== null && _p_discount2 !== void 0 ? _p_discount2 : 0) / 100) * (1 + ((_p_margin2 = p.margin) !== null && _p_margin2 !== void 0 ? _p_margin2 : 0) / 100)).toLocaleString("tr-TR", {
                                                                    minimumFractionDigits: 2
                                                                })
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                            lineNumber: 355,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-2 py-2 text-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleDeleteProjectProduct(i),
                                                                className: "bg-red-50 hover:bg-red-100 text-red-700 font-bold py-1 px-2 rounded text-xs border border-red-200 transition-all",
                                                                title: "Ürünü projeden çıkar",
                                                                children: "Sil"
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 360,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 19
                                                }, this);
                                            }),
                                            projectProducts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 8,
                                                    className: "text-center text-gray-400 py-8",
                                                    children: "Henüz ürün eklenmedi."
                                                }, void 0, false, {
                                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                lineNumber: 369,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                        lineNumber: 273,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-end gap-1 mt-6 text-base font-bold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-blue-700",
                                    children: [
                                        "Ara Toplam: €",
                                        projectProducts.reduce((sum, p)=>{
                                            var _p_discount, _p_margin;
                                            return sum + p.price * (1 - ((_p_discount = p.discount) !== null && _p_discount !== void 0 ? _p_discount : 0) / 100) * (1 + ((_p_margin = p.margin) !== null && _p_margin !== void 0 ? _p_margin : 0) / 100) * p.quantity;
                                        }, 0).toLocaleString("tr-TR", {
                                            minimumFractionDigits: 2
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 381,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-orange-700",
                                    children: [
                                        "KDV (%20): €",
                                        (projectProducts.reduce((sum, p)=>{
                                            var _p_discount, _p_margin;
                                            return sum + p.price * (1 - ((_p_discount = p.discount) !== null && _p_discount !== void 0 ? _p_discount : 0) / 100) * (1 + ((_p_margin = p.margin) !== null && _p_margin !== void 0 ? _p_margin : 0) / 100) * p.quantity;
                                        }, 0) * 0.2).toLocaleString("tr-TR", {
                                            minimumFractionDigits: 2
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-green-700",
                                    children: [
                                        "Genel Toplam: €",
                                        (projectProducts.reduce((sum, p)=>{
                                            var _p_discount, _p_margin;
                                            return sum + p.price * (1 - ((_p_discount = p.discount) !== null && _p_discount !== void 0 ? _p_discount : 0) / 100) * (1 + ((_p_margin = p.margin) !== null && _p_margin !== void 0 ? _p_margin : 0) / 100) * p.quantity;
                                        }, 0) * 1.2).toLocaleString("tr-TR", {
                                            minimumFractionDigits: 2
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 395,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row justify-end gap-4 mt-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-black text-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed",
                                    onClick: handleSaveProject,
                                    disabled: isSaving || projectProducts.length === 0,
                                    children: isSaving ? 'Kaydediliyor...' : 'Projeyi Kaydet'
                                }, void 0, false, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 405,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-black text-lg shadow-lg",
                                    onClick: ()=>setShowCustomerModal(true),
                                    children: "Teklif Oluştur (PDF)"
                                }, void 0, false, {
                                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                    lineNumber: 412,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this),
                        showCustomerModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-8 w-full max-w-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-4 text-blue-900",
                                        children: "Müşteri Seçimi"
                                    }, void 0, false, {
                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                        lineNumber: 423,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-bold text-gray-700 mb-1",
                                                children: "Kayıtlı Müşteriler"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                lineNumber: 425,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full border px-3 py-2 rounded-lg text-sm text-gray-900 font-semibold bg-white",
                                                value: selectedCustomerId !== null && selectedCustomerId !== void 0 ? selectedCustomerId : '',
                                                onChange: (e)=>{
                                                    const id = Number(e.target.value);
                                                    setSelectedCustomerId(id);
                                                    const cust = customerList.find((c)=>c.id === id);
                                                    setCustomerName((cust === null || cust === void 0 ? void 0 : cust.name) || '');
                                                    setCustomerCompany((cust === null || cust === void 0 ? void 0 : cust.company) || '');
                                                    setCustomerEmail((cust === null || cust === void 0 ? void 0 : cust.email) || '');
                                                    setCustomerPhone((cust === null || cust === void 0 ? void 0 : cust.phone) || '');
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        className: "text-gray-500 font-normal",
                                                        children: "Müşteri Seçin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 21
                                                    }, this),
                                                    customerList.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: c.id,
                                                            className: "text-gray-900 font-semibold",
                                                            children: [
                                                                c.name,
                                                                " ",
                                                                c.company ? "(".concat(c.company, ")") : ''
                                                            ]
                                                        }, c.id, true, {
                                                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                lineNumber: 426,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                        lineNumber: 424,
                                        columnNumber: 17
                                    }, this),
                                    selectedCustomerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 mb-2 text-sm bg-white rounded-lg p-3 border border-gray-200 shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-900",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: "Ad Soyad:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 449,
                                                                columnNumber: 52
                                                            }, this),
                                                            " ",
                                                            customerName
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 21
                                                    }, this),
                                                    customerCompany && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-900",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: "Firma:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 450,
                                                                columnNumber: 72
                                                            }, this),
                                                            " ",
                                                            customerCompany
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 41
                                                    }, this),
                                                    customerEmail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-900",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: "E-posta:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 451,
                                                                columnNumber: 70
                                                            }, this),
                                                            " ",
                                                            customerEmail
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 39
                                                    }, this),
                                                    customerPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-900",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: "Telefon:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 452,
                                                                columnNumber: 70
                                                            }, this),
                                                            " ",
                                                            customerPhone
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                        lineNumber: 452,
                                                        columnNumber: 39
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                lineNumber: 448,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-xs font-bold text-gray-700 mb-1",
                                                                children: "Teklif Geçerlilik Süresi (gün)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 456,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                className: "w-full border px-3 py-2 rounded-lg text-sm text-gray-900",
                                                                value: validityPeriod,
                                                                onChange: (e)=>setValidityPeriod(e.target.value),
                                                                placeholder: "Örn: 15"
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 457,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-xs font-bold text-gray-700 mb-1",
                                                                children: "Teslim Süresi"
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 460,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                className: "w-full border px-3 py-2 rounded-lg text-sm text-gray-900",
                                                                value: deliveryTime,
                                                                onChange: (e)=>setDeliveryTime(e.target.value),
                                                                placeholder: "Örn: 2 hafta"
                                                            }, void 0, false, {
                                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                                lineNumber: 461,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                        lineNumber: 459,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                lineNumber: 454,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-end gap-2 mt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-bold",
                                                onClick: ()=>setShowCustomerModal(false),
                                                children: "Vazgeç"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                lineNumber: 467,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-4 py-2 rounded-lg bg-blue-600 text-white font-bold disabled:opacity-60",
                                                disabled: !selectedCustomerId,
                                                onClick: async ()=>{
                                                    setShowCustomerModal(false);
                                                    const cust = customerList.find((c)=>c.id === selectedCustomerId);
                                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$pdfGenerator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateQuotePDF"])({
                                                        quoteId: projectId,
                                                        customerInfo: {
                                                            name: (cust === null || cust === void 0 ? void 0 : cust.name) || '',
                                                            company: (cust === null || cust === void 0 ? void 0 : cust.company) || '',
                                                            email: (cust === null || cust === void 0 ? void 0 : cust.email) || '',
                                                            phone: (cust === null || cust === void 0 ? void 0 : cust.phone) || ''
                                                        },
                                                        projectDetails: {
                                                            projectDesign: (project === null || project === void 0 ? void 0 : project.name) || "Proje ".concat(projectId),
                                                            projectDescription: ''
                                                        },
                                                        schedule: {
                                                            startDate: '',
                                                            endDate: ''
                                                        },
                                                        conditions: {
                                                            validityPeriod: validityPeriod,
                                                            deliveryTime: deliveryTime
                                                        },
                                                        items: projectProducts.map((p)=>{
                                                            var _p_discount, _p_margin;
                                                            const salesUnit = p.price * (1 - ((_p_discount = p.discount) !== null && _p_discount !== void 0 ? _p_discount : 0) / 100) * (1 + ((_p_margin = p.margin) !== null && _p_margin !== void 0 ? _p_margin : 0) / 100);
                                                            return {
                                                                product: {
                                                                    name: p.name,
                                                                    brand: p.brand,
                                                                    model: p.model,
                                                                    code: p.code
                                                                },
                                                                quantity: p.quantity,
                                                                unitPrice: salesUnit,
                                                                total: salesUnit * p.quantity
                                                            };
                                                        }),
                                                        subtotal: projectProducts.reduce((sum, p)=>{
                                                            var _p_discount, _p_margin;
                                                            return sum + p.price * (1 - ((_p_discount = p.discount) !== null && _p_discount !== void 0 ? _p_discount : 0) / 100) * (1 + ((_p_margin = p.margin) !== null && _p_margin !== void 0 ? _p_margin : 0) / 100) * p.quantity;
                                                        }, 0),
                                                        kdv: 0,
                                                        total: projectProducts.reduce((sum, p)=>{
                                                            var _p_discount, _p_margin;
                                                            return sum + p.price * (1 - ((_p_discount = p.discount) !== null && _p_discount !== void 0 ? _p_discount : 0) / 100) * (1 + ((_p_margin = p.margin) !== null && _p_margin !== void 0 ? _p_margin : 0) / 100) * p.quantity;
                                                        }, 0),
                                                        createdAt: new Date().toISOString()
                                                    });
                                                },
                                                children: "PDF Oluştur"
                                            }, void 0, false, {
                                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                                lineNumber: 468,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                        lineNumber: 466,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                                lineNumber: 422,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                            lineNumber: 421,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/teklif-formu/src/app/projeler/[id]/page.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_s(ProjectDetailPage, "2Qfgm4LpnK7A76NaICSd1Xu/c3o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProjectDetailPage;
var _c;
__turbopack_context__.k.register(_c, "ProjectDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=teklif-formu_src_377671cc._.js.map