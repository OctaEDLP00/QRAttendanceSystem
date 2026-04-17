-- Initial database setup for QR Attendance System
-- This file runs when the PostgreSQL container starts for the first time

-- Create extensions if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- You can add any initial data setup here
-- For example, create default admin user, institutions, etc.

-- Example:
-- INSERT INTO institutions (id, name, "createdAt") VALUES
--   ('default-institution-id', 'Default Institution', NOW());

-- Note: Prisma will handle table creation via migrations
-- This file is for any additional setup beyond schema