-- ============================================================
-- AUTO PRIMA SAFE SEED
-- Aman dijalankan berkali-kali
-- ============================================================

USE autoprima;

SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- BRANDS
-- ============================================================

INSERT INTO brands (name, is_active)
VALUES
  ('Toyota', 1),
  ('Honda', 1),
  ('Mitsubishi', 1),
  ('Suzuki', 1),
  ('Daihatsu', 1),
  ('Hyundai', 1),
  ('Nissan', 1),
  ('Isuzu', 1)
ON DUPLICATE KEY UPDATE
  is_active = VALUES(is_active);

-- ============================================================
-- CARS
-- ============================================================

INSERT INTO cars (
  brand_id,
  name,
  slug,
  type,
  year,
  price,
  fuel,
  transmission,
  seats,
  engine_cc,
  mileage,
  badge,
  status,
  is_featured,
  description,
  meta_title,
  meta_description
)
VALUES

(
  1,
  'Fortuner GR Sport',
  'fortuner-gr-sport',
  'SUV',
  2024,
  680000000,
  'Diesel',
  'Automatic',
  7,
  2800,
  0,
  'hot',
  'available',
  1,
  'Toyota Fortuner GR Sport 2024 hadir dengan tampilan sporty.',
  'Toyota Fortuner GR Sport 2024 | AutoPrima',
  'Toyota Fortuner GR Sport tersedia di AutoPrima.'
),

(
  1,
  'Innova Zenix Hybrid',
  'innova-zenix-hybrid',
  'MPV',
  2024,
  420000000,
  'Hybrid',
  'CVT',
  7,
  2000,
  0,
  'new',
  'available',
  1,
  'Toyota Innova Zenix Hybrid 2024 dengan teknologi hybrid.',
  'Toyota Innova Zenix Hybrid | AutoPrima',
  'Toyota Innova Zenix Hybrid tersedia di AutoPrima.'
),

(
  2,
  'HR-V 1.5 Turbo',
  'hrv-turbo',
  'SUV',
  2024,
  385000000,
  'Bensin',
  'CVT',
  5,
  1500,
  0,
  'new',
  'available',
  1,
  'Honda HR-V 1.5 Turbo 2024 crossover premium.',
  'Honda HR-V Turbo 2024 | AutoPrima',
  'Honda HR-V Turbo tersedia di AutoPrima.'
)

ON DUPLICATE KEY UPDATE
  brand_id         = VALUES(brand_id),
  name             = VALUES(name),
  type             = VALUES(type),
  year             = VALUES(year),
  price            = VALUES(price),
  fuel             = VALUES(fuel),
  transmission     = VALUES(transmission),
  seats            = VALUES(seats),
  engine_cc        = VALUES(engine_cc),
  mileage          = VALUES(mileage),
  badge            = VALUES(badge),
  status           = VALUES(status),
  is_featured      = VALUES(is_featured),
  description      = VALUES(description),
  meta_title       = VALUES(meta_title),
  meta_description = VALUES(meta_description);

-- ============================================================
-- UPDATE JSON
-- ============================================================

UPDATE cars
SET
  color_options = JSON_ARRAY(
    'Putih',
    'Hitam',
    'Silver'
  ),
  features = JSON_ARRAY(
    'Sunroof',
    'Apple CarPlay',
    'Android Auto'
  )
WHERE slug = 'fortuner-gr-sport';

-- ============================================================
-- PROMOS
-- ============================================================

INSERT INTO promos (
  title,
  slug,
  description,
  discount_type,
  discount_value,
  start_date,
  end_date,
  is_active
)
VALUES

(
  'Cash Back Rp 30 Juta',
  'cashback-30-juta',
  'Cashback hingga Rp 30 juta.',
  'cashback',
  30000000,
  CURDATE(),
  DATE_ADD(CURDATE(), INTERVAL 30 DAY),
  1
),

(
  'DP Mulai 10%',
  'dp-10-persen',
  'DP mulai 10% untuk semua unit.',
  'dp_ringan',
  10,
  CURDATE(),
  DATE_ADD(CURDATE(), INTERVAL 60 DAY),
  1
)

ON DUPLICATE KEY UPDATE
  title          = VALUES(title),
  description    = VALUES(description),
  discount_type  = VALUES(discount_type),
  discount_value = VALUES(discount_value),
  start_date     = VALUES(start_date),
  end_date       = VALUES(end_date),
  is_active      = VALUES(is_active),
  updated_at     = CURRENT_TIMESTAMP;

-- ============================================================
-- TESTIMONIALS
-- ============================================================

INSERT INTO testimonials (
  nama,
  kota,
  car_name,
  rating,
  quote,
  is_featured,
  is_active
)
VALUES

(
  'Budi Raharjo',
  'Cibinong',
  'Toyota Fortuner GR Sport',
  5,
  'Proses sangat cepat dan mudah.',
  1,
  1
),

(
  'Siti Maryam',
  'Depok',
  'Honda HR-V Turbo',
  5,
  'Pelayanan sangat responsif.',
  1,
  1
);

-- ============================================================
-- SETTINGS
-- ============================================================

INSERT INTO settings (`key`, `value`)
VALUES
  ('wa_number', '6281234567890'),
  ('wa_message', 'Halo AutoPrima 🙏'),
  ('phone', '02187654321'),
  ('email', 'info@autoprima.id')

ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`);

-- ============================================================
-- BLOG POSTS
-- ============================================================

INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  is_published,
  published_at,
  meta_title,
  meta_description
)
VALUES

(
  'Harga Toyota Fortuner 2024',
  'harga-toyota-fortuner-2024',
  'Update harga Toyota Fortuner terbaru.',
  1,
  NOW(),
  'Harga Toyota Fortuner 2024 | AutoPrima',
  'Update harga Toyota Fortuner terbaru.'
),

(
  'Tips Beli Mobil Pertama',
  'tips-beli-mobil-pertama',
  'Tips penting membeli mobil pertama.',
  1,
  NOW(),
  'Tips Beli Mobil Pertama | AutoPrima',
  'Panduan membeli mobil pertama.'
)

ON DUPLICATE KEY UPDATE
  title             = VALUES(title),
  excerpt           = VALUES(excerpt),
  is_published      = VALUES(is_published),
  published_at      = VALUES(published_at),
  meta_title        = VALUES(meta_title),
  meta_description  = VALUES(meta_description),
  updated_at        = CURRENT_TIMESTAMP;

SET FOREIGN_KEY_CHECKS = 1;

SELECT 'SEED SUCCESSFULLY EXECUTED' AS message;