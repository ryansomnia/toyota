// import { connectDB } from "@/lib/db";
// import { User } from "@/lib/models/User";
// import { Artikel, Carousel } from "@/lib/models/Content";
// import Link from "next/link";

// async function getStats() {
//   await connectDB();
//   const [totalUser, totalArtikel, totalCarousel] = await Promise.all([
//     User.countDocuments(),
//     Artikel.countDocuments(),
//     Carousel.countDocuments({ isActive: true }),
//   ]);
//   const artikelPublished = await Artikel.countDocuments({ status: "published" });
//   return { totalUser, totalArtikel, artikelPublished, totalCarousel };
// }

// export default async function DashboardPage() {
//   const stats = await getStats();

//   const STAT_CARDS = [
//     { label: "Total User",          value: stats.totalUser,        icon: "👤", href: "/admin/user",     color: "border-blue-500/30 bg-blue-500/5"    },
//     { label: "Total Artikel",       value: stats.totalArtikel,     icon: "📝", href: "/admin/artikel",  color: "border-emerald-500/30 bg-emerald-500/5" },
//     { label: "Artikel Published",   value: stats.artikelPublished, icon: "✅", href: "/admin/artikel",  color: "border-green-500/30 bg-green-500/5"  },
//     { label: "Carousel Aktif",      value: stats.totalCarousel,    icon: "🖼", href: "/admin/carousel", color: "border-purple-500/30 bg-purple-500/5" },
//   ];

//   const QUICK_ACTIONS = [
//     { label: "Tambah Produk",   href: "/admin/produk/baru",   icon: "🚗" },
//     { label: "Tulis Artikel",   href: "/admin/artikel/baru",  icon: "📝" },
//     { label: "Tambah Carousel", href: "/admin/carousel/baru", icon: "🖼" },
//     { label: "Tambah User",     href: "/admin/user/baru",     icon: "👤" },
//   ];

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-2xl font-black text-white">Dashboard</h1>
//         <p className="text-zinc-400 text-sm mt-1">Overview panel admin Toyota Cibubur</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {STAT_CARDS.map((s) => (
//           <Link
//             key={s.label}
//             href={s.href}
//             className={`border rounded-2xl p-5 hover:scale-[1.02] transition-transform ${s.color}`}
//           >
//             <div className="text-2xl mb-3">{s.icon}</div>
//             <p className="text-3xl font-black text-white">{s.value}</p>
//             <p className="text-zinc-400 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
//           </Link>
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
//         <h2 className="text-white font-bold mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//           {QUICK_ACTIONS.map((a) => (
//             <Link
//               key={a.label}
//               href={a.href}
//               className="flex flex-col items-center gap-2 p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors text-center"
//             >
//               <span className="text-2xl">{a.icon}</span>
//               <span className="text-xs text-zinc-300 font-medium">{a.label}</span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }