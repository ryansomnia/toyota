"use client";

import { useState, useEffect } from "react";

const BADGE_STYLE: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  HOT: "bg-red-100 text-red-600",
  GR: "bg-slate-900 text-white",
  HYBRID: "bg-green-100 text-green-700",
  EV: "bg-teal-100 text-teal-700",
};

const ITEMS_PER_PAGE = 8;

export default function CatalogSection() {
  const [cars, setCars] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<any>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [resCars, resCats] = await Promise.all([
          fetch("/api/cars?limit=50"),
          fetch("/api/categories"),
        ]);

        if (!resCars.ok) throw new Error("Gagal mengambil data mobil");
        if (!resCats.ok) throw new Error("Gagal mengambil data kategori");

        const { data: dataCars } = await resCars.json();
        const { data: dataCats } = await resCats.json();

        setCars(dataCars);
        setCategories(dataCats);
      } catch (err: any) {
        console.error("Gagal mengambil data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter kategori
  const filtered =
    activeTab === "Semua"
      ? cars
      : cars.filter((car) => {
          const cat = car.categoryId;
          return (cat?.name ?? "") === activeTab;
        });

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedCars = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const waBase = "https://wa.me/6282125061466?text=";

  // Loading
  if (loading) {
    return (
      <section id="katalog" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl bg-slate-100 animate-pulse h-80"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section id="katalog" className="py-20 px-4 text-center">
        <p className="text-red-500 mb-3">⚠️ {error}</p>

        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm"
        >
          Coba Lagi
        </button>
      </section>
    );
  }

  return (
    <section
      id="katalog"
      className="relative py-20 md:py-28 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#fdfdfd] to-[#eef2f7]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-red-600 font-semibold mb-3">
              Koleksi Mobil
            </p>

            <h2 className="text-4xl md:text-6xl font-light text-slate-900 leading-tight">
              Temukan Mobil
              <br />
              <span className="font-semibold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Impian Anda
              </span>
            </h2>
          </div>

          <p className="text-slate-400 text-sm md:text-right">
            {filtered.length} unit tersedia
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => {
              setActiveTab("Semua");
              setCurrentPage(1);
            }}
            className={`px-5 py-2.5 rounded-full text-sm border transition-all ${
              activeTab === "Semua"
                ? "bg-slate-900 text-white shadow-lg border-slate-900"
                : "bg-white/70 text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            Semua
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => {
                setActiveTab(cat.name);
                setCurrentPage(1);
              }}
              className={`px-5 py-2.5 rounded-full text-sm border transition-all ${
                activeTab === cat.name
                  ? "bg-slate-900 text-white shadow-lg border-slate-900"
                  : "bg-white/70 text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Empty */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            Tidak ada mobil di kategori ini
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {paginatedCars.map((car) => {
                const firstVariant = car.variants?.[0];
                
                // Amankan starting price dari karakter non-angka
                const cleanStartingPrice = car.startingPrice 
                  ? String(car.startingPrice).replace(/[^0-9]/g, "") 
                  : "";

                return (
                  <div
                    key={car._id}
                    className="group rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white shadow-sm hover:shadow-xl transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-52 flex items-center justify-center bg-slate-100 overflow-hidden">
                      <img
                        src={car.thumbnailUrl || "https://placehold.co/600x400?text=Toyota"}
                        alt={car.fullName}
                        className="p-8 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = "https://placehold.co/600x400?text=Toyota";
                        }}
                      />
                      {car.label && (
                        <span
                          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            BADGE_STYLE[car.label] ?? "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {car.label}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="text-[10px] uppercase tracking-[2px] text-slate-400 mb-2">
                        {car.categoryId?.name ?? "Toyota"}
                      </div>

                      <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-red-600 transition-colors leading-tight">
                        {car.fullName}
                      </h3>

                      {firstVariant && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {firstVariant.transmission && (
                            <span className="px-2 py-1 rounded bg-slate-50 text-slate-500 text-[10px]">
                              {firstVariant.transmission}
                            </span>
                          )}
                          {firstVariant.fuel && (
                            <span className="px-2 py-1 rounded bg-slate-50 text-slate-500 text-[10px]">
                              {firstVariant.fuel}
                            </span>
                          )}
                          {firstVariant.seats && (
                            <span className="px-2 py-1 rounded bg-slate-50 text-slate-500 text-[10px]">
                              {firstVariant.seats} Seats
                            </span>
                          )}
                        </div>
                      )}

                      {cleanStartingPrice && (
                        <p className="text-[11px] text-slate-400 mb-4">
                          {car.priceLabel}{" "}
                          <span className="font-bold text-slate-700 text-sm">
                            Rp {Number(cleanStartingPrice).toLocaleString("id-ID")}
                          </span>
                        </p>
                      )}

                      <div className="pt-3 border-t border-slate-50">
                        <button
                          onClick={() => setSelectedCar(car)}
                          className="w-full flex items-center justify-between group/btn py-3 px-4 rounded-xl bg-slate-50 hover:bg-red-600 transition-all duration-300"
                        >
                          <span className="text-sm font-semibold text-slate-700 group-hover/btn:text-white transition-colors">
                            Lihat Detail & Harga
                          </span>
                          <svg
                            className="w-5 h-5 text-slate-400 group-hover/btn:text-white transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border text-sm disabled:opacity-40"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                        currentPage === page
                          ? "bg-slate-900 text-white"
                          : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL MINIMALIS */}
      {selectedCar && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
          onClick={() => setSelectedCar(null)}
        >
          <div
            className="relative bg-white w-full max-w-4xl rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-slate-700 hover:bg-red-500 hover:text-white transition-all"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="relative bg-gradient-to-br from-slate-100 via-slate-50 to-white p-6 md:p-8 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40" />
              {selectedCar?.label && (
                <span
                  className={`absolute top-5 left-5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    BADGE_STYLE[selectedCar.label] ?? "bg-slate-200 text-slate-700"
                  }`}
                >
                  {selectedCar.label}
                </span>
              )}
              <img
                src={selectedCar?.thumbnailUrl || "https://placehold.co/1000x600?text=Toyota"}
                alt={selectedCar?.fullName}
                className="relative z-10 w-full h-[220px] md:h-[280px] object-contain drop-shadow-xl"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/1000x600?text=Toyota";
                }}
              />
            </div>

            {/* BODY */}
            <div className="p-6 md:p-10 pt-4">
              <div className="text-xs uppercase tracking-[4px] text-red-500 font-semibold mb-2">
                {selectedCar?.categoryId?.name || "Toyota"}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2">
                {selectedCar?.fullName}
              </h2>

              {selectedCar?.tagline && (
                <p className="text-sm md:text-base text-slate-500 mb-6">{selectedCar.tagline}</p>
              )}

              {/* MINIMALIST TABLE PRICE + SPECIFICATIONS */}
              {selectedCar?.variants?.length > 0 && (
                <div className="mb-8">
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                    <table className="w-full text-left border-collapse min-w-[650px]">
                      <thead>
                        <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                          <th className="py-4 px-5 font-semibold w-[45%]">Varian & Spesifikasi</th>
                          <th className="py-4 px-5 font-semibold text-center bg-slate-950 w-[27.5%]">Harga Plat B</th>
                          <th className="py-4 px-5 font-semibold text-center bg-red-950 w-[27.5%]">Harga Plat F</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {selectedCar.variants.map((variant: any, idx: number) => {
                          
                          // AMBIL DATA DARI SEED: HARGA DIKEMAS DALAM SATU OBJEK TUNGGAL
                          console.log(variant.prices[0])
                          const priceObj = variant.prices?.[0];
                          const rawPriceA = priceObj?.platB ?? priceObj?.price; // fallback ke .price jika key-nya berubah
                          const rawPriceB = priceObj?.platF;
                          const isPriceOnRequest = priceObj?.priceOnRequest;

                          // FUNGSI RENDER AMAN TANPA NaN
                          const renderPrice = (val: any) => {
                            if (isPriceOnRequest) {
                              return <span className="text-orange-500 font-semibold">Hubungi Kami</span>;
                            }
                            if (val === undefined || val === null || val === "") {
                              return <span className="text-slate-400 font-normal">-</span>;
                            }

                            // Bersihkan karakter aneh jika data dikirim dalam bentuk string berformat
                            const cleaned = String(val).replace(/[^0-9]/g, "");
                            if (!cleaned) return <span className="text-slate-400 font-normal">-</span>;

                            return `Rp ${Number(cleaned).toLocaleString("id-ID")}`;
                          };

                          return (
                            <tr key={idx} className="hover:bg-slate-50/60 transition-colors align-top">
                              {/* KOLOM VARIAN + SPESIFIKASI GABUNGAN */}
                              <td className="py-4 px-5 text-slate-900">
                                <span className="font-bold text-base block text-slate-950">{variant.name}</span>
                                
                                {/* Quick Mini Badges */}
                                <div className="flex flex-wrap gap-1 mt-1.5 mb-2.5">
                                  {variant.transmission && (
                                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                                      {variant.transmission}
                                    </span>
                                  )}
                                  {variant.fuel && (
                                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                                      {variant.fuel}
                                    </span>
                                  )}
                                  {variant.seats && (
                                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                                      {variant.seats} Seats
                                    </span>
                                  )}
                                  {variant.engineCc && (
                                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                                      {variant.engineCc}cc
                                    </span>
                                  )}
                                </div>

                                {/* Detail Specs List */}
                                {variant.specs?.length > 0 && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5 pt-2 border-t border-slate-100 text-[11px]">
                                    {variant.specs.map((spec: any, sIndex: number) => (
                                      <div key={sIndex} className="flex justify-between sm:justify-start sm:gap-1.5 text-slate-500">
                                        <span className="text-slate-400">{spec.specKey}:</span>
                                        <span className="font-medium text-slate-700">{spec.specValue}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </td>

                              {/* HARGA PLAT A */}
                              <td className="py-4 px-5 text-center font-semibold text-slate-700 bg-slate-50/30 whitespace-nowrap pt-5">
                                {renderPrice(rawPriceA)}
                              </td>

                              {/* HARGA PLAT B */}
                              <td className="py-4 px-5 text-center font-bold text-slate-700 bg-red-50/5 whitespace-nowrap pt-5">
                                {renderPrice(rawPriceB)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 italic">
                    * Harga OTR tertera tidak mengikat dan dapat berubah sewaktu-waktu.
                  </p>
                </div>
              )}

              {/* CTA BUTTONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`${waBase}${encodeURIComponent(
                    `Halo Toyota 👋 Saya tertarik dengan ${selectedCar?.fullName}, boleh minta info simulasi kredit OTR terbaru?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all shadow-lg hover:shadow-green-200 text-center text-sm"
                >
                  <span>Chat WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedCar(null)}
                  className="py-3.5 rounded-2xl border border-slate-300 hover:bg-slate-100 font-bold text-slate-700 transition text-sm"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}