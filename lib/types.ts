// ─── Database row types ─────────────────────────────────────────

export type CarType = "SUV" | "MPV" | "Sedan" | "City Car" | "Pickup" | "Sport" | "Hybrid" | "Electric";
export type CarFuel = "Bensin" | "Diesel" | "Hybrid" | "Electric" | "Gas";
export type CarTx   = "Manual" | "Automatic" | "CVT" | "AT" | "DCT" | "e-CVT" | "IVT";
export type CarBadge = "new" | "hot" | "promo" | "";
export type CarStatus = "available" | "sold" | "indent";

export interface Car {
  id:              number;
  brand_id:        number;
  brand_name?:     string;
  name:            string;
  slug:            string;
  type:            CarType;
  year:            number;
  price:           number;
  price_min?:      number;
  fuel:            CarFuel;
  transmission:    CarTx;
  seats:           number;
  engine_cc?:      number;
  mileage:         number;
  color_options?:  string[];
  features?:       string[];
  description?:    string;
  meta_title?:     string;
  meta_description?: string;
  badge:           CarBadge;
  status:          CarStatus;
  is_featured:     boolean;
  view_count:      number;
  primary_image?:  string;
  created_at:      string;
  updated_at:      string;
}

export interface Lead {
  id?:           number;
  nama:          string;
  phone:         string;
  email?:        string;
  car_id?:       number;
  car_interest?: string;
  budget_min?:   number;
  budget_max?:   number;
  pesan?:        string;
  source:        "form" | "whatsapp" | "phone" | "walk_in" | "referral" | "other";
  utm_source?:   string;
  utm_medium?:   string;
  utm_campaign?: string;
  status?:       "new" | "contacted" | "follow_up" | "deal" | "cancel";
  created_at?:   string;
}

export interface KreditApplication {
  id?:               number;
  lead_id?:          number;
  nama:              string;
  phone:             string;
  email?:            string;
  car_id?:           number;
  harga_mobil:       number;
  dp_persen:         number;
  dp_amount:         number;
  tenor_bulan:       number;
  cicilan_estimasi?: number;
  bank_pilihan?:     string;
  status?:           "pending" | "review" | "approved" | "rejected";
}

export interface Promo {
  id:             number;
  title:          string;
  slug:           string;
  description?:   string;
  terms?:         string;
  discount_type:  string;
  discount_value: number;
  car_id?:        number;
  start_date:     string;
  end_date:       string;
  banner_url?:    string;
  is_active:      boolean;
}

export interface Testimonial {
  id:          number;
  nama:        string;
  kota?:       string;
  car_name?:   string;
  rating:      number;
  quote:       string;
  avatar_url?: string;
  is_featured: boolean;
}

// ─── API response helpers ────────────────────────────────────────
export function ok<T>(data: T, meta?: Record<string, unknown>) {
  return Response.json({ success: true, data, ...meta });
}

export function err(message: string, status = 400) {
  return Response.json({ success: false, error: message }, { status });
}

// ─── Pagination ──────────────────────────────────────────────────
export interface PaginationParams {
  page:    number;
  limit:   number;
  offset:  number;
}

export function parsePagination(sp: URLSearchParams) {
  const page = parseInt(sp.get("page") || "1", 10);
  const limit = parseInt(sp.get("limit") || "10", 10);
  
  // Pastikan tidak menghasilkan angka negatif
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const offset = (safePage - 1) * safeLimit;

  return { 
    page: safePage, 
    limit: safeLimit, 
    offset 
  };
}