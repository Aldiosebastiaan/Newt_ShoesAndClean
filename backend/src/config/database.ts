import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "newt_shoesandclean",
  port: parseInt(process.env.DB_PORT || "5432"),
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
});

// Test connection
pool
  .connect()
  .then((client) => {
    console.log("[v0] Database connected successfully");
    client.release();
  })
  .catch((err) => {
    console.error("[v0] Database connection failed:", err.message);
  });

export default pool;
