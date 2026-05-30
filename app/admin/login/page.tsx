'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    setLoading(false);
    
    if (error) {
      alert('Gagal login: ' + error.message);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background yang konsisten dengan halaman utama */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/bg-coffee.jpg')" }} 
      />
      
      {/* Overlay hitam agar teks terbaca jelas */}
      <div className="fixed inset-0 bg-black/70 z-0" />

      {/* Container Utama */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Form Login */}
        <form 
          onSubmit={handleLogin}
          className="bg-white/10 backdrop-blur-xl p-10 rounded-[2rem] border border-white/20 shadow-2xl flex flex-col gap-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-light text-white">
              Admin <span className="font-bold text-amber-500">Access</span>
            </h2>
            <p className="text-stone-300 text-sm">Masuk ke ruang kelola CoffeeBeni</p>
          </div>

          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Alamat Email" 
              required
              className="w-full bg-black/20 border border-white/10 py-3 px-4 rounded-xl text-white placeholder:text-stone-400 focus:border-amber-600 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Kata Sandi" 
              required
              className="w-full bg-black/20 border border-white/10 py-3 px-4 rounded-xl text-white placeholder:text-stone-400 focus:border-amber-600 outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full py-4 rounded-full bg-amber-700/90 text-white font-bold hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-900/50 disabled:opacity-50"
          >
            {loading ? 'Memvalidasi...' : 'Masuk Sekarang'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-stone-400 text-xs">
            © 2026 CoffeeBeni Sukabumi. Semua Hak Dilindungi.
          </p>
          <a 
            href="/" 
            className="text-amber-500 hover:text-amber-400 text-xs mt-2 inline-block transition-colors"
          >
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
}