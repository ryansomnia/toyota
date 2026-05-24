"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const BADGE_CFG: Record<string, { bg: string; text: string; label: string }> = {
  NEW:        { bg: "bg-blue-50",    text: "text-blue-600",    label: "Baru" },
  HOT:        { bg: "bg-red-50",     text: "text-red-600",     label: "Hot" },
  GR:         { bg: "bg-zinc-900",   text: "text-white",       label: "GR" },
  HYBRID:     { bg: "bg-emerald-50", text: "text-emerald-700", label: "Hybrid" },
  EV:         { bg: "bg-teal-50",    text: "text-teal-700",    label: "EV" },
  "SUV":      { bg: "bg-zinc-100",   text: "text-zinc-600",    label: "SUV" },
  "CITY CAR": { bg: "bg-violet-50",  text: "text-violet-600",  label: "City Car" },
};

const ITEMS_PER_PAGE = 12;
const WA = "6282125061466";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function fmt(v: number | null | undefined): string | null {
  if (!v) return null;
  const n = Number(String(v).replace(/[^0-9]/g, ""));
  if (!n) return null;
  return "Rp " + n.toLocaleString("id-ID");
}

function waLink(car: any) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(
    `Halo Toyota 👋 Saya tertarik dengan *${car?.fullName}*. Mohon info harga dan stok terkini 🙏`
  )}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON CARD
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-zinc-100 animate-pulse overflow-hidden">
      <div className="h-36 bg-zinc-200" />
      <div className="p-3.5 space-y-2">
        <div className="h-2 bg-zinc-200 rounded w-1/3" />
        <div className="h-3 bg-zinc-200 rounded w-3/4" />
        <div className="h-2 bg-zinc-200 rounded w-1/2" />
        <div className="h-3 bg-zinc-300 rounded w-2/5 mt-3" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────────────────
function CarModal({
  modal,
  onClose,
}: {
  modal: any;
  onClose: () => void;
}) {
  const [activeVariant, setActiveVariant] = useState(0);

  useEffect(() => {
    setActiveVariant(0);
  }, [modal]);

  const v = modal.variants?.[activeVariant] ?? modal.variants?.[0];

  return (
    <div
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center bg-zinc-900/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full sm:max-w-3xl rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="relative shrink-0">
          <div className="bg-gradient-to-b from-zinc-50 to-white flex items-center justify-center px-8 pt-10 pb-4" style={{ minHeight: 180 }}>
            <img
              src={modal.thumbnailUrl || `https://placehold.co/600x360/f4f4f5/a1a1aa?text=${encodeURIComponent(modal.name)}`}
              alt={modal.fullName}
              className="max-h-40 w-auto object-contain drop-shadow-lg"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/600x360/f4f4f5/a1a1aa?text=${encodeURIComponent(modal.name)}`;
              }}
            />
            {modal.label && BADGE_CFG[modal.label] && (
              <span className={`absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${BADGE_CFG[modal.label].bg} ${BADGE_CFG[modal.label].text}`}>
                {BADGE_CFG[modal.label].label}
              </span>
            )}
          </div>

          <div className="px-5 pb-4 border-b border-zinc-100">
            <p className="text-[10px] uppercase tracking-[3px] text-red-500 font-semibold mb-0.5">
              {modal.categoryId?.name ?? "Toyota"}
            </p>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 leading-tight">{modal.fullName}</h2>
                {modal.tagline && (
                  <p className="text-xs text-zinc-400 mt-0.5">{modal.tagline}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-full bg-zinc-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-zinc-500 transition-all text-sm mt-0.5"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto flex-1">
          {/* Variant selector */}
          {modal.variants?.length > 1 && (
            <div className="px-5 pt-4">
              <p className="text-[10px] uppercase tracking-[2px] text-zinc-400 font-medium mb-2">Pilih Varian</p>
              <div className="flex gap-2 flex-wrap">
                {modal.variants.map((vr: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveVariant(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      activeVariant === i
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-400"
                    }`}
                  >
                    {vr.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {v && (
            <div className="px-5 pt-4">
              {/* Spec pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {[v.fuel, v.transmission, v.seats && `${v.seats} Kursi`, v.engineCc && `${v.engineCc}cc`, v.drivetrain]
                  .filter(Boolean)
                  .map((tag: string) => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-zinc-100 text-zinc-600 rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
              </div>

              {/* Price table */}
              {v.prices?.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-[2px] text-zinc-400 font-medium mb-2">Daftar Harga OTR Bogor</p>

                  {/* Mobile */}
                  <div className="sm:hidden flex flex-col divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
                    {v.prices.map((p: any, pi: number) => (
                      <div key={pi} className={`px-4 py-3 ${pi % 2 === 0 ? "bg-white" : "bg-zinc-50/60"}`}>
                        <p className="text-xs font-semibold text-zinc-800 mb-1.5">{p.label}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {["platB", "platF"].map((key, ki) => (
                            <div key={ki}>
                              <p className="text-[9px] text-zinc-400 mb-0.5">Plat {ki === 0 ? "B" : "F"}</p>
                              {p.priceOnRequest ? (
                                <p className="text-xs font-bold text-orange-500">Hubungi Kami</p>
                              ) : (
                                <p className="text-xs font-bold text-zinc-900">
                                  {fmt(p[key]) ?? <span className="text-zinc-300">—</span>}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop */}
                  <div className="hidden sm:block overflow-x-auto rounded-xl border border-zinc-100">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-900 text-white text-[10px] uppercase tracking-wider">
                          <th className="py-3 px-4 font-semibold">Tipe</th>
                          <th className="py-3 px-4 font-semibold text-right">Plat B</th>
                          <th className="py-3 px-4 font-semibold text-right">Plat F</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-50">
                        {v.prices.map((p: any, pi: number) => (
                          <tr key={pi} className={`hover:bg-zinc-50 transition-colors ${pi % 2 !== 0 ? "bg-zinc-50/40" : ""}`}>
                            <td className="py-3 px-4 text-xs font-medium text-zinc-800">{p.label}</td>
                            {["platB", "platF"].map((key, ki) => (
                              <td key={ki} className="py-3 px-4 text-xs font-bold text-right text-zinc-900">
                                {p.priceOnRequest ? (
                                  <span className="text-orange-500 font-semibold">Hubungi Kami</span>
                                ) : (
                                  fmt(p[key]) ?? <span className="text-zinc-300 font-normal">—</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-zinc-400 italic mt-2">* Harga tidak mengikat, dapat berubah sewaktu-waktu.</p>
                </div>
              )}

              {/* Spesifikasi teknis */}
              {v.specs?.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-[2px] text-zinc-400 font-medium mb-2">Spesifikasi Teknis</p>
                  <div className="rounded-xl border border-zinc-100 overflow-hidden">
                    {Object.entries(
                      v.specs.reduce((acc: any, s: any) => {
                        acc[s.category] = acc[s.category] ?? [];
                        acc[s.category].push(s);
                        return acc;
                      }, {})
                    ).map(([cat, specs]: [string, any]) => (
                      <div key={cat}>
                        <div className="bg-zinc-50 px-4 py-2 border-b border-zinc-100">
                          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">{cat}</p>
                        </div>
                        {specs.map((s: any, si: number) => (
                          <div key={si} className={`flex justify-between items-center px-4 py-2.5 border-b border-zinc-50 last:border-0 ${si % 2 === 0 ? "bg-white" : "bg-zinc-50/30"}`}>
                            <span className="text-xs text-zinc-500">{s.specKey}</span>
                            <span className="text-xs font-medium text-zinc-800 text-right ml-4">{s.specValue}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Warna */}
              {modal.colors?.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] uppercase tracking-[2px] text-zinc-400 font-medium mb-2">Pilihan Warna</p>
                  <div className="flex flex-wrap gap-3">
                    {modal.colors.map((c: any) => (
                      <div key={c._id ?? c.name} className="flex flex-col items-center gap-1 group">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow ring-1 ring-zinc-200 group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: c.hexCode ?? "#ccc" }}
                          title={c.name}
                        />
                        <span className="text-[9px] text-zinc-400 text-center max-w-[56px] leading-tight">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="shrink-0 border-t border-zinc-100 p-4 flex gap-2.5 bg-white">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition-all"
          >
            Tutup
          </button>
          <a
            href={waLink(modal)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[2] py-3 rounded-xl bg-[#25D366] hover:bg-[#1fb85a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-green-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.946 7.946 0 01-3.786-.964L4.5 19.5l1.617-3.664a7.93 7.93 0 01-1.046-3.948c0-4.411 3.588-7.999 8-7.999s8 3.588 8 8-3.589 7.991-8.042 7.991z" />
            </svg>
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE CLIENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ProdukClient() {
  const [cars, setCars]       = useState<any[]>([]);
  const [cats, setCats]       = useState<any[]>([]);
  const [tab, setTab]         = useState("Semua");
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [modal, setModal]     = useState<any>(null);
  const [page, setPage]       = useState(1);

  // ── Fetch data ──────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [r1, r2] = await Promise.all([
          fetch("/api/cars?limit=100"),
          fetch("/api/categories"),
        ]);
        if (!r1.ok || !r2.ok) throw new Error("Gagal memuat data");
        const { data: d1 } = await r1.json();
        const { data: d2 } = await r2.json();
        setCars(d1 ?? []);
        setCats(d2 ?? []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Filter + search ─────────────────────────────────────────────
  const filtered = cars
    .filter((c) => tab === "Semua" || (c.categoryId?.name ?? "") === tab)
    .filter((c) =>
      search.trim() === "" ||
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c.name?.toLowerCase().includes(search.toLowerCase())
    );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // ── Modal handlers ──────────────────────────────────────────────
  const openModal = useCallback((car: any) => {
    setModal(car);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    document.body.style.overflow = "";
  }, []);

  // ── Tab change ──────────────────────────────────────────────────
  function changeTab(t: string) {
    setTab(t);
    setPage(1);
    setSearch("");
  }

  // ── Error state ─────────────────────────────────────────────────
  if (error) return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4">
      <p className="text-red-500 mb-4 text-sm">⚠️ {error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors"
      >
        Coba Lagi
      </button>
    </main>
  );

  return (
    <>
      <main className="min-h-screen bg-zinc-50">

        {/* ── HERO / PAGE HEADER ─────────────────────────────────── */}
        <section className="bg-zinc-900 text-white pt-12 pb-10 px-4 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #ef4444 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ef4444 0%, transparent 40%)" }} />

          <div className="max-w-7xl mx-auto relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] text-zinc-500 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-zinc-300 transition-colors">Beranda</Link>
              <span>/</span>
              <span className="text-zinc-300">Produk</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[4px] text-red-500 font-semibold mb-3">
                  Dealer Resmi Toyota · Cibubur & Bekasi
                </p>
                <h1 className="text-3xl md:text-5xl font-light text-white leading-tight">
                  Temukan Mobil<br />
                  <span className="font-bold text-red-500">Toyota Anda</span>
                </h1>
                <p className="text-zinc-400 text-sm mt-3 max-w-md">
                  Harga OTR transparan, spesifikasi lengkap, dan konsultasi gratis langsung via WhatsApp.
                </p>
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-72 shrink-0">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Cari model... (Fortuner, Raize, dll)"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full bg-white text-black placeholder-zinc-500 text-xs pl-10 pr-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTER TABS ────────────────────────────────────────── */}
        <div className="sticky top-0 z-40 bg-white border-b border-zinc-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1.5 overflow-x-auto py-3 scrollbar-none" style={{ scrollbarWidth: "none" }}>
              {["Semua", ...cats.map((c) => c.name)].map((t) => (
                <button
                  key={t}
                  onClick={() => changeTab(t)}
                  className={`flex-none px-4 py-2 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                    tab === t
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  {cats.find((c) => c.name === t)?.icon} {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── GRID AREA ──────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-10">

          {/* Result count */}
          {!loading && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-zinc-400">
                {search
                  ? `${filtered.length} hasil untuk "${search}"`
                  : `${filtered.length} model tersedia`}
              </p>
              {search && (
                <button
                  onClick={() => { setSearch(""); setPage(1); }}
                  className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Hapus pencarian ✕
                </button>
              )}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-zinc-500 text-sm font-medium">Tidak ada mobil ditemukan</p>
              <p className="text-zinc-400 text-xs mt-1">Coba kata kunci lain atau pilih kategori berbeda</p>
              <button
                onClick={() => { setSearch(""); setTab("Semua"); setPage(1); }}
                className="mt-4 px-5 py-2 bg-zinc-900 text-white text-xs font-medium rounded-xl hover:bg-zinc-700 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Car grid */}
          {!loading && filtered.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {paginated.map((car) => {
                  const badge = BADGE_CFG[car.label ?? ""];
                  const sp    = fmt(car.startingPrice);
                  const fv    = car.variants?.[0];

                  return (
                    <button
                      key={car._id}
                      onClick={() => openModal(car)}
                      className="group text-left bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:border-zinc-300 hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      {/* Image */}
                      <div className="relative bg-zinc-50 flex items-center justify-center overflow-hidden" style={{ height: 148 }}>
                        <img
                          src={car.thumbnailUrl || `https://placehold.co/400x280/f4f4f5/a1a1aa?text=${encodeURIComponent(car.name)}`}
                          alt={car.fullName}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/400x280/f4f4f5/a1a1aa?text=${encodeURIComponent(car.name)}`;
                          }}
                        />
                        {badge && (
                          <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${badge.bg} ${badge.text}`}>
                            {badge.label}
                          </span>
                        )}
                      </div>

                      {/* Body */}
                      <div className="p-3.5">
                        <p className="text-[9px] uppercase tracking-[2px] text-zinc-400 mb-1">
                          {car.categoryId?.name ?? "Toyota"}
                        </p>
                        <h2 className="text-sm font-semibold text-zinc-900 leading-snug mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                          {car.fullName}
                        </h2>

                        {/* Spec pills */}
                        {fv && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {[fv.fuel, fv.transmission, fv.seats && `${fv.seats} kursi`]
                              .filter(Boolean)
                              .map((tag: string) => (
                                <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                                  {tag}
                                </span>
                              ))}
                          </div>
                        )}

                        {/* Price + CTA */}
                        <div className="border-t border-zinc-50 pt-2.5 flex items-end justify-between gap-1">
                          <div>
                            {sp ? (
                              <>
                                <p className="text-[9px] text-zinc-400">Mulai dari</p>
                                <p className="text-xs font-bold text-zinc-900">{sp}</p>
                              </>
                            ) : (
                              <p className="text-xs font-medium text-red-500">Hubungi Kami</p>
                            )}
                          </div>
                          <span className="text-[9px] text-red-500 font-medium flex items-center gap-0.5 shrink-0 group-hover:gap-1 transition-all">
                            Detail
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1.5 mt-10 flex-wrap">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-lg border border-zinc-200 text-zinc-500 text-xs disabled:opacity-30 hover:border-zinc-400 transition-all flex items-center justify-center"
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      onClick={() => setPage(pg)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                        pg === page
                          ? "bg-zinc-900 text-white"
                          : "border border-zinc-200 text-zinc-500 hover:border-zinc-400"
                      }`}
                    >
                      {pg}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="w-8 h-8 rounded-lg border border-zinc-200 text-zinc-500 text-xs disabled:opacity-30 hover:border-zinc-400 transition-all flex items-center justify-center"
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* ── BOTTOM CTA STRIP ───────────────────────────────────── */}
        <section className="bg-zinc-900 text-white py-12 px-4 text-center">
          <p className="text-[11px] uppercase tracking-[4px] text-red-500 font-semibold mb-3">Butuh Bantuan?</p>
          <h2 className="text-2xl font-bold mb-2">Tidak yakin pilih model mana?</h2>
          <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
            Konsultasikan kebutuhan dan budget kamu langsung dengan sales kami. Gratis, tanpa tekanan.
          </p>
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent("Halo Toyota 👋 Saya butuh bantuan memilih mobil yang tepat untuk saya 🙏")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb85a] text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-green-900/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.946 7.946 0 01-3.786-.964L4.5 19.5l1.617-3.664a7.93 7.93 0 01-1.046-3.948c0-4.411 3.588-7.999 8-7.999s8 3.588 8 8-3.589 7.991-8.042 7.991z" />
            </svg>
            Konsultasi via WhatsApp
          </a>
        </section>
      </main>

      {/* Modal */}
      {modal && <CarModal modal={modal} onClose={closeModal} />}
    </>
  );
}