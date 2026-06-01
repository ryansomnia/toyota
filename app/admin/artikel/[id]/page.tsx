"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const EMPTY = { title: "", slug: "", excerpt: "", content: "", coverImage: "", tags: "", status: "draft" };

export default function ArtikelFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isEdit = id && id !== "baru";

  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    fetch(`/api/admin/artikel/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setForm({ ...d.data, tags: (d.data.tags || []).join(", ") });
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Auto-generate slug dari title
    if (name === "title" && !isEdit) {
      setForm((f) => ({
        ...f,
        title: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
      const res = await fetch(
        isEdit ? `/api/admin/artikel/${id}` : "/api/admin/artikel",
        { method: isEdit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
      );
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Gagal menyimpan"); return; }
      router.push("/admin/artikel");
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-zinc-400 text-sm">Memuat...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/artikel" className="text-zinc-400 hover:text-white text-sm transition-colors">← Kembali</Link>
        <h1 className="text-2xl font-black text-white">{isEdit ? "Edit Artikel" : "Artikel Baru"}</h1>
      </div>

      {error && <div className="bg-red-900/40 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <p className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">Informasi Artikel</p>

          {[
            { name: "title",       label: "Judul",        placeholder: "Judul artikel..." },
            { name: "slug",        label: "Slug URL",     placeholder: "judul-artikel" },
            { name: "coverImage",  label: "URL Foto Cover", placeholder: "https://..." },
            { name: "tags",        label: "Tags",         placeholder: "toyota, promo, tips (pisahkan dengan koma)" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">{field.label}</label>
              <input
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-600"
              />
            </div>
          ))}

          <div>
            <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={2}
              placeholder="Ringkasan singkat artikel..."
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-600 resize-none"
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">Konten</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={12}
              placeholder="Isi artikel..."
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-600 resize-y font-mono"
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl text-sm uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            {saving ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Menyimpan...</> : "Simpan"}
          </button>
          <Link href="/admin/artikel" className="border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 font-bold px-6 py-3 rounded-xl text-sm transition-colors">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}