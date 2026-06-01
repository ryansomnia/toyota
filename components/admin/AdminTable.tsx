"use client";

import Link from "next/link";
import { useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (val: any, row: any) => React.ReactNode;
}

interface Props {
  title: string;
  addHref: string;
  columns: Column[];
  data: any[];
  onDelete?: (id: string) => Promise<void>;
  searchPlaceholder?: string;
}

export default function AdminTable({ title, addHref, columns, data, onDelete, searchPlaceholder }: Props) {
  const [search, setSearch]     = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = data.filter((row) =>
    Object.values(row).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus item ini?")) return;
    setDeleting(id);
    try {
      await onDelete?.(id);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-white">{title}</h1>
        <Link
          href={addHref}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl uppercase tracking-widest transition-colors"
        >
          + Tambah
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="search"
          placeholder={searchPlaceholder || "Cari..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-500"
        />
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                {columns.map((col) => (
                  <th key={col.key} className="text-left px-5 py-3.5 text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                    {col.label}
                  </th>
                ))}
                <th className="text-right px-5 py-3.5 text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-12 text-zinc-500 text-sm">
                    Tidak ada data{search ? ` untuk "${search}"` : ""}
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr key={row._id || row.id || i} className="border-b border-zinc-800/50 hover:bg-zinc-800/40 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-3.5 text-zinc-300">
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`${addHref.replace("/baru", "")}/${row._id || row.id}`}
                          className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                          Edit
                        </Link>
                        {onDelete && (
                          <button
                            onClick={() => handleDelete(row._id || row.id)}
                            disabled={deleting === (row._id || row.id)}
                            className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {deleting === (row._id || row.id) ? "..." : "Hapus"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-zinc-800 text-zinc-500 text-xs">
          {filtered.length} dari {data.length} data
        </div>
      </div>
    </div>
  );
}