import mongoose from "mongoose";

// ── Singleton connection ─────────────────────────────────────────
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const cached = global._mongooseConn ?? { conn: null, promise: null };
global._mongooseConn = cached;

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  // Cek saat runtime, bukan saat build
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI belum diset di environment variables");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "toyota",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
