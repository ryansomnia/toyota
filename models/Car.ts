import { Schema, model, models, Document, Types } from "mongoose";

// ── Sub-schemas ──────────────────────────────────────────────────

const CarPriceSchema = new Schema(
  {
    label:          { type: String, required: true },   // "GRS TSS 4X2 1T"
    platB:          { type: Number },                   // harga plat B (null = hubungi kami)
    platF:          { type: Number },                   // harga plat F
    isBasePrice:    { type: Boolean, default: false },  // harga terendah untuk starting price
    priceOnRequest: { type: Boolean, default: false },  // tampilkan "Hubungi Kami"
    sortOrder:      { type: Number, default: 0 },
  },
  { _id: true }
);

const CarSpecSchema = new Schema(
  {
    category:  { type: String, required: true }, // "Mesin","Dimensi","Keselamatan"
    specKey:   { type: String, required: true }, // "Kapasitas Mesin"
    specValue: { type: String, required: true }, // "2.755 cc"
    sortOrder: { type: Number, default: 0 },
  },
  { _id: true }
);

const CarVariantSchema = new Schema(
  {
    name:         { type: String, required: true },       // "GR Sport", "G", "HEV"
    slug:         { type: String, required: true },       // "fortuner-gr-sport-4x4"
    fuel:         { type: String, default: "Bensin" },          // Bensin/Diesel/Hybrid/HybridEV/BatteryEV/Electric
    transmission: { type: String, default: "Automatic" },       // Manual/Automatic/CVT/eCVT/etc
    engineCc:     { type: Number },
    engineLabel:  { type: String },                       // "2.8L Turbo Diesel"
    drivetrain:   { type: String, default: "4x2" },             // 4x2/4x4/FWD/AWD/RWD/eFour
    seats:        { type: Number, default: 7 },
    isActive:     { type: Boolean, default: true },
    sortOrder:    { type: Number, default: 0 },
    prices:       [CarPriceSchema],
    specs:        [CarSpecSchema],
  },
  { _id: true }
);

const CarColorSchema = new Schema(
  {
    name:      { type: String, required: true },   // "Attitude Black Mica"
    hexCode:   { type: String },                   // "#1C1C1C"
    imageUrl:  { type: String },                   // path foto warna
    isActive:  { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: true }
);

const CarImageSchema = new Schema(
  {
    url:       { type: String, required: true },
    altText:   { type: String },
    category:  {
      type: String,
      enum: ["exterior", "interior", "detail", "color", "banner"],
      default: "exterior",
    },
    isPrimary: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: true }
);

const CarFeatureSchema = new Schema(
  {
    title:       { type: String, required: true },  // "Toyota Safety Sense"
    description: { type: String },
    iconUrl:     { type: String },
    imageUrl:    { type: String },
    category:    { type: String },                  // "Safety","Comfort","Performance"
    sortOrder:   { type: Number, default: 0 },
  },
  { _id: true }
);

// ── Main Car Schema ──────────────────────────────────────────────

export interface ICar extends Document {
  categoryId:       Types.ObjectId;
  name:             string;
  fullName:         string;
  slug:             string;
  tagline?:         string;
  description?:     string;
  bannerUrl?:       string;
  thumbnailUrl?:    string;
  brochureUrl?:     string;
  startingPrice?:   number;
  priceLabel:       string;
  label?:           string;
  isNewModel:        boolean;
  isFeatured:       boolean;
  isActive:         boolean;
  sortOrder:        number;
  viewCount:        number;
  metaTitle?:       string;
  metaDescription?: string;
  variants:         typeof CarVariantSchema[];
  colors:           typeof CarColorSchema[];
  images:           typeof CarImageSchema[];
  features:         typeof CarFeatureSchema[];
  createdAt:        Date;
  updatedAt:        Date;
}

const CarSchema = new Schema<ICar>(
  {
    categoryId:     { type: Schema.Types.ObjectId, ref: "CarCategory", required: true },
    name:           { type: String, required: true, trim: true },
    fullName:       { type: String, required: true, trim: true },
    slug:           { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline:        { type: String },
    description:    { type: String },

    // Media
    bannerUrl:      { type: String },
    thumbnailUrl:   { type: String },
    brochureUrl:    { type: String },

    // Harga
    startingPrice:  { type: Number },
    priceLabel:     { type: String, default: "Starting from" },

    // Label & status
    label:          { type: String },        // "NEW", "HYBRID", "EV", "GR"
    isNewModel:     { type: Boolean, default: false }, // rename dari isNew (reserved word mongoose)
    isFeatured:     { type: Boolean, default: false },
    isActive:       { type: Boolean, default: true },
    sortOrder:      { type: Number, default: 0 },
    viewCount:      { type: Number, default: 0 },

    // SEO
    metaTitle:       { type: String },
    metaDescription: { type: String },

    // Nested documents
    variants:  [CarVariantSchema],
    colors:    [CarColorSchema],
    images:    [CarImageSchema],
    features:  [CarFeatureSchema],
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

// Indexes
CarSchema.index({ categoryId: 1 });
CarSchema.index({ isActive: 1, isFeatured: -1, sortOrder: 1 });
CarSchema.index({ isNewModel: -1 });
CarSchema.index({ isActive: 1, startingPrice: 1 });
CarSchema.index({ name: "text", fullName: "text", description: "text" });

export const Car = models.Car || model<ICar>("Car", CarSchema);
