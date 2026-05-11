import mysql from "mysql2/promise";

// ─── Connection Pool ────────────────────────────────────────────
// Pool dibuat sekali dan dipakai ulang di semua API routes.
// Di Next.js App Router, gunakan singleton pattern agar tidak
// membuat koneksi baru di setiap hot-reload development.

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}
console.log(process.env.DB_PASSWORD);
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


// Singleton: satu pool untuk seluruh app
const pool = global._mysqlPool ?? createPool();
if (process.env.NODE_ENV !== "production") global._mysqlPool = pool;

export default pool;

// ─── Typed query helper ─────────────────────────────────────────
export async function query<T = unknown>(
  sql: string,
  params?: unknown[]
): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

// ─── Single-row helper ──────────────────────────────────────────
export async function queryOne<T = unknown>(
  sql: string,
  params?: unknown[]
): Promise<T | null> {
  const rows = await query<T[]>(sql, params);
  return rows[0] ?? null;
}

// ─── Transaction helper ─────────────────────────────────────────
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
