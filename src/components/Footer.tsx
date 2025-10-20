import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Image
              src="/image/49125941466.jpg"
              alt="Ekim Soğutma"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-black text-gray-900">Ekim Soğutma</span>
          </div>
          <p className="font-bold text-gray-800">Profesyonel soğutma sistemleri ve çözümleri</p>
          <p className="text-sm font-semibold text-gray-700 mt-2">© 2024 Ekim Soğutma. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}