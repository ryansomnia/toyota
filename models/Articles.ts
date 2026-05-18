import { Schema, model, models, Document, Types } from "mongoose";

// ─────────────────────────────────────────────────────────────
// ARTICLE / CONTENT
// ─────────────────────────────────────────────────────────────

export interface IArticle extends Document {
  title: string;
  slug: string;

  excerpt?: string;
  content?: string;

  thumbnailUrl?: string;
  bannerUrl?: string;

  type: "article" | "carousel" | "news" | "promo";

  carId?: Types.ObjectId;

  tags?: string[];

  isFeatured: boolean;
  isActive: boolean;

  publishedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
    },

    content: {
      type: String,
    },

    thumbnailUrl: {
      type: String,
    },

    bannerUrl: {
      type: String,
    },

    type: {
      type: String,
      enum: ["article", "carousel", "news", "promo"],
      default: "article",
    },

    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      default: null,
    },

    tags: [
      {
        type: String,
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

ArticleSchema.index({
  type: 1,
  isActive: 1,
  isFeatured: -1,
  publishedAt: -1,
});

export const Article =
  models.Article || model<IArticle>("Article", ArticleSchema);