-- Step 1: Jalankan ini terlebih dahulu untuk membuat database (jika belum dibuat)
-- CREATE DATABASE newt_shoesandclean;

-- Catatan: Di PostgreSQL tidak ada perintah 'USE newt_shoesandclean;'.
-- Jika menggunakan psql, hubungkan ke DB dengan: \c newt_shoesandclean

---------------------------------------------------------
-- 0. Tipe ENUM (PostgreSQL membuat tipe Enum secara terpisah)
---------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'on_pickup', 'processing', 'on_delivery', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

---------------------------------------------------------
-- 1. Tabel Users
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'user',
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---------------------------------------------------------
-- 2. Tabel Services
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---------------------------------------------------------
-- 3. Tabel Bookings
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  service VARCHAR(100) NOT NULL,
  shoe_name VARCHAR(255) DEFAULT NULL,
  shoe_size VARCHAR(50) DEFAULT NULL,
  shoe_type VARCHAR(100) NOT NULL,
  pickup_address TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  notes TEXT,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

---------------------------------------------------------
-- 4. Indeks (Di PostgreSQL dibuat terpisah dari CREATE TABLE)
---------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_date ON bookings(pickup_date);

---------------------------------------------------------
-- 5. Automasi 'updated_at' (Pengganti ON UPDATE CURRENT_TIMESTAMP)
---------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_users_updated_at ON users;
CREATE TRIGGER set_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_bookings_updated_at ON bookings;
CREATE TRIGGER set_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();