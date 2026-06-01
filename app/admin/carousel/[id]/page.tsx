// ── CAROUSEL FORM ─────────────────────────────────────────────────────────────
// app/admin/carousel/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const EMPTY = { title: "", subtitle: "", imageUrl: "", linkUrl: "", order: 0, isActive: true };

export default function CarouselFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isEdit = id && id !== "baru";

  const [form, setForm]     = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  useEffect(() => {
    if (!isEdit) return;
    fetch(`/api/admin/carousel/${id}`).then((r) => r.json()).then((d) => { if (d.data) setForm(d.data); });
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((f: any) => ({ ...f, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(isEdit ? `/api/admin/carousel/${id}` : "/api/admin/carousel", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, order: Number(form.order) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Gagal menyimpan"); return; }
      router.push("/admin/carousel");
    } catch { setError("Terjadi kesalahan"); }
    finally { setSaving(false); }
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/carousel" className="text-zinc-400 hover:text-white text-sm">← Kembali</Link>
        <h1 className="text-2xl font-black text-white">{isEdit ? "Edit Carousel" : "Carousel Baru"}</h1>
      </div>
      {error && <div className="bg-red-900/40 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        {[
          { name: "title",    label: "Judul *",   placeholder: "Promo Bulan Ini",     required: true  },
          { name: "subtitle", label: "Subtitle",  placeholder: "Deskripsi singkat",   required: false },
          { name: "imageUrl", label: "URL Gambar *", placeholder: "https://...",       required: true  },
          { name: "linkUrl",  label: "URL Link",  placeholder: "https://...",          required: false },
          { name: "order",    label: "Urutan",    placeholder: "0",                   required: false, type: "number" },
        ].map((f) => (
          <div key={f.name}>
            <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">{f.label}</label>
            <input
              name={f.name} value={form[f.name] ?? ""} onChange={handleChange}
              placeholder={f.placeholder} required={f.required} type={f.type || "text"}
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-600"
            />
          </div>
        ))}
        <div className="flex items-center gap-3">
          <input type="checkbox" name="isActive" id="isActive" checked={form.isActive} onChange={handleChange} className="w-4 h-4 accent-red-600" />
          <label htmlFor="isActive" className="text-zinc-300 text-sm">Aktif</label>
        </div>
        {form.imageUrl && (
          <div>
            <p className="text-zinc-400 text-xs mb-2">Preview:</p>
            <img src={form.imageUrl} alt="preview" className="h-28 w-full object-cover rounded-xl" />
          </div>
        )}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl text-sm uppercase tracking-widest transition-colors flex items-center gap-2">
            {saving ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Menyimpan...</> : "Simpan"}
          </button>
          <Link href="/admin/carousel" className="border border-zinc-700 text-zinc-400 hover:text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">Batal</Link>
        </div>
      </form>
    </div>
  );
}