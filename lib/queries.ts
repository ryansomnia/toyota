// lib/queries.ts
// Semua fungsi query database yang dipakai API routes

import { prisma } from "./prisma";
import { CarType, FuelType, LeadSource, Prisma } from "@prisma/client";

// ═══════════════════════════════════════════════
// CARS
// ═══════════════════════════════════════════════

export interface CarFilters {
  type?: CarType;
  brand?: string;
  fuel?: FuelType;
  condition?: "NEW" | "USED";
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  search?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "price_asc" | "price_desc" | "newest" | "oldest" | "popular";
}

/** Ambil daftar mobil dengan filter & pagination */
export async function getCars(filters: CarFilters = {}) {
  const {
    type, brand, fuel, condition, priceMin, priceMax,
    yearMin, yearMax, search, isFeatured,
    page = 1, limit = 12,
    sortBy = "newest",
  } = filters;

  const where: Prisma.CarWhereInput = {
    isActive: true,
    ...(type && { type }),
    ...(brand && { brand: { contains: brand } }),
    ...(fuel && { fuel }),
    ...(condition && { condition }),
    ...(isFeatured !== undefined && { isFeatured }),
    ...((priceMin || priceMax) && {
      price: {
        ...(priceMin && { gte: priceMin }),
        ...(priceMax && { lte: priceMax }),
      },
    }),
    ...((yearMin || yearMax) && {
      year: {
        ...(yearMin && { gte: yearMin }),
        ...(yearMax && { lte: yearMax }),
      },
    }),
    ...(search && {
      OR: [
        { brand: { contains: search } },
        { model: { contains: search } },
        { variant: { contains: search } },
        { description: { contains: search } },
      ],
    }),
  };

  const orderBy: Prisma.CarOrderByWithRelationInput =
    sortBy === "price_asc"  ? { price: "asc" }    :
    sortBy === "price_desc" ? { price: "desc" }   :
    sortBy === "oldest"     ? { createdAt: "asc" } :
    sortBy === "popular"    ? { viewCount: "desc" } :
                              { createdAt: "desc" };

  const [data, total] = await Promise.all([
    prisma.car.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true, slug: true, brand: true, model: true, variant: true,
        type: true, year: true, price: true, priceMin: true,
        fuel: true, transmission: true, seats: true, engine: true,
        mileage: true, condition: true, badge: true,
        images: true, isFeatured: true, viewCount: true,
      },
    }),
    prisma.car.count({ where }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/** Ambil detail 1 mobil berdasarkan slug */
export async function getCarBySlug(slug: string) {
  const car = await prisma.car.findUnique({
    where: { slug, isActive: true },
    include: {
      promos: {
        include: { promo: true },
        where: {
          promo: {
            isActive: true,
            startDate: { lte: new Date() },
            endDate: { gte: new Date() },
          },
        },
      },
    },
  });

  if (car) {
    // Increment view count (fire and forget)
    prisma.car.update({
      where: { id: car.id },
      data: { viewCount: { increment: 1 } },
    }).catch(() => {});
  }

  return car;
}

/** Ambil mobil featured untuk hero/homepage */
export async function getFeaturedCars(limit = 4) {
  return prisma.car.findMany({
    where: { isActive: true, isFeatured: true },
    orderBy: { viewCount: "desc" },
    take: limit,
    select: {
      id: true, slug: true, brand: true, model: true, variant: true,
      type: true, year: true, price: true, fuel: true,
      transmission: true, seats: true, badge: true, images: true,
    },
  });
}

/** Ambil daftar brand yang tersedia */
export async function getAvailableBrands() {
  const result = await prisma.car.groupBy({
    by: ["brand"],
    where: { isActive: true },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });
  return result.map((r) => ({ brand: r.brand, count: r._count.id }));
}

// ═══════════════════════════════════════════════
// LEADS
// ═══════════════════════════════════════════════

export interface CreateLeadInput {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  budget?: string;
  message?: string;
  carId?: number;
  source?: LeadSource;
}

/** Buat lead baru dari form kontak / WhatsApp */
export async function createLead(input: CreateLeadInput) {
  // Cek duplikat nomor HP dalam 24 jam terakhir
  const existing = await prisma.lead.findFirst({
    where: {
      phone: input.phone,
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
  });

  if (existing) {
    // Update lead yang ada daripada buat baru
    return prisma.lead.update({
      where: { id: existing.id },
      data: {
        message: input.message || existing.message,
        carId: input.carId || existing.carId,
        updatedAt: new Date(),
      },
    });
  }

  return prisma.lead.create({ data: input });
}

/** Ambil semua leads untuk dashboard admin */
export async function getLeads(filters: {
  status?: string;
  source?: string;
  page?: number;
  limit?: number;
} = {}) {
  const { status, source, page = 1, limit = 20 } = filters;

  const where: Prisma.LeadWhereInput = {
    ...(status && { status: status as any }),
    ...(source && { source: source as any }),
  };

  const [data, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        car: {
          select: { brand: true, model: true, year: true },
        },
      },
    }),
    prisma.lead.count({ where }),
  ]);

  return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
}

/** Update status lead */
export async function updateLeadStatus(
  id: number,
  status: string,
  notes?: string
) {
  return prisma.lead.update({
    where: { id },
    data: {
      status: status as any,
      notes,
      ...(status === "CONTACTED" && { followedAt: new Date() }),
      ...(["WON", "LOST"].includes(status) && { closedAt: new Date() }),
    },
  });
}

// ═══════════════════════════════════════════════
// PROMO
// ═══════════════════════════════════════════════

/** Ambil promo yang sedang aktif */
export async function getActivePromos(featuredOnly = false) {
  const now = new Date();
  return prisma.promo.findMany({
    where: {
      isActive: true,
      startDate: { lte: now },
      endDate: { gte: now },
      ...(featuredOnly && { isFeatured: true }),
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    include: {
      cars: {
        include: {
          car: {
            select: { id: true, brand: true, model: true, slug: true },
          },
        },
      },
    },
  });
}

/** Buat promo baru */
export async function createPromo(data: {
  title: string;
  slug: string;
  description?: string;
  type: string;
  discount?: number;
  discountPct?: number;
  dpMinPct?: number;
  imageUrl?: string;
  terms?: string;
  startDate: Date;
  endDate: Date;
  carIds?: number[];
}) {
  const { carIds, ...promoData } = data;

  return prisma.promo.create({
    data: {
      ...promoData,
      type: promoData.type as any,
      ...(carIds && {
        cars: {
          create: carIds.map((carId) => ({ carId })),
        },
      }),
    },
  });
}

// ═══════════════════════════════════════════════
// TESTIMONIAL
// ═══════════════════════════════════════════════

/** Ambil testimonial aktif */
export async function getTestimonials(featuredOnly = false, limit = 6) {
  return prisma.testimonial.findMany({
    where: {
      isActive: true,
      ...(featuredOnly && { isFeatured: true }),
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: limit,
  });
}

/** Tambah testimonial baru */
export async function createTestimonial(data: {
  name: string;
  city?: string;
  carBought?: string;
  rating: number;
  content: string;
}) {
  return prisma.testimonial.create({ data });
}

// ═══════════════════════════════════════════════
// KREDIT SIMULATION
// ═══════════════════════════════════════════════

export function calcCredit(
  carPrice: number,
  dpPercent: number,
  tenorMonths: number,
  annualRate = 0.09
) {
  const dpAmount = carPrice * (dpPercent / 100);
  const principal = carPrice - dpAmount;
  const totalInterest = principal * annualRate * (tenorMonths / 12);
  const totalAmount = principal + totalInterest;
  const monthly = totalAmount / tenorMonths;

  return {
    dpAmount: Math.round(dpAmount),
    principal: Math.round(principal),
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(totalAmount),
    monthly: Math.round(monthly),
  };
}

export async function logCreditSimulation(data: {
  carPrice: number;
  dpPercent: number;
  tenor: number;
  monthly: number;
  phone?: string;
}) {
  return prisma.creditSimulation.create({ data });
}

// ═══════════════════════════════════════════════
// STATS / DASHBOARD
// ═══════════════════════════════════════════════

export async function getDashboardStats() {
  const [
    totalCars, totalLeads, newLeads, wonLeads,
    totalSimulations,
  ] = await Promise.all([
    prisma.car.count({ where: { isActive: true } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count({ where: { status: "WON" } }),
    prisma.creditSimulation.count(),
  ]);

  // Lead per status
  const leadsByStatus = await prisma.lead.groupBy({
    by: ["status"],
    _count: { id: true },
  });

  // Lead per bulan (6 bulan terakhir)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const recentLeads = await prisma.lead.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true, status: true },
    orderBy: { createdAt: "asc" },
  });

  return {
    totalCars,
    totalLeads,
    newLeads,
    wonLeads,
    conversionRate: totalLeads > 0
      ? ((wonLeads / totalLeads) * 100).toFixed(1) + "%"
      : "0%",
    totalSimulations,
    leadsByStatus: leadsByStatus.map((l) => ({
      status: l.status,
      count: l._count.id,
    })),
    recentLeads,
  };
}
