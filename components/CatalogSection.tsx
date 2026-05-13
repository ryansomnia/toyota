"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BADGE_STYLE: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  HOT: "bg-red-100 text-red-600",
  GR: "bg-slate-900 text-white",
  HYBRID: "bg-green-100 text-green-700",
};

export default function CatalogSection() {
  const [cars, setCars] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Semua");
  const [loading, setLoading] = useState(true);
  
  // State untuk Modal
  const [selectedCar, setSelectedCar] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resCars, resCats] = await Promise.all([
          fetch("/data/cars.json"),
          fetch("/data/categories.json"),
        ]);
        const dataCars = await resCars.json();
        const dataCats = await resCats.json();
        setCars(dataCars);
        setCategories(dataCats);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = activeTab === "Semua"
    ? cars
    : cars.filter((car) => categories.find(c => c.id === car.categoryId)?.name === activeTab);

  const waBase = "https://wa.me/6282125061466?text=";

  if (loading) return <div className="py-20 text-center">Memuat Katalog...</div>;

  return (
    <section id="katalog" className="relative py-20 md:py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#fdfdfd] to-[#eef2f7]" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header (Same as before) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-red-600 font-semibold mb-3">Koleksi Mobil</p>
            <h2 className="text-4xl md:text-6xl font-light text-slate-900 leading-tight">
              Temukan Mobil<br />
              <span className="font-semibold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Impian Anda</span>
            </h2>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button onClick={() => setActiveTab("Semua")} className={`px-5 py-2.5 rounded-full text-sm border ${activeTab === "Semua" ? "bg-slate-900 text-white shadow-lg" : "bg-white/70 text-slate-600"}`}>Semua</button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveTab(cat.name)} className={`px-5 py-2.5 rounded-full text-sm border ${activeTab === cat.name ? "bg-slate-900 text-white shadow-lg" : "bg-white/70 text-slate-600"}`}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        // ... (Bagian atas code tetap sama)

{/* Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
  {filtered.map((car) => (
    <div key={car.id} className="group rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white shadow-sm hover:shadow-xl transition-all duration-500">
      
      {/* Image Section */}
      <div className="relative h-52 flex items-center justify-center bg-slate-100 overflow-hidden">
        <img 
          src={car.thumbnailUrl} 
          alt={car.name} 
          className="p-8 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
        />
        {car.label && (
          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${BADGE_STYLE[car.label] || "bg-slate-200"}`}>
            {car.label}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="text-[10px] uppercase tracking-[2px] text-slate-400 mb-2">
          {categories.find(c => c.id === car.categoryId)?.name}
        </div>

        <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">
          {car.fullName}
        </h3>

        {/* Info Singkat */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-2 py-1 rounded bg-slate-50 text-slate-500 text-[10px]">
            {car.variants[0]?.transmission}
          </span>
          <span className="px-2 py-1 rounded bg-slate-50 text-slate-500 text-[10px]">
            {car.variants[0]?.fuel}
          </span>
          <span className="px-2 py-1 rounded bg-slate-50 text-slate-500 text-[10px]">
            {car.variants[0]?.seats} Seats
          </span>
        </div>

        {/* Bagian Bawah: Hanya Tombol Lihat Detail */}
        <div className="pt-4 border-t border-slate-50">
          <button
            onClick={() => setSelectedCar(car)}
            className="w-full flex items-center justify-between group/btn py-3 px-4 rounded-xl bg-slate-50 hover:bg-red-600 transition-all duration-300"
          >
            <span className="text-sm font-semibold text-slate-700 group-hover/btn:text-white transition-colors">
              Lihat Detail & Harga
            </span>
            <div className="p-1 rounded-lg bg-white/0 group-hover/btn:bg-white/20 transition-colors">
              <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

// ... (Sisa Modal tetap sama karena harga tetap ditampilkan di dalam Modal)
      </div>

      {/* --- MODAL DETAIL HARGA --- */}
    // ... (Bagian atas code tetap sama sampai ke bagian Modal)

      {/* --- MODAL DETAIL HARGA & WARNA --- */}
      {selectedCar && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{selectedCar.fullName}</h3>
                <p className="text-sm text-slate-500">Detail Varian & Pilihan Warna</p>
              </div>
              <button onClick={() => setSelectedCar(null)} className="p-2 hover:bg-white rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
              {/* Bagian Pilihan Warna */}
              <div className="p-6 border-b">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Pilihan Warna Tersedia</p>
                <div className="flex flex-wrap gap-4">
                  {selectedCar.colors?.map((color: any) => (
                    <div key={color.id} className="flex flex-col items-center gap-2 group">
                      <div 
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md ring-1 ring-slate-200 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color.hexCode }}
                        title={color.name}
                      />
                      <span className="text-[10px] text-slate-500 font-medium">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabel Harga Varian */}
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Daftar Harga OTR Bogor</p>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 text-[10px] uppercase tracking-wider border-b">
                      <th className="py-3 font-medium">Tipe Varian</th>
                      <th className="py-3 font-medium">Transmisi</th>
                      <th className="py-3 font-medium text-right">Harga</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {selectedCar.variants.map((variant: any) => (
                      variant.prices.map((p: any) => (
                        <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                          <td className="py-4 text-sm font-medium">{p.label}</td>
                          <td className="py-4 text-xs text-slate-500">{variant.transmission}</td>
                          <td className="py-4 text-right font-bold text-red-600 text-sm">
                            Rp {p.price.toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-[10px] text-slate-400 italic">
                  * Harga OTR Bogor dapat berubah sewaktu-waktu.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 flex gap-3">
              <button onClick={() => setSelectedCar(null)} className="flex-1 py-3 rounded-xl border border-slate-200 font-medium text-slate-600 hover:bg-white transition-all">
                Tutup
              </button>
              <a
                href={`${waBase}${encodeURIComponent(`Halo, saya tertarik dengan ${selectedCar.fullName}. Bisa kirimkan simulasi kredit dan info stok warnanya?`)}`}
                target="_blank"
                className="flex-[2] bg-[#25D366] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1ebe5d] shadow-lg shadow-green-200 transition-all active:scale-95"
              >
               HUBUNGI KAMI
              </a>
            </div>
          </div>
        </div>
      )}

// ... (Sisa code)
    </section>
  );
}