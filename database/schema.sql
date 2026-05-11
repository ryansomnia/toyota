-- ============================================================
--  AutoPrima – MySQL Database Schema
--  Jalankan: mysql -u root -p autoprima < database/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS autoprima
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE autoprima;

-- ------------------------------------------------------------
-- 1. BRANDS – merek mobil
-- ------------------------------------------------------------
CREATE TABLE brands (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  logo_url    VARCHAR(500),
  is_active   TINYINT(1) DEFAULT 1,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 2. CARS – katalog unit mobil
-- ------------------------------------------------------------
CREATE TABLE cars (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  brand_id        INT UNSIGNED NOT NULL,
  name            VARCHAR(200) NOT NULL,
  slug            VARCHAR(220) NOT NULL UNIQUE,        -- untuk SEO URL
  type            ENUM('SUV','MPV','Sedan','City Car','Pickup','Sport','Hybrid','Electric') NOT NULL,
  year            YEAR NOT NULL,
  price           DECIMAL(15,2) NOT NULL,              -- harga OTR dalam rupiah
  price_min       DECIMAL(15,2),                       -- harga terendah (kredit)
  fuel            ENUM('Bensin','Diesel','Hybrid','Electric','Gas') NOT NULL,
  transmission    ENUM('Manual','Automatic','CVT','AT','DCT','e-CVT','IVT') NOT NULL,
  seats           TINYINT UNSIGNED NOT NULL DEFAULT 5,
  engine_cc       SMALLINT UNSIGNED,                   -- kapasitas mesin cc
  mileage         INT UNSIGNED DEFAULT 0,              -- km (0 = baru)
  color_options   JSON,                                -- ["Putih","Hitam","Silver"]
  features        JSON,                                -- fitur unggulan
  description     TEXT,
  meta_title      VARCHAR(160),                        -- SEO
  meta_description VARCHAR(320),                       -- SEO
  badge           ENUM('new','hot','promo','') DEFAULT '',
  status          ENUM('available','sold','indent') DEFAULT 'available',
  is_featured     TINYINT(1) DEFAULT 0,
  view_count      INT UNSIGNED DEFAULT 0,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE RESTRICT,
  INDEX idx_type      (type),
  INDEX idx_status    (status),
  INDEX idx_featured  (is_featured),
  INDEX idx_price     (price),
  INDEX idx_year      (year),
  FULLTEXT idx_search (name, description)   -- untuk fitur search
);

-- ------------------------------------------------------------
-- 3. CAR_IMAGES – foto per unit
-- ------------------------------------------------------------
CREATE TABLE car_images (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  car_id      INT UNSIGNED NOT NULL,
  url         VARCHAR(500) NOT NULL,
  alt_text    VARCHAR(200),
  is_primary  TINYINT(1) DEFAULT 0,
  sort_order  TINYINT UNSIGNED DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
  INDEX idx_car (car_id)
);

-- ------------------------------------------------------------
-- 4. PROMOS – promo & penawaran
-- ------------------------------------------------------------
CREATE TABLE promos (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(200) NOT NULL,
  slug          VARCHAR(220) NOT NULL UNIQUE,
  description   TEXT,
  terms         TEXT,                                  -- syarat & ketentuan
  discount_type ENUM('cashback','dp_ringan','free_item','bonus','other') NOT NULL,
  discount_value DECIMAL(15,2),                        -- nilai diskon/cashback
  car_id        INT UNSIGNED,                          -- null = berlaku semua unit
  start_date    DATE NOT NULL,
  end_date      DATE NOT NULL,
  banner_url    VARCHAR(500),
  is_active     TINYINT(1) DEFAULT 1,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE SET NULL,
  INDEX idx_active (is_active),
  INDEX idx_date   (start_date, end_date)
);

-- ------------------------------------------------------------
-- 5. LEADS – calon pembeli yang mengisi form / klik WA
-- ------------------------------------------------------------
CREATE TABLE leads (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nama          VARCHAR(150) NOT NULL,
  phone         VARCHAR(20) NOT NULL,
  email         VARCHAR(150),
  car_id        INT UNSIGNED,                          -- mobil yang diminati
  car_interest  VARCHAR(200),                          -- teks bebas jika car_id null
  budget_min    DECIMAL(15,2),
  budget_max    DECIMAL(15,2),
  pesan         TEXT,
  source        ENUM('form','whatsapp','phone','walk_in','referral','other') DEFAULT 'form',
  utm_source    VARCHAR(100),                          -- tracking marketing
  utm_medium    VARCHAR(100),
  utm_campaign  VARCHAR(100),
  status        ENUM('new','contacted','follow_up','deal','cancel') DEFAULT 'new',
  notes         TEXT,                                  -- catatan internal sales
  assigned_to   VARCHAR(100),                          -- nama sales yang handle
  deal_amount   DECIMAL(15,2),                         -- nilai deal jika jadi
  deal_date     DATE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE SET NULL,
  INDEX idx_status  (status),
  INDEX idx_phone   (phone),
  INDEX idx_created (created_at)
);

-- ------------------------------------------------------------
-- 6. KREDIT_APPLICATIONS – pengajuan kredit
-- ------------------------------------------------------------
CREATE TABLE kredit_applications (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lead_id         INT UNSIGNED,
  nama            VARCHAR(150) NOT NULL,
  phone           VARCHAR(20) NOT NULL,
  email           VARCHAR(150),
  car_id          INT UNSIGNED,
  harga_mobil     DECIMAL(15,2) NOT NULL,
  dp_persen       TINYINT UNSIGNED NOT NULL,           -- % uang muka
  dp_amount       DECIMAL(15,2) NOT NULL,
  tenor_bulan     TINYINT UNSIGNED NOT NULL,
  cicilan_estimasi DECIMAL(15,2),
  bank_pilihan    VARCHAR(100),
  status          ENUM('pending','review','approved','rejected') DEFAULT 'pending',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
  FOREIGN KEY (car_id)  REFERENCES cars(id) ON DELETE SET NULL,
  INDEX idx_status (status)
);

-- ------------------------------------------------------------
-- 7. TESTIMONIALS – ulasan pelanggan
-- ------------------------------------------------------------
CREATE TABLE testimonials (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nama        VARCHAR(150) NOT NULL,
  kota        VARCHAR(100),
  car_id      INT UNSIGNED,
  car_name    VARCHAR(200),                            -- teks jika car_id null
  rating      TINYINT UNSIGNED NOT NULL DEFAULT 5,     -- 1–5
  quote       TEXT NOT NULL,
  avatar_url  VARCHAR(500),
  is_featured TINYINT(1) DEFAULT 0,
  is_active   TINYINT(1) DEFAULT 1,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE SET NULL,
  INDEX idx_featured (is_featured),
  INDEX idx_active   (is_active)
);

-- ------------------------------------------------------------
-- 8. BLOG_POSTS – artikel/blog untuk SEO
-- ------------------------------------------------------------
CREATE TABLE blog_posts (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title            VARCHAR(300) NOT NULL,
  slug             VARCHAR(320) NOT NULL UNIQUE,
  excerpt          VARCHAR(500),
  content          LONGTEXT,
  cover_url        VARCHAR(500),
  author           VARCHAR(100) DEFAULT 'AutoPrima',
  tags             JSON,                               -- ["SUV","Toyota","Tips"]
  meta_title       VARCHAR(160),
  meta_description VARCHAR(320),
  is_published     TINYINT(1) DEFAULT 0,
  published_at     TIMESTAMP NULL,
  view_count       INT UNSIGNED DEFAULT 0,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_published (is_published, published_at),
  FULLTEXT idx_search (title, excerpt, content)
);

-- ------------------------------------------------------------
-- 9. SETTINGS – konfigurasi website
-- ------------------------------------------------------------
CREATE TABLE settings (
  `key`       VARCHAR(100) PRIMARY KEY,
  `value`     TEXT,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
