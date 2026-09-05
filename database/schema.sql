-- =========================================================================
-- SHAHID CLOTHES / NISHAT LINEN E-COMMERCE DATABASE SCHEMA
-- =========================================================================

CREATE DATABASE IF NOT EXISTS shahid_clothes_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE shahid_clothes_db;

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  slug VARCHAR(200) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  collection VARCHAR(150),
  fabric VARCHAR(150),
  pieces VARCHAR(50),
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  discount VARCHAR(50),
  sku VARCHAR(100),
  description TEXT,
  primary_image VARCHAR(500) NOT NULL,
  secondary_image VARCHAR(500),
  stock_quantity INT DEFAULT 50,
  is_new BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. PRODUCT SIZES TABLE
CREATE TABLE IF NOT EXISTS product_sizes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL,
  size_name VARCHAR(50) NOT NULL,
  stock INT DEFAULT 20,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) PRIMARY KEY,
  customer_name VARCHAR(200) NOT NULL,
  customer_email VARCHAR(200),
  customer_phone VARCHAR(50) NOT NULL,
  customer_whatsapp VARCHAR(50),
  delivery_address TEXT NOT NULL,
  apartment VARCHAR(200),
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(30),
  payment_method ENUM('COD', 'CARD', 'BAADMAY') DEFAULT 'COD',
  subtotal DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0.00,
  shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
  grand_total DECIMAL(10, 2) NOT NULL,
  status ENUM('PENDING', 'CONFIRMED', 'DISPATCHED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
  courier_name VARCHAR(100) DEFAULT 'CallCourier / TCS',
  tracking_id VARCHAR(100),
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_city (city),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  product_title VARCHAR(255) NOT NULL,
  product_image VARCHAR(500),
  selected_size VARCHAR(50) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  line_total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. COUPONS TABLE
CREATE TABLE IF NOT EXISTS coupons (
  code VARCHAR(50) PRIMARY KEY,
  discount_type ENUM('percent', 'flat') NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  label VARCHAR(150),
  min_order DECIMAL(10, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(150),
  role ENUM('admin', 'manager', 'support') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
