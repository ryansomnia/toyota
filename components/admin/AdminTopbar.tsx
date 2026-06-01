"use client";

import { useRouter } from "next/navigation";

export default function AdminTopbar({ user }: { user: { name: string; email: string } }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
      <p className="text-zinc-400 text-sm">
        Selamat datang, <span className="text-white font-semibold">{user.name}</span>
      </p>
      <button
        onClick={handleLogout}
        className="text-xs text-zinc-400 hover:text-red-400 transition-colors font-medium uppercase tracking-wider"
      >
        Logout →
      </button>
    </header>
  );
}