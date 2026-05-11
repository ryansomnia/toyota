"use client";

import { useState } from "react";
import Link from "next/link";

const TYPES = ["Semua", "SUV", "MPV", "Sedan", "City Car", "Pickup"];

const CARS = [
  { id: 1, brand: "Toyota", name: "Fortuner GR Sport", type: "SUV", year: 2024, price: 680, fuel: "Diesel", tx: "AT", seats: 7, badge: "hot", emoji: "🚗" },
  { id: 2, brand: "Toyota", name: "Innova Zenix Hybrid", type: "MPV", year: 2024, price: 420, fuel: "Hybrid", tx: "CVT", seats: 7, badge: "new", emoji: "🚙" },
  { id: 3, brand: "Toyota", name: "Raize GR Sport", type: "SUV", year: 2024, price: 270, fuel: "Bensin", tx: "CVT", seats: 5, badge: "promo", emoji: "🚗" },
  { id: 4, brand: "Honda", name: "HR-V 1.5 Turbo", type: "SUV", year: 2024, price: 385, fuel: "Bensin", tx: "CVT", seats: 5, badge: "new", emoji: "🏎️" },
  { id: 5, brand: "Honda", name: "Brio RS Urbanite", type: "City Car", year: 2024, price: 195, fuel: "Bensin", tx: "CVT", seats: 5, badge: "promo", emoji: "🚘" },
  { id: 6, brand: "Mitsubishi", name: "Pajero Sport Dakar", type: "SUV", year: 2023, price: 620, fuel: "Diesel", tx: "AT", seats: 7, badge: "", emoji: "🚐" },
  { id: 7, brand: "Hyundai", name: "Stargazer Prime", type: "MPV", year: 2024, price: 320, fuel: "Bensin", tx: "IVT", seats: 7, badge: "new", emoji: "🛸" },
  { id: 8, brand: "Suzuki", name: "Jimny 5-Door", type: "SUV", year: 2024, price: 340, fuel: "Bensin", tx: "AT", seats: 5, badge: "new", emoji: "🪖" },
];

const BADGE_STYLE: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  hot: "bg-red-100 text-red-600",
  promo: "bg-red-100 text-red-700",
};

const BADGE_LABEL: Record<string, string> = {
  new: "Baru",
  hot: "Hot",
  promo: "Promo",
};

export default function CatalogSection() {
  const [active, setActive] = useState("Semua");

  const filtered =
    active === "Semua"
      ? CARS
      : CARS.filter((c) => c.type === active);

  const waBase = "https://wa.me/6281234567890?text=";

  return (
    <section
      id="katalog"
      className="relative py-20 md:py-28 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#fdfdfd] to-[#eef2f7]" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40" />

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

          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-red-600 transition-colors font-medium"
          >
            Lihat Semua
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActive(type)}
              className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 border ${
                active === type
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                  : "bg-white/70 backdrop-blur border-slate-200 text-slate-600 hover:border-red-600 hover:text-red-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {filtered.map((car) => (
            <div
              key={car.id}
              className="group rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-52 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />

                <span className="text-[90px] group-hover:scale-110 transition-transform duration-500">
                  {car.emoji}
                </span>

                {car.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${BADGE_STYLE[car.badge]}`}
                  >
                    {BADGE_LABEL[car.badge]}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-xs uppercase tracking-[2px] text-slate-400 mb-2">
                  {car.type}
                </div>

                <h3 className="text-xl font-semibold text-slate-900 leading-snug mb-4 group-hover:text-red-600 transition-colors">
                  {car.brand} {car.name}
                </h3>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[car.year, car.tx, car.fuel, `${car.seats} Kursi`].map(
                    (s) => (
                      <span
                        key={String(s)}
                        className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs"
                      >
                        {s}
                      </span>
                    )
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      Rp {car.price.toLocaleString("id-ID")} Jt
                    </div>

                    <div className="text-xs text-slate-400 mt-1">
                      Harga OTR
                    </div>
                  </div>

                  <a
                    href={`${waBase}${encodeURIComponent(
                      `Halo AutoPrima 🙏 Saya tertarik dengan ${car.brand} ${car.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-green-200 transition-all"
                  >
                    Tanya
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}