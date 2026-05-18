/**
 * seed.ts
 * Jalankan: npx tsx scripts/seed.ts
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

// ── Inline schemas ────────────────────────────────────────────────

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

// ── Seed Data ─────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "SUV",        slug: "suv",        sortOrder: 1, isActive: true },
  { name: "MPV",        slug: "mpv",        sortOrder: 2, isActive: true },
  { name: "Hatchback",  slug: "hatchback",  sortOrder: 3, isActive: true },
  { name: "Sedan",      slug: "sedan",      sortOrder: 4, isActive: true },
  { name: "Commercial", slug: "commercial", sortOrder: 5, isActive: true },
];

// Helper: buat price entry dengan platB & platF langsung dari data Excel
function p(
  label: string,
  platB: number | null,
  platF: number | null,
  isBasePrice = false,
  priceOnRequest = false,
  sortOrder = 0,
) {
  return {
    label,
    platB:          platB  ?? undefined,
    platF:          platF  ?? undefined,
    isBasePrice,
    priceOnRequest,
    sortOrder,
  };
}

// Price on request helper
function por(label: string, sortOrder = 0) {
  return { label, platB: undefined, platF: undefined, isBasePrice: true, priceOnRequest: true, sortOrder };
}

function getCarsData(categoryMap: Record<string, Types.ObjectId>) {
  const SUV   = categoryMap["suv"];
  const MPV   = categoryMap["mpv"];
  const HATCH = categoryMap["hatchback"];
  const SEDAN = categoryMap["sedan"];
  const COMM  = categoryMap["commercial"];

  return [

    // ══════════════════════════════════════════════
    // SUV
    // ══════════════════════════════════════════════

    {
      categoryId: SUV,
      name: "Fortuner", 
      fullName: "New Fortuner", 
      slug: "fortuner",
      tagline: "Discover Your Fortuner",
      description: "New Toyota Fortuner hadir dengan gagah membawa kombinasi ketangguhan medan off-road, performa mesin bertenaga, serta kemewahan interior untuk kenyamanan berkendara di segala medan.",
      bannerUrl: "/images/cars/fortuner/banner.jpg",
      thumbnailUrl: "/images/cars/fortuner/thumbnail.jpg",
      brochureUrl: "/files/brochure-fortuner.pdf",
      startingPrice: 584500000, 
      priceLabel: "Starting from",
      label: "SUV", 
      isNewModel: true, 
      isFeatured: true, 
      isActive: true, 
      sortOrder: 1,
      metaTitle: "New Toyota Fortuner – Harga & Promo Terbaru | AutoPrima",
      metaDescription: "Beli New Toyota Fortuner di AutoPrima. Pilihan mesin Diesel 2.4L, 2.8L, dan Bensin 2.7L. Harga mulai Rp 584 Juta.",
      variants: [
        {
          name: "2.4 G M/T", 
          slug: "fortuner-g-24-mt",
          fuel: "Diesel", transmission: "Manual", engineCc: 2393,
          engineLabel: "2.4L 4-cyl Turbo Diesel", drivetrain: "4x2", seats: 7, sortOrder: 1,
          prices: [
            p("M/T 2.4 G", 584500000, 586500000, true, false, 1),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",       sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Manual", sortOrder:2 },
          ],
        },
        {
          name: "2.4 G A/T", 
          slug: "fortuner-g-24-at",
          fuel: "Diesel", transmission: "Automatic", engineCc: 2393,
          engineLabel: "2.4L 4-cyl Turbo Diesel", drivetrain: "4x2", seats: 7, sortOrder: 2,
          prices: [
            p("A/T 2.4 G", 602600000, 604200000, false, false, 1),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",          sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Automatic", sortOrder:2 },
          ],
        },
        {
          name: "2.8 VRZ 4x2 A/T (DIESEL)", 
          slug: "fortuner-vrz-28-4x2",
          fuel: "Diesel", transmission: "Automatic", engineCc: 2755,
          engineLabel: "2.8L 4-cyl Turbo Diesel", drivetrain: "4x2", seats: 7, sortOrder: 3,
          prices: [
            p("4X2",                 652800000, 654200000, false, false, 1),
            p("TSS 4X2",             668700000, 670100000, false, false, 2),
            p("GRS TSS 4X2 1T",      679300000, 680700000, false, false, 3),
            p("GRS TSS 4X2 2T",      684300000, 685700000, false, false, 4),
            p("GRS TSS 4X2 P",       682300000, 683700000, false, false, 5),
            p("4X2 NON RSE",         647100000, 648600000, false, false, 6),
            p("TSS 4X2 NON RSE",     663000000, 664400000, false, false, 7), // Typo 63.000.000 diperbaiki jadi 663jt
            p("GRS TSS 4X2 NON RSE", 673500000, 675000000, false, false, 8),
          ],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"1GD-FTV, 4-Silinder, DOHC, Turbo", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.755 cc",                          sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Automatic",                 sortOrder:3 },
          ],
        },
        {
          name: "2.8 4x4 A/T (DIESEL)", 
          slug: "fortuner-28-4x4",
          fuel: "Diesel", transmission: "Automatic", engineCc: 2755,
          engineLabel: "2.8L 4-cyl Turbo Diesel", drivetrain: "4x4", seats: 7, sortOrder: 4,
          prices: [
            p("4X4 NON RSE",         752600000, 753600000, false, false, 1),
            p("4X4 GRS TSS NON RSE", 783900000, 784700000, false, false, 2),
            p("4X4",                 758400000, 759200000, false, false, 3),
            p("GRS 4X4 2T",          794600000, 795400000, false, false, 4),
            p("GRS 4X4 1T",          789600000, 790600000, false, false, 5),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.755 cc",                 sortOrder:1 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"4WD Shift-On-The-Fly",     sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Automatic",        sortOrder:3 },
          ],
        },
        {
          name: "2.7 SRZ A/T (BENSIN)", 
          slug: "fortuner-srz-27-at",
          fuel: "Bensin", transmission: "Automatic", engineCc: 2694,
          engineLabel: "2.7L 4-cyl VVT-i", drivetrain: "4x2", seats: 7, sortOrder: 5,
          prices: [
            p("RSE",      626100000, 627500000, false, false, 1),
            p("NON RSE",  620500000, 622000000, false, false, 2),
            p("GRS RSE",  629900000, 631300000, false, false, 3),
            p("GRS 1T",   635500000, 636900000, false, false, 4),
            p("GRS 1T P", 638500000, 639900000, false, false, 5),
            p("GRS 2T P", 640600000, 642000000, false, false, 6),
          ],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"2TR-FE, 4-Silinder, DOHC, VVT-i", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.694 cc",                         sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Automatic",                sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Attitude Black Mica",  hexCode:"#1C1C1C", imageUrl:"/images/cars/fortuner/color-black.jpg",  sortOrder:1 },
        { name:"Super White II",       hexCode:"#F5F5F5", imageUrl:"/images/cars/fortuner/color-white.jpg",  sortOrder:2 },
        { name:"Silver Metallic",      hexCode:"#A8A8A8", imageUrl:"/images/cars/fortuner/color-silver.jpg", sortOrder:3 },
        { name:"Phantom Brown Metallic", hexCode:"#3B2F2F", imageUrl:"/images/cars/fortuner/color-brown.jpg", sortOrder:4 },
      ],
      images: [
        { url:"/images/cars/fortuner/exterior-1.jpg", altText:"Toyota Fortuner tampak depan",   category:"exterior", isPrimary:true,  sortOrder:1 },
        { url:"/images/cars/fortuner/exterior-2.jpg", altText:"Toyota Fortuner tampak samping", category:"exterior", isPrimary:false, sortOrder:2 },
        { url:"/images/cars/fortuner/interior-1.jpg", altText:"Interior Toyota Fortuner",       category:"interior", isPrimary:false, sortOrder:3 },
      ],
      features: [
        { title:"Powerful Engine",       description:"Pilihan mesin tangguh untuk melibas segala medan.",                               category:"Performance", sortOrder:1 },
        { title:"Toyota Safety Sense",   description:"Fitur keselamatan aktif mutakhir terintegrasi menjaga perjalanan Anda.",          category:"Safety",      sortOrder:2 },
        { title:"Premium Interior",      description:"Kabin luas dengan material jok premium bernuansa gelap elegan.",                  category:"Comfort",     sortOrder:3 },
        { title:"Drive Mode System",     description:"Pilihan mode berkendara Eco, Normal, dan Power Mode sesuai kebutuhan jalan.",     category:"Performance", sortOrder:4 },
      ],
    },

    // ─── Rush ────────────────────────────────────────────────────
    {
      categoryId: SUV,
      name: "Rush GR Sport", fullName: "New Rush GR Sport", slug: "rush-gr-sport",
      tagline: "Sport Your Journey",
      description: "New Rush GR Sport hadir dengan tampilan sporty berjiwa GR dan performa mesin 1.5L DOHC. SUV 7-seater kompak yang lincah untuk aktivitas sehari-hari.",
      bannerUrl: "/images/cars/rush-gr-sport/banner.jpg",
      thumbnailUrl: "/images/cars/rush-gr-sport/thumbnail.jpg",
      brochureUrl: "/files/brochure-rush-gr-sport.pdf",
      startingPrice: 289400000, priceLabel: "Starting from",
      label: "GR SPORT", isNewModel: true, isFeatured: false, isActive: true, sortOrder: 2,
      metaTitle: "New Rush GR Sport – Harga Terbaru | AutoPrima",
      metaDescription: "Toyota Rush GR Sport di AutoPrima Cibinong. Harga mulai Rp 289 Juta.",
      variants: [
        {
          name: "1.5 G M/T", slug: "rush-g-15-mt",
          fuel: "Bensin", transmission: "Manual", engineCc: 1496,
          engineLabel: "1.5L 4-cyl DOHC", drivetrain: "4x2", seats: 7, sortOrder: 1,
          prices: [p("M/T 1.5 G", 289400000, 296400000, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",       sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
        {
          name: "1.5 G A/T", slug: "rush-g-15-at",
          fuel: "Bensin", transmission: "Automatic", engineCc: 1496,
          engineLabel: "1.5L 4-cyl DOHC", drivetrain: "4x2", seats: 7, sortOrder: 2,
          prices: [p("A/T 1.5 G", 300400000, 307300000, false, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",           sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"4-Speed Automatic",  sortOrder:2 },
          ],
        },
        {
          name: "1.5 S GR Sport M/T", slug: "rush-grs-15-mt",
          fuel: "Bensin", transmission: "Manual", engineCc: 1496,
          engineLabel: "1.5L 4-cyl DOHC", drivetrain: "4x2", seats: 7, sortOrder: 3,
          prices: [p("M/T 1.5 S GRS", 304800000, 311800000, false, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",       sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
        {
          name: "1.5 S GR Sport A/T", slug: "rush-grs-15-at",
          fuel: "Bensin", transmission: "Automatic", engineCc: 1496,
          engineLabel: "1.5L 4-cyl DOHC", drivetrain: "4x2", seats: 7, sortOrder: 4,
          prices: [p("A/T 1.5 S GRS", 315600000, 322500000, false, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",          sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"4-Speed Automatic", sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"Super White II",  hexCode:"#F5F5F5", imageUrl:"/images/cars/rush-gr-sport/color-white.jpg",  sortOrder:1 },
        { name:"Black Mica",      hexCode:"#1C1C1C", imageUrl:"/images/cars/rush-gr-sport/color-black.jpg",  sortOrder:2 },
        { name:"Silver Metallic", hexCode:"#A8A8A8", imageUrl:"/images/cars/rush-gr-sport/color-silver.jpg", sortOrder:3 },
      ],
      images: [{ url:"/images/cars/rush-gr-sport/exterior-1.jpg", altText:"Toyota Rush GR Sport tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"GR Sport Styling",   description:"Paket eksterior sporty dengan aksen GR Sport yang agresif.",   category:"Design",      sortOrder:1 },
        { title:"7-inch Touchscreen", description:"Head unit 7 inci dengan Android Auto dan Apple CarPlay.",      category:"Technology",  sortOrder:2 },
      ],
    },

    // ─── Raize ───────────────────────────────────────────────────
    {
      categoryId: SUV,
      name: "Raize GR", fullName: "New Raize GR", slug: "raize-gr",
      tagline: "Small but Mighty",
      description: "New Raize GR menghadirkan SUV kompak bertenaga dengan mesin turbo 1.0L yang irit namun bertenaga. Cocok untuk generasi muda yang dinamis.",
      bannerUrl: "/images/cars/raize-gr/banner.jpg",
      thumbnailUrl: "/images/cars/raize-gr/thumbnail.jpg",
      brochureUrl: "/files/brochure-raize-gr.pdf",
      startingPrice: 243500000, priceLabel: "Starting from",
      label: "GR", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 3,
      metaTitle: "New Raize GR – SUV Kompak Bertenaga | AutoPrima",
      metaDescription: "Toyota Raize GR di AutoPrima Cibinong. Harga mulai Rp 243 Juta.",
      variants: [
        {
          name: "1.2 G M/T", slug: "raize-12-g-mt",
          fuel: "Bensin", transmission: "Manual", engineCc: 1197,
          engineLabel: "1.2L 3-cyl VVT-i", drivetrain: "4x2", seats: 5, sortOrder: 1,
          prices: [p("M/T 1.2 G", 243500000, 246900000, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.197 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"88 PS / 6.000 rpm",  sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual",     sortOrder:3 },
          ],
        },
        {
          name: "1.2 G CVT", slug: "raize-12-g-cvt",
          fuel: "Bensin", transmission: "CVT", engineCc: 1197,
          engineLabel: "1.2L 3-cyl VVT-i", drivetrain: "4x2", seats: 5, sortOrder: 2,
          prices: [p("CVT 1.2 G", 258600000, 262100000, false, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.197 cc", sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"CVT",      sortOrder:2 },
          ],
        },
        {
          name: "1.0T G M/T", slug: "raize-10t-g-mt",
          fuel: "Bensin", transmission: "Manual", engineCc: 998,
          engineLabel: "1.0L 3-cyl Turbo", drivetrain: "4x2", seats: 5, sortOrder: 3,
          prices: [p("M/T 1.0T G", 262700000, 266100000, false, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"998 cc",              sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"98 PS / 6.000 rpm",   sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual",      sortOrder:3 },
          ],
        },
        {
          name: "1.0T GR CVT", slug: "raize-gr-10t-cvt",
          fuel: "Bensin", transmission: "CVT", engineCc: 998,
          engineLabel: "1.0L 3-cyl Turbo", drivetrain: "4x2", seats: 5, sortOrder: 4,
          prices: [
            p("CVT 1.0T G",          277800000, 281200000, false, false, 1),
            p("CVT 1.0T GR 1T",      292100000, 295400000, false, false, 2),
            p("CVT 1.0T GRS 2T",     294700000, 297900000, false, false, 3),
            p("CVT 1.0T GRS TSS 2T", 317100000, 320300000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"1KR-VET, 3-Silinder, DOHC, Turbo", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"998 cc",                           sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"98 PS / 6.000 rpm",                sortOrder:3 },
            { category:"Mesin",     specKey:"Torsi Maksimum",  specValue:"140 Nm / 2.400-4.000 rpm",         sortOrder:4 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"CVT",                              sortOrder:5 },
          ],
        },
      ],
      colors: [
        { name:"Pearlescent White", hexCode:"#F8F8F8", imageUrl:"/images/cars/raize-gr/color-white.jpg", sortOrder:1 },
        { name:"Emotional Red II",  hexCode:"#C0392B", imageUrl:"/images/cars/raize-gr/color-red.jpg",   sortOrder:2 },
        { name:"Black Mica",        hexCode:"#1C1C1C", imageUrl:"/images/cars/raize-gr/color-black.jpg", sortOrder:3 },
      ],
      images: [{ url:"/images/cars/raize-gr/exterior-1.jpg", altText:"Toyota Raize GR tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"1.0L Turbo Engine",  description:"Mesin 3 silinder turbo 998cc bertenaga namun irit bahan bakar.", category:"Performance", sortOrder:1 },
        { title:"GR Styling",         description:"Paket eksterior dan interior GR Sport yang sporty.",              category:"Design",      sortOrder:2 },
        { title:"7-inch Touchscreen", description:"Head unit 7 inci dengan Android Auto dan Apple CarPlay.",         category:"Technology",  sortOrder:3 },
      ],
    },

    // ─── Yaris Cross ─────────────────────────────────────────────
    {
      categoryId: SUV,
      name: "Yaris Cross HEV", fullName: "All New Yaris Cross HEV", slug: "yaris-cross-hev",
      tagline: "Beyond Every Road",
      description: "All New Yaris Cross HEV menghadirkan SUV hybrid kompak dengan teknologi Hybrid Synergy Drive Toyota. Efisiensi bahan bakar terbaik di kelasnya.",
      bannerUrl: "/images/cars/yaris-cross-hev/banner.jpg",
      thumbnailUrl: "/images/cars/yaris-cross-hev/thumbnail.jpg",
      brochureUrl: "/files/brochure-yaris-cross-hev.pdf",
      startingPrice: 359700000, priceLabel: "Starting from",
      label: "HYBRID", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 4,
      metaTitle: "All New Yaris Cross HEV – SUV Hybrid Kompak | AutoPrima",
      metaDescription: "Toyota Yaris Cross HEV di AutoPrima Cibinong. Harga mulai Rp 359 Juta.",
      variants: [
        {
          name: "1.5 G M/T", slug: "yaris-cross-15-g-mt",
          fuel: "Bensin", transmission: "Manual", engineCc: 1496,
          engineLabel: "1.5L 4-cyl DOHC", drivetrain: "FWD", seats: 5, sortOrder: 1,
          prices: [p("M/T 1.5 G", 359700000, 362600000, true, false, 1)],
          specs: [{ category:"Transmisi", specKey:"Tipe", specValue:"6-Speed Manual", sortOrder:1 }],
        },
        {
          name: "1.5 G CVT", slug: "yaris-cross-15-g-cvt",
          fuel: "Bensin", transmission: "CVT", engineCc: 1496,
          engineLabel: "1.5L 4-cyl DOHC", drivetrain: "FWD", seats: 5, sortOrder: 2,
          prices: [p("CVT 1.5 G", 372900000, 376000000, false, false, 1)],
          specs: [{ category:"Transmisi", specKey:"Tipe", specValue:"CVT", sortOrder:1 }],
        },
        {
          name: "1.5 S CVT TSS", slug: "yaris-cross-15-s-cvt-tss",
          fuel: "Bensin", transmission: "CVT", engineCc: 1496,
          engineLabel: "1.5L 4-cyl DOHC", drivetrain: "FWD", seats: 5, sortOrder: 3,
          prices: [
            p("CVT 1.5 S TSS",   417600000, 420000000, false, false, 1),
            p("CVT 1.5 S TSS P", 420100000, 422500000, false, false, 2),
          ],
          specs: [{ category:"Transmisi", specKey:"Tipe", specValue:"CVT", sortOrder:1 }],
        },
        {
          name: "1.5 S GR CVT TSS", slug: "yaris-cross-15-s-gr-cvt-tss",
          fuel: "Bensin", transmission: "CVT", engineCc: 1496,
          engineLabel: "1.5L 4-cyl DOHC", drivetrain: "FWD", seats: 5, sortOrder: 4,
          prices: [
            p("CVT 1.5 S GR TSS",   427000000, 429400000, false, false, 1),
            p("CVT 1.5 S GR TSS P", 430000000, 432400000, false, false, 2),
          ],
          specs: [{ category:"Transmisi", specKey:"Tipe", specValue:"CVT", sortOrder:1 }],
        },
        {
          name: "1.5 HEV G", slug: "yaris-cross-hev-g",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1496,
          engineLabel: "1.5L Hybrid Synergy Drive", drivetrain: "FWD", seats: 5, sortOrder: 5,
          prices: [
            p("HEV 1.5 G",       399000000, 399000000, false, false, 1),
            p("HEV 1.5 G PC",    401500000, 401500000, false, false, 2),
            p("HEV 1.5 G 2T",    403000000, 403000000, false, false, 3),
            p("HEV 1.5 G 2T PC", 404000000, 404000000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Sistem Hybrid", specValue:"Toyota Hybrid Synergy Drive", sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",          specValue:"e-CVT",                       sortOrder:2 },
          ],
        },
        {
          name: "1.5 HEV S TSS", slug: "yaris-cross-hev-s-tss",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1496,
          engineLabel: "1.5L Hybrid Synergy Drive", drivetrain: "FWD", seats: 5, sortOrder: 6,
          prices: [
            p("HEV 1.5 S TSS",     448800000, 451700000, false, false, 1),
            p("HEV 1.5 S TSS 2T",  452800000, 455700000, false, false, 2),
            p("HEV 1.5 S TSS PT",  451300000, 454200000, false, false, 3),
            p("HEV 1.5 S TSS 2T P",453000000, 456700000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Sistem Hybrid", specValue:"Toyota Hybrid Synergy Drive", sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",          specValue:"e-CVT",                       sortOrder:2 },
          ],
        },
        {
          name: "1.5 HEV S GR TSS", slug: "yaris-cross-hev-s-gr-tss",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1496,
          engineLabel: "1.5L Hybrid Synergy Drive", drivetrain: "FWD", seats: 5, sortOrder: 7,
          prices: [
            p("HEV 1.5 S GR TSS",     458200000, 461100000, false, false, 1),
            p("HEV 1.5 S GR TSS 2T",  462200000, 465200000, false, false, 2),
            p("HEV 1.5 S GR TSS P",   460700000, 463600000, false, false, 3),
            p("HEV 1.5 S GR TSS 2T P",463300000, 466300000, false, false, 4),
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
      images: [{ url:"/images/cars/yaris-cross-hev/exterior-1.jpg", altText:"Toyota Yaris Cross HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"Hybrid Synergy Drive", description:"Teknologi hybrid Toyota untuk efisiensi terbaik.", category:"Performance", sortOrder:1 },
        { title:"Toyota Safety Sense",  description:"Sistem keselamatan aktif generasi terbaru.",       category:"Safety",      sortOrder:2 },
      ],
    },

    // ─── Corolla Cross HEV ───────────────────────────────────────
    {
      categoryId: SUV,
      name: "Corolla Cross HEV", fullName: "New Corolla Cross HEV", slug: "corolla-cross-hev",
      tagline: "Drive the Future",
      description: "New Corolla Cross HEV menggabungkan desain SUV premium dengan teknologi hybrid 1.8L Toyota. Hemat bahan bakar dan penuh fitur modern.",
      bannerUrl: "/images/cars/corolla-cross-hev/banner.jpg",
      thumbnailUrl: "/images/cars/corolla-cross-hev/thumbnail.jpg",
      brochureUrl: "/files/brochure-corolla-cross-hev.pdf",
      startingPrice: 608400000, priceLabel: "Starting from",
      label: "HYBRID", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 5,
      metaTitle: "New Corolla Cross HEV – SUV Hybrid Premium | AutoPrima",
      metaDescription: "Toyota Corolla Cross HEV di AutoPrima Cibinong. Harga mulai Rp 608 Juta.",
      variants: [
        {
          name: "1.8L HEV", slug: "corolla-cross-hev-18",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1798,
          engineLabel: "1.8L Hybrid Synergy Drive", drivetrain: "FWD", seats: 5, sortOrder: 1,
          prices: [
            p("HEV 1.8L",   608400000, 610100000, true,  false, 1),
            p("HEV 1.8L P", 609500000, 613200000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.798 cc",                   sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                      sortOrder:3 },
          ],
        },
        {
          name: "1.8L HEV GR Sport", slug: "corolla-cross-hev-grs",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1798,
          engineLabel: "1.8L Hybrid Synergy Drive", drivetrain: "FWD", seats: 5, sortOrder: 2,
          prices: [
            p("HEV 1.8L GRS",   646100000, 650000000, false, false, 1),
            p("HEV 1.8L GRS P", 651200000, 655100000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.798 cc",                   sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                      sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl", hexCode:"#F5F5F5", imageUrl:"/images/cars/corolla-cross-hev/color-white.jpg", sortOrder:1 },
        { name:"Black Mica",           hexCode:"#1C1C1C", imageUrl:"/images/cars/corolla-cross-hev/color-black.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/corolla-cross-hev/exterior-1.jpg", altText:"Toyota Corolla Cross HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"Hybrid Synergy Drive 1.8L", description:"Sistem hybrid terbukti irit dan efisien.",              category:"Performance", sortOrder:1 },
        { title:"Toyota Safety Sense",        description:"Pre-Collision System dan fitur keselamatan aktif.",     category:"Safety",      sortOrder:2 },
      ],
    },

    // ─── Land Cruiser ─────────────────────────────────────────────
    {
      categoryId: SUV,
      name: "Land Cruiser", fullName: "All New Land Cruiser", slug: "land-cruiser",
      tagline: "Go Anywhere. Do Anything.",
      description: "All New Land Cruiser hadir dengan platform TNGA-F generasi terbaru. SUV flagship Toyota yang tangguh dan mewah.",
      bannerUrl: "/images/cars/land-cruiser/banner.jpg",
      thumbnailUrl: "/images/cars/land-cruiser/thumbnail.jpg",
      brochureUrl: "/files/brochure-land-cruiser.pdf",
      startingPrice: 2635400000, priceLabel: "Hubungi Kami",
      label: "NEW", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 6,
      metaTitle: "All New Land Cruiser – SUV Flagship Toyota | AutoPrima",
      metaDescription: "Toyota Land Cruiser di AutoPrima Cibinong. Hubungi kami untuk info harga.",
      variants: [
        {
          name: "Land Cruiser VX-R 4x4", slug: "land-cruiser-vxr-4x4",
          fuel: "Diesel", transmission: "Automatic", engineCc: 3346,
          engineLabel: "3.3L V6 Twin Turbo Diesel", drivetrain: "4x4", seats: 7, sortOrder: 1,
          prices: [p("A/T VX-R 4X4", 2635400000, 2635400000, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"F33A-FTV, V6, Twin Turbo Diesel", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"3.346 cc",                        sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"309 PS / 4.000 rpm",              sortOrder:3 },
            { category:"Mesin",     specKey:"Torsi Maksimum",  specValue:"700 Nm / 1.600-2.600 rpm",        sortOrder:4 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"10-Speed Automatic",              sortOrder:5 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"4WD Full-Time",                   sortOrder:6 },
          ],
        },
        {
          name: "Land Cruiser 2.4 G", slug: "land-cruiser-24-g",
          fuel: "Diesel", transmission: "Automatic", engineCc: 2393,
          engineLabel: "2.4L Turbo Diesel", drivetrain: "4x4", seats: 7, sortOrder: 2,
          prices: [p("A/T 2.4 G", 2716300000, 2716300000, false, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",          sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"Automatic",         sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl", hexCode:"#F5F5F5", imageUrl:"/images/cars/land-cruiser/color-white.jpg", sortOrder:1 },
        { name:"Black Mica",           hexCode:"#1C1C1C", imageUrl:"/images/cars/land-cruiser/color-black.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/land-cruiser/exterior-1.jpg", altText:"Toyota Land Cruiser tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"E-KDSS",              description:"Electronic Kinetic Dynamic Suspension System untuk off-road terbaik.", category:"Performance", sortOrder:1 },
        { title:"Multi-Terrain Select", description:"Sistem pemilihan medan 5-mode untuk kondisi apapun.",                 category:"Performance", sortOrder:2 },
      ],
    },

    // ══════════════════════════════════════════════
    // MPV
    // ══════════════════════════════════════════════

    // ─── Innova Zenix HEV ────────────────────────────────────────
    {
      categoryId: MPV,
      name: "Innova Zenix HEV", fullName: "All New Innova Zenix HEV", slug: "innova-zenix-hev",
      tagline: "Beyond Expectation",
      description: "All New Innova Zenix HEV menghadirkan teknologi hybrid terdepan dalam balutan desain MPV premium. Mesin 2.0L Hybrid memberikan efisiensi bahan bakar luar biasa.",
      bannerUrl: "/images/cars/innova-zenix-hev/banner.jpg",
      thumbnailUrl: "/images/cars/innova-zenix-hev/thumbnail.jpg",
      brochureUrl: "/files/brochure-innova-zenix-hev.pdf",
      startingPrice: 475400000, priceLabel: "Starting from",
      label: "HYBRID", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 7,
      metaTitle: "All New Innova Zenix HEV – MPV Hybrid Premium | AutoPrima",
      metaDescription: "Toyota Innova Zenix HEV di AutoPrima Cibinong. Harga mulai Rp 475 Juta.",
      variants: [
        {
          name: "HEV G CVT", slug: "zenix-hev-g-cvt",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1987,
          engineLabel: "2.0L Hybrid Synergy Drive", drivetrain: "FWD", seats: 7, sortOrder: 1,
          prices: [
            p("HEV G CVT",   475400000, 477500000, true,  false, 1),
            p("HEV G CVT P", 478300000, 480400000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"M20A-FXS, 4-Silinder, DOHC, Hybrid", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.987 cc",                            sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Sistem",   specValue:"186 PS",                              sortOrder:3 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                               sortOrder:4 },
          ],
        },
        {
          name: "HEV V CVT", slug: "zenix-hev-v-cvt",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1987,
          engineLabel: "2.0L Hybrid Synergy Drive", drivetrain: "FWD", seats: 7, sortOrder: 2,
          prices: [
            p("HEV V CVT",         549000000, 552800000, false, false, 1),
            p("HEV V NON MOD",     539000000, 542800000, false, false, 2),
            p("HEV V NON RSE",     540700000, 544500000, false, false, 3),
            p("HEV V CVT P",       551900000, 555700000, false, false, 4),
            p("HEV V NON MOD P",   542000000, 545800000, false, false, 5),
            p("HEV V NON RSE P",   543600000, 547400000, false, false, 6),
            p("HEV V NON MOD NON RSE",   530800000, 534600000, false, false, 7),
            p("HEV V NON MOD NON RSE P", 533700000, 537500000, false, false, 8),
          ],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.987 cc", sortOrder:1 }],
        },
        {
          name: "HEV Q TSS", slug: "zenix-hev-q-tss",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1987,
          engineLabel: "2.0L Hybrid Synergy Drive", drivetrain: "FWD", seats: 7, sortOrder: 3,
          prices: [
            p("HEV Q TSS",          626900000, 628200000, false, false, 1),
            p("HEV Q TSS NON MOD",  617000000, 618300000, false, false, 2),
            p("HEV Q TSS NON RSE",  618600000, 619900000, false, false, 3),
            p("HEV Q TSS P",        629800000, 631100000, false, false, 4),
            p("HEV Q TSS NON MOD P",619900000, 621200000, false, false, 5),
            p("HEV Q TSS NON RSE P",621500000, 622800000, false, false, 6),
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
      images: [{ url:"/images/cars/innova-zenix-hev/exterior-1.jpg", altText:"Toyota Innova Zenix HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"Hybrid Synergy Drive", description:"Sistem hybrid Toyota yang irit hingga 50%.",   category:"Performance", sortOrder:1 },
        { title:"Head-Up Display",      description:"Informasi berkendara langsung di kaca depan.", category:"Technology",  sortOrder:2 },
        { title:"Power Sliding Door",   description:"Pintu geser elektrik di kedua sisi.",           category:"Comfort",     sortOrder:3 },
      ],
    },

    // ─── Innova Zenix (Bensin) ───────────────────────────────────
    {
      categoryId: MPV,
      name: "Innova Zenix", fullName: "All New Innova Zenix", slug: "innova-zenix",
      tagline: "A New Kind of Bold",
      description: "All New Innova Zenix versi bensin hadir dengan mesin 2.0L VVT-iE bertenaga dan desain MPV premium terbaru.",
      bannerUrl: "/images/cars/innova-zenix/banner.jpg",
      thumbnailUrl: "/images/cars/innova-zenix/thumbnail.jpg",
      brochureUrl: "/files/brochure-innova-zenix.pdf",
      startingPrice: 437700000, priceLabel: "Starting from",
      label: null, isNewModel: true, isFeatured: false, isActive: true, sortOrder: 8,
      metaTitle: "All New Innova Zenix – MPV Premium | AutoPrima",
      metaDescription: "Toyota Innova Zenix di AutoPrima Cibinong. Harga mulai Rp 437 Juta.",
      variants: [
        {
          name: "G CVT", slug: "innova-zenix-g-cvt",
          fuel: "Bensin", transmission: "CVT", engineCc: 1987,
          engineLabel: "2.0L 4-cyl VVT-iE", drivetrain: "FWD", seats: 7, sortOrder: 1,
          prices: [
            p("CVT G",   437700000, 439900000, true,  false, 1),
            p("CVT G P", 440700000, 442900000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"M20A-FKS, 4-Silinder, DOHC, VVT-iE", sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.987 cc",                            sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"174 PS / 6.600 rpm",                  sortOrder:3 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"CVT",                                 sortOrder:4 },
          ],
        },
        {
          name: "V CVT", slug: "innova-zenix-v-cvt",
          fuel: "Bensin", transmission: "CVT", engineCc: 1987,
          engineLabel: "2.0L 4-cyl VVT-iE", drivetrain: "FWD", seats: 7, sortOrder: 2,
          prices: [
            p("CVT V",           484100000, 486200000, false, false, 1),
            p("CVT V NON RSE",   475800000, 478000000, false, false, 2),
            p("CVT V P",         487100000, 489200000, false, false, 3),
            p("CVT V NON RSE P", 478800000, 481000000, false, false, 4),
          ],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.987 cc", sortOrder:1 }],
        },
      ],
      colors: [
        { name:"Platinum White Pearl Mica", hexCode:"#F0F0F0", imageUrl:"/images/cars/innova-zenix/color-white.jpg", sortOrder:1 },
        { name:"Attitude Black Mica",       hexCode:"#1C1C1C", imageUrl:"/images/cars/innova-zenix/color-black.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/innova-zenix/exterior-1.jpg", altText:"Toyota Innova Zenix tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"2.0L VVT-iE Engine", description:"Mesin terbaru dengan Variable Valve Timing by Electric motor.", category:"Performance", sortOrder:1 },
        { title:"Power Sliding Door", description:"Pintu geser elektrik untuk kemudahan masuk dan keluar.",        category:"Comfort",     sortOrder:2 },
      ],
    },

    // ─── Innova Reborn ────────────────────────────────────────────
    {
      categoryId: MPV,
      name: "Innova Reborn", fullName: "All New Innova", slug: "innova-reborn",
      tagline: "Born to Lead",
      description: "All New Innova hadir dengan mesin diesel 2.4L yang tangguh. MPV legendaris Toyota yang kini lebih modern.",
      bannerUrl: "/images/cars/innova-reborn/banner.jpg",
      thumbnailUrl: "/images/cars/innova-reborn/thumbnail.jpg",
      brochureUrl: "/files/brochure-innova-reborn.pdf",
      startingPrice: 417800000, priceLabel: "Starting from",
      label: null, isNewModel: false, isFeatured: false, isActive: true, sortOrder: 9,
      metaTitle: "All New Innova – MPV Diesel Terpercaya | AutoPrima",
      metaDescription: "Toyota Innova Reborn di AutoPrima Cibinong. Harga mulai Rp 417 Juta.",
      variants: [
        {
          name: "2.4 G M/T", slug: "innova-reborn-24-g-mt",
          fuel: "Diesel", transmission: "Manual", engineCc: 2393,
          engineLabel: "2.4L 4-cyl Turbo Diesel", drivetrain: "4x2", seats: 7, sortOrder: 1,
          prices: [p("M/T 2.4 G", 417800000, 421100000, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",       sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
        {
          name: "2.4 G A/T", slug: "innova-reborn-24-g-at",
          fuel: "Diesel", transmission: "Automatic", engineCc: 2393,
          engineLabel: "2.4L 4-cyl Turbo Diesel", drivetrain: "4x2", seats: 7, sortOrder: 2,
          prices: [p("A/T 2.4 G", 438700000, 442700000, false, false, 1)],
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
      images: [{ url:"/images/cars/innova-reborn/exterior-1.jpg", altText:"Toyota Innova tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [{ title:"2GD-FTV Diesel Engine", description:"Mesin diesel turbo bertenaga 150 PS yang terbukti handal.", category:"Performance", sortOrder:1 }],
    },

    // ─── Veloz HEV ───────────────────────────────────────────────
    {
      categoryId: MPV,
      name: "Veloz", fullName: "New Veloz Hybrid EV", slug: "veloz-hev",
      tagline: "Hybrid. Stylish. Ready.",
      description: "New Veloz Hybrid EV menghadirkan MPV stylish dengan teknologi hybrid terdepan. Hemat bahan bakar dan penuh gaya.",
      bannerUrl: "/images/cars/veloz-hev/banner.jpg",
      thumbnailUrl: "/images/cars/veloz-hev/thumbnail.jpg",
      brochureUrl: "/files/brochure-veloz-hev.pdf",
      startingPrice: 303000000, priceLabel: "Starting from",
      label: "HYBRID", isNewModel: false, isFeatured: false, isActive: true, sortOrder: 10,
      metaTitle: "New Veloz Hybrid EV – MPV Hybrid Stylish | AutoPrima",
      metaDescription: "Toyota Veloz HEV di AutoPrima Cibinong. Harga mulai Rp 303 Juta.",
      variants: [
        {
          name: "V HEV", slug: "veloz-v-hev",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1496,
          engineLabel: "1.5L Hybrid Synergy Drive", drivetrain: "FWD", seats: 7, sortOrder: 1,
          prices: [
            p("V HEV",    303000000, 303000000, true,  false, 1),
            p("V HEV PC", 304500000, 304500000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",                   sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                      sortOrder:3 },
          ],
        },
        {
          name: "Q HEV TSS", slug: "veloz-q-hev-tss",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1496,
          engineLabel: "1.5L Hybrid Synergy Drive", drivetrain: "FWD", seats: 7, sortOrder: 2,
          prices: [
            p("Q HEV",              326000000, 326000000, false, false, 1),
            p("Q HEV PC",           326500000, 326500000, false, false, 2),
            p("Q MOD 1T",           350000000, 350000000, false, false, 3),
            p("Q MOD 1T PC",        351500000, 351500000, false, false, 4),
            p("Q MOD 2T",           352500000, 352500000, false, false, 5),
            p("Q MOD 2T PC",        354000000, 354000000, false, false, 6),
            p("Q MOD 1T TSS",       385000000, 385000000, false, false, 7),
            p("Q MOD 1T PC TSS",    386500000, 386500000, false, false, 8),
            p("Q MOD 2T TSS",       387500000, 387500000, false, false, 9),
            p("Q MOD 2T PC TSS",    389000000, 389000000, false, false, 10),
          ],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"1.496 cc", sortOrder:1 }],
        },
      ],
      colors: [
        { name:"White", hexCode:"#FFFFFF", imageUrl:"/images/cars/veloz-hev/color-white.jpg", sortOrder:1 },
        { name:"Black", hexCode:"#1C1C1C", imageUrl:"/images/cars/veloz-hev/color-black.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/veloz-hev/exterior-1.jpg", altText:"Toyota Veloz HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [{ title:"Hybrid Synergy Drive", description:"Sistem hybrid Toyota untuk efisiensi dan performa optimal.", category:"Performance", sortOrder:1 }],
    },

    // ─── Avanza ──────────────────────────────────────────────────
    {
      categoryId: MPV,
      name: "Avanza", fullName: "All New Avanza", slug: "avanza",
      tagline: "New Generation, New Experience",
      description: "All New Avanza hadir dengan desain modern dan fitur lengkap. MPV keluarga andalan dengan mesin 1.3L/1.5L DOHC.",
      bannerUrl: "/images/cars/avanza/banner.jpg",
      thumbnailUrl: "/images/cars/avanza/thumbnail.jpg",
      brochureUrl: "/files/brochure-avanza.pdf",
      startingPrice: 243700000, priceLabel: "Starting from",
      label: null, isNewModel: false, isFeatured: false, isActive: true, sortOrder: 11,
      metaTitle: "All New Toyota Avanza – MPV Keluarga Terbaik | AutoPrima",
      metaDescription: "All New Toyota Avanza di AutoPrima Cibinong. Harga mulai Rp 243 Juta.",
      variants: [
        {
          name: "1.3 E M/T", slug: "avanza-13-e-mt",
          fuel: "Bensin", transmission: "Manual", engineCc: 1329,
          engineLabel: "1.3L 4-cyl DOHC Dual VVT-i", drivetrain: "4x2", seats: 7, sortOrder: 1,
          prices: [
            p("M/T 1.3 E",  243700000, 247000000, true,  false, 1),
            p("CVT 1.3 E",  258700000, 262200000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.329 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"95 PS / 6.000 rpm",  sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual / CVT", sortOrder:3 },
          ],
        },
        {
          name: "1.5 G M/T", slug: "avanza-15-g-mt",
          fuel: "Bensin", transmission: "Manual", engineCc: 1496,
          engineLabel: "1.5L 4-cyl DOHC Dual VVT-i", drivetrain: "4x2", seats: 7, sortOrder: 2,
          prices: [
            p("M/T 1.5 G",  266800000, 270200000, false, false, 1),
            p("CVT 1.5 G",  281800000, 285000000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",            sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"106 PS / 6.000 rpm",  sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"White",           hexCode:"#FFFFFF", imageUrl:"/images/cars/avanza/color-white.jpg",  sortOrder:1 },
        { name:"Silver Metallic", hexCode:"#C0C0C0", imageUrl:"/images/cars/avanza/color-silver.jpg", sortOrder:2 },
        { name:"Black",           hexCode:"#1C1C1C", imageUrl:"/images/cars/avanza/color-black.jpg",  sortOrder:3 },
      ],
      images: [{ url:"/images/cars/avanza/exterior-1.jpg", altText:"Toyota Avanza tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"DOHC Dual VVT-i Engine", description:"Mesin generasi terbaru yang bertenaga dan irit bahan bakar.", category:"Performance", sortOrder:1 },
        { title:"7-inch Touchscreen",     description:"Head unit layar sentuh 7 inci dengan konektivitas smartphone.", category:"Technology", sortOrder:2 },
      ],
    },

    // ─── Calya ───────────────────────────────────────────────────
    {
      categoryId: MPV,
      name: "Calya", fullName: "New Calya", slug: "calya",
      tagline: "Smart & Affordable",
      description: "New Calya hadir sebagai MPV LCGC terjangkau dengan kapasitas 7 penumpang. Hemat bahan bakar untuk keluarga.",
      bannerUrl: "/images/cars/calya/banner.jpg",
      thumbnailUrl: "/images/cars/calya/thumbnail.jpg",
      brochureUrl: "/files/brochure-calya.pdf",
      startingPrice: 170200000, priceLabel: "Starting from",
      label: null, isNewModel: false, isFeatured: false, isActive: true, sortOrder: 12,
      metaTitle: "New Calya – MPV LCGC Terjangkau | AutoPrima",
      metaDescription: "Toyota Calya di AutoPrima Cibinong. Harga mulai Rp 170 Juta.",
      variants: [
        {
          name: "1.2 E STD M/T", slug: "calya-12-e-std-mt",
          fuel: "Bensin", transmission: "Manual", engineCc: 1197,
          engineLabel: "1.2L 3-cyl Dual VVT-i", drivetrain: "4x2", seats: 7, sortOrder: 1,
          prices: [
            p("M/T 1.2 E STD", 170200000, 173400000, true,  false, 1),
            p("M/T 1.2 E",     173100000, 176700000, false, false, 2),
            p("M/T 1.2 G",     178800000, 182200000, false, false, 3),
            p("A/T 1.2 G",     193200000, 196800000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.197 cc",                          sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual / 4-Speed Automatic", sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"White",           hexCode:"#FFFFFF", imageUrl:"/images/cars/calya/color-white.jpg",  sortOrder:1 },
        { name:"Silver Metallic", hexCode:"#C0C0C0", imageUrl:"/images/cars/calya/color-silver.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/calya/exterior-1.jpg", altText:"Toyota Calya tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [{ title:"7-Seater Capacity", description:"Kabin luas untuk 7 penumpang dengan efisiensi bahan bakar LCGC.", category:"Comfort", sortOrder:1 }],
    },

    // ─── Voxy ────────────────────────────────────────────────────
    {
      categoryId: MPV,
      name: "Voxy", fullName: "All New Voxy", slug: "voxy",
      tagline: "The Bold MPV",
      description: "All New Voxy menghadirkan MPV premium dengan desain bold dan aggressive. Kabin luas dengan fitur modern.",
      bannerUrl: "/images/cars/voxy/banner.jpg",
      thumbnailUrl: "/images/cars/voxy/thumbnail.jpg",
      brochureUrl: "/files/brochure-voxy.pdf",
      startingPrice: 632700000, priceLabel: "Starting from",
      label: "NEW", isNewModel: true, isFeatured: false, isActive: true, sortOrder: 13,
      metaTitle: "All New Voxy – MPV Premium Bold | AutoPrima",
      metaDescription: "Toyota Voxy di AutoPrima Cibinong. Harga mulai Rp 632 Juta.",
      variants: [
        {
          name: "2.0 A/T", slug: "voxy-20-at",
          fuel: "Bensin", transmission: "Automatic", engineCc: 1987,
          engineLabel: "2.0L 4-cyl DOHC", drivetrain: "FWD", seats: 7, sortOrder: 1,
          prices: [
            p("A/T 2.0 T00B", 632700000, 634300000, true,  false, 1),
            p("A/T 2.0 T01B", 635800000, 637500000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.987 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"170 PS / 6.600 rpm", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"CVT",                sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Super White II", hexCode:"#F5F5F5", imageUrl:"/images/cars/voxy/color-white.jpg", sortOrder:1 },
        { name:"Black Mica",     hexCode:"#1C1C1C", imageUrl:"/images/cars/voxy/color-black.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/voxy/exterior-1.jpg", altText:"Toyota Voxy tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"Bold Exterior Design", description:"Desain eksterior bold dengan grille besar yang memukau.", category:"Design",   sortOrder:1 },
        { title:"Power Sliding Door",   description:"Pintu geser elektrik kedua sisi.",                         category:"Comfort", sortOrder:2 },
      ],
    },

    // ─── Alphard HEV ─────────────────────────────────────────────
    {
      categoryId: MPV,
      name: "Alphard HEV", fullName: "All New Alphard HEV", slug: "alphard-hev",
      tagline: "The Art of Moving",
      description: "All New Alphard HEV menghadirkan puncak kemewahan MPV Toyota dengan teknologi hybrid. Desain elegan dan kabin super premium.",
      bannerUrl: "/images/cars/alphard-hev/banner.jpg",
      thumbnailUrl: "/images/cars/alphard-hev/thumbnail.jpg",
      brochureUrl: "/files/brochure-alphard-hev.pdf",
      startingPrice: 1288000000, priceLabel: "Starting from",
      label: "HYBRID", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 14,
      metaTitle: "All New Alphard HEV – MPV Luxury Hybrid | AutoPrima",
      metaDescription: "Toyota Alphard HEV di AutoPrima Cibinong. Harga mulai Rp 1,2 Miliar.",
      variants: [
        {
          name: "2.5 XE CVT", slug: "alphard-25-xe-cvt",
          fuel: "Bensin", transmission: "CVT", engineCc: 2487,
          engineLabel: "2.5L 4-cyl DOHC", drivetrain: "FWD", seats: 7, sortOrder: 1,
          prices: [
            p("CVT 2.5 XE",    1288000000, 1288000000, true,  false, 1),
            p("CVT 2.5 XE PC", 1291500000, 1291500000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.487 cc", sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"CVT",      sortOrder:2 },
          ],
        },
        {
          name: "2.5 XE HEV", slug: "alphard-25-xe-hev",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 2487,
          engineLabel: "2.5L 4-cyl Hybrid", drivetrain: "FWD", seats: 7, sortOrder: 2,
          prices: [
            p("HEV 2.5 XE",    1388000000, 1388000000, false, false, 1),
            p("HEV 2.5 XE PC", 1391500000, 1391500000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.487 cc",                   sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                      sortOrder:3 },
          ],
        },
        {
          name: "2.5 G CVT", slug: "alphard-25-g-cvt",
          fuel: "Bensin", transmission: "CVT", engineCc: 2487,
          engineLabel: "2.5L 4-cyl DOHC", drivetrain: "FWD", seats: 7, sortOrder: 3,
          prices: [
            p("CVT 2.5 G",    1652100000, 1652100000, false, false, 1),
            p("CVT 2.5 G PC", 1655600000, 1655600000, false, false, 2),
          ],
          specs: [{ category:"Mesin", specKey:"Kapasitas Mesin", specValue:"2.487 cc", sortOrder:1 }],
        },
        {
          name: "2.5 G HEV AWD", slug: "alphard-25-g-hev-awd",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 2487,
          engineLabel: "2.5L 4-cyl Hybrid AWD", drivetrain: "AWD", seats: 7, sortOrder: 4,
          prices: [
            p("HEV 2.5 G",    1737400000, 1736000000, false, false, 1),
            p("HEV 2.5 G PC", 1741000000, 1739700000, false, false, 2),
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
      images: [{ url:"/images/cars/alphard-hev/exterior-1.jpg", altText:"Toyota Alphard HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"Executive Lounge Seat", description:"Kursi executive lounge dengan fitur relaksasi dan massage.", category:"Comfort",       sortOrder:1 },
        { title:"Hybrid Synergy Drive",  description:"Teknologi hybrid E-Four untuk efisiensi optimal.",           category:"Performance",   sortOrder:2 },
        { title:"JBL Premium Audio",     description:"Sistem audio premium JBL untuk pengalaman terbaik.",         category:"Entertainment", sortOrder:3 },
      ],
    },

    // ─── Vellfire HEV ─────────────────────────────────────────────
    {
      categoryId: MPV,
      name: "Vellfire HEV", fullName: "All New Vellfire HEV", slug: "vellfire-hev",
      tagline: "The Pinnacle of Luxury",
      description: "All New Vellfire HEV adalah puncak kemewahan Toyota dengan teknologi hybrid dan fitur ultra-premium.",
      bannerUrl: "/images/cars/vellfire-hev/banner.jpg",
      thumbnailUrl: "/images/cars/vellfire-hev/thumbnail.jpg",
      brochureUrl: "/files/brochure-vellfire-hev.pdf",
      startingPrice: 1872800000, priceLabel: "Starting from",
      label: "HYBRID", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 15,
      metaTitle: "All New Vellfire HEV – Ultra Luxury MPV | AutoPrima",
      metaDescription: "Toyota Vellfire HEV di AutoPrima Cibinong. Harga mulai Rp 1,8 Miliar.",
      variants: [
        {
          name: "2.5 VIP HEV", slug: "vellfire-hev-25-vip",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 2487,
          engineLabel: "2.5L 4-cyl Hybrid AWD", drivetrain: "AWD", seats: 4, sortOrder: 1,
          prices: [
            p("HEV 2.5 VIP",   1872800000, 1872800000, true,  false, 1),
            p("HEV 2.5 VIP P", 1876300000, 1876300000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.487 cc",                          sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive E-Four", sortOrder:2 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"E-Four AWD",                        sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl Mica", hexCode:"#F5F5F5", imageUrl:"/images/cars/vellfire-hev/color-white.jpg",    sortOrder:1 },
        { name:"Sonic Titanium",            hexCode:"#4A4A4A", imageUrl:"/images/cars/vellfire-hev/color-titanium.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/vellfire-hev/exterior-1.jpg", altText:"Toyota Vellfire HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"Ottoman Rear Seat",          description:"Kursi belakang ottoman untuk kenyamanan perjalanan jauh.", category:"Comfort",       sortOrder:1 },
        { title:"28-inch Rear Entertainment", description:"Layar entertainment 28 inci di kursi belakang.",           category:"Entertainment", sortOrder:2 },
      ],
    },

    // ══════════════════════════════════════════════
    // HATCHBACK
    // ══════════════════════════════════════════════

   // ─── Agya ────────────────────────────────────────────────────
   {
    categoryId: HATCH,
    name: "Agya", 
    fullName: "New Agya", 
    slug: "agya",
    tagline: "Move with No Boundaries",
    description: "New Toyota Agya hadir sebagai city car kompak yang lincah, irit bahan bakar, dan sangat cocok untuk mobilitas harian di perkotaan dengan desain yang lebih modern.",
    bannerUrl: "/images/cars/agya/banner.jpg",
    thumbnailUrl: "/images/cars/agya/thumbnail.jpg",
    brochureUrl: "/files/brochure-agya.pdf",
    startingPrice: 173800000, 
    priceLabel: "Starting from",
    label: "CITY CAR", 
    isNewModel: true, 
    isFeatured: false, 
    isActive: true, 
    sortOrder: 16,
    metaTitle: "New Toyota Agya – Harga & Promo Terbaru | AutoPrima",
    metaDescription: "Beli New Toyota Agya di AutoPrima Cibinong. City car lincah dan efisien. Harga mulai Rp 173 Juta.",
    variants: [
      {
        name: "1.2 Agya", 
        slug: "agya-12",
        fuel: "Bensin", transmission: "Manual / CVT", engineCc: 1197,
        engineLabel: "1.2L 3-cyl DOHC Dual VVT-i", drivetrain: "FWD", seats: 5, sortOrder: 1,
        prices: [
          p("M/T 1.2 E (SPOT ORDER)", 173800000, 177100000, true,  false, 1),
          p("M/T 1.2 G",              181500000, 184600000, false, false, 2),
          p("CVT 1.2 G",              197700000, 200800000, false, false, 3),
          p("CVT 1.2 STYLIX",         201200000, 204300000, false, false, 4),
        ],
        specs: [
          { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.197 cc",             sortOrder:1 },
          { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"WA-VE 3-Silinder",     sortOrder:2 },
          { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual / CVT", sortOrder:3 },
        ],
      },
    ],
    colors: [
      { name:"White",  hexCode:"#FFFFFF", imageUrl:"/images/cars/agya/color-white.jpg",  sortOrder:1 },
      { name:"Red",    hexCode:"#C0392B", imageUrl:"/images/cars/agya/color-red.jpg",    sortOrder:2 },
      { name:"Black",  hexCode:"#1C1C1C", imageUrl:"/images/cars/agya/color-black.jpg",  sortOrder:3 },
      { name:"Yellow", hexCode:"#F4D03F", imageUrl:"/images/cars/agya/color-yellow.jpg", sortOrder:4 },
    ],
    images: [
      { url:"/images/cars/agya/exterior-1.jpg", altText:"Toyota Agya tampak depan",   category:"exterior", isPrimary:true,  sortOrder:1 },
      { url:"/images/cars/agya/exterior-2.jpg", altText:"Toyota Agya tampak samping", category:"exterior", isPrimary:false, sortOrder:2 }
    ],
    features: [
      { title:"Efisiensi Bahan Bakar", description:"Mesin 1.2L WA-VE terbaru yang lebih bertenaga namun tetap irit bahan bakar.", category:"Performance", sortOrder:1 },
      { title:"Desain Kompak",         description:"Bodi kompak yang memudahkan manuver dan parkir di jalanan kota yang padat.",  category:"Design",      sortOrder:2 }
    ],
  },

    // ─── GR Yaris ─────────────────────────────────────────────────
    {
      categoryId: HATCH,
      name: "GR Yaris", fullName: "New GR Yaris", slug: "gr-yaris",
      tagline: "Born from Rally",
      description: "New GR Yaris lahir dari teknologi World Rally Championship. Mesin turbo 1.6L dengan GR-FOUR AWD untuk pengalaman berkendara maksimal.",
      bannerUrl: "/images/cars/gr-yaris/banner.jpg",
      thumbnailUrl: "/images/cars/gr-yaris/thumbnail.jpg",
      brochureUrl: "/files/brochure-gr-yaris.pdf",
      startingPrice: undefined, priceLabel: "Hubungi Kami",
      label: "GR", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 17,
      metaTitle: "New GR Yaris – Hatchback Performa Tinggi | AutoPrima",
      metaDescription: "Toyota GR Yaris di AutoPrima Cibinong. Hatchback bertenaga DNA Rally.",
      variants: [
        {
          name: "GR Yaris 1.6T AWD", slug: "gr-yaris-16t-awd",
          fuel: "Bensin", transmission: "Manual", engineCc: 1618,
          engineLabel: "1.6L 3-cyl Turbo GR", drivetrain: "AWD", seats: 4, sortOrder: 1,
          prices: [por("GR Yaris", 1)],
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
      images: [{ url:"/images/cars/gr-yaris/exterior-1.jpg", altText:"Toyota GR Yaris tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"GR-FOUR AWD",       description:"Sistem AWD eksklusif GR untuk traksi optimal.",       category:"Performance", sortOrder:1 },
        { title:"1.6L Turbo 272 PS", description:"Mesin turbo 3 silinder paling bertenaga di kelasnya.", category:"Performance", sortOrder:2 },
      ],
    },

    // ─── GR Corolla ───────────────────────────────────────────────
    {
      categoryId: HATCH,
      name: "GR Corolla", fullName: "All New GR Corolla", slug: "gr-corolla",
      tagline: "Motorsport Inspired",
      description: "All New GR Corolla adalah hatchback performa tinggi terinspirasi motorsport. Mesin 1.6L Turbo dan GR-FOUR AWD.",
      bannerUrl: "/images/cars/gr-corolla/banner.jpg",
      thumbnailUrl: "/images/cars/gr-corolla/thumbnail.jpg",
      brochureUrl: "/files/brochure-gr-corolla.pdf",
      startingPrice: undefined, priceLabel: "Hubungi Kami",
      label: "GR", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 18,
      metaTitle: "All New GR Corolla – Hatchback Performa Tinggi | AutoPrima",
      metaDescription: "Toyota GR Corolla di AutoPrima Cibinong. Hatchback motorsport AWD.",
      variants: [
        {
          name: "GR Corolla 1.6T AWD", slug: "gr-corolla-16t-awd",
          fuel: "Bensin", transmission: "Manual", engineCc: 1618,
          engineLabel: "1.6L 3-cyl Turbo", drivetrain: "AWD", seats: 5, sortOrder: 1,
          prices: [por("GR Corolla", 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.618 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"300 PS / 6.500 rpm", sortOrder:2 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"GR-FOUR AWD",         sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Supersonic Red", hexCode:"#C0392B", imageUrl:"/images/cars/gr-corolla/color-red.jpg",   sortOrder:1 },
        { name:"White Pearl",    hexCode:"#F5F5F5", imageUrl:"/images/cars/gr-corolla/color-white.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/gr-corolla/exterior-1.jpg", altText:"Toyota GR Corolla tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"GR-FOUR AWD",       description:"Sistem AWD adaptif GR untuk handling motorsport.", category:"Performance", sortOrder:1 },
        { title:"1.6L Turbo 300 PS", description:"Mesin turbo 3-silinder bertenaga 300 PS.",          category:"Performance", sortOrder:2 },
      ],
    },

    // ══════════════════════════════════════════════
    // SEDAN
    // ══════════════════════════════════════════════

    // ─── Camry HEV ────────────────────────────────────────────────
    {
      categoryId: SEDAN,
      name: "Camry HEV", fullName: "New Camry HEV", slug: "camry-hev",
      tagline: "The Pinnacle of Comfort",
      description: "New Camry HEV menghadirkan kemewahan sedan premium dengan teknologi hybrid 2.5L. Desain elegan untuk eksekutif modern.",
      bannerUrl: "/images/cars/camry-hev/banner.jpg",
      thumbnailUrl: "/images/cars/camry-hev/thumbnail.jpg",
      brochureUrl: "/files/brochure-camry-hev.pdf",
      startingPrice: 856200000, priceLabel: "Starting from",
      label: "HYBRID", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 19,
      metaTitle: "New Camry HEV – Sedan Premium Hybrid | AutoPrima",
      metaDescription: "Toyota Camry HEV di AutoPrima Cibinong. Harga mulai Rp 856 Juta.",
      variants: [
        {
          name: "2.5 V A/T", slug: "camry-25-v-at",
          fuel: "Bensin", transmission: "Automatic", engineCc: 2487,
          engineLabel: "2.5L 4-cyl DOHC", drivetrain: "FWD", seats: 5, sortOrder: 1,
          prices: [
            p("A/T 2.5 V",   856200000, 857000000, true,  false, 1),
            p("A/T 2.5 V P", 859300000, 860100000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.487 cc",          sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"8-Speed Automatic", sortOrder:2 },
          ],
        },
        {
          name: "2.5 L HEV", slug: "camry-25-l-hev",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 2487,
          engineLabel: "2.5L 4-cyl Hybrid", drivetrain: "FWD", seats: 5, sortOrder: 2,
          prices: [
            p("HEV 2.5 L",   977200000, 983000000, false, false, 1),
            p("HEV 2.5 L P", 980300000, 986200000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.487 cc",                   sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Sistem",   specValue:"218 PS",                    sortOrder:3 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                     sortOrder:4 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl Mica", hexCode:"#F5F5F5", imageUrl:"/images/cars/camry-hev/color-white.jpg",    sortOrder:1 },
        { name:"Black",                     hexCode:"#1C1C1C", imageUrl:"/images/cars/camry-hev/color-black.jpg",    sortOrder:2 },
        { name:"Graphite Metallic",         hexCode:"#5A5A5A", imageUrl:"/images/cars/camry-hev/color-graphite.jpg", sortOrder:3 },
      ],
      images: [{ url:"/images/cars/camry-hev/exterior-1.jpg", altText:"Toyota Camry HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"Hybrid Synergy Drive 2.5L", description:"Sistem hybrid generasi terbaru untuk akselerasi halus.", category:"Performance", sortOrder:1 },
        { title:"12.3-inch Touchscreen",      description:"Layar sentuh 12.3 inci dengan navigasi built-in.",       category:"Technology",  sortOrder:2 },
        { title:"JBL Premium Sound",          description:"Sistem audio JBL 9-speaker.",                            category:"Comfort",     sortOrder:3 },
      ],
    },

    // ─── Altis HEV GR Sport ───────────────────────────────────────
    {
      categoryId: SEDAN,
      name: "Corolla Altis HEV GR Sport", fullName: "Altis GR Sport HEV", slug: "corolla-altis-hev-gr-sport",
      tagline: "Sport the Future",
      description: "Altis GR Sport HEV memadukan teknologi hybrid dengan tampilan GR Sport yang sporty.",
      bannerUrl: "/images/cars/altis-hev-gr-sport/banner.jpg",
      thumbnailUrl: "/images/cars/altis-hev-gr-sport/thumbnail.jpg",
      brochureUrl: "/files/brochure-altis-hev-gr-sport.pdf",
      startingPrice: 585800000, priceLabel: "Starting from",
      label: "HYBRID", isNewModel: true, isFeatured: false, isActive: true, sortOrder: 20,
      metaTitle: "Altis GR Sport HEV – Sedan Hybrid Sporty | AutoPrima",
      metaDescription: "Toyota Corolla Altis GR Sport HEV di AutoPrima Cibinong. Harga mulai Rp 585 Juta.",
      variants: [
        {
          name: "1.8 V A/T", slug: "altis-18-v-at",
          fuel: "Bensin", transmission: "Automatic", engineCc: 1798,
          engineLabel: "1.8L 4-cyl DOHC Dual VVT-i", drivetrain: "FWD", seats: 5, sortOrder: 1,
          prices: [
            p("A/T 1.8 V",   585800000, 587600000, true,  false, 1),
            p("A/T 1.8 V P", 588800000, 590600000, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.798 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"140 PS / 6.400 rpm", sortOrder:2 },
          ],
        },
        {
          name: "1.8L HEV", slug: "altis-18-hev",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1798,
          engineLabel: "1.8L Hybrid Synergy Drive", drivetrain: "FWD", seats: 5, sortOrder: 2,
          prices: [
            p("HEV 1.8L HV",       638900000, 641400000, false, false, 1),
            p("HEV 1.8L HV GRS",   646600000, 647500000, false, false, 2),
            p("HEV 1.8L HV P",     643000000, 644500000, false, false, 3),
            p("HEV 1.8L HV GRS P", 649700000, 650600000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.798 cc",                   sortOrder:1 },
            { category:"Mesin",     specKey:"Sistem Hybrid",   specValue:"Toyota Hybrid Synergy Drive", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"e-CVT",                      sortOrder:3 },
          ],
        },
      ],
      colors: [
        { name:"Platinum White Pearl", hexCode:"#F5F5F5", imageUrl:"/images/cars/altis-hev-gr-sport/color-white.jpg", sortOrder:1 },
        { name:"Black Mica",           hexCode:"#1C1C1C", imageUrl:"/images/cars/altis-hev-gr-sport/color-black.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/altis-hev-gr-sport/exterior-1.jpg", altText:"Toyota Altis GR Sport HEV tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [{ title:"Hybrid Synergy Drive", description:"Teknologi hybrid 1.8L untuk efisiensi dan performa optimal.", category:"Performance", sortOrder:1 }],
    },

    // ─── Vios ─────────────────────────────────────────────────────
    {
      categoryId: SEDAN,
      name: "Vios", fullName: "All New Vios", slug: "vios",
      tagline: "Style. Comfort. Value.",
      description: "All New Vios hadir sebagai sedan compact yang stylish dan bertenaga. Mesin 1.5L dengan fitur modern.",
      bannerUrl: "/images/cars/vios/banner.jpg",
      thumbnailUrl: "/images/cars/vios/thumbnail.jpg",
      brochureUrl: "/files/brochure-vios.pdf",
      startingPrice: 375800000, priceLabel: "Starting from",
      label: null, isNewModel: true, isFeatured: false, isActive: true, sortOrder: 21,
      metaTitle: "All New Vios – Sedan Compact Modern | AutoPrima",
      metaDescription: "Toyota Vios di AutoPrima Cibinong. Harga mulai Rp 375 Juta.",
      variants: [
        {
          name: "1.5 G CVT", slug: "vios-15-g-cvt",
          fuel: "Bensin", transmission: "CVT", engineCc: 1496,
          engineLabel: "1.5L 4-cyl DOHC Dual VVT-i", drivetrain: "FWD", seats: 5, sortOrder: 1,
          prices: [
            p("CVT 1.5 G",        375800000, 378000000, true,  false, 1),
            p("CVT 1.5 G TSS",    389200000, 391200000, false, false, 2),
            p("CVT 1.5 G PC",     377300000, 379500000, false, false, 3),
            p("CVT 1.5 G TSS PC", 390700000, 392800000, false, false, 4),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.496 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"107 PS / 6.000 rpm", sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"CVT",                sortOrder:3 },
          ],
        },
        {
          name: "1.5 HEV", slug: "vios-15-hev",
          fuel: "HybridEV", transmission: "eCVT", engineCc: 1496,
          engineLabel: "1.5L Hybrid Synergy Drive", drivetrain: "FWD", seats: 5, sortOrder: 2,
          prices: [
            p("HEV 1.5 1T",    460000000, 460600000, false, false, 1),
            p("HEV 1.5 1T PC", 462500000, 463100000, false, false, 2),
            p("HEV 1.5 2T",    464000000, 464600000, false, false, 3),
            p("HEV 1.5 2T PC", 465000000, 465600000, false, false, 4),
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
      images: [{ url:"/images/cars/vios/exterior-1.jpg", altText:"Toyota Vios tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"Toyota Safety Sense", description:"Sistem keselamatan aktif untuk perlindungan optimal.", category:"Safety",      sortOrder:1 },
        { title:"Hybrid Option",       description:"Tersedia varian hybrid untuk efisiensi terbaik.",      category:"Performance", sortOrder:2 },
      ],
    },

    // ─── GR 86 ────────────────────────────────────────────────────
    {
      categoryId: SEDAN,
      name: "GR 86", fullName: "All New GR 86", slug: "gr-86",
      tagline: "Pure. Sports. Joy.",
      description: "All New GR 86 adalah sports car murni dengan mesin boxer 2.4L NA. Dibuat untuk pengalaman berkendara yang intim dan menyenangkan.",
      bannerUrl: "/images/cars/gr-86/banner.jpg",
      thumbnailUrl: "/images/cars/gr-86/thumbnail.jpg",
      brochureUrl: "/files/brochure-gr-86.pdf",
      startingPrice: undefined, priceLabel: "Hubungi Kami",
      label: "GR", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 22,
      metaTitle: "All New GR 86 – Sports Coupe Toyota | AutoPrima",
      metaDescription: "Toyota GR 86 di AutoPrima Cibinong. Sports car murni bertenaga 234 PS.",
      variants: [
        {
          name: "GR 86 2.4 M/T", slug: "gr-86-24-mt",
          fuel: "Bensin", transmission: "Manual", engineCc: 2387,
          engineLabel: "2.4L Boxer 4-cyl DOHC", drivetrain: "RWD", seats: 4, sortOrder: 1,
          prices: [por("GR 86", 1)],
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
      images: [{ url:"/images/cars/gr-86/exterior-1.jpg", altText:"Toyota GR 86 tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"2.4L Boxer Engine 234 PS", description:"Mesin boxer 4-silinder dengan center of gravity rendah.",   category:"Performance", sortOrder:1 },
        { title:"Rear-Wheel Drive",          description:"Penggerak roda belakang untuk pengalaman berkendara murni.", category:"Performance", sortOrder:2 },
      ],
    },

    // ─── GR Supra ─────────────────────────────────────────────────
    {
      categoryId: SEDAN,
      name: "GR Supra", fullName: "New GR Supra", slug: "gr-supra",
      tagline: "The Icon Returns",
      description: "New GR Supra adalah legenda yang kembali hadir. Sports car ikonik Toyota dengan mesin turbo inline-6 bertenaga tinggi.",
      bannerUrl: "/images/cars/gr-supra/banner.jpg",
      thumbnailUrl: "/images/cars/gr-supra/thumbnail.jpg",
      brochureUrl: "/files/brochure-gr-supra.pdf",
      startingPrice: undefined, priceLabel: "Hubungi Kami",
      label: "GR", isNewModel: true, isFeatured: true, isActive: true, sortOrder: 23,
      metaTitle: "New GR Supra – Sports Car Legendaris Toyota | AutoPrima",
      metaDescription: "Toyota GR Supra di AutoPrima Cibinong. Sports car ikonik 387 PS.",
      variants: [
        {
          name: "GR Supra 3.0T", slug: "gr-supra-30t",
          fuel: "Bensin", transmission: "Automatic", engineCc: 2998,
          engineLabel: "3.0L Inline-6 Turbo", drivetrain: "RWD", seats: 2, sortOrder: 1,
          prices: [por("GR Supra", 1)],
          specs: [
            { category:"Mesin",     specKey:"Tipe Mesin",      specValue:"Inline-6, DOHC, Turbo",    sortOrder:1 },
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.998 cc",                  sortOrder:2 },
            { category:"Mesin",     specKey:"Tenaga Maksimum", specValue:"387 PS / 5.800 rpm",        sortOrder:3 },
            { category:"Mesin",     specKey:"Torsi Maksimum",  specValue:"500 Nm / 1.800-5.000 rpm",  sortOrder:4 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"Rear-Wheel Drive",          sortOrder:5 },
          ],
        },
      ],
      colors: [
        { name:"Phantom Matte Gray", hexCode:"#5A5A5A", imageUrl:"/images/cars/gr-supra/color-gray.jpg",  sortOrder:1 },
        { name:"Renaissance Red",    hexCode:"#8B1A1A", imageUrl:"/images/cars/gr-supra/color-red.jpg",   sortOrder:2 },
        { name:"White",              hexCode:"#F5F5F5", imageUrl:"/images/cars/gr-supra/color-white.jpg", sortOrder:3 },
      ],
      images: [{ url:"/images/cars/gr-supra/exterior-1.jpg", altText:"Toyota GR Supra tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"3.0L Turbo Inline-6 387 PS",   description:"Mesin turbo inline-6 untuk akselerasi dahsyat.",   category:"Performance", sortOrder:1 },
        { title:"Adaptive Variable Suspension", description:"Suspensi adaptif untuk handling precision.",        category:"Performance", sortOrder:2 },
      ],
    },

    // ══════════════════════════════════════════════
    // COMMERCIAL
    // ══════════════════════════════════════════════

    // ─── Hiace Premio ─────────────────────────────────────────────
    {
      categoryId: COMM,
      name: "Hiace Premio", fullName: "New Hiace Premio", slug: "hiace-premio",
      tagline: "Premium People Mover",
      description: "New Hiace Premio menghadirkan kenyamanan premium untuk transportasi kelompok. Kabin luas dan mesin diesel bertenaga.",
      bannerUrl: "/images/cars/hiace-premio/banner.jpg",
      thumbnailUrl: "/images/cars/hiace-premio/thumbnail.jpg",
      brochureUrl: "/files/brochure-hiace-premio.pdf",
      startingPrice: 678800000, priceLabel: "Starting from",
      label: null, isNewModel: true, isFeatured: false, isActive: true, sortOrder: 24,
      metaTitle: "New Hiace Premio – Minibus Premium | AutoPrima",
      metaDescription: "Toyota Hiace Premio di AutoPrima Cibinong. Harga mulai Rp 678 Juta.",
      variants: [
        {
          name: "Premio M/T", slug: "hiace-premio-mt",
          fuel: "Diesel", transmission: "Manual", engineCc: 2755,
          engineLabel: "2.8L 4-cyl Turbo Diesel", drivetrain: "4x2", seats: 10, sortOrder: 1,
          prices: [
            p("Premio M/T Black",        678800000, null, true,  false, 1),
            p("Premio M/T Silver/Beige", 678800000, null, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin",  specValue:"2.755 cc",           sortOrder:1 },
            { category:"Mesin",     specKey:"Tenaga Maksimum",  specValue:"177 PS / 3.400 rpm", sortOrder:2 },
            { category:"Kapasitas", specKey:"Jumlah Penumpang", specValue:"10 Orang",           sortOrder:3 },
            { category:"Transmisi", specKey:"Tipe",             specValue:"5-Speed Manual",     sortOrder:4 },
          ],
        },
      ],
      colors: [
        { name:"Black",        hexCode:"#1C1C1C", imageUrl:"/images/cars/hiace-premio/color-black.jpg",  sortOrder:1 },
        { name:"Silver/Beige", hexCode:"#D4C5A9", imageUrl:"/images/cars/hiace-premio/color-silver.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/hiace-premio/exterior-1.jpg", altText:"Toyota Hiace Premio tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [
        { title:"Captain Seat Premium", description:"Kursi captain berbahan premium dengan sandaran kepala dan armrest.", category:"Comfort", sortOrder:1 },
        { title:"Dual AC",              description:"AC depan dan belakang untuk kenyamanan seluruh penumpang.",          category:"Comfort", sortOrder:2 },
      ],
    },

    // ─── Hiace Commuter ───────────────────────────────────────────
    {
      categoryId: COMM,
      name: "Hiace Commuter", fullName: "Hiace Commuter", slug: "hiace-commuter",
      tagline: "Built for the Journey",
      description: "Hiace Commuter adalah pilihan transportasi komersial yang handal dengan kapasitas penumpang besar.",
      bannerUrl: "/images/cars/hiace-commuter/banner.jpg",
      thumbnailUrl: "/images/cars/hiace-commuter/thumbnail.jpg",
      brochureUrl: "/files/brochure-hiace-commuter.pdf",
      startingPrice: 575400000, priceLabel: "Starting from",
      label: null, isNewModel: false, isFeatured: false, isActive: true, sortOrder: 25,
      metaTitle: "Hiace Commuter – Minibus Komersial | AutoPrima",
      metaDescription: "Toyota Hiace Commuter di AutoPrima Cibinong. Harga mulai Rp 575 Juta.",
      variants: [
        {
          name: "Commuter M/T", slug: "hiace-commuter-mt",
          fuel: "Diesel", transmission: "Manual", engineCc: 2755,
          engineLabel: "2.8L 4-cyl Turbo Diesel", drivetrain: "4x2", seats: 15, sortOrder: 1,
          prices: [
            p("Commuter M/T 1T", 575400000, null, true,  false, 1),
            p("Commuter M/T 2T", 575400000, null, false, false, 2),
          ],
          specs: [
            { category:"Kapasitas", specKey:"Jumlah Penumpang", specValue:"15 Orang",       sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",             specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
      ],
      colors: [{ name:"White", hexCode:"#FFFFFF", imageUrl:"/images/cars/hiace-commuter/color-white.jpg", sortOrder:1 }],
      images: [{ url:"/images/cars/hiace-commuter/exterior-1.jpg", altText:"Toyota Hiace Commuter tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [{ title:"Large Capacity Cabin", description:"Kabin luas untuk 15 penumpang dengan akses mudah.", category:"Comfort", sortOrder:1 }],
    },

    // ─── Hilux Rangga ─────────────────────────────────────────────
    {
      categoryId: COMM,
      name: "Hilux Rangga", fullName: "Hilux Rangga", slug: "hilux-rangga",
      tagline: "Strong. Versatile. Rangga.",
      description: "Hilux Rangga adalah pickup serbaguna terbaru Toyota. Berbagai konfigurasi untuk kebutuhan komersial dan personal.",
      bannerUrl: "/images/cars/hilux-rangga/banner.jpg",
      thumbnailUrl: "/images/cars/hilux-rangga/thumbnail.jpg",
      brochureUrl: "/files/brochure-hilux-rangga.pdf",
      startingPrice: 194300000, priceLabel: "Starting from",
      label: "NEW", isNewModel: true, isFeatured: false, isActive: true, sortOrder: 26,
      metaTitle: "Hilux Rangga – Pickup Serbaguna | AutoPrima",
      metaDescription: "Toyota Hilux Rangga di AutoPrima Cibinong. Harga mulai Rp 194 Juta.",
      variants: [
        {
          name: "PU 2.0 Bensin", slug: "hilux-rangga-pu-20-bensin",
          fuel: "Bensin", transmission: "Manual", engineCc: 1998,
          engineLabel: "2.0L 4-cyl Bensin", drivetrain: "4x2", seats: 2, sortOrder: 1,
          prices: [
            p("M/T CHSS PU 2.0 STD", 194300000, null, true,  false, 1),
            p("M/T PU 2.0 STD",      199200000, null, false, false, 2),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"1.998 cc",    sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
        {
          name: "PU 2.4 Diesel", slug: "hilux-rangga-pu-24-diesel",
          fuel: "Diesel", transmission: "Manual", engineCc: 2393,
          engineLabel: "2.4L 4-cyl Turbo Diesel", drivetrain: "4x2", seats: 2, sortOrder: 2,
          prices: [
            p("M/T PU 2.4 STD", 249100000, null, false, false, 1),
          ],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",    sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"5-Speed Manual", sortOrder:2 },
          ],
        },
      ],
      colors: [
        { name:"White",           hexCode:"#FFFFFF", imageUrl:"/images/cars/hilux-rangga/color-white.jpg",  sortOrder:1 },
        { name:"Silver Metallic", hexCode:"#C0C0C0", imageUrl:"/images/cars/hilux-rangga/color-silver.jpg", sortOrder:2 },
      ],
      images: [{ url:"/images/cars/hilux-rangga/exterior-1.jpg", altText:"Toyota Hilux Rangga tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [{ title:"Multi-Configuration", description:"Tersedia berbagai konfigurasi dari single cab hingga double cab.", category:"Versatility", sortOrder:1 }],
    },

    // ─── Hilux D Cab ──────────────────────────────────────────────
    {
      categoryId: COMM,
      name: "Hilux D Cab", fullName: "New Hilux D Cab", slug: "hilux-d-cab",
      tagline: "Tough. Capable. Hilux.",
      description: "New Hilux Double Cab menghadirkan pickup tangguh dengan kabin 5 penumpang dan mesin diesel 2.4L bertenaga.",
      bannerUrl: "/images/cars/hilux-d-cab/banner.jpg",
      thumbnailUrl: "/images/cars/hilux-d-cab/thumbnail.jpg",
      brochureUrl: "/files/brochure-hilux-d-cab.pdf",
      startingPrice: 456300000, priceLabel: "Starting from",
      label: null, isNewModel: true, isFeatured: false, isActive: true, sortOrder: 27,
      metaTitle: "New Hilux Double Cab – Pickup Tangguh | AutoPrima",
      metaDescription: "Toyota Hilux D Cab di AutoPrima Cibinong. Harga mulai Rp 456 Juta.",
      variants: [
        {
          name: "DC 2.4", slug: "hilux-dc-24",
          fuel: "Diesel", transmission: "Manual", engineCc: 2393,
          engineLabel: "2.4L 4-cyl Turbo Diesel", drivetrain: "4x2", seats: 5, sortOrder: 1,
          prices: [
            p("DC M/T 2.4 E",     456300000, null, true,  false, 1),
            p("DC M/T 2.4 E RTS", 465200000, null, false, false, 2),
            p("DC M/T 2.4 G",     490100000, null, false, false, 3),
            p("DC A/T 2.4 V",     545900000, null, false, false, 4),
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
      images: [{ url:"/images/cars/hilux-d-cab/exterior-1.jpg", altText:"Toyota Hilux D Cab tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [{ title:"2.4L Turbo Diesel", description:"Mesin diesel turbo bertenaga untuk kemampuan angkut maksimal.", category:"Performance", sortOrder:1 }],
    },

    // ─── Hilux S Cab ──────────────────────────────────────────────
    {
      categoryId: COMM,
      name: "Hilux S Cab", fullName: "New Hilux S Cab", slug: "hilux-s-cab",
      tagline: "Work Hard. Drive Harder.",
      description: "New Hilux Single Cab adalah pickup kerja yang tangguh dan efisien untuk kebutuhan bisnis harian.",
      bannerUrl: "/images/cars/hilux-s-cab/banner.jpg",
      thumbnailUrl: "/images/cars/hilux-s-cab/thumbnail.jpg",
      brochureUrl: "/files/brochure-hilux-s-cab.pdf",
      startingPrice: 416800000, priceLabel: "Starting from",
      label: null, isNewModel: true, isFeatured: false, isActive: true, sortOrder: 28,
      metaTitle: "New Hilux Single Cab – Pickup Kerja | AutoPrima",
      metaDescription: "Toyota Hilux S Cab di AutoPrima Cibinong. Harga mulai Rp 416 Juta.",
      variants: [
        {
          name: "SC M/T 2.4 DSL 4x4", slug: "hilux-sc-24-mt-4x4",
          fuel: "Diesel", transmission: "Manual", engineCc: 2393,
          engineLabel: "2.4L 4-cyl Turbo Diesel", drivetrain: "4x4", seats: 2, sortOrder: 1,
          prices: [p("SC M/T 2.4 DSL 4x4", 416800000, null, true, false, 1)],
          specs: [
            { category:"Mesin",     specKey:"Kapasitas Mesin", specValue:"2.393 cc",    sortOrder:1 },
            { category:"Penggerak", specKey:"Sistem",          specValue:"4x4",         sortOrder:2 },
            { category:"Transmisi", specKey:"Tipe",            specValue:"6-Speed Manual", sortOrder:3 },
          ],
        },
      ],
      colors: [{ name:"White", hexCode:"#FFFFFF", imageUrl:"/images/cars/hilux-s-cab/color-white.jpg", sortOrder:1 }],
      images: [{ url:"/images/cars/hilux-s-cab/exterior-1.jpg", altText:"Toyota Hilux S Cab tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [{ title:"4x4 Capability", description:"Sistem 4x4 untuk kemampuan off-road dan medan berat.", category:"Performance", sortOrder:1 }],
    },

    // ─── Dyna ─────────────────────────────────────────────────────
    {
      categoryId: COMM,
      name: "Dyna", fullName: "New Dyna", slug: "dyna",
      tagline: "Built for Business",
      description: "New Dyna adalah truk ringan andalan Toyota untuk kebutuhan komersial dengan kapasitas muatan besar.",
      bannerUrl: "/images/cars/dyna/banner.jpg",
      thumbnailUrl: "/images/cars/dyna/thumbnail.jpg",
      brochureUrl: "/files/brochure-dyna.pdf",
      startingPrice: 509300000, priceLabel: "Starting from",
      label: null, isNewModel: true, isFeatured: false, isActive: true, sortOrder: 29,
      metaTitle: "New Dyna – Truk Ringan Komersial | AutoPrima",
      metaDescription: "Toyota Dyna di AutoPrima Cibinong. Harga mulai Rp 509 Juta.",
      variants: [
        {
          name: "M/T 4x2 6", slug: "dyna-4x2-6",
          fuel: "Diesel", transmission: "Manual", engineCc: 0,
          engineLabel: "Diesel", drivetrain: "4x2", seats: 3, sortOrder: 1,
          prices: [
            p("M/T 4x2 6",       509300000, null, true,  false, 1),
            p("M/T 4x2 6 (PTO)", 513300000, null, false, false, 2),
          ],
          specs: [
            { category:"Kapasitas", specKey:"GVW",  specValue:"6.000 kg", sortOrder:1 },
            { category:"Transmisi", specKey:"Tipe", specValue:"Manual",   sortOrder:2 },
          ],
        },
      ],
      colors: [{ name:"White", hexCode:"#FFFFFF", imageUrl:"/images/cars/dyna/color-white.jpg", sortOrder:1 }],
      images: [{ url:"/images/cars/dyna/exterior-1.jpg", altText:"Toyota Dyna tampak depan", category:"exterior", isPrimary:true, sortOrder:1 }],
      features: [{ title:"Heavy Duty Payload", description:"Kapasitas muatan tinggi untuk kebutuhan angkut komersial.", category:"Performance", sortOrder:1 }],
    },

  ]; // end return
}

// ── Main Seeder ───────────────────────────────────────────────────

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
      await Car.findOneAndUpdate({ slug: car.slug }, { $set: car });
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