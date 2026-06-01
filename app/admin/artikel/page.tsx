"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/AdminTable";

export default function ArtikelAdminPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/artikel")
      .then((r) => r.json())
      .then((d) => setData(d.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    await fetch(`/api/admin/artikel/${id}`, { method: "DELETE" });
    setData((prev) => prev.filter((r) => r._id !== id));
  }

  if (loading) return <div className="text-zinc-400 text-sm">Memuat...</div>;

  return (
    <AdminTable
      title="Artikel"
      addHref="/admin/artikel/baru"
      searchPlaceholder="Cari judul artikel..."
      data={data}
      onDelete={handleDelete}
      columns={[
        { key: "title",  label: "Judul" },
        { key: "status", label: "Status", render: (v) => (
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
            v === "published" ? "bg-green-900/50 text-green-400" : "bg-zinc-700 text-zinc-400"
          }`}>{v}</span>
        )},
        { key: "views",  label: "Views", render: (v) => `${v ?? 0}x` },
        { key: "createdAt", label: "Dibuat", render: (v) => new Date(v).toLocaleDateString("id-ID") },
      ]}
    />
  );
}