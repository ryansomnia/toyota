"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm]         = useState({ email: "", password: "" });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-white font-black text-2xl tracking-tighter">
            TOYOTA<span className="text-red-500">ADMIN</span>
          </p>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">
            Panel Admin · Setiajaya Cibubur
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h1 className="text-white font-bold text-xl mb-6">Masuk ke Panel Admin</h1>

          {error && (
            <div className="bg-red-900/40 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="admin@example.com"
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-600"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-widest transition-colors mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </>
              ) : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}