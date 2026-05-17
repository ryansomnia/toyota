import { Schema, model, models, Document, Types } from "mongoose";

// ── PROMO ────────────────────────────────────────────────────────

export interface IPromo extends Document {
  title:          string;
  slug:           string;
  description?:   string;
  terms?:         string;
  discountType:   "cashback" | "dp_ringan" | "free_item" | "bonus" | "other";
  discountValue?: number;
  carId?:         Types.ObjectId;         // null = berlaku semua model
  startDate:      Date;
  endDate:        Date;
  bannerUrl?:     string;
  isActive:       boolean;
  createdAt:      Date;
  updatedAt:      Date;
}

const PromoSchema = new Schema<IPromo>(
  {
    title:         { type: String, required: true, trim: true },
    slug:          { type: String, required: true, unique: true, lowercase: true },
    description:   { type: String },
    terms:         { type: String },
    discountType:  {
      type: String,
      enum: ["cashback", "dp_ringan", "free_item", "bonus", "other"],
      required: true,
    },
    discountValue: { type: Number },
    carId:         { type: Schema.Types.ObjectId, ref: "Car", default: null },
    startDate:     { type: Date, required: true },
    endDate:       { type: Date, required: true },
    bannerUrl:     { type: String },
    isActive:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

PromoSchema.index({ isActive: 1, startDate: 1, endDate: 1 });

export const Promo = models.Promo || model<IPromo>("Promo", PromoSchema);

// ── TESTIMONIAL ──────────────────────────────────────────────────

export interface ITestimonial extends Document {
  nama:       string;
  kota?:      string;
  carId?:     Types.ObjectId;
  carName?:   string;          // teks bebas jika carId null
  rating:     number;
  quote:      string;
  avatarUrl?: string;
  isFeatured: boolean;
  isActive:   boolean;
  createdAt:  Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    nama:       { type: String, required: true, trim: true },
    kota:       { type: String },
    carId:      { type: Schema.Types.ObjectId, ref: "Car", default: null },
    carName:    { type: String },
    rating:     { type: Number, min: 1, max: 5, default: 5 },
    quote:      { type: String, required: true },
    avatarUrl:  { type: String },
    isFeatured: { type: Boolean, default: false },
    isActive:   { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

TestimonialSchema.index({ isActive: 1, isFeatured: -1 });

export const Testimonial =
  models.Testimonial ||
  model<ITestimonial>("Testimonial", TestimonialSchema);

// ── SETTING ──────────────────────────────────────────────────────

export interface ISetting extends Document {
  key:       string;
  value:     string;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    key:   { type: String, required: true, unique: true },
    value: { type: String },
  },
  { timestamps: { createdAt: false, updatedAt: "updatedAt" } }
);

export const Setting =
  models.Setting || model<ISetting>("Setting", SettingSchema);
