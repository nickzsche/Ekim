import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-premium border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <Image
                src="/image/49125941466.jpg"
                alt="Ekim Soğutma Logo"
                width={220}
                height={220}
                className="rounded-xl shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {/* Enhanced Navigation Links */}
            <Link 
              href="/customers" 
              className="group relative px-3 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">👥</span>
                <span className="font-bold text-sm text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Müşteriler</span>
              </div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
            </Link>
            
            <Link 
              href="/quotes" 
              className="group relative px-3 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">📋</span>
                <span className="font-bold text-sm text-gray-800 group-hover:text-purple-600 transition-colors duration-300">Teklifler</span>
              </div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
            </Link>

            <Link 
              href="/tedarikciler" 
              className="group relative px-3 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">🏭</span>
                <span className="font-bold text-sm text-gray-800 group-hover:text-orange-600 transition-colors duration-300">Tedarikçiler</span>
              </div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
            </Link>

            <Link 
              href="/projeler" 
              className="group relative px-3 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">🏗️</span>
                <span className="font-bold text-sm text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">Tanımlı Projeler</span>
              </div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
            </Link>
          </nav>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button className="group relative p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              <svg className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}