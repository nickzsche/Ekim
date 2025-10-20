export default function YeniSayfa() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="bg-white/90 rounded-3xl shadow-xl p-10 max-w-2xl w-full border border-blue-100">
        <h1 className="text-4xl font-black text-blue-700 mb-4 text-center">Yeni Başlık</h1>
        <p className="text-lg text-gray-700 text-center mb-6">Bu sayfa için özel bir tasarım ve içerik ekleyebilirsiniz.</p>
        {/* Buraya yeni sayfa içeriği ve tasarımı eklenecek */}
      </div>
    </div>
  );
}
