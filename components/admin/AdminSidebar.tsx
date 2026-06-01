"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  {
    group: "Main",
    items: [
      { label: "Dashboard",  href: "/admin/dashboard", icon: "⊞" },
    ],
  },
  {
    group: "Konten",
    items: [
      { label: "Produk",   href: "/admin/produk",   icon: "🚗" },
      { label: "Artikel",  href: "/admin/artikel",  icon: "📝" },
      { label: "Carousel", href: "/admin/carousel", icon: "🖼" },
    ],
  },
  {
    group: "Sistem",
    items: [
      { label: "User",     href: "/admin/user",     icon: "👤" },
    ],
  },
];

export default function AdminSidebar({ user }: { user: { name: string; role: string } }) {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-zinc-800">
        <p className="text-white font-black text-lg tracking-tighter">
          TOYOTA<span className="text-red-500">ADMIN</span>
        </p>
        <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-0.5">
          Cibubur · Setiajaya
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {MENU.map((group) => (
          <div key={group.group} className="mb-6">
            <p className="text-zinc-600 text-[9px] uppercase tracking-[3px] font-bold px-3 mb-2">
              {group.group}
            </p>
            {group.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-all ${
                    active
                      ? "bg-red-600 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User info */}
      <div className="px-4 py-4 border-t border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-xs font-black">
            {user.name[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user.name}</p>
            <p className="text-zinc-500 text-[10px] capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}