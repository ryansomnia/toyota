import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

// ─── Connection Pool ────────────────────────────────────────────
declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

function createPool() {
  return mysql.createPool({
    host:               process.env.DB_HOST     ?? "localhost",
    port:               Number(process.env.DB_PORT ?? 3306),
    user:               process.env.DB_USER     ?? "root",
    password:           process.env.DB_PASSWORD ?? "",
    database:           process.env.DB_NAME     ?? "autoprima",
    waitForConnections: true,
    connectionLimit:    10,
    queueLimit:         0,
    charset:            "utf8mb4",
    timezone:           "+07:00",       // WIB
  });
}

// Singleton pattern untuk Next.js
const pool = global._mysqlPool ?? createPool();
if (process.env.NODE_ENV !== "production") global._mysqlPool = pool;

export default pool;

// ─── Typed Query Helpers ────────────────────────────────────────

/**
 * Eksekusi query SQL (Multiple rows)
 */
export async function query<T = unknown>(
  sql: string,
  params?: any[] // Menggunakan any[] agar tidak error unknown di library mysql2
): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

/**
 * Eksekusi query SQL (Single row)
 */
export async function queryOne<T = unknown>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  const rows = await query<T[]>(sql, params);
  return rows[0] ?? null;
}

// ─── Transaction Helper ─────────────────────────────────────────

/**
 * Menjalankan operasi database dalam satu transaksi
 */
export async function withTransaction<T>(
  callback: (conn: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await callback(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

// ─── API Response Helpers ───────────────────────────────────────

/**
 * Response sukses standar
 */
export function ok(data: any, status = 200) {
  return NextResponse.json(
    {
      success: true,
      ...data,
    },
    { status }
  );
}

/**
 * Response error standar
 */
export function err(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

// ─── Interfaces ────────────────────────────────────────────────

export interface KreditApplication {
  id?: number;
  lead_id: number;
  nama: string;
  phone: string;
  email?: string;
  car_id?: number;
  harga_mobil: number;
  dp_persen: number;
  dp_amount: number;
  tenor_bulan: number;
  cicilan_estimasi: number;
  bank_pilihan?: string;
  created_at?: string;
}