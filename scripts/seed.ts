/**
 * seed.ts
 * Jalankan: npx ts-node -r tsconfig-paths/register scripts/seed.ts
 * atau: npx tsx scripts/seed.ts
 *
 * Pastikan MONGODB_URI ada di .env.local
 */

import "dotenv/config";
import mongoose, { Types } from "mongoose";

// ── Connect ──────────────────────────────────────────────────────

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI belum diset");

async function connectDB() {
  await mongoose.connect(MONGODB_URI, { dbName: "toyota" });
  console.log("✅ MongoDB connected");
}

// ── Inline schemas (copy dari models agar bisa jalan standalone) ─

const CarPriceSchema = new mongoose.Schema({
  label:          { type: String, required: true },
  platB:          { type: Number },
  platF:          { type: Number },
  isBasePrice:    { type: Boolean, default: false },
  priceOnRequest: { type: Boolean, default: false },
  sortOrder:      { type: Number, default: 0 },
}, { _id: true });

const CarSpecSchema = new mongoose.Schema({
  category:  { type: String, required: true },
  specKey:   { type: String, required: true },
  specValue: { type: String, required: true },
  sortOrder: { type: Number, default: 0 },
}, { _id: true });

const CarVariantSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  slug:         { type: String, required: true },
  fuel:         { type: String, default: "Bensin" },
  transmission: { type: String, default: "Automatic" },
  engineCc:     { type: Number },
  engineLabel:  { type: String },
  drivetrain:   { type: String, default: "4x2" },
  seats:        { type: Number, default: 7 },
  isActive:     { type: Boolean, default: true },
  sortOrder:    { type: Number, default: 0 },
  prices:       [CarPriceSchema],
  specs:        [CarSpecSchema],
}, { _id: true });

const CarColorSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  hexCode:   { type: String },
  imageUrl:  { type: String },
  isActive:  { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { _id: true });

const CarImageSchema = new mongoose.Schema({
  url:       { type: String, required: true },
  altText:   { type: String },
  category:  { type: String, enum: ["exterior","interior","detail","color","banner"], default: "exterior" },
  isPrimary: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
}, { _id: true });

const CarFeatureSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  iconUrl:     { type: String },
  imageUrl:    { type: String },
  category:    { type: String },
  sortOrder:   { type: Number, default: 0 },
}, { _id: true });

const CarCategorySchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String },
  icon:        { type: String },
  sortOrder:   { type: Number, default: 0 },
  isActive:    { type: Boolean, default: true },
}, { timestamps: { createdAt: "createdAt", updatedAt: false } });

const CarSchema = new mongoose.Schema({
  categoryId:      { type: mongoose.Schema.Types.ObjectId, ref: "CarCategory", required: true },
  name:            { type: String, required: true, trim: true },
  fullName:        { type: String, required: true, trim: true },
  slug:            { type: String, required: true, unique: true, lowercase: true, trim: true },
  tagline:         { type: String },
  description:     { type: String },
  bannerUrl:       { type: String },
  thumbnailUrl:    { type: String },
  brochureUrl:     { type: String },
  startingPrice:   { type: Number },
  priceLabel:      { type: String, default: "Starting from" },
  label:           { type: String },
  isNewModel:      { type: Boolean, default: false },
  isFeatured:      { type: Boolean, default: false },
  isActive:        { type: Boolean, default: true },
  sortOrder:       { type: Number, default: 0 },
  viewCount:       { type: Number, default: 0 },
  metaTitle:       { type: String },
  metaDescription: { type: String },
  variants:        [CarVariantSchema],
  colors:          [CarColorSchema],
  images:          [CarImageSchema],
  features:        [CarFeatureSchema],
}, { timestamps: true, suppressReservedKeysWarning: true });

const CarCategory = mongoose.models.CarCategory || mongoose.model("CarCategory", CarCategorySchema);
const Car         = mongoose.models.Car         || mongoose.model("Car",         CarSchema);

// ── Seed Data ────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "SUV",        slug: "suv",        sortOrder: 1, isActive: true },
  { name: "MPV",        slug: "mpv",        sortOrder: 2, isActive: true },
  { name: "Hatchback",  slug: "hatchback",  sortOrder: 3, isActive: true },
  { name: "Sedan",      slug: "sedan",      sortOrder: 4, isActive: true },
  { name: "Commercial", slug: "commercial", sortOrder: 5, isActive: true },
];

// Helper: buat price entry dari harga plat B
// Plat F biasanya +1–3% dari plat B (estimasi, sesuaikan jika punya data pasti)
function mkPrice(label: string, platB: number | null, isBasePrice = false, priceOnRequest = false, sortOrder = 0) {
  return {
    label,
    platB:          platB ?? undefined,
    platF:          platB ? Math.round(platB * 1.005) : undefined, // +0.5% estimasi plat F
    isBasePrice,
    priceOnRequest,
    sortOrder,
  };
}

// Fungsi untuk membuat data mobil dengan categoryId yang sudah di-resolve
function getCarsData(categoryMap: Record<string, Types.ObjectId>) {
  const SUV  = categoryMap["suv"];
  const MPV  = categoryMap["mpv"];
  const HATCH = categoryMap["hatchback"];
  const SEDAN = categoryMap["sedan"];
  const COMM  = categoryMap["commercial"];

  return [
    // ════════════════════════════════════════════════════════════
    // SUV
    // ════════════════════════════════════════════════════════════
    {
      categoryId:   SUV,
      name:         "Fortuner GR Sport",
      fullName:     "New Fortuner GR Sport",
      slug:         "fortuner-gr-sport",
      tagline:      "Discover Your Fortuner",
      description:  "New Fortuner GR Sport hadir dengan tampilan sporty yang agresif dan performa mesin diesel 2.8L turbo yang bertenaga. Dilengkapi teknologi 4WD dan fitur keselamatan aktif Toyota Safety Sense.",
      bannerUrl:    "/images/cars/fortuner-gr-sport/banner.jpg",
      thumbnailUrl: "/images/cars/fortuner-gr-sport/thumbnail.jpg",
      brochureUrl:  "/files/brochure-fortuner-gr-sport.pdf",
      startingPrice: 617800000,
      priceLabel:   "Starting from",
      label:        "GR SPORT",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    1,
      metaTitle:    "New Fortuner GR Sport – Harga & Promo Terbaru | AutoPrima",
      metaDescription: "Beli New Toyota Fortuner GR Sport di AutoPrima Cibinong. Harga mulai Rp 617 Juta. Proses kredit mudah, DP ringan.",
      variants: [
        {
          name: "2.7 SRZ 4x2 A/T", slug: "fortuner-grs-srz-4x2",
          fuel: "Bensin", transmission: "Automatic", engineCc: 2700,
          engineLabel: "2.7L 4-cyl VVT-i", drivetrain: "4x2", seats: 7, sortOrder: 1,
          prices: [
            mkPrice("2.7 SRZ 4x2 A/T Non RSE", 617800000, true,  false, 1),
            mkPrice("2.7 SRZ 4x2 A/T RSE",     623400000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",       specValue:"2TR-FE, 4-Silinder, DOHC, VVT-i",    sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin",  specValue:"2.694 cc",                           sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum",  specValue:"166 PS / 5.200 rpm",                 sortOrder:3 },
            { category:"Mesin",     specKey:"Torsi Maksimum",   specValue:"245 Nm / 3.600 rpm",                 sortOrder:4 },
            { category:"Transmisi", specKey:"Tipe",             specValue:"6-Speed Automatic",                  sortOrder:5 },
            { category:"Dimensi",   specKey:"Panjang",          specValue:"4.795 mm",                           sortOrder:6 },
            { category:"Dimensi",   specKey:"Lebar",            specValue:"1.855 mm",                           sortOrder:7 },
            { category:"Dimensi",   specKey:"Tinggi",           specValue:"1.835 mm",                           sortOrder:8 },
            { category:"Dimensi",   specKey:"Wheelbase",        specValue:"2.745 mm",                           sortOrder:9 },
            { category:"Kapasitas", specKey:"Kapasitas Tangki", specValue:"80 Liter",                           sortOrder:10 },
          ],
        },
        {
          name: "2.8 GR Sport 4x2 A/T", slug: "fortuner-grs-28-4x2",
          fuel: "Diesel", transmission: "Automatic", engineCc: 2800,
          engineLabel: "2.8L 4-cyl Turbo Diesel", drivetrain: "4x2", seats: 7, sortOrder: 2,
          prices: [
            mkPrice("GRS TSS 4x2 A/T",    651800000, true,  false, 1),
            mkPrice("GRS TSS 4x2 A/T 1T", 667700000, false, false, 2),
            mkPrice("GRS TSS 4x2 A/T 2T", 678300000, false, false, 3),
          ],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"1GD-FTV, 4-Silinder, DOHC, Turbo",  sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.755 cc",                          sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"204 PS / 3.400 rpm",                sortOrder:3 },
            { category:"Mesin",     specKey:"Torsi Maksimum",  specValue:"500 Nm / 1.600-2.800 rpm",          sortOrder:4 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Automatic",                 sortOrder:5 },
          ],
        },
        {
          name: "2.8 GR Sport 4x4 A/T", slug: "fortuner-grs-28-4x4",
          fuel: "Diesel", transmission: "Automatic", engineCc: 2800,
          engineLabel: "2.8L 4-cyl Turbo Diesel", drivetrain: "4x4", seats: 7, sortOrder: 3,
          prices: [
            mkPrice("GRS TSS 4x4 RSE",    782600000, true,  false, 1),
            mkPrice("GRS 4x4 1T",         788300000, false, false, 2),
            mkPrice("GRS 4x4 2T",         793300000, false, false, 3),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.755 cc",                  sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"204 PS / 3.400 rpm",        sortOrder:2 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"4WD Shift-On-The-Fly",      sortOrder:3 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Automatic",         sortOrder:4 },
          ],
        },
      ],
      colors: [
        { name:"Attitude Black Mica",  hexCode:"#1C1C1C", imageUrl:"/images/cars/fortuner-gr-sport/color-black.jpg",  sortOrder:1 },
        { name:"Super White II",       hexCode:"#F5F5F5", imageUrl:"/images/cars/fortuner-gr-sport/color-white.jpg",  sortOrder:2 },
        { name:"Silver Metallic",      hexCode:"#A8A8A8", imageUrl:"/images/cars/fortuner-gr-sport/color-silver.jpg", sortOrder:3 },
        { name:"Crimson Spark Red",    hexCode:"#8B1A1A", imageUrl:"/images/cars/fortuner-gr-sport/color-red.jpg",    sortOrder:4 },
      ],
      images: [
        { url:"/images/cars/fortuner-gr-sport/exterior-1.jpg", altText:"Toyota Fortuner GR Sport tampak depan",   category:"exterior", isPrimary:true,  sortOrder:1 },
        { url:"/images/cars/fortuner-gr-sport/exterior-2.jpg", altText:"Toyota Fortuner GR Sport tampak samping", category:"exterior", isPrimary:false, sortOrder:2 },
        { url:"/images/cars/fortuner-gr-sport/interior-1.jpg", altText:"Interior Toyota Fortuner GR Sport",       category:"interior", isPrimary:false, sortOrder:3 },
      ],
      features: [
        { title:"GR-S Suspension Tuning", description:"Suspensi khusus GR Sport dioptimalkan untuk handling sporty namun tetap nyaman.", category:"Performance", sortOrder:1 },
        { title:"Toyota Safety Sense",    description:"Pre-Collision System, Lane Departure Alert, Automatic High Beam.",                category:"Safety",      sortOrder:2 },
        { title:"9-inch Touchscreen",     description:"Layar sentuh 9 inci dengan Apple CarPlay dan Android Auto.",                     category:"Technology",  sortOrder:3 },
        { title:"360-degree Camera",      description:"Kamera 360 derajat untuk kemudahan parkir di area sempit.",                      category:"Technology",  sortOrder:4 },
      ],
    },

    {
      categoryId:   SUV,
      name:         "Fortuner G",
      fullName:     "New Fortuner G",
      slug:         "fortuner-g",
      tagline:      "Ready for Any Road",
      description:  "New Fortuner G hadir sebagai pilihan tangguh dengan mesin diesel 2.4L. SUV body-on-frame yang terpercaya untuk medan apapun.",
      bannerUrl:    "/images/cars/fortuner-g/banner.jpg",
      thumbnailUrl: "/images/cars/fortuner-g/thumbnail.jpg",
      brochureUrl:  "/files/brochure-fortuner-g.pdf",
      startingPrice: 583700000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    2,
      metaTitle:    "New Fortuner G – Harga Terbaru | AutoPrima",
      metaDescription: "Beli New Toyota Fortuner G di AutoPrima Cibinong. Harga mulai Rp 583 Juta.",
      variants: [
        {
          name:"2.4 G M/T", slug:"fortuner-g-24-mt",
          fuel:"Diesel", transmission:"Manual", engineCc:2393,
          engineLabel:"2.4L 4-cyl Turbo Diesel", drivetrain:"4x2", seats:7, sortOrder:1,
          prices: [mkPrice("2.4 G M/T", 583700000, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",      sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
        {
          name:"2.4 G A/T", slug:"fortuner-g-24-at",
          fuel:"Diesel", transmission:"Automatic", engineCc:2393,
          engineLabel:"2.4L 4-cyl Turbo Diesel", drivetrain:"4x2", seats:7, sortOrder:2,
          prices: [mkPrice("2.4 G A/T", 601800000, false, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",           sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Automatic",  sortOrder:2 },
          ],
        },
        {
          name:"2.8 VRZ 4x2 A/T", slug:"fortuner-vrz-28-4x2",
          fuel:"Diesel", transmission:"Automatic", engineCc:2800,
          engineLabel:"2.8L 4-cyl Turbo Diesel", drivetrain:"4x2", seats:7, sortOrder:3,
          prices: [
            mkPrice("2.8 VRZ 4x2 A/T",     646100000, false, false, 1),
            mkPrice("2.8 VRZ TSS 4x2 A/T", 662000000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.755 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"204 PS / 3.400 rpm", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Automatic",  sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Super White II",  hexCode:"#F5F5F5", imageUrl:"/images/cars/fortuner-g/color-white.jpg",  sortOrder:1 },
        { name:"Black Mica",      hexCode:"#1C1C1C", imageUrl:"/images/cars/fortuner-g/color-black.jpg",  sortOrder:2 },
        { name:"Silver Metallic", hexCode:"#A8A8A8", imageUrl:"/images/cars/fortuner-g/color-silver.jpg", sortOrder:3 },
      ],
      images: [
        { url:"/images/cars/fortuner-g/exterior-1.jpg", altText:"Toyota Fortuner G tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Body-on-Frame", description:"Konstruksi kokoh untuk medan off-road maupun on-road.", category:"Performance", sortOrder:1 },
      ],
    },

    {
      categoryId:   SUV,
      name:         "Rush GR Sport",
      fullName:     "New Rush GR Sport",
      slug:         "rush-gr-sport",
      tagline:      "Sport Your Journey",
      description:  "New Rush GR Sport hadir dengan tampilan sporty berjiwa GR dan performa mesin 1.5L DOHC. SUV 7-seater kompak yang lincah untuk aktivitas sehari-hari.",
      bannerUrl:    "/images/cars/rush-gr-sport/banner.jpg",
      thumbnailUrl: "/images/cars/rush-gr-sport/thumbnail.jpg",
      brochureUrl:  "/files/brochure-rush-gr-sport.pdf",
      startingPrice: 289400000,
      priceLabel:   "Starting from",
      label:        "GR SPORT",
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    3,
      metaTitle:    "New Rush GR Sport – Harga Terbaru | AutoPrima",
      metaDescription: "Toyota Rush GR Sport di AutoPrima Cibinong. Harga mulai Rp 289 Juta.",
      variants: [
        {
          name:"1.5 G M/T", slug:"rush-g-15-mt",
          fuel:"Bensin", transmission:"Manual", engineCc:1496,
          engineLabel:"1.5L 4-cyl DOHC", drivetrain:"4x2", seats:7, sortOrder:1,
          prices: [mkPrice("1.5 G M/T", 289400000, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",    sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
        {
          name:"1.5 S GR Sport M/T", slug:"rush-grs-15-mt",
          fuel:"Bensin", transmission:"Manual", engineCc:1496,
          engineLabel:"1.5L 4-cyl DOHC", drivetrain:"4x2", seats:7, sortOrder:2,
          prices: [mkPrice("1.5 S GRS M/T", 304800000, false, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",    sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
        {
          name:"1.5 G A/T", slug:"rush-g-15-at",
          fuel:"Bensin", transmission:"Automatic", engineCc:1496,
          engineLabel:"1.5L 4-cyl DOHC", drivetrain:"4x2", seats:7, sortOrder:3,
          prices: [
            mkPrice("1.5 G A/T",     300400000, false, false, 1),
            mkPrice("1.5 S GRS A/T", 315600000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",       sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"4-Speed Automatic", sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"Super White II",  hexCode:"#F5F5F5", imageUrl:"/images/cars/rush-gr-sport/color-white.jpg",  sortOrder:1 },
        { name:"Black Mica",      hexCode:"#1C1C1C", imageUrl:"/images/cars/rush-gr-sport/color-black.jpg",  sortOrder:2 },
        { name:"Silver Metallic", hexCode:"#A8A8A8", imageUrl:"/images/cars/rush-gr-sport/color-silver.jpg", sortOrder:3 },
      ],
      images: [
        { url:"/images/cars/rush-gr-sport/exterior-1.jpg", altText:"Toyota Rush GR Sport tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"GR Sport Styling", description:"Paket eksterior sporty dengan aksen GR Sport yang agresif.", category:"Design", sortOrder:1 },
        { title:"7-inch Touchscreen", description:"Head unit 7 inci dengan Android Auto dan Apple CarPlay.", category:"Technology", sortOrder:2 },
      ],
    },

    {
      categoryId:   SUV,
      name:         "Raize GR",
      fullName:     "New Raize GR",
      slug:         "raize-gr",
      tagline:      "Small but Mighty",
      description:  "New Raize GR menghadirkan SUV kompak bertenaga dengan mesin turbo 1.0L yang irit namun bertenaga. Cocok untuk generasi muda yang dinamis.",
      bannerUrl:    "/images/cars/raize-gr/banner.jpg",
      thumbnailUrl: "/images/cars/raize-gr/thumbnail.jpg",
      brochureUrl:  "/files/brochure-raize-gr.pdf",
      startingPrice: 243500000,
      priceLabel:   "Starting from",
      label:        "GR",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    4,
      metaTitle:    "New Raize GR – SUV Kompak Bertenaga | AutoPrima",
      metaDescription: "Toyota Raize GR di AutoPrima Cibinong. Harga mulai Rp 243 Juta.",
      variants: [
        {
          name:"1.2 G M/T", slug:"raize-12-g-mt",
          fuel:"Bensin", transmission:"Manual", engineCc:1197,
          engineLabel:"1.2L 3-cyl VVT-i", drivetrain:"4x2", seats:5, sortOrder:1,
          prices: [mkPrice("1.2 G M/T", 243500000, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.197 cc",       sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"88 PS / 6.000 rpm", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:3 },
          ],
        },
        {
          name:"1.0T G M/T", slug:"raize-10t-g-mt",
          fuel:"Bensin", transmission:"Manual", engineCc:998,
          engineLabel:"1.0L 3-cyl Turbo", drivetrain:"4x2", seats:5, sortOrder:2,
          prices: [mkPrice("1.0T G M/T", 262700000, false, false, 1)],
          specs: [
            { category:"Mesin", specKey:"Kapasitas Mesin", specValue:"998 cc", sortOrder:1 },
            { category:"Mesin", specKey:"Tenaga Maksimum", specValue:"98 PS / 6.000 rpm", sortOrder:2 },
          ],
        },
        {
          name:"1.0T GR CVT", slug:"raize-gr-10t-cvt",
          fuel:"Bensin", transmission:"CVT", engineCc:998,
          engineLabel:"1.0L 3-cyl Turbo", drivetrain:"4x2", seats:5, sortOrder:3,
          prices: [
            mkPrice("1.0T GR CVT",          292100000, false, false, 1),
            mkPrice("1.0T GRS CVT 2T",      294700000, false, false, 2),
            mkPrice("1.0T GRS TSS CVT 2T",  317100000, false, false, 3),
            mkPrice("1.2 G CVT",            258600000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",       specValue:"1KR-VET, 3-Silinder, DOHC, Turbo", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin",  specValue:"998 cc",                           sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum",  specValue:"98 PS / 6.000 rpm",                sortOrder:3 },
            { category:"Mesin",     specKey:"Torsi Maksimum",   specValue:"140 Nm / 2.400-4.000 rpm",         sortOrder:4 },
            { category:"Transmisi", specKey:"Tipe",             specValue:"CVT",                              sortOrder:5 },
          ],
        },
      ],
      colors: [
        { name:"Pearlescent White", hexCode:"#F8F8F8", imageUrl:"/images/cars/raize-gr/color-white.jpg", sortOrder:1 },
        { name:"Emotional Red II",  hexCode:"#C0392B", imageUrl:"/images/cars/raize-gr/color-red.jpg",   sortOrder:2 },
        { name:"Black Mica",        hexCode:"#1C1C1C", imageUrl:"/images/cars/raize-gr/color-black.jpg", sortOrder:3 },
      ],
      images: [
        { url:"/images/cars/raize-gr/exterior-1.jpg", altText:"Toyota Raize GR tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"1.0L Turbo Engine",  description:"Mesin 3 silinder turbo 998cc bertenaga namun irit bahan bakar.", category:"Performance", sortOrder:1 },
        { title:"GR Styling",         description:"Paket eksterior dan interior GR Sport yang sporty.",              category:"Design",      sortOrder:2 },
        { title:"7-inch Touchscreen", description:"Head unit 7 inci dengan Android Auto dan Apple CarPlay.",         category:"Technology",  sortOrder:3 },
      ],
    },

    {
      categoryId:   SUV,
      name:         "Yaris Cross HEV",
      fullName:     "All New Yaris Cross HEV",
      slug:         "yaris-cross-hev",
      tagline:      "Beyond Every Road",
      description:  "All New Yaris Cross HEV menghadirkan SUV hybrid kompak dengan teknologi Hybrid Synergy Drive Toyota. Efisiensi bahan bakar terbaik di kelasnya.",
      bannerUrl:    "/images/cars/yaris-cross-hev/banner.jpg",
      thumbnailUrl: "/images/cars/yaris-cross-hev/thumbnail.jpg",
      brochureUrl:  "/files/brochure-yaris-cross-hev.pdf",
      startingPrice: 359700000,
      priceLabel:   "Starting from",
      label:        "HYBRID",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    5,
      metaTitle:    "All New Yaris Cross HEV – SUV Hybrid Kompak | AutoPrima",
      metaDescription: "Toyota Yaris Cross HEV di AutoPrima Cibinong. Harga mulai Rp 359 Juta.",
      variants: [
        {
          name:"1.5 G M/T", slug:"yaris-cross-15-g-mt",
          fuel:"Bensin", transmission:"Manual", engineCc:1496,
          engineLabel:"1.5L 4-cyl DOHC", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [mkPrice("1.5 G M/T", 359700000, true, false, 1)],
          specs: [{ category:"Transmisi", specKey:"Tipe", specValue:"6-Speed Manual", sortOrder:1 }],
        },
        {
          name:"1.5 G CVT", slug:"yaris-cross-15-g-cvt",
          fuel:"Bensin", transmission:"CVT", engineCc:1496,
          engineLabel:"1.5L 4-cyl DOHC", drivetrain:"FWD", seats:5, sortOrder:2,
          prices: [mkPrice("1.5 G CVT", 372900000, false, false, 1)],
          specs: [{ category:"Transmisi", specKey:"Tipe", specValue:"CVT", sortOrder:1 }],
        },
        {
          name:"1.5 HEV G", slug:"yaris-cross-hev-g",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1496,
          engineLabel:"1.5L Hybrid Synergy Drive", drivetrain:"FWD", seats:5, sortOrder:3,
          prices: [
            mkPrice("HEV 1.5 G",    399000000, false, false, 1),
            mkPrice("HEV 1.5 G 2T", 403000000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Sistem Hybrid", specValue:"Toyota Hybrid Synergy Drive", sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",          specValue:"e-CVT",                       sortOrder:2 },
          ],
        },
        {
          name:"1.5 HEV S TSS", slug:"yaris-cross-hev-s-tss",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1496,
          engineLabel:"1.5L Hybrid Synergy Drive", drivetrain:"FWD", seats:5, sortOrder:4,
          prices: [
            mkPrice("HEV 1.5 S TSS",    448800000, false, false, 1),
            mkPrice("HEV 1.5 S TSS 2T", 452800000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Sistem Hybrid", specValue:"Toyota Hybrid Synergy Drive", sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",          specValue:"e-CVT",                       sortOrder:2 },
          ],
        },
        {
          name:"1.5 HEV S GR TSS", slug:"yaris-cross-hev-s-gr-tss",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1496,
          engineLabel:"1.5L Hybrid Synergy Drive", drivetrain:"FWD", seats:5, sortOrder:5,
          prices: [
            mkPrice("HEV 1.5 S GR TSS",    458200000, false, false, 1),
            mkPrice("HEV 1.5 S GR TSS 2T", 462200000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Sistem Hybrid", specValue:"Toyota Hybrid Synergy Drive", sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",          specValue:"e-CVT",                       sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl", hexCode:"#F5F5F5", imageUrl:"/images/cars/yaris-cross-hev/color-white.jpg",  sortOrder:1 },
        { name:"Black Mica",           hexCode:"#1C1C1C", imageUrl:"/images/cars/yaris-cross-hev/color-black.jpg",  sortOrder:2 },
        { name:"Silver Metallic",      hexCode:"#A8A8A8", imageUrl:"/images/cars/yaris-cross-hev/color-silver.jpg", sortOrder:3 },
      ],
      images: [
        { url:"/images/cars/yaris-cross-hev/exterior-1.jpg", altText:"Toyota Yaris Cross HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Hybrid Synergy Drive", description:"Teknologi hybrid Toyota untuk efisiensi terbaik.", category:"Performance", sortOrder:1 },
        { title:"Toyota Safety Sense",  description:"Sistem keselamatan aktif generasi terbaru.",       category:"Safety",      sortOrder:2 },
      ],
    },

    {
      categoryId:   SUV,
      name:         "Corolla Cross HEV",
      fullName:     "New Corolla Cross HEV",
      slug:         "corolla-cross-hev",
      tagline:      "Drive the Future",
      description:  "New Corolla Cross HEV menggabungkan desain SUV premium dengan teknologi hybrid 1.8L Toyota.",
      bannerUrl:    "/images/cars/corolla-cross-hev/banner.jpg",
      thumbnailUrl: "/images/cars/corolla-cross-hev/thumbnail.jpg",
      brochureUrl:  "/files/brochure-corolla-cross-hev.pdf",
      startingPrice: 605500000,
      priceLabel:   "Starting from",
      label:        "HYBRID",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    6,
      metaTitle:    "New Corolla Cross HEV – SUV Hybrid Premium | AutoPrima",
      metaDescription: "Toyota Corolla Cross HEV di AutoPrima Cibinong. Harga mulai Rp 605 Juta.",
      variants: [
        {
          name:"1.8L HEV", slug:"corolla-cross-hev-18",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1798,
          engineLabel:"1.8L Hybrid Synergy Drive", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [
            mkPrice("1.8L HEV",   605500000, true,  false, 1),
            mkPrice("1.8L HEV P", 608600000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.798 cc",                  sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                     sortOrder:3 },
          ],
        },
        {
          name:"1.8L HEV GR Sport", slug:"corolla-cross-hev-grs",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1798,
          engineLabel:"1.8L Hybrid Synergy Drive", drivetrain:"FWD", seats:5, sortOrder:2,
          prices: [
            mkPrice("1.8L HEV GRS",   645000000, false, false, 1),
            mkPrice("1.8L HEV GRS P", 650100000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.798 cc",                  sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                     sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl", hexCode:"#F5F5F5", imageUrl:"/images/cars/corolla-cross-hev/color-white.jpg", sortOrder:1 },
        { name:"Black Mica",           hexCode:"#1C1C1C", imageUrl:"/images/cars/corolla-cross-hev/color-black.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/corolla-cross-hev/exterior-1.jpg", altText:"Toyota Corolla Cross HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Hybrid Synergy Drive 1.8L", description:"Sistem hybrid Toyota yang terbukti irit.", category:"Performance", sortOrder:1 },
        { title:"Toyota Safety Sense",        description:"Pre-Collision System dan fitur keselamatan aktif lengkap.", category:"Safety", sortOrder:2 },
      ],
    },

    {
      categoryId:   SUV,
      name:         "BZ4X",
      fullName:     "New BZ4X Battery EV",
      slug:         "bz4x",
      tagline:      "Be Zero. Be Forward.",
      description:  "New BZ4X adalah SUV listrik murni Toyota pertama di Indonesia. Baterai 71.4 kWh dengan jangkauan hingga 500 km.",
      bannerUrl:    "/images/cars/bz4x/banner.jpg",
      thumbnailUrl: "/images/cars/bz4x/thumbnail.jpg",
      brochureUrl:  "/files/brochure-bz4x.pdf",
      startingPrice: undefined,
      priceLabel:   "Hubungi Kami",
      label:        "EV",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    7,
      metaTitle:    "New BZ4X Battery EV – SUV Listrik Toyota | AutoPrima",
      metaDescription: "Toyota BZ4X di AutoPrima Cibinong. Hubungi kami untuk info harga.",
      variants: [
        {
          name:"BZ4X FWD", slug:"bz4x-fwd",
          fuel:"Electric", transmission:"Automatic", engineCc:0,
          engineLabel:"71.4 kWh Electric Motor", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [{ label:"BZ4X", platB:undefined, platF:undefined, isBasePrice:true, priceOnRequest:true, sortOrder:1 }],
          specs: [
            { category:"Motor",    specKey:"Kapasitas Baterai", specValue:"71.4 kWh",          sortOrder:1 },
            { category:"Motor",    specKey:"Tenaga Maksimum",   specValue:"204 PS",             sortOrder:2 },
            { category:"Motor",    specKey:"Jangkauan",         specValue:"Hingga 500 km (WLTP)", sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl", hexCode:"#F5F5F5", imageUrl:"/images/cars/bz4x/color-white.jpg", sortOrder:1 },
        { name:"Black Mica",           hexCode:"#1C1C1C", imageUrl:"/images/cars/bz4x/color-black.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/bz4x/exterior-1.jpg", altText:"Toyota BZ4X tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Zero Emission",     description:"Kendaraan listrik murni tanpa emisi gas buang.", category:"Performance", sortOrder:1 },
        { title:"Fast Charging DC",  description:"Mendukung pengisian cepat DC hingga 150 kW.",   category:"Technology",  sortOrder:2 },
      ],
    },

    {
      categoryId:   SUV,
      name:         "Urban Cruiser EV",
      fullName:     "New Urban Cruiser Battery EV",
      slug:         "urban-cruiser-ev",
      tagline:      "Electrify Your Urban Life",
      description:  "New Urban Cruiser Battery EV adalah SUV kompak listrik terbaru Toyota untuk mobilitas perkotaan modern.",
      bannerUrl:    "/images/cars/urban-cruiser-ev/banner.jpg",
      thumbnailUrl: "/images/cars/urban-cruiser-ev/thumbnail.jpg",
      brochureUrl:  "/files/brochure-urban-cruiser-ev.pdf",
      startingPrice: undefined,
      priceLabel:   "Hubungi Kami",
      label:        "EV",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    8,
      metaTitle:    "New Urban Cruiser Battery EV – SUV Listrik Kompak | AutoPrima",
      metaDescription: "Toyota Urban Cruiser EV di AutoPrima Cibinong. Hubungi kami untuk info harga.",
      variants: [
        {
          name:"Urban Cruiser EV", slug:"urban-cruiser-ev-std",
          fuel:"Electric", transmission:"Automatic", engineCc:0,
          engineLabel:"Electric Motor", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [{ label:"Urban Cruiser EV", platB:undefined, platF:undefined, isBasePrice:true, priceOnRequest:true, sortOrder:1 }],
          specs: [{ category:"Motor", specKey:"Tipe", specValue:"Battery Electric Vehicle (BEV)", sortOrder:1 }],
        },
      ],
      colors: [
        { name:"White", hexCode:"#F8F8F8", imageUrl:"/images/cars/urban-cruiser-ev/color-white.jpg", sortOrder:1 },
      ],
      images: [
        { url:"/images/cars/urban-cruiser-ev/exterior-1.jpg", altText:"Toyota Urban Cruiser EV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Full Electric Powertrain", description:"Sepenuhnya bertenaga listrik untuk perjalanan bebas emisi.", category:"Performance", sortOrder:1 },
      ],
    },

    {
      categoryId:   SUV,
      name:         "Land Cruiser",
      fullName:     "All New Land Cruiser",
      slug:         "land-cruiser",
      tagline:      "Go Anywhere. Do Anything.",
      description:  "All New Land Cruiser hadir dengan platform TNGA-F generasi terbaru. SUV flagship Toyota yang tangguh dan mewah.",
      bannerUrl:    "/images/cars/land-cruiser/banner.jpg",
      thumbnailUrl: "/images/cars/land-cruiser/thumbnail.jpg",
      brochureUrl:  "/files/brochure-land-cruiser.pdf",
      startingPrice: undefined,
      priceLabel:   "Hubungi Kami",
      label:        "NEW",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    9,
      metaTitle:    "All New Land Cruiser – SUV Flagship Toyota | AutoPrima",
      metaDescription: "Toyota Land Cruiser di AutoPrima Cibinong. Hubungi kami untuk info harga.",
      variants: [
        {
          name:"Land Cruiser 3.3L Diesel", slug:"land-cruiser-33-diesel",
          fuel:"Diesel", transmission:"Automatic", engineCc:3346,
          engineLabel:"3.3L V6 Twin Turbo Diesel", drivetrain:"4x4", seats:7, sortOrder:1,
          prices: [{ label:"Land Cruiser", platB:undefined, platF:undefined, isBasePrice:true, priceOnRequest:true, sortOrder:1 }],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"F33A-FTV, V6, Twin Turbo Diesel", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"3.346 cc",                        sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"309 PS / 4.000 rpm",              sortOrder:3 },
            { category:"Mesin",     specKey:"Torsi Maksimum",  specValue:"700 Nm / 1.600-2.600 rpm",        sortOrder:4 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"10-Speed Automatic",              sortOrder:5 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"4WD Full-Time",                   sortOrder:6 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl", hexCode:"#F5F5F5", imageUrl:"/images/cars/land-cruiser/color-white.jpg", sortOrder:1 },
        { name:"Black Mica",           hexCode:"#1C1C1C", imageUrl:"/images/cars/land-cruiser/color-black.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/land-cruiser/exterior-1.jpg", altText:"Toyota Land Cruiser tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"E-KDSS",              description:"Electronic Kinetic Dynamic Suspension System untuk off-road terbaik.", category:"Performance", sortOrder:1 },
        { title:"Multi-Terrain Select", description:"Sistem pemilihan medan 5-mode untuk kondisi apapun.",                 category:"Performance", sortOrder:2 },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MPV
    // ════════════════════════════════════════════════════════════

    {
      categoryId:   MPV,
      name:         "Innova Zenix HEV",
      fullName:     "All New Innova Zenix HEV",
      slug:         "innova-zenix-hev",
      tagline:      "Beyond Expectation",
      description:  "All New Innova Zenix HEV menghadirkan teknologi hybrid terdepan dalam balutan desain MPV premium. Mesin 2.0L Hybrid memberikan efisiensi bahan bakar luar biasa.",
      bannerUrl:    "/images/cars/innova-zenix-hev/banner.jpg",
      thumbnailUrl: "/images/cars/innova-zenix-hev/thumbnail.jpg",
      brochureUrl:  "/files/brochure-innova-zenix-hev.pdf",
      startingPrice: 474700000,
      priceLabel:   "Starting from",
      label:        "HYBRID",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    10,
      metaTitle:    "All New Innova Zenix HEV – MPV Hybrid Premium | AutoPrima",
      metaDescription: "Toyota Innova Zenix HEV di AutoPrima Cibinong. Harga mulai Rp 474 Juta.",
      variants: [
        {
          name:"HEV G CVT", slug:"zenix-hev-g-cvt",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1987,
          engineLabel:"2.0L Hybrid Synergy Drive", drivetrain:"FWD", seats:7, sortOrder:1,
          prices: [
            mkPrice("HEV G CVT",   474700000, true,  false, 1),
            mkPrice("HEV G CVT P", 477600000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"M20A-FXS, 4-Silinder, DOHC, Hybrid", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.987 cc",                            sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Sistem",   specValue:"186 PS",                              sortOrder:3 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                               sortOrder:4 },
          ],
        },
        {
          name:"HEV V CVT", slug:"zenix-hev-v-cvt",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1987,
          engineLabel:"2.0L Hybrid Synergy Drive", drivetrain:"FWD", seats:7, sortOrder:2,
          prices: [
            mkPrice("HEV V CVT",     548400000, false, false, 1),
            mkPrice("HEV V MOD",     538400000, false, false, 2),
            mkPrice("HEV V RSE",     540100000, false, false, 3),
          ],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.987 cc", sortOrder:1 }],
        },
        {
          name:"HEV Q TSS", slug:"zenix-hev-q-tss",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1987,
          engineLabel:"2.0L Hybrid Synergy Drive", drivetrain:"FWD", seats:7, sortOrder:3,
          prices: [
            mkPrice("HEV Q TSS",     626900000, false, false, 1),
            mkPrice("HEV Q TSS MOD", 617000000, false, false, 2),
            mkPrice("HEV Q TSS RSE", 618600000, false, false, 3),
          ],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.987 cc", sortOrder:1 }],
        },
      ],
      colors: [
        { name:"Platinum White Pearl Mica", hexCode:"#F0F0F0", imageUrl:"/images/cars/innova-zenix-hev/color-white.jpg",  sortOrder:1 },
        { name:"Attitude Black Mica",       hexCode:"#1C1C1C", imageUrl:"/images/cars/innova-zenix-hev/color-black.jpg",  sortOrder:2 },
        { name:"Silver Metallic",           hexCode:"#A8A8A8", imageUrl:"/images/cars/innova-zenix-hev/color-silver.jpg", sortOrder:3 },
        { name:"Bronze Mica Metallic",      hexCode:"#8B6914", imageUrl:"/images/cars/innova-zenix-hev/color-bronze.jpg", sortOrder:4 },
      ],
      images: [
        { url:"/images/cars/innova-zenix-hev/exterior-1.jpg", altText:"Toyota Innova Zenix HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Hybrid Synergy Drive", description:"Sistem hybrid Toyota yang irit hingga 50% dibanding konvensional.", category:"Performance", sortOrder:1 },
        { title:"Head-Up Display",      description:"Informasi berkendara langsung di kaca depan.",                     category:"Technology",  sortOrder:2 },
        { title:"Power Sliding Door",   description:"Pintu geser elektrik di kedua sisi.",                              category:"Comfort",     sortOrder:3 },
      ],
    },

    {
      categoryId:   MPV,
      name:         "Innova Zenix",
      fullName:     "All New Innova Zenix",
      slug:         "innova-zenix",
      tagline:      "A New Kind of Bold",
      description:  "All New Innova Zenix versi bensin hadir dengan mesin 2.0L VVT-iE bertenaga dan desain MPV premium terbaru.",
      bannerUrl:    "/images/cars/innova-zenix/banner.jpg",
      thumbnailUrl: "/images/cars/innova-zenix/thumbnail.jpg",
      brochureUrl:  "/files/brochure-innova-zenix.pdf",
      startingPrice: 437300000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    11,
      metaTitle:    "All New Innova Zenix – MPV Premium | AutoPrima",
      metaDescription: "Toyota Innova Zenix di AutoPrima Cibinong. Harga mulai Rp 437 Juta.",
      variants: [
        {
          name:"G CVT", slug:"innova-zenix-g-cvt",
          fuel:"Bensin", transmission:"CVT", engineCc:1987,
          engineLabel:"2.0L 4-cyl VVT-iE", drivetrain:"FWD", seats:7, sortOrder:1,
          prices: [
            mkPrice("G CVT",   437300000, true,  false, 1),
            mkPrice("G CVT P", 440300000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"M20A-FKS, 4-Silinder, DOHC, VVT-iE", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.987 cc",                            sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"174 PS / 6.600 rpm",                  sortOrder:3 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"CVT",                                 sortOrder:4 },
          ],
        },
        {
          name:"V CVT", slug:"innova-zenix-v-cvt",
          fuel:"Bensin", transmission:"CVT", engineCc:1987,
          engineLabel:"2.0L 4-cyl VVT-iE", drivetrain:"FWD", seats:7, sortOrder:2,
          prices: [
            mkPrice("V CVT",     483900000, false, false, 1),
            mkPrice("V RSE",     475600000, false, false, 2),
            mkPrice("V MOD",     538400000, false, false, 3),
          ],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.987 cc", sortOrder:1 }],
        },
      ],
      colors: [
        { name:"Platinum White Pearl Mica", hexCode:"#F0F0F0", imageUrl:"/images/cars/innova-zenix/color-white.jpg", sortOrder:1 },
        { name:"Attitude Black Mica",       hexCode:"#1C1C1C", imageUrl:"/images/cars/innova-zenix/color-black.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/innova-zenix/exterior-1.jpg", altText:"Toyota Innova Zenix tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"2.0L VVT-iE Engine", description:"Mesin terbaru dengan Variable Valve Timing by Electric motor.", category:"Performance", sortOrder:1 },
        { title:"Power Sliding Door", description:"Pintu geser elektrik untuk kemudahan masuk dan keluar.",        category:"Comfort",     sortOrder:2 },
      ],
    },

    {
      categoryId:   MPV,
      name:         "Innova Reborn",
      fullName:     "All New Innova",
      slug:         "innova-reborn",
      tagline:      "Born to Lead",
      description:  "All New Innova hadir dengan mesin diesel 2.4L yang tangguh dan terpercaya. MPV legendaris Toyota yang kini lebih modern.",
      bannerUrl:    "/images/cars/innova-reborn/banner.jpg",
      thumbnailUrl: "/images/cars/innova-reborn/thumbnail.jpg",
      brochureUrl:  "/files/brochure-innova-reborn.pdf",
      startingPrice: 417800000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   false,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    12,
      metaTitle:    "All New Innova – MPV Diesel Terpercaya | AutoPrima",
      metaDescription: "Toyota Innova Reborn di AutoPrima Cibinong. Harga mulai Rp 417 Juta.",
      variants: [
        {
          name:"2.4 G M/T", slug:"innova-reborn-24-g-mt",
          fuel:"Diesel", transmission:"Manual", engineCc:2393,
          engineLabel:"2.4L 4-cyl Turbo Diesel", drivetrain:"4x2", seats:7, sortOrder:1,
          prices: [mkPrice("2.4 G M/T", 417800000, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",    sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
        {
          name:"2.4 G A/T", slug:"innova-reborn-24-g-at",
          fuel:"Diesel", transmission:"Automatic", engineCc:2393,
          engineLabel:"2.4L 4-cyl Turbo Diesel", drivetrain:"4x2", seats:7, sortOrder:2,
          prices: [mkPrice("2.4 G A/T", 438700000, false, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",          sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Automatic", sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"White",           hexCode:"#F5F5F5", imageUrl:"/images/cars/innova-reborn/color-white.jpg",  sortOrder:1 },
        { name:"Silver Metallic", hexCode:"#A8A8A8", imageUrl:"/images/cars/innova-reborn/color-silver.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/innova-reborn/exterior-1.jpg", altText:"Toyota Innova tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"2GD-FTV Diesel Engine", description:"Mesin diesel turbo bertenaga 150 PS yang terbukti handal.", category:"Performance", sortOrder:1 },
      ],
    },

    {
      categoryId:   MPV,
      name:         "Veloz",
      fullName:     "New Veloz Hybrid EV",
      slug:         "veloz-hev",
      tagline:      "Hybrid. Stylish. Ready.",
      description:  "New Veloz Hybrid EV menghadirkan MPV stylish dengan teknologi hybrid terdepan. Hemat bahan bakar dan penuh gaya.",
      bannerUrl:    "/images/cars/veloz-hev/banner.jpg",
      thumbnailUrl: "/images/cars/veloz-hev/thumbnail.jpg",
      brochureUrl:  "/files/brochure-veloz-hev.pdf",
      startingPrice: 303000000,
      priceLabel:   "Starting from",
      label:        "HYBRID",
      isNewModel:   false,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    13,
      metaTitle:    "New Veloz Hybrid EV – MPV Hybrid Stylish | AutoPrima",
      metaDescription: "Toyota Veloz HEV di AutoPrima Cibinong. Harga mulai Rp 303 Juta.",
      variants: [
        {
          name:"V HEV", slug:"veloz-v-hev",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1496,
          engineLabel:"1.5L Hybrid Synergy Drive", drivetrain:"FWD", seats:7, sortOrder:1,
          prices: [
            mkPrice("V HEV",    303000000, true,  false, 1),
            mkPrice("V HEV PC", 304500000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",                  sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                     sortOrder:3 },
          ],
        },
        {
          name:"Q HEV TSS", slug:"veloz-q-hev-tss",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1496,
          engineLabel:"1.5L Hybrid Synergy Drive", drivetrain:"FWD", seats:7, sortOrder:2,
          prices: [
            mkPrice("Q HEV",              325000000, false, false, 1),
            mkPrice("Q MOD 1T HEV TSS",   385000000, false, false, 2),
            mkPrice("Q MOD 2T HEV TSS",   387500000, false, false, 3),
          ],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.496 cc", sortOrder:1 }],
        },
      ],
      colors: [
        { name:"White", hexCode:"#FFFFFF", imageUrl:"/images/cars/veloz-hev/color-white.jpg", sortOrder:1 },
        { name:"Black", hexCode:"#1C1C1C", imageUrl:"/images/cars/veloz-hev/color-black.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/veloz-hev/exterior-1.jpg", altText:"Toyota Veloz HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Hybrid Synergy Drive", description:"Sistem hybrid Toyota untuk efisiensi dan performa optimal.", category:"Performance", sortOrder:1 },
      ],
    },

    {
      categoryId:   MPV,
      name:         "Voxy",
      fullName:     "All New Voxy",
      slug:         "voxy",
      tagline:      "The Bold MPV",
      description:  "All New Voxy menghadirkan MPV premium dengan desain bold dan aggressive. Kabin luas dengan fitur modern.",
      bannerUrl:    "/images/cars/voxy/banner.jpg",
      thumbnailUrl: "/images/cars/voxy/thumbnail.jpg",
      brochureUrl:  "/files/brochure-voxy.pdf",
      startingPrice: 631800000,
      priceLabel:   "Starting from",
      label:        "NEW",
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    14,
      metaTitle:    "All New Voxy – MPV Premium Bold | AutoPrima",
      metaDescription: "Toyota Voxy di AutoPrima Cibinong. Harga mulai Rp 631 Juta.",
      variants: [
        {
          name:"2.0 T00B A/T", slug:"voxy-20-t00b",
          fuel:"Bensin", transmission:"Automatic", engineCc:1987,
          engineLabel:"2.0L 4-cyl DOHC", drivetrain:"FWD", seats:7, sortOrder:1,
          prices: [
            mkPrice("2.0 T00B A/T", 631800000, true,  false, 1),
            mkPrice("2.0 T01B A/T", 634900000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.987 cc",          sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"170 PS / 6.600 rpm", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"CVT",               sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Super White II", hexCode:"#F5F5F5", imageUrl:"/images/cars/voxy/color-white.jpg", sortOrder:1 },
        { name:"Black Mica",     hexCode:"#1C1C1C", imageUrl:"/images/cars/voxy/color-black.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/voxy/exterior-1.jpg", altText:"Toyota Voxy tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Bold Exterior Design", description:"Desain eksterior bold dengan grille besar yang memukau.", category:"Design",   sortOrder:1 },
        { title:"Power Sliding Door",   description:"Pintu geser elektrik kedua sisi.",                         category:"Comfort", sortOrder:2 },
      ],
    },

    {
      categoryId:   MPV,
      name:         "Alphard HEV",
      fullName:     "All New Alphard HEV",
      slug:         "alphard-hev",
      tagline:      "The Art of Moving",
      description:  "All New Alphard HEV menghadirkan puncak kemewahan MPV Toyota dengan teknologi hybrid. Desain elegan dan kabin super premium.",
      bannerUrl:    "/images/cars/alphard-hev/banner.jpg",
      thumbnailUrl: "/images/cars/alphard-hev/thumbnail.jpg",
      brochureUrl:  "/files/brochure-alphard-hev.pdf",
      startingPrice: 1288000000,
      priceLabel:   "Starting from",
      label:        "HYBRID",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    15,
      metaTitle:    "All New Alphard HEV – MPV Luxury Hybrid | AutoPrima",
      metaDescription: "Toyota Alphard HEV di AutoPrima Cibinong. Harga mulai Rp 1,2 Miliar.",
      variants: [
        {
          name:"2.5 XE HEV CVT", slug:"alphard-hev-xe-cvt",
          fuel:"HybridEV", transmission:"eCVT", engineCc:2487,
          engineLabel:"2.5L 4-cyl Hybrid", drivetrain:"FWD", seats:7, sortOrder:1,
          prices: [
            mkPrice("2.5 XE HEV CVT",    1288000000, true,  false, 1),
            mkPrice("2.5 XE HEV CVT PC", 1291500000, false, false, 2),
            mkPrice("2.5 XE HEV",        1388000000, false, false, 3),
            mkPrice("2.5 XE HEV PC",     1391500000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.487 cc",                  sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                     sortOrder:3 },
          ],
        },
        {
          name:"2.5 G HEV", slug:"alphard-hev-g",
          fuel:"HybridEV", transmission:"eCVT", engineCc:2487,
          engineLabel:"2.5L 4-cyl Hybrid AWD", drivetrain:"AWD", seats:7, sortOrder:2,
          prices: [
            mkPrice("2.5 G HEV CVT",    1652100000, false, false, 1),
            mkPrice("2.5 G HEV CVT PC", 1655600000, false, false, 2),
            mkPrice("2.5 G HEV",        1737400000, false, false, 3),
            mkPrice("2.5 G HEV PC",     1741000000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.487 cc",  sortOrder:1 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"E-Four AWD", sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl Mica", hexCode:"#F5F5F5", imageUrl:"/images/cars/alphard-hev/color-white.jpg",    sortOrder:1 },
        { name:"Sonic Titanium",            hexCode:"#4A4A4A", imageUrl:"/images/cars/alphard-hev/color-titanium.jpg", sortOrder:2 },
        { name:"Black",                     hexCode:"#1C1C1C", imageUrl:"/images/cars/alphard-hev/color-black.jpg",    sortOrder:3 },
      ],
      images: [
        { url:"/images/cars/alphard-hev/exterior-1.jpg", altText:"Toyota Alphard HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Executive Lounge Seat", description:"Kursi executive lounge dengan fitur relaksasi dan massage.", category:"Comfort",       sortOrder:1 },
        { title:"Hybrid Synergy Drive",  description:"Teknologi hybrid E-Four untuk efisiensi optimal.",           category:"Performance",   sortOrder:2 },
        { title:"JBL Premium Audio",     description:"Sistem audio premium JBL untuk pengalaman terbaik.",         category:"Entertainment", sortOrder:3 },
      ],
    },

    {
      categoryId:   MPV,
      name:         "Vellfire HEV",
      fullName:     "All New Vellfire HEV",
      slug:         "vellfire-hev",
      tagline:      "The Pinnacle of Luxury",
      description:  "All New Vellfire HEV adalah puncak kemewahan Toyota dengan teknologi hybrid dan fitur ultra-premium.",
      bannerUrl:    "/images/cars/vellfire-hev/banner.jpg",
      thumbnailUrl: "/images/cars/vellfire-hev/thumbnail.jpg",
      brochureUrl:  "/files/brochure-vellfire-hev.pdf",
      startingPrice: 1872800000,
      priceLabel:   "Starting from",
      label:        "HYBRID",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    16,
      metaTitle:    "All New Vellfire HEV – Ultra Luxury MPV | AutoPrima",
      metaDescription: "Toyota Vellfire HEV di AutoPrima Cibinong. Harga mulai Rp 1,8 Miliar.",
      variants: [
        {
          name:"2.5 VIP HEV", slug:"vellfire-hev-vip",
          fuel:"HybridEV", transmission:"eCVT", engineCc:2487,
          engineLabel:"2.5L 4-cyl Hybrid AWD", drivetrain:"AWD", seats:4, sortOrder:1,
          prices: [
            mkPrice("2.5 VIP HEV",   1872800000, true,  false, 1),
            mkPrice("2.5 VIP HEV P", 1876300000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.487 cc",                         sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive E-Four", sortOrder:2 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"E-Four AWD",                        sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl Mica", hexCode:"#F5F5F5", imageUrl:"/images/cars/vellfire-hev/color-white.jpg",    sortOrder:1 },
        { name:"Sonic Titanium",            hexCode:"#4A4A4A", imageUrl:"/images/cars/vellfire-hev/color-titanium.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/vellfire-hev/exterior-1.jpg", altText:"Toyota Vellfire HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Ottoman Rear Seat",            description:"Kursi belakang ottoman untuk kenyamanan perjalanan jauh.", category:"Comfort",       sortOrder:1 },
        { title:"28-inch Rear Entertainment",   description:"Layar entertainment 28 inci di kursi belakang.",           category:"Entertainment", sortOrder:2 },
      ],
    },

    {
      categoryId:   MPV,
      name:         "Avanza",
      fullName:     "All New Avanza",
      slug:         "avanza",
      tagline:      "New Generation, New Experience",
      description:  "All New Avanza hadir dengan desain modern dan fitur lebih lengkap. MPV keluarga andalan dengan mesin 1.3L/1.5L DOHC.",
      bannerUrl:    "/images/cars/avanza/banner.jpg",
      thumbnailUrl: "/images/cars/avanza/thumbnail.jpg",
      brochureUrl:  "/files/brochure-avanza.pdf",
      startingPrice: 243700000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   false,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    17,
      metaTitle:    "All New Toyota Avanza – MPV Keluarga Terbaik | AutoPrima",
      metaDescription: "All New Toyota Avanza di AutoPrima Cibinong. Harga mulai Rp 243 Juta.",
      variants: [
        {
          name:"1.3 E M/T", slug:"avanza-13-e-mt",
          fuel:"Bensin", transmission:"Manual", engineCc:1329,
          engineLabel:"1.3L 4-cyl DOHC Dual VVT-i", drivetrain:"4x2", seats:7, sortOrder:1,
          prices: [
            mkPrice("1.3 E M/T",  243700000, true,  false, 1),
            mkPrice("1.3 E CVT",  258700000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.329 cc",          sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"95 PS / 6.000 rpm", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual",    sortOrder:3 },
          ],
        },
        {
          name:"1.5 G M/T", slug:"avanza-15-g-mt",
          fuel:"Bensin", transmission:"Manual", engineCc:1496,
          engineLabel:"1.5L 4-cyl DOHC Dual VVT-i", drivetrain:"4x2", seats:7, sortOrder:2,
          prices: [
            mkPrice("1.5 G M/T", 266800000, false, false, 1),
            mkPrice("1.5 G CVT", 281600000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"106 PS / 6.000 rpm", sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"White",           hexCode:"#FFFFFF", imageUrl:"/images/cars/avanza/color-white.jpg",  sortOrder:1 },
        { name:"Silver Metallic", hexCode:"#C0C0C0", imageUrl:"/images/cars/avanza/color-silver.jpg", sortOrder:2 },
        { name:"Black",           hexCode:"#1C1C1C", imageUrl:"/images/cars/avanza/color-black.jpg",  sortOrder:3 },
      ],
      images: [
        { url:"/images/cars/avanza/exterior-1.jpg", altText:"Toyota Avanza tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"DOHC Dual VVT-i Engine", description:"Mesin generasi terbaru yang bertenaga dan irit bahan bakar.", category:"Performance", sortOrder:1 },
        { title:"7-inch Touchscreen",     description:"Head unit layar sentuh 7 inci dengan konektivitas smartphone.", category:"Technology", sortOrder:2 },
      ],
    },

    {
      categoryId:   MPV,
      name:         "Calya",
      fullName:     "New Calya",
      slug:         "calya",
      tagline:      "Smart & Affordable",
      description:  "New Calya hadir sebagai MPV LCGC terjangkau dengan kapasitas 7 penumpang. Hemat bahan bakar untuk keluarga.",
      bannerUrl:    "/images/cars/calya/banner.jpg",
      thumbnailUrl: "/images/cars/calya/thumbnail.jpg",
      brochureUrl:  "/files/brochure-calya.pdf",
      startingPrice: 170200000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   false,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    18,
      metaTitle:    "New Calya – MPV LCGC Terjangkau | AutoPrima",
      metaDescription: "Toyota Calya di AutoPrima Cibinong. Harga mulai Rp 170 Juta.",
      variants: [
        {
          name:"1.2 E STD M/T", slug:"calya-12-e-std-mt",
          fuel:"Bensin", transmission:"Manual", engineCc:1197,
          engineLabel:"1.2L 3-cyl Dual VVT-i", drivetrain:"4x2", seats:7, sortOrder:1,
          prices: [
            mkPrice("1.2 E STD M/T", 170200000, true,  false, 1),
            mkPrice("1.2 E M/T",     173100000, false, false, 2),
            mkPrice("1.2 G M/T",     178800000, false, false, 3),
            mkPrice("1.2 G A/T",     193200000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.197 cc",    sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual / 4-Speed Automatic", sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"White",           hexCode:"#FFFFFF", imageUrl:"/images/cars/calya/color-white.jpg",  sortOrder:1 },
        { name:"Silver Metallic", hexCode:"#C0C0C0", imageUrl:"/images/cars/calya/color-silver.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/calya/exterior-1.jpg", altText:"Toyota Calya tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"7-Seater Capacity", description:"Kabin luas untuk 7 penumpang dengan efisiensi bahan bakar LCGC.", category:"Comfort", sortOrder:1 },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // HATCHBACK
    // ════════════════════════════════════════════════════════════

    {
      categoryId:   HATCH,
      name:         "GR Yaris",
      fullName:     "New GR Yaris",
      slug:         "gr-yaris",
      tagline:      "Born from Rally",
      description:  "New GR Yaris lahir dari teknologi World Rally Championship. Mesin turbo 1.6L dengan GR-FOUR AWD untuk pengalaman berkendara maksimal.",
      bannerUrl:    "/images/cars/gr-yaris/banner.jpg",
      thumbnailUrl: "/images/cars/gr-yaris/thumbnail.jpg",
      brochureUrl:  "/files/brochure-gr-yaris.pdf",
      startingPrice: undefined,
      priceLabel:   "Hubungi Kami",
      label:        "GR",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    19,
      metaTitle:    "New GR Yaris – Hatchback Performa Tinggi | AutoPrima",
      metaDescription: "Toyota GR Yaris di AutoPrima Cibinong. Hatchback bertenaga DNA Rally.",
      variants: [
        {
          name:"GR Yaris 1.6T AWD", slug:"gr-yaris-16t-awd",
          fuel:"Bensin", transmission:"Manual", engineCc:1618,
          engineLabel:"1.6L 3-cyl Turbo GR", drivetrain:"AWD", seats:4, sortOrder:1,
          prices: [{ label:"GR Yaris", platB:undefined, platF:undefined, isBasePrice:true, priceOnRequest:true, sortOrder:1 }],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"G16E-GTS, 3-Silinder, DOHC, Turbo", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.618 cc",                           sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"272 PS / 6.500 rpm",                 sortOrder:3 },
            { category:"Mesin",     specKey:"Torsi Maksimum",  specValue:"370 Nm / 3.000-4.600 rpm",           sortOrder:4 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"GR-FOUR AWD",                        sortOrder:5 },
          ],
        },
      ],
      colors: [
        { name:"Emotional Red II", hexCode:"#C0392B", imageUrl:"/images/cars/gr-yaris/color-red.jpg",   sortOrder:1 },
        { name:"White Pearl",      hexCode:"#F5F5F5", imageUrl:"/images/cars/gr-yaris/color-white.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/gr-yaris/exterior-1.jpg", altText:"Toyota GR Yaris tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"GR-FOUR AWD",      description:"Sistem AWD eksklusif GR untuk traksi optimal.",    category:"Performance", sortOrder:1 },
        { title:"1.6L Turbo 272 PS", description:"Mesin turbo 3 silinder paling bertenaga di kelas.", category:"Performance", sortOrder:2 },
      ],
    },

    {
      categoryId:   HATCH,
      name:         "Yaris GR Sport",
      fullName:     "New Yaris GR Sport",
      slug:         "yaris-gr-sport",
      tagline:      "Style Meets Performance",
      description:  "New Yaris GR Sport menggabungkan gaya sporty GR Sport dengan kenyamanan hatchback sehari-hari.",
      bannerUrl:    "/images/cars/yaris-gr-sport/banner.jpg",
      thumbnailUrl: "/images/cars/yaris-gr-sport/thumbnail.jpg",
      brochureUrl:  "/files/brochure-yaris-gr-sport.pdf",
      startingPrice: undefined,
      priceLabel:   "Hubungi Kami",
      label:        "GR SPORT",
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    20,
      metaTitle:    "New Yaris GR Sport – Hatchback Sporty | AutoPrima",
      metaDescription: "Toyota Yaris GR Sport di AutoPrima Cibinong.",
      variants: [
        {
          name:"Yaris GR Sport 1.5 CVT", slug:"yaris-gr-sport-15-cvt",
          fuel:"Bensin", transmission:"CVT", engineCc:1496,
          engineLabel:"1.5L 4-cyl DOHC", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [{ label:"Yaris GR Sport", platB:undefined, platF:undefined, isBasePrice:true, priceOnRequest:true, sortOrder:1 }],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.496 cc", sortOrder:1 }],
        },
      ],
      colors: [
        { name:"Emotional Red II", hexCode:"#C0392B", imageUrl:"/images/cars/yaris-gr-sport/color-red.jpg",   sortOrder:1 },
        { name:"White",            hexCode:"#F5F5F5", imageUrl:"/images/cars/yaris-gr-sport/color-white.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/yaris-gr-sport/exterior-1.jpg", altText:"Toyota Yaris GR Sport tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"GR Sport Aero Kit", description:"Paket aerodinamika GR Sport untuk tampilan sporty agresif.", category:"Design", sortOrder:1 },
      ],
    },

    {
      categoryId:   HATCH,
      name:         "Agya GR Sport",
      fullName:     "New Agya GR Sport",
      slug:         "agya-gr-sport",
      tagline:      "Compact. Sporty. Agya.",
      description:  "New Agya GR Sport hadir dengan paket sporty GR. City car lincah di perkotaan dengan tampilan menawan.",
      bannerUrl:    "/images/cars/agya-gr-sport/banner.jpg",
      thumbnailUrl: "/images/cars/agya-gr-sport/thumbnail.jpg",
      brochureUrl:  "/files/brochure-agya-gr-sport.pdf",
      startingPrice: 181500000,
      priceLabel:   "Starting from",
      label:        "GR SPORT",
      isNewModel:   false,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    21,
      metaTitle:    "New Agya GR Sport – City Car Sporty | AutoPrima",
      metaDescription: "Toyota Agya GR Sport di AutoPrima Cibinong. Harga mulai Rp 181 Juta.",
      variants: [
        {
          name:"1.2 G M/T", slug:"agya-12-g-mt",
          fuel:"Bensin", transmission:"Manual", engineCc:1197,
          engineLabel:"1.2L 3-cyl DOHC Dual VVT-i", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [
            mkPrice("1.2 E M/T",  173800000, false, false, 1),
            mkPrice("1.2 G M/T",  181500000, true,  false, 2),
            mkPrice("1.2 G CVT",  197700000, false, false, 3),
            mkPrice("1.2 Stylix CVT", 201200000, false, false, 4),
          ],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.197 cc", sortOrder:1 }],
        },
      ],
      colors: [
        { name:"White", hexCode:"#FFFFFF", imageUrl:"/images/cars/agya-gr-sport/color-white.jpg", sortOrder:1 },
        { name:"Red",   hexCode:"#C0392B", imageUrl:"/images/cars/agya-gr-sport/color-red.jpg",   sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/agya-gr-sport/exterior-1.jpg", altText:"Toyota Agya GR Sport tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"GR Sport Package", description:"Paket sporty GR dengan bumper, side skirt, dan aksen eksklusif.", category:"Design", sortOrder:1 },
      ],
    },

    {
      categoryId:   HATCH,
      name:         "Agya Stylix",
      fullName:     "New Agya Stylix",
      slug:         "agya-stylix",
      tagline:      "Style Your Story",
      description:  "New Agya Stylix hadir dengan varian eksklusif yang stylish dan trendi untuk anak muda.",
      bannerUrl:    "/images/cars/agya-stylix/banner.jpg",
      thumbnailUrl: "/images/cars/agya-stylix/thumbnail.jpg",
      brochureUrl:  "/files/brochure-agya-stylix.pdf",
      startingPrice: 201200000,
      priceLabel:   "Starting from",
      label:        "STYLIX",
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    22,
      metaTitle:    "New Agya Stylix – City Car Stylish | AutoPrima",
      metaDescription: "Toyota Agya Stylix di AutoPrima Cibinong. Harga mulai Rp 201 Juta.",
      variants: [
        {
          name:"1.2 Stylix CVT", slug:"agya-stylix-12-cvt",
          fuel:"Bensin", transmission:"CVT", engineCc:1197,
          engineLabel:"1.2L 3-cyl DOHC Dual VVT-i", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [mkPrice("1.2 Stylix CVT", 201200000, true, false, 1)],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.197 cc", sortOrder:1 }],
        },
      ],
      colors: [
        { name:"White", hexCode:"#FFFFFF", imageUrl:"/images/cars/agya-stylix/color-white.jpg", sortOrder:1 },
        { name:"Red",   hexCode:"#C0392B", imageUrl:"/images/cars/agya-stylix/color-red.jpg",   sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/agya-stylix/exterior-1.jpg", altText:"Toyota Agya Stylix tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Stylix Exclusive Package", description:"Paket styling eksklusif dengan aksen unik yang trendi.", category:"Design", sortOrder:1 },
      ],
    },

    {
      categoryId:   HATCH,
      name:         "GR Corolla",
      fullName:     "All New GR Corolla",
      slug:         "gr-corolla",
      tagline:      "Motorsport Inspired",
      description:  "All New GR Corolla adalah hatchback performa tinggi terinspirasi motorsport dengan mesin 1.6L Turbo dan GR-FOUR AWD.",
      bannerUrl:    "/images/cars/gr-corolla/banner.jpg",
      thumbnailUrl: "/images/cars/gr-corolla/thumbnail.jpg",
      brochureUrl:  "/files/brochure-gr-corolla.pdf",
      startingPrice: undefined,
      priceLabel:   "Hubungi Kami",
      label:        "GR",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    23,
      metaTitle:    "All New GR Corolla – Hatchback Performa Tinggi | AutoPrima",
      metaDescription: "Toyota GR Corolla di AutoPrima Cibinong. Hatchback motorsport AWD.",
      variants: [
        {
          name:"GR Corolla 1.6T AWD", slug:"gr-corolla-16t-awd",
          fuel:"Bensin", transmission:"Manual", engineCc:1618,
          engineLabel:"1.6L 3-cyl Turbo", drivetrain:"AWD", seats:5, sortOrder:1,
          prices: [{ label:"GR Corolla", platB:undefined, platF:undefined, isBasePrice:true, priceOnRequest:true, sortOrder:1 }],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.618 cc",          sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"300 PS / 6.500 rpm", sortOrder:2 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"GR-FOUR AWD",         sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Supersonic Red", hexCode:"#C0392B", imageUrl:"/images/cars/gr-corolla/color-red.jpg",   sortOrder:1 },
        { name:"White Pearl",    hexCode:"#F5F5F5", imageUrl:"/images/cars/gr-corolla/color-white.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/gr-corolla/exterior-1.jpg", altText:"Toyota GR Corolla tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"GR-FOUR AWD",       description:"Sistem AWD adaptif GR untuk handling motorsport.",     category:"Performance", sortOrder:1 },
        { title:"1.6L Turbo 300 PS", description:"Mesin turbo 3-silinder bertenaga 300 PS.",             category:"Performance", sortOrder:2 },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // SEDAN
    // ════════════════════════════════════════════════════════════

    {
      categoryId:   SEDAN,
      name:         "Camry HEV",
      fullName:     "New Camry HEV",
      slug:         "camry-hev",
      tagline:      "The Pinnacle of Comfort",
      description:  "New Camry HEV menghadirkan kemewahan sedan premium dengan teknologi hybrid 2.5L. Desain elegan untuk eksekutif modern.",
      bannerUrl:    "/images/cars/camry-hev/banner.jpg",
      thumbnailUrl: "/images/cars/camry-hev/thumbnail.jpg",
      brochureUrl:  "/files/brochure-camry-hev.pdf",
      startingPrice: 855800000,
      priceLabel:   "Starting from",
      label:        "HYBRID",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    24,
      metaTitle:    "New Camry HEV – Sedan Premium Hybrid | AutoPrima",
      metaDescription: "Toyota Camry HEV di AutoPrima Cibinong. Harga mulai Rp 855 Juta.",
      variants: [
        {
          name:"2.5 V A/T", slug:"camry-25-v-at",
          fuel:"Bensin", transmission:"Automatic", engineCc:2487,
          engineLabel:"2.5L 4-cyl DOHC", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [
            mkPrice("2.5 V A/T",   855800000, true,  false, 1),
            mkPrice("2.5 V A/T P", 858900000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.487 cc",          sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"8-Speed Automatic", sortOrder:2 },
          ],
        },
        {
          name:"2.5 L HEV", slug:"camry-25-l-hev",
          fuel:"HybridEV", transmission:"eCVT", engineCc:2487,
          engineLabel:"2.5L 4-cyl Hybrid", drivetrain:"FWD", seats:5, sortOrder:2,
          prices: [
            mkPrice("2.5 L HEV",   976100000, false, false, 1),
            mkPrice("2.5 L HEV P", 979200000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.487 cc",                  sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Sistem",   specValue:"218 PS",                    sortOrder:3 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                     sortOrder:4 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl Mica", hexCode:"#F5F5F5", imageUrl:"/images/cars/camry-hev/color-white.jpg",   sortOrder:1 },
        { name:"Black",                     hexCode:"#1C1C1C", imageUrl:"/images/cars/camry-hev/color-black.jpg",   sortOrder:2 },
        { name:"Graphite Metallic",         hexCode:"#5A5A5A", imageUrl:"/images/cars/camry-hev/color-graphite.jpg", sortOrder:3 },
      ],
      images: [
        { url:"/images/cars/camry-hev/exterior-1.jpg", altText:"Toyota Camry HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Hybrid Synergy Drive 2.5L", description:"Sistem hybrid generasi terbaru untuk akselerasi halus.", category:"Performance", sortOrder:1 },
        { title:"12.3-inch Touchscreen",      description:"Layar sentuh 12.3 inci dengan navigasi built-in.",       category:"Technology",  sortOrder:2 },
        { title:"JBL Premium Sound",          description:"Sistem audio JBL 9-speaker.",                            category:"Comfort",     sortOrder:3 },
      ],
    },

    {
      categoryId:   SEDAN,
      name:         "Corolla Altis HEV GR Sport",
      fullName:     "Altis GR Sport HEV",
      slug:         "corolla-altis-hev-gr-sport",
      tagline:      "Sport the Future",
      description:  "Altis GR Sport HEV memadukan teknologi hybrid dengan tampilan GR Sport yang sporty.",
      bannerUrl:    "/images/cars/altis-hev-gr-sport/banner.jpg",
      thumbnailUrl: "/images/cars/altis-hev-gr-sport/thumbnail.jpg",
      brochureUrl:  "/files/brochure-altis-hev-gr-sport.pdf",
      startingPrice: 584800000,
      priceLabel:   "Starting from",
      label:        "HYBRID",
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    25,
      metaTitle:    "Altis GR Sport HEV – Sedan Hybrid Sporty | AutoPrima",
      metaDescription: "Toyota Corolla Altis GR Sport HEV di AutoPrima Cibinong. Harga mulai Rp 584 Juta.",
      variants: [
        {
          name:"1.8 V A/T", slug:"altis-18-v-at",
          fuel:"Bensin", transmission:"Automatic", engineCc:1798,
          engineLabel:"1.8L 4-cyl DOHC Dual VVT-i", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [mkPrice("1.8 V A/T", 584800000, true, false, 1)],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.798 cc", sortOrder:1 }],
        },
        {
          name:"1.8L HEV", slug:"altis-18-hev",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1798,
          engineLabel:"1.8L Hybrid Synergy Drive", drivetrain:"FWD", seats:5, sortOrder:2,
          prices: [
            mkPrice("1.8L HV",      639200000, false, false, 1),
            mkPrice("1.8L HV GRS",  646600000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.798 cc",                  sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                     sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl", hexCode:"#F5F5F5", imageUrl:"/images/cars/altis-hev-gr-sport/color-white.jpg", sortOrder:1 },
        { name:"Black Mica",           hexCode:"#1C1C1C", imageUrl:"/images/cars/altis-hev-gr-sport/color-black.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/altis-hev-gr-sport/exterior-1.jpg", altText:"Toyota Altis GR Sport HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Hybrid Synergy Drive", description:"Teknologi hybrid 1.8L untuk efisiensi dan performa optimal.", category:"Performance", sortOrder:1 },
      ],
    },

    {
      categoryId:   SEDAN,
      name:         "GR 86",
      fullName:     "All New GR 86",
      slug:         "gr-86",
      tagline:      "Pure. Sports. Joy.",
      description:  "All New GR 86 adalah sports car murni dengan mesin boxer 2.4L NA. Dibuat untuk pengalaman berkendara yang intim dan menyenangkan.",
      bannerUrl:    "/images/cars/gr-86/banner.jpg",
      thumbnailUrl: "/images/cars/gr-86/thumbnail.jpg",
      brochureUrl:  "/files/brochure-gr-86.pdf",
      startingPrice: undefined,
      priceLabel:   "Hubungi Kami",
      label:        "GR",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    26,
      metaTitle:    "All New GR 86 – Sports Coupe Toyota | AutoPrima",
      metaDescription: "Toyota GR 86 di AutoPrima Cibinong. Sports car murni bertenaga 234 PS.",
      variants: [
        {
          name:"GR 86 2.4 M/T", slug:"gr-86-24-mt",
          fuel:"Bensin", transmission:"Manual", engineCc:2387,
          engineLabel:"2.4L Boxer 4-cyl DOHC", drivetrain:"RWD", seats:4, sortOrder:1,
          prices: [{ label:"GR 86", platB:undefined, platF:undefined, isBasePrice:true, priceOnRequest:true, sortOrder:1 }],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"FA24, Boxer 4-Silinder, DOHC", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.387 cc",                     sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"234 PS / 7.000 rpm",           sortOrder:3 },
            { category:"Mesin",     specKey:"Torsi Maksimum",  specValue:"250 Nm / 3.700 rpm",           sortOrder:4 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"Rear-Wheel Drive",             sortOrder:5 },
          ],
        },
      ],
      colors: [
        { name:"Halo White",   hexCode:"#F5F5F5", imageUrl:"/images/cars/gr-86/color-white.jpg", sortOrder:1 },
        { name:"Neptune Blue", hexCode:"#1A3A5A", imageUrl:"/images/cars/gr-86/color-blue.jpg",  sortOrder:2 },
        { name:"Ignition Red", hexCode:"#C0392B", imageUrl:"/images/cars/gr-86/color-red.jpg",   sortOrder:3 },
      ],
      images: [
        { url:"/images/cars/gr-86/exterior-1.jpg", altText:"Toyota GR 86 tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"2.4L Boxer Engine 234 PS", description:"Mesin boxer 4-silinder dengan center of gravity rendah.", category:"Performance", sortOrder:1 },
        { title:"Rear-Wheel Drive",          description:"Penggerak roda belakang untuk pengalaman berkendara murni.", category:"Performance", sortOrder:2 },
      ],
    },

    {
      categoryId:   SEDAN,
      name:         "GR Supra",
      fullName:     "New GR Supra",
      slug:         "gr-supra",
      tagline:      "The Icon Returns",
      description:  "New GR Supra adalah legenda yang kembali hadir. Sports car ikonik Toyota dengan mesin turbo inline-6 bertenaga tinggi.",
      bannerUrl:    "/images/cars/gr-supra/banner.jpg",
      thumbnailUrl: "/images/cars/gr-supra/thumbnail.jpg",
      brochureUrl:  "/files/brochure-gr-supra.pdf",
      startingPrice: undefined,
      priceLabel:   "Hubungi Kami",
      label:        "GR",
      isNewModel:   true,
      isFeatured:   true,
      isActive:     true,
      sortOrder:    27,
      metaTitle:    "New GR Supra – Sports Car Legendaris Toyota | AutoPrima",
      metaDescription: "Toyota GR Supra di AutoPrima Cibinong. Sports car ikonik 387 PS.",
      variants: [
        {
          name:"GR Supra 3.0T", slug:"gr-supra-30t",
          fuel:"Bensin", transmission:"Automatic", engineCc:2998,
          engineLabel:"3.0L Inline-6 Turbo", drivetrain:"RWD", seats:2, sortOrder:1,
          prices: [{ label:"GR Supra", platB:undefined, platF:undefined, isBasePrice:true, priceOnRequest:true, sortOrder:1 }],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"Inline-6, DOHC, Turbo",        sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.998 cc",                     sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"387 PS / 5.800 rpm",           sortOrder:3 },
            { category:"Mesin",     specKey:"Torsi Maksimum",  specValue:"500 Nm / 1.800-5.000 rpm",     sortOrder:4 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"Rear-Wheel Drive",             sortOrder:5 },
          ],
        },
      ],
      colors: [
        { name:"Phantom Matte Gray", hexCode:"#5A5A5A", imageUrl:"/images/cars/gr-supra/color-gray.jpg",  sortOrder:1 },
        { name:"Renaissance Red",    hexCode:"#8B1A1A", imageUrl:"/images/cars/gr-supra/color-red.jpg",   sortOrder:2 },
        { name:"White",              hexCode:"#F5F5F5", imageUrl:"/images/cars/gr-supra/color-white.jpg", sortOrder:3 },
      ],
      images: [
        { url:"/images/cars/gr-supra/exterior-1.jpg", altText:"Toyota GR Supra tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"3.0L Turbo Inline-6 387 PS", description:"Mesin turbo inline-6 yang memberikan akselerasi dahsyat.", category:"Performance", sortOrder:1 },
        { title:"Adaptive Variable Suspension", description:"Suspensi adaptif untuk handling precision.",             category:"Performance", sortOrder:2 },
      ],
    },

    {
      categoryId:   SEDAN,
      name:         "Vios",
      fullName:     "All New Vios",
      slug:         "vios",
      tagline:      "Style. Comfort. Value.",
      description:  "All New Vios hadir sebagai sedan compact yang stylish dan bertenaga. Mesin 1.5L dengan fitur modern.",
      bannerUrl:    "/images/cars/vios/banner.jpg",
      thumbnailUrl: "/images/cars/vios/thumbnail.jpg",
      brochureUrl:  "/files/brochure-vios.pdf",
      startingPrice: 375800000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    28,
      metaTitle:    "All New Vios – Sedan Compact Modern | AutoPrima",
      metaDescription: "Toyota Vios di AutoPrima Cibinong. Harga mulai Rp 375 Juta.",
      variants: [
        {
          name:"1.5 G CVT", slug:"vios-15-g-cvt",
          fuel:"Bensin", transmission:"CVT", engineCc:1496,
          engineLabel:"1.5L 4-cyl DOHC Dual VVT-i", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [
            mkPrice("1.5 G CVT",     375800000, true,  false, 1),
            mkPrice("1.5 G CVT TSS", 389200000, false, false, 2),
            mkPrice("1.5 G CVT PC",  377300000, false, false, 3),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"107 PS / 6.000 rpm", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"CVT",               sortOrder:3 },
          ],
        },
        {
          name:"1.5 HEV", slug:"vios-15-hev",
          fuel:"HybridEV", transmission:"eCVT", engineCc:1496,
          engineLabel:"1.5L Hybrid Synergy Drive", drivetrain:"FWD", seats:5, sortOrder:2,
          prices: [
            mkPrice("1.5 HEV 1T", 460000000, false, false, 1),
            mkPrice("1.5 HEV 2T", 464000000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Sistem Hybrid", specValue:"Toyota Hybrid Synergy Drive", sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",          specValue:"e-CVT",                       sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"White",           hexCode:"#FFFFFF", imageUrl:"/images/cars/vios/color-white.jpg",  sortOrder:1 },
        { name:"Black",           hexCode:"#1C1C1C", imageUrl:"/images/cars/vios/color-black.jpg",  sortOrder:2 },
        { name:"Silver Metallic", hexCode:"#C0C0C0", imageUrl:"/images/cars/vios/color-silver.jpg", sortOrder:3 },
      ],
      images: [
        { url:"/images/cars/vios/exterior-1.jpg", altText:"Toyota Vios tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Toyota Safety Sense", description:"Sistem keselamatan aktif untuk perlindungan optimal.", category:"Safety",      sortOrder:1 },
        { title:"Hybrid Option",       description:"Tersedia varian hybrid untuk efisiensi terbaik.",      category:"Performance", sortOrder:2 },
      ],
    },

    {
      categoryId:   SEDAN,
      name:         "Corolla Altis",
      fullName:     "New Corolla Altis",
      slug:         "corolla-altis",
      tagline:      "The Legacy Continues",
      description:  "New Corolla Altis mempertahankan warisan sedan terbaik Toyota dengan teknologi dan desain terkini.",
      bannerUrl:    "/images/cars/corolla-altis/banner.jpg",
      thumbnailUrl: "/images/cars/corolla-altis/thumbnail.jpg",
      brochureUrl:  "/files/brochure-corolla-altis.pdf",
      startingPrice: 584800000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   false,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    29,
      metaTitle:    "New Corolla Altis – Sedan Premium Toyota | AutoPrima",
      metaDescription: "Toyota Corolla Altis di AutoPrima Cibinong. Harga mulai Rp 584 Juta.",
      variants: [
        {
          name:"1.8 V A/T", slug:"corolla-altis-18-v-at",
          fuel:"Bensin", transmission:"Automatic", engineCc:1798,
          engineLabel:"1.8L 4-cyl DOHC Dual VVT-i", drivetrain:"FWD", seats:5, sortOrder:1,
          prices: [mkPrice("1.8 V A/T", 584800000, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.798 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"140 PS / 6.400 rpm", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"CVT",               sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"White Pearl", hexCode:"#F5F5F5", imageUrl:"/images/cars/corolla-altis/color-white.jpg", sortOrder:1 },
        { name:"Black",       hexCode:"#1C1C1C", imageUrl:"/images/cars/corolla-altis/color-black.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/corolla-altis/exterior-1.jpg", altText:"Toyota Corolla Altis tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"DOHC Dual VVT-i Engine", description:"Mesin 1.8L bertenaga dengan Variable Valve Timing.", category:"Performance", sortOrder:1 },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // COMMERCIAL
    // ════════════════════════════════════════════════════════════

    {
      categoryId:   COMM,
      name:         "Hiace Premio",
      fullName:     "New Hiace Premio",
      slug:         "hiace-premio",
      tagline:      "Premium People Mover",
      description:  "New Hiace Premio menghadirkan kenyamanan premium untuk transportasi kelompok. Kabin luas dan mesin diesel bertenaga.",
      bannerUrl:    "/images/cars/hiace-premio/banner.jpg",
      thumbnailUrl: "/images/cars/hiace-premio/thumbnail.jpg",
      brochureUrl:  "/files/brochure-hiace-premio.pdf",
      startingPrice: 678800000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    30,
      metaTitle:    "New Hiace Premio – Minibus Premium | AutoPrima",
      metaDescription: "Toyota Hiace Premio di AutoPrima Cibinong. Harga mulai Rp 678 Juta.",
      variants: [
        {
          name:"Premio M/T", slug:"hiace-premio-mt",
          fuel:"Diesel", transmission:"Manual", engineCc:2800,
          engineLabel:"2.8L 4-cyl Turbo Diesel", drivetrain:"4x2", seats:10, sortOrder:1,
          prices: [
            mkPrice("Premio M/T Black",      678800000, true,  false, 1),
            mkPrice("Premio M/T Silver/Beige", 678800000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin",    specValue:"2.755 cc",          sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum",    specValue:"177 PS / 3.400 rpm", sortOrder:2 },
            { category:"Kapasitas", specKey:"Jumlah Penumpang",   specValue:"10 Orang",          sortOrder:3 },
            { category:"Transmisi", specKey:"Tipe",               specValue:"5-Speed Manual",    sortOrder:4 },
          ],
        },
      ],
      colors: [
        { name:"Black",        hexCode:"#1C1C1C", imageUrl:"/images/cars/hiace-premio/color-black.jpg",  sortOrder:1 },
        { name:"Silver/Beige", hexCode:"#D4C5A9", imageUrl:"/images/cars/hiace-premio/color-silver.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/hiace-premio/exterior-1.jpg", altText:"Toyota Hiace Premio tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Captain Seat Premium", description:"Kursi captain berbahan premium dengan sandaran kepala dan armrest.", category:"Comfort", sortOrder:1 },
        { title:"Dual AC",              description:"AC depan dan belakang untuk kenyamanan seluruh penumpang.",          category:"Comfort", sortOrder:2 },
      ],
    },

    {
      categoryId:   COMM,
      name:         "Hiace Commuter",
      fullName:     "Hiace Commuter",
      slug:         "hiace-commuter",
      tagline:      "Built for the Journey",
      description:  "Hiace Commuter adalah pilihan transportasi komersial yang handal dan terpercaya dengan kapasitas penumpang besar.",
      bannerUrl:    "/images/cars/hiace-commuter/banner.jpg",
      thumbnailUrl: "/images/cars/hiace-commuter/thumbnail.jpg",
      brochureUrl:  "/files/brochure-hiace-commuter.pdf",
      startingPrice: 575400000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   false,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    31,
      metaTitle:    "Hiace Commuter – Minibus Komersial | AutoPrima",
      metaDescription: "Toyota Hiace Commuter di AutoPrima Cibinong. Harga mulai Rp 575 Juta.",
      variants: [
        {
          name:"Commuter M/T", slug:"hiace-commuter-mt",
          fuel:"Diesel", transmission:"Manual", engineCc:2800,
          engineLabel:"2.8L 4-cyl Turbo Diesel", drivetrain:"4x2", seats:15, sortOrder:1,
          prices: [
            mkPrice("Commuter M/T 1T", 575400000, true,  false, 1),
            mkPrice("Commuter M/T 2T", 575400000, false, false, 2),
          ],
          specs: [
            { category:"Kapasitas", specKey:"Jumlah Penumpang", specValue:"15 Orang",    sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",             specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"White", hexCode:"#FFFFFF", imageUrl:"/images/cars/hiace-commuter/color-white.jpg", sortOrder:1 },
      ],
      images: [
        { url:"/images/cars/hiace-commuter/exterior-1.jpg", altText:"Toyota Hiace Commuter tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Large Capacity Cabin", description:"Kabin luas untuk 15 penumpang dengan akses mudah.", category:"Comfort", sortOrder:1 },
      ],
    },

    {
      categoryId:   COMM,
      name:         "Hilux Rangga",
      fullName:     "Hilux Rangga",
      slug:         "hilux-rangga",
      tagline:      "Strong. Versatile. Rangga.",
      description:  "Hilux Rangga adalah pickup serbaguna terbaru Toyota. Berbagai konfigurasi untuk kebutuhan komersial dan personal.",
      bannerUrl:    "/images/cars/hilux-rangga/banner.jpg",
      thumbnailUrl: "/images/cars/hilux-rangga/thumbnail.jpg",
      brochureUrl:  "/files/brochure-hilux-rangga.pdf",
      startingPrice: 194300000,
      priceLabel:   "Starting from",
      label:        "NEW",
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    32,
      metaTitle:    "Hilux Rangga – Pickup Serbaguna | AutoPrima",
      metaDescription: "Toyota Hilux Rangga di AutoPrima Cibinong. Harga mulai Rp 194 Juta.",
      variants: [
        {
          name:"M/T CHSS PU 2.0 Bensin", slug:"hilux-rangga-chss-pu-20-bensin",
          fuel:"Bensin", transmission:"Manual", engineCc:1998,
          engineLabel:"2.0L 4-cyl Bensin", drivetrain:"4x2", seats:2, sortOrder:1,
          prices: [
            mkPrice("M/T CHSS PU 2.0 STD",  194300000, true,  false, 1),
            mkPrice("M/T PU 2.0 STD",        199200000, false, false, 2),
            mkPrice("M/T PU 2.0 HIGH T10",   221500000, false, false, 3),
            mkPrice("A/T MB 2.4 HIGH T11",   304300000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.998 cc",    sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
        {
          name:"M/T PU 2.4 Diesel", slug:"hilux-rangga-pu-24-diesel",
          fuel:"Diesel", transmission:"Manual", engineCc:2393,
          engineLabel:"2.4L 4-cyl Turbo Diesel", drivetrain:"4x2", seats:2, sortOrder:2,
          prices: [
            mkPrice("M/T CHSS PU 2.4 STD", 249100000, false, false, 1),
            mkPrice("M/T PU 2.4 STD",      254100000, false, false, 2),
            mkPrice("M/T DB 2.4 STD R",    295400000, false, false, 3),
            mkPrice("A/T PU 2.4 HIGH T10", 309600000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",    sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"Manual / Automatic", sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"White",           hexCode:"#FFFFFF", imageUrl:"/images/cars/hilux-rangga/color-white.jpg",  sortOrder:1 },
        { name:"Silver Metallic", hexCode:"#C0C0C0", imageUrl:"/images/cars/hilux-rangga/color-silver.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/hilux-rangga/exterior-1.jpg", altText:"Toyota Hilux Rangga tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Multi-Configuration", description:"Tersedia berbagai konfigurasi dari single cab hingga double cab.", category:"Versatility", sortOrder:1 },
      ],
    },

    {
      categoryId:   COMM,
      name:         "Hilux D Cab",
      fullName:     "New Hilux D Cab",
      slug:         "hilux-d-cab",
      tagline:      "Tough. Capable. Hilux.",
      description:  "New Hilux Double Cab menghadirkan pickup tangguh dengan kabin 5-penumpang dan mesin diesel 2.4L bertenaga.",
      bannerUrl:    "/images/cars/hilux-d-cab/banner.jpg",
      thumbnailUrl: "/images/cars/hilux-d-cab/thumbnail.jpg",
      brochureUrl:  "/files/brochure-hilux-d-cab.pdf",
      startingPrice: 456300000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    33,
      metaTitle:    "New Hilux Double Cab – Pickup Tangguh | AutoPrima",
      metaDescription: "Toyota Hilux D Cab di AutoPrima Cibinong. Harga mulai Rp 456 Juta.",
      variants: [
        {
          name:"DC 2.4 E M/T", slug:"hilux-dc-24-e-mt",
          fuel:"Diesel", transmission:"Manual", engineCc:2393,
          engineLabel:"2.4L 4-cyl Turbo Diesel", drivetrain:"4x2", seats:5, sortOrder:1,
          prices: [
            mkPrice("DC M/T 2.4 E",     456300000, true,  false, 1),
            mkPrice("DC M/T 2.4 E RTS", 465200000, false, false, 2),
            mkPrice("DC M/T 2.4 G",     490100000, false, false, 3),
            mkPrice("DC A/T 2.4 V",     545900000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin",  specValue:"2.393 cc",                   sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",             specValue:"6-Speed Manual / Automatic", sortOrder:2 },
            { category:"Kapasitas", specKey:"Jumlah Penumpang", specValue:"5 Orang",                   sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"White",           hexCode:"#FFFFFF", imageUrl:"/images/cars/hilux-d-cab/color-white.jpg",  sortOrder:1 },
        { name:"Silver Metallic", hexCode:"#C0C0C0", imageUrl:"/images/cars/hilux-d-cab/color-silver.jpg", sortOrder:2 },
      ],
      images: [
        { url:"/images/cars/hilux-d-cab/exterior-1.jpg", altText:"Toyota Hilux D Cab tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"2.4L Turbo Diesel", description:"Mesin diesel turbo bertenaga untuk kemampuan angkut maksimal.", category:"Performance", sortOrder:1 },
      ],
    },

    {
      categoryId:   COMM,
      name:         "Hilux S Cab",
      fullName:     "New Hilux S Cab",
      slug:         "hilux-s-cab",
      tagline:      "Work Hard. Drive Harder.",
      description:  "New Hilux Single Cab adalah pickup kerja yang tangguh dan efisien untuk kebutuhan bisnis harian.",
      bannerUrl:    "/images/cars/hilux-s-cab/banner.jpg",
      thumbnailUrl: "/images/cars/hilux-s-cab/thumbnail.jpg",
      brochureUrl:  "/files/brochure-hilux-s-cab.pdf",
      startingPrice: 416800000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    34,
      metaTitle:    "New Hilux Single Cab – Pickup Kerja | AutoPrima",
      metaDescription: "Toyota Hilux S Cab di AutoPrima Cibinong. Harga mulai Rp 416 Juta.",
      variants: [
        {
          name:"SC M/T 2.4 DSL 4x4", slug:"hilux-sc-24-mt-4x4",
          fuel:"Diesel", transmission:"Manual", engineCc:2393,
          engineLabel:"2.4L 4-cyl Turbo Diesel", drivetrain:"4x4", seats:2, sortOrder:1,
          prices: [mkPrice("SC M/T 2.4 DSL 4x4", 416800000, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",    sortOrder:1 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"4x4",         sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Manual", sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"White", hexCode:"#FFFFFF", imageUrl:"/images/cars/hilux-s-cab/color-white.jpg", sortOrder:1 },
      ],
      images: [
        { url:"/images/cars/hilux-s-cab/exterior-1.jpg", altText:"Toyota Hilux S Cab tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"4x4 Capability", description:"Sistem 4x4 untuk kemampuan off-road dan medan berat.", category:"Performance", sortOrder:1 },
      ],
    },

    {
      categoryId:   COMM,
      name:         "Dyna",
      fullName:     "New Dyna",
      slug:         "dyna",
      tagline:      "Built for Business",
      description:  "New Dyna adalah truk ringan andalan Toyota untuk kebutuhan komersial dengan kapasitas muatan besar.",
      bannerUrl:    "/images/cars/dyna/banner.jpg",
      thumbnailUrl: "/images/cars/dyna/thumbnail.jpg",
      brochureUrl:  "/files/brochure-dyna.pdf",
      startingPrice: 509300000,
      priceLabel:   "Starting from",
      label:        null,
      isNewModel:   true,
      isFeatured:   false,
      isActive:     true,
      sortOrder:    35,
      metaTitle:    "New Dyna – Truk Ringan Komersial | AutoPrima",
      metaDescription: "Toyota Dyna di AutoPrima Cibinong. Harga mulai Rp 509 Juta.",
      variants: [
        {
          name:"M/T 4x2 6", slug:"dyna-4x2-6",
          fuel:"Diesel", transmission:"Manual", engineCc:0,
          engineLabel:"Diesel", drivetrain:"4x2", seats:3, sortOrder:1,
          prices: [
            mkPrice("M/T 4x2 6",       509300000, true,  false, 1),
            mkPrice("M/T 4x2 6 (PTO)", 513300000, false, false, 2),
          ],
          specs: [
            { category:"Kapasitas", specKey:"GVW",  specValue:"6.000 kg", sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe", specValue:"Manual",   sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"White", hexCode:"#FFFFFF", imageUrl:"/images/cars/dyna/color-white.jpg", sortOrder:1 },
      ],
      images: [
        { url:"/images/cars/dyna/exterior-1.jpg", altText:"Toyota Dyna tampak depan", category:"exterior", isPrimary:true, sortOrder:1 },
      ],
      features: [
        { title:"Heavy Duty Payload", description:"Kapasitas muatan tinggi untuk kebutuhan angkut komersial.", category:"Performance", sortOrder:1 },
      ],
    },
  ];
}

// ── Main Seeder ──────────────────────────────────────────────────

async function seed() {
  await connectDB();

  // 1. Upsert Categories
  console.log("\n📁 Seeding categories...");
  const categoryMap: Record<string, Types.ObjectId> = {};

  for (const cat of CATEGORIES) {
    const doc = await CarCategory.findOneAndUpdate(
      { slug: cat.slug },
      { $set: cat },
      { upsert: true, returnDocument: "after" }
    );
    categoryMap[cat.slug] = doc._id as Types.ObjectId;
    console.log(`  ✅ ${cat.name} → ${doc._id}`);
  }

  // 2. Upsert Cars
  console.log("\n🚗 Seeding cars...");
  const carsData = getCarsData(categoryMap);

  let inserted = 0, updated = 0;
  for (const car of carsData) {
    const existing = await Car.findOne({ slug: car.slug });
    if (existing) {
      await Car.findOneAndUpdate({ slug: car.slug }, { $set: car }, { returnDocument: "after" });
      console.log(`  🔄 Updated: ${car.fullName}`);
      updated++;
    } else {
      await Car.create(car);
      console.log(`  ✅ Inserted: ${car.fullName}`);
      inserted++;
    }
  }

  console.log(`\n✅ Done! Inserted: ${inserted}, Updated: ${updated}`);
  console.log(`   Total cars: ${carsData.length} | Categories: ${CATEGORIES.length}`);

  await mongoose.disconnect();
  console.log("🔌 MongoDB disconnected");
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});