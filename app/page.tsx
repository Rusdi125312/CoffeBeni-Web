import Link from 'next/link';

export default function Home() {
  return (
    // Gunakan min-h-screen agar konten bisa scroll dan footer tetap di dalam background
    <main className="relative w-full min-h-screen flex flex-col justify-between text-white">
      
      {/* Background Image - Tetap di posisi tetap agar tidak ikut scroll */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/bg-coffee.png')" }}
      />
      <div className="fixed inset-0 bg-black/50 z-0" /> 

      {/* Konten Utama - Beri padding-top agar tidak terlalu ke atas */}
      <div className="relative z-10 w-full max-w-2xl px-6 md:px-20 pt-24 pb-10 text-left">
        <p className="bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent font-bold tracking-widest uppercase mb-2">CoffeeBeni</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Jelajahi Cita Rasa Otentik Coffee Lokal
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10">
          Dari kebun kami di Sukabumi, CoffeeBeni menyajikan kehangatan dan kelezatan 
          specialty coffee terbaik langsung ke cangkir Anda.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-start mb-10">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 w-full md:w-64">
            <h3 className="font-bold">BUDIDAYA MANDIRI</h3>
            <p className="text-sm">Ditanam langsung di kebun sendiri</p>
          </div>
          <div className="bg-white/10  backdrop-blur-md p-4 rounded-xl border border-white/20 w-full md:w-64">
            <h3 className="font-bold hover:text-amber-300">PROSES PASCA PANEN HIGIENIS</h3>
            <p className="text-sm">Disangrai dengan ketelitian tinggi</p>
          </div>
        </div>

        <Link 
          href="/catalog" 
          className="bg-amber-700/90 hover:bg-amber-600 text-white px-10 py-4 rounded-full text-lg font-semibold inline-block"
        >
          Lihat Katalog Untuk Beli →
        </Link>
      </div>

      {/* Footer - Sekarang berada di dalam kontainer main yang flex */}
      <footer className="relative z-10 py-6 px-6 md:px-20 border-t border-white/10">
        <p className="text-stone-400 text-sm">
          &copy; {new Date().getFullYear()} CoffeeBeni Sukabumi. All rights reserved.
        </p>
        
        <Link 
          href="/admin/login" 
          className="absolute bottom-2 right-2 text-[10px] text-stone-600 hover:text-stone-300"
        >
          admin login
        </Link>
      </footer>
    </main>
  );
}