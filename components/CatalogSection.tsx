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
        {/* Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
  {paginatedCars.map((car) => {
    // Cari image utama
    const primaryImage =
    car.images?.find((img: any) => img.isPrimary === true);
  
    const imageSrc =
    car.thumbnailUrl &&
    car.thumbnailUrl !== ""
      ? car.thumbnailUrl
      : "https://placehold.co/600x400?text=Toyota";

    const firstVariant = car.variants?.[0];

    return (
      <div
        key={car._id}
        className="group rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white shadow-sm hover:shadow-xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative h-52 flex items-center justify-center bg-slate-100 overflow-hidden">
        <img
src={car.thumbnailUrl}
  alt={car.fullName}
  className="p-8 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
  loading="lazy"
  onError={(e) => {
    const target = e.currentTarget;

    // cegah infinite loop
    target.onerror = null;

    // fallback terakhir
    target.src = "https://placehold.co/600x400?text=Toyota";
  }}
/>
          {/* Badge */}
          {car.label && (
            <span
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                BADGE_STYLE[car.label] ??
                "bg-slate-200 text-slate-600"
              }`}
            >
              {car.label}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <div className="text-[10px] uppercase tracking-[2px] text-slate-400 mb-2">
            {car.categoryId?.name ?? "Toyota"}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-red-600 transition-colors leading-tight">
            {car.fullName}
          </h3>

          {/* Specs */}
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

          {/* Price */}
          {car.startingPrice && (
            <p className="text-[11px] text-slate-400 mb-4">
              {car.priceLabel}{" "}
              <span className="font-bold text-slate-700 text-sm">
                Rp{" "}
                {Number(car.startingPrice).toLocaleString("id-ID")}
              </span>
            </p>
          )}

          {/* CTA */}
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
                  onClick={() =>
                    setCurrentPage((p) => Math.max(p - 1, 1))
                  }
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
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(p + 1, totalPages)
                    )
                  }
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

      {/* Modal tetap sama */}
      {selectedCar && (
        <div
          className="fixed inset-0 z-[99] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setSelectedCar(null)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* isi modal kamu tetap */}
          </div>
        </div>
      )}
    </section>
  );
}