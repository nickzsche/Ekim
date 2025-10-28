'use client';

import { generateQuotePDF, QuotePDFData } from './pdfGenerator';

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

export const generateQuoteHTML = async (data: QuoteHTMLData): Promise<void> => {
  // Direkt PDF indir - HTML'e gerek yok
  const pdfData: QuotePDFData = {
    ...data
  };
  
  await generateQuotePDF(pdfData);
  console.log('✅ PDF direkt indirildi!');
};
