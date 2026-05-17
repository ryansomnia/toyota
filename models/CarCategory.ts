import mongoose, { Schema, model, models, Document } from "mongoose";

export interface ICarCategory extends Document {
  name:        string;
  slug:        string;
  description?: string;
  icon?:       string;
  sortOrder:   number;
  isActive:    boolean;
  createdAt:   Date;
}

const CarCategorySchema = new Schema<ICarCategory>(
  {
    name:        { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    icon:        { type: String },
    sortOrder:   { type: Number, default: 0 },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

CarCategorySchema.index({ isActive: 1, sortOrder: 1 });

export const CarCategory =
  models.CarCategory ||
  model<ICarCategory>("CarCategory", CarCategorySchema);
