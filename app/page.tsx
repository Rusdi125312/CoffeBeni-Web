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
        <p className="font-bold tracking-widest uppercase text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
  CoffeeBeni
</p>
      <h1 className="text-4xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
  Jelajahi Cita Rasa <br className="hidden md:block" /> 
  <span className="text-amber-500 italic">Otentik</span> Coffee Lokal
</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10">
          Dari kebun kami di Sukabumi, CoffeeBeni menyajikan kehangatan dan kelezatan 
          specialty coffee terbaik langsung ke cangkir Anda.
        </p>

              <div className="flex flex-col md:flex-row gap-6 justify-start mb-10">
          {/* Card 1 */}
          <div className="group relative bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 w-full md:w-72 transition-all duration-300 hover:bg-white/10 hover:border-amber-500/50 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <h3 className="font-bold text-lg mb-2 group-hover:text-amber-300 transition-colors">BUDIDAYA MANDIRI</h3>
            <p className="text-sm text-gray-300">Ditanam dan dirawat langsung dari kebun kopi sendiri dengan sepenuh hati.</p>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 w-full md:w-72 transition-all duration-300 hover:bg-white/10 hover:border-amber-500/50 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <h3 className="font-bold text-lg mb-2 group-hover:text-amber-300 transition-colors">PROSES HIGIENIS</h3>
            <p className="text-sm text-gray-300">Pasca panen yang teliti dan disangrai dengan standar kualitas tinggi.</p>
          </div>
        </div>

        <Link 
          href="/catalog" 
          className="group flex items-center gap-2 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-[0_4px_14px_0_rgba(180,120,40,0.39)] hover:shadow-[0_6px_20px_rgba(180,120,40,0.23)] hover:-translate-y-0.5">
          Lihat Katalog Untuk Beli
          <span className="group-hover:translate-x-1 transition-transform duration-300 opacity-70">→</span>
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