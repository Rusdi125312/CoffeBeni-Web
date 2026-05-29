'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Home, BookOpen, Plus, Edit3, Trash2, X, Loader2, Save } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [produkList, setProdukList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: '', asal: '', proses: '', level_roast: '', stok_kg: '', harga: '', deskripsi: '', gambar: ''
  });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data } = await supabase.from('products').select('*');
    if (data) setProdukList(data);
  }

  // FUNGSI HANDLE UPLOAD FILE
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSimpanProduk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = form.gambar;

    try {
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, file);

        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }

      const payload = { 
        name: form.name, asal: form.asal, proses: form.proses, 
        level_roast: form.level_roast, stok_kg: Number(form.stok_kg),
        harga: Number(form.harga), deskripsi: form.deskripsi, gambar: imageUrl 
      };

      if (isEditMode) {
        await supabase.from('products').update(payload).eq('id', editingId);
      } else {
        await supabase.from('products').insert([payload]);
      }
      
      setIsModalOpen(false);
      setFile(null);
      fetchData();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHapusProduk = async (id: number) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      await supabase.from('products').delete().eq('id', id);
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-amber-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation */}
        <nav className="flex items-center justify-between border-b border-amber-900/20 pb-4">
          <button onClick={() => router.push('/admin/login')} className="flex items-center gap-2 text-xs bg-stone-900 px-3 py-2 rounded-xl text-amber-400 hover:bg-stone-800 transition">
            <ArrowLeft className="w-4 h-4" /> Logout Admin
          </button>
          <div className="flex gap-6 text-xs text-amber-100/50">
            <Link href="/" className="hover:text-amber-400 transition flex items-center gap-1"><Home className="w-4 h-4"/> Beranda</Link>
          </div>
        </nav>

        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-black/40 border border-amber-900/20 p-8 rounded-3xl backdrop-blur-md">
          <div>
            <h1 className="text-3xl font-serif font-bold text-amber-50">Manajemen Inventaris</h1>
            <p className="text-xs text-amber-100/60 mt-1">Kelola daftar menu kopi CoffeBeni.</p>
          </div>
          <button onClick={() => { setIsEditMode(false); setForm({name:'', asal:'', proses:'', level_roast:'', stok_kg:'', harga:'', deskripsi:'', gambar:''}); setIsModalOpen(true); }} className="mt-4 sm:mt-0 bg-amber-400 text-stone-950 font-bold text-xs px-6 py-4 rounded-xl flex items-center gap-2 hover:bg-amber-300 transition-all shadow-lg">
            <Plus className="w-4 h-4" /> Tambah Produk Baru
          </button>
        </header>

        {/* Table */}
        <div className="bg-black/30 border border-amber-900/20 rounded-3xl overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left">
            <thead className="bg-amber-950/30 text-amber-500 text-[10px] uppercase tracking-[0.2em]">
              <tr>
                <th className="p-6">Produk</th>
                <th className="p-6">Detail</th>
                <th className="p-6">Harga</th>
                <th className="p-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/10">
              {produkList.map((p) => (
                <tr key={p.id} className="hover:bg-amber-950/10">
                  <td className="p-4 flex items-center gap-4">
                    <img src={p.gambar} className="w-12 h-12 rounded-xl object-cover border border-amber-900/20" />
                    <span className="font-medium text-sm">{p.name}</span>
                  </td>
                  <td className="p-4 text-xs text-amber-100/50">{p.asal} • {p.proses}</td>
                  <td className="p-4 font-mono text-amber-300">Rp {Number(p.harga).toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => { setForm(p); setIsEditMode(true); setEditingId(p.id); setIsModalOpen(true); }} className="p-2 text-amber-500 hover:bg-amber-950 rounded-lg"><Edit3 className="w-4 h-4"/></button>
                      <button onClick={() => handleHapusProduk(p.id)} className="p-2 text-red-400 hover:bg-red-950/20 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleSimpanProduk} className="bg-[#121212] border border-amber-900/30 w-full max-w-lg p-8 rounded-[2rem]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-amber-50">{isEditMode ? 'Edit' : 'Input'} Produk</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-stone-500"><X/></button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Nama Kopi" className="col-span-2 bg-stone-900 p-3 rounded-xl border border-amber-900/20" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input placeholder="Asal" className="bg-stone-900 p-3 rounded-xl border border-amber-900/20" required value={form.asal} onChange={e => setForm({...form, asal: e.target.value})} />
              <input placeholder="Proses" className="bg-stone-900 p-3 rounded-xl border border-amber-900/20" required value={form.proses} onChange={e => setForm({...form, proses: e.target.value})} />
              <input placeholder="Level Roast" className="bg-stone-900 p-3 rounded-xl border border-amber-900/20" required value={form.level_roast} onChange={e => setForm({...form, level_roast: e.target.value})} />
              <input type="number" placeholder="Harga" className="bg-stone-900 p-3 rounded-xl border border-amber-900/20" required value={form.harga} onChange={e => setForm({...form, harga: e.target.value})} />
              <input type="file" onChange={handleFileUpload} className="col-span-2 text-xs text-stone-500 file:bg-stone-800 file:border-0 file:py-2 file:px-4 file:rounded-lg file:text-amber-500" />
            </div>

            <button disabled={loading} type="submit" className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
              {loading ? <Loader2 className="animate-spin"/> : <><Save className="w-4 h-4"/> Simpan</>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}