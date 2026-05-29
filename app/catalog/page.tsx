'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link
import { supabase } from '@/lib/supabase';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Catalog() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  // Fungsi untuk handle klik beli ke WA
  const handleBeliWa = (productName: string, price: number) => {
    const phoneNumber = "6285720937430"; // GANTI DENGAN NOMOR WA KAMU
    const message = `Halo BenCoffe, saya ingin memesan kopi *${productName}* seharga Rp ${price.toLocaleString()}. Apakah masih tersedia?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-amber-100 p-6 md:p-12">
      {/* Tombol Back ke Halaman Utama */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/" className="flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
        <h1 className="text-4xl font-serif font-bold text-amber-500">Katalog Kopi</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="bg-stone-900/40 border border-amber-900/20 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all">
            <div className="h-64 overflow-hidden">
              <img src={p.gambar} alt={p.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-bold font-serif mb-2">{p.name}</h2>
              <p className="text-xs text-amber-100/60 mb-4">{p.asal} • {p.proses}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-amber-300">
                  Rp {Number(p.harga).toLocaleString()}
                </span>
                {/* Tombol Beli WA */}
                <button 
                  onClick={() => handleBeliWa(p.name, p.harga)}
                  className="bg-amber-500 text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-amber-400 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Beli
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}