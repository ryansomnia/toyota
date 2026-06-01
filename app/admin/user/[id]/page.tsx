"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const EMPTY = { name: "", email: "", password: "", role: "editor", isActive: true };

export default function UserFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isEdit = id && id !== "baru";

  const [form, setForm]     = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  useEffect(() => {
    if (!isEdit) return;
    fetch(`/api/admin/user/${id}`).then((r) => r.json()).then((d) => {
      if (d.data) setForm({ ...d.data, password: "" });
    });
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
      const body: any = { ...form };
      if (isEdit && !body.password) delete body.password; // jangan kirim password kosong saat edit
      const res = await fetch(isEdit ? `/api/admin/user/${id}` : "/api/admin/user", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Gagal menyimpan"); return; }
      router.push("/admin/user");
    } catch { setError("Terjadi kesalahan"); }
    finally { setSaving(false); }
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/user" className="text-zinc-400 hover:text-white text-sm">← Kembali</Link>
        <h1 className="text-2xl font-black text-white">{isEdit ? "Edit User" : "User Baru"}</h1>
      </div>
      {error && <div className="bg-red-900/40 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        {[
          { name: "name",     label: "Nama Lengkap *", placeholder: "Daniel Sinaga", required: true, type: "text"     },
          { name: "email",    label: "Email *",        placeholder: "admin@example.com", required: true, type: "email" },
          { name: "password", label: isEdit ? "Password Baru (kosongkan jika tidak diubah)" : "Password *",
            placeholder: "••••••••", required: !isEdit, type: "password" },
        ].map((f) => (
          <div key={f.name}>
            <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">{f.label}</label>
            <input
              name={f.name} value={form[f.name] ?? ""} onChange={handleChange}
              placeholder={f.placeholder} required={f.required} type={f.type}
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-600"
            />
          </div>
        ))}
        <div>
          <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">Role</label>
          <select name="role" value={form.role} onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-red-500">
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" name="isActive" id="isActive" checked={form.isActive} onChange={handleChange} className="w-4 h-4 accent-red-600" />
          <label htmlFor="isActive" className="text-zinc-300 text-sm">User Aktif</label>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl text-sm uppercase tracking-widest transition-colors flex items-center gap-2">
            {saving ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Menyimpan...</> : "Simpan"}
          </button>
          <Link href="/admin/user" className="border border-zinc-700 text-zinc-400 hover:text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">Batal</Link>
        </div>
      </form>
    </div>
  );
}