'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert('Gagal login: ' + error.message);
    } else {
      router.push('/admin/dashboard'); // Arahkan ke dashboard jika sukses
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 px-4">
      <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
        <input 
          type="email" 
          placeholder="Email Admin" 
          className="w-full bg-stone-800 p-3 mb-4 rounded text-white"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full bg-stone-800 p-3 mb-4 rounded text-white"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-amber-700 py-3 rounded text-white font-bold">Login</button>
      </form>
    </div>
  );
}