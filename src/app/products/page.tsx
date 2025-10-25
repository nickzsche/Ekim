"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/tedarikciler');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="text-6xl mb-4">🔄</div>
        <p className="text-xl text-gray-600">Tedarikçiler sayfasına yönlendiriliyorsunuz...</p>
      </div>
    </div>
  );
}
