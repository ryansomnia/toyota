/**
 * Seed script – import data dari JSON ke MongoDB
 *
 * Cara pakai:
 *   npx ts-node --skip-project scripts/seed.ts
 * atau pakai tsx:
 *   npx tsx scripts/seed.ts
 */

import mongoose from "mongoose";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

// ── Import models ─────────────────────────────────────────────────
import { CarCategory } from "../models/CarCategory";
import { Car } from "../models/Car";
import { Promo, Testimonial, Setting } from "../models/index";

const MONGODB_URI = process.env.MONGODB_URI!;

// ── Seed categories ───────────────────────────────────────────────
const CATEGORIES = [
  { name: "SUV",        slug: "suv",        icon: "🚙", sortOrder: 1 },
  { name: "MPV",        slug: "mpv",        icon: "🚐", sortOrder: 2 },
  { name: "Hatchback",  slug: "hatchback",  icon: "🚗", sortOrder: 3 },
  { name: "Sedan",      slug: "sedan",      icon: "🏎️", sortOrder: 4 },
  { name: "Commercial", slug: "commercial", icon: "🚚", sortOrder: 5 },
];

// Map categoryId lama (number) → slug kategori
const CATEGORY_MAP: Record<number, string> = {
  1: "suv",
  2: "mpv",
  3: "hatchback",
  4: "sedan",
  5: "commercial",
};

// ── Seed settings ─────────────────────────────────────────────────
const SETTINGS = [
  { key: "wa_number",        value: "6281234567890" },
  { key: "wa_message",       value: "Halo AutoPrima 🙏 Saya ingin konsultasi pembelian Toyota." },
  { key: "showroom_address", value: "Jl. Raya Otomotif No. 88, Cibinong, Bogor 16911" },
  { key: "showroom_hours",   value: "Senin–Sabtu 08.00–17.00 WIB" },
  { key: "phone",            value: "021-8765-4321" },
  { key: "email",            value: "info@autoprima.id" },
  { key: "bunga_kredit",     value: "9" },
  { key: "dp_minimum",       value: "10" },
];

// ── Seed testimonials ─────────────────────────────────────────────
const TESTIMONIALS = [
  { nama: "Budi Raharjo",  kota: "Cibinong",  carName: "Toyota Fortuner GR Sport", rating: 5, isFeatured: true,
    quote: "Prosesnya sangat mudah dan cepat. Dari konsultasi hingga mobil parkir di garasi hanya 5 hari kerja. Salesnya sabar banget nemenin saya milih tipe yang sesuai budget." },
  { nama: "Siti Maryam",   kota: "Depok",     carName: "Toyota Yaris Cross HEV",   rating: 5, isFeatured: true,
    quote: "Harganya transparan, tidak ada biaya tersembunyi. Saya bandingkan dengan beberapa dealer lain dan AutoPrima memberikan penawaran terbaik sekaligus pelayanan paling responsif." },
  { nama: "Ahmad Hidayat", kota: "Cileungsi", carName: "Toyota Innova Zenix HEV",  rating: 5, isFeatured: true,
    quote: "Sudah dua kali beli mobil di sini dan tidak pernah kecewa. Setiap ada pertanyaan after-sales pun selalu direspons cepat. Sangat rekomendasikan!" },
];

// ── Seed promos ───────────────────────────────────────────────────
const PROMOS = [
  {
    title: "Cash Back hingga Rp 30 Juta",
    slug: "cashback-30-juta",
    description: "Dapatkan cash back hingga Rp 30 Juta untuk pembelian unit tertentu bulan ini.",
    discountType: "cashback", discountValue: 30000000,
    startDate: new Date(), endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    title: "DP Mulai 10%, Bunga 0%",
    slug: "dp-10-persen",
    description: "Kemudahan kepemilikan mobil Toyota baru dengan DP mulai 10% dan bunga 0% untuk tenor tertentu.",
    discountType: "dp_ringan", discountValue: 10,
    startDate: new Date(), endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    title: "Free Aksesoris Rp 10 Juta",
    slug: "free-aksesoris",
    description: "Gratis paket aksesoris original Toyota senilai Rp 10 Juta untuk pembeli pertama.",
    discountType: "free_item", discountValue: 10000000,
    startDate: new Date(), endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    title: "Asuransi All-Risk Gratis 1 Tahun",
    slug: "asuransi-gratis",
    description: "Proteksi penuh kendaraanmu dengan asuransi all-risk gratis selama 1 tahun.",
    discountType: "bonus",
    startDate: new Date(), endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
];

// ── Main seed function ────────────────────────────────────────────
async function seed() {
  console.log("🔌 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { dbName: "toyota" });
  console.log("✅ Connected!\n");

  // 1. Clear semua koleksi
  console.log("🗑️  Clearing collections...");
  await Promise.all([
    CarCategory.deleteMany({}),
    Car.deleteMany({}),
    Promo.deleteMany({}),
    Testimonial.deleteMany({}),
    Setting.deleteMany({}),
  ]);
  console.log("✅ Cleared!\n");

  // 2. Seed categories
  console.log("📁 Seeding categories...");
  const insertedCats = await CarCategory.insertMany(CATEGORIES);
  const catMap: Record<string, mongoose.Types.ObjectId> = {};
  insertedCats.forEach((c) => { catMap[c.slug] = c._id as mongoose.Types.ObjectId; });
  console.log(`✅ ${insertedCats.length} categories inserted\n`);

  // 3. Seed cars dari JSON
  console.log("🚗 Seeding cars from cars.json...");
  const jsonPath = path.join(process.cwd(), "public", "data", "cars.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ File not found: ${jsonPath}`);
    console.error("   Pastikan cars.json ada di public/data/cars.json");
    process.exit(1);
  }

  const carsRaw = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  let carCount = 0;
  let skipCount = 0;

  for (const raw of carsRaw) {
    const catSlug = CATEGORY_MAP[raw.categoryId as number];
    const categoryId = catSlug ? catMap[catSlug] : null;

    if (!categoryId) {
      console.warn(`  ⚠️  Skip: ${raw.name} (categoryId ${raw.categoryId} tidak dikenal)`);
      skipCount++;
      continue;
    }

    // Bersihkan field id lama (number) yang tidak dipakai di MongoDB
    const { id: _id, categoryId: _catId, ...rest } = raw;

    // Bersihkan id di nested arrays
    const cleanVariants = (rest.variants ?? []).map((v: any) => {
      const { id: _vid, ...vRest } = v;
      const cleanPrices = (vRest.prices ?? []).map((p: any) => {
        const { id: _pid, ...pRest } = p;
        return pRest;
      });
      const cleanSpecs = (vRest.specs ?? []).map((s: any) => {
        const { id: _sid, ...sRest } = s;
        return sRest;
      });
      return { ...vRest, prices: cleanPrices, specs: cleanSpecs };
    });

    const cleanColors = (rest.colors ?? []).map((c: any) => {
      const { id: _cid, ...cRest } = c;
      return cRest;
    });

    const cleanImages = (rest.images ?? []).map((i: any) => {
      const { id: _iid, ...iRest } = i;
      return iRest;
    });

    const cleanFeatures = (rest.features ?? []).map((f: any) => {
      const { id: _fid, ...fRest } = f;
      return fRest;
    });

    try {
      await Car.create({
        ...rest,
        categoryId,
        variants: cleanVariants,
        colors:   cleanColors,
        images:   cleanImages,
        features: cleanFeatures,
      });
      console.log(`  ✅ ${raw.name}`);
      carCount++;
    } catch (err: any) {
      console.error(`  ❌ ${raw.name}: ${err.message}`);
    }
  }
  console.log(`\n✅ ${carCount} cars inserted, ${skipCount} skipped\n`);

  // 4. Seed promos
  console.log("🎁 Seeding promos...");
  await Promo.insertMany(PROMOS);
  console.log(`✅ ${PROMOS.length} promos inserted\n`);

  // 5. Seed testimonials
  console.log("⭐ Seeding testimonials...");
  await Testimonial.insertMany(TESTIMONIALS);
  console.log(`✅ ${TESTIMONIALS.length} testimonials inserted\n`);

  // 6. Seed settings
  console.log("⚙️  Seeding settings...");
  await Setting.insertMany(SETTINGS);
  console.log(`✅ ${SETTINGS.length} settings inserted\n`);

  console.log("🎉 Seed selesai!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed gagal:", err);
  process.exit(1);
});
