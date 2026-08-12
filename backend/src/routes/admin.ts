import { Router, type Request, type Response } from "express";
import pool from "../config/database";
import { authMiddleware, adminMiddleware } from "../middleware/auth";

const router = Router();

// Endpoint Dashboard: Mengambil Statistik Ringkas
router.get(
  "/dashboard-stats",
  authMiddleware, // Cek login
  adminMiddleware, // Cek apakah admin
  async (req: Request, res: Response): Promise<void> => {
    try {
      // 1. Hitung Total User
      const { rows: userCount } = await pool.query(
        "SELECT COUNT(*) as total FROM users WHERE role = 'user'"
      );

      // 2. Hitung Total Booking
      const { rows: bookingCount } = await pool.query(
        "SELECT COUNT(*) as total FROM bookings"
      );

      // 3. Hitung Booking berdasarkan Status (Pending, Confirmed, Completed)
      const { rows: statusStats } = await pool.query(
        "SELECT status, COUNT(*) as count FROM bookings GROUP BY status"
      );

      // 4. Ambil 5 Booking Terbaru (untuk real-time feed)
      const { rows: recentBookings } = await pool.query(
        `SELECT b.id, u.name as user_name, b.service, b.status, b.created_at 
         FROM bookings b 
         JOIN users u ON b.user_id = u.id 
         ORDER BY b.created_at DESC LIMIT 5`
      );

      res.json({
        total_users: userCount[0].total,
        total_bookings: bookingCount[0].total,
        status_breakdown: statusStats,
        recent_activity: recentBookings,
      });
    } catch (error) {
      console.error("Admin dashboard error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Endpoint: Update Status Booking (Fitur Admin untuk memproses pesanan)
router.patch(
  "/bookings/:id/status",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Validasi status yang diperbolehkan
        const validStatuses = ['pending', 'confirmed', 'processing', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ error: "Invalid status" });
            return;
        }

        await pool.query(
            "UPDATE bookings SET status = $1 WHERE id = $2",
            [status, id]
        );

        res.json({ message: "Booking status updated", newStatus: status });
    } catch (error) {
        res.status(500).json({ error: "Failed to update status" });
    }
  }
);

router.get(
  "/bookings",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Query join untuk mengambil nama user pemilik booking
      const { rows: bookings } = await pool.query(
        `SELECT b.*, u.name as user_name, u.email as user_email, u.phone as user_phone
         FROM bookings b 
         JOIN users u ON b.user_id = u.id 
         ORDER BY b.created_at DESC`
      );

      res.json(bookings);
    } catch (error) {
      console.error("Admin all bookings error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      // 1. Data Harian (7 Hari Terakhir)
      const { rows: dailyStats } = await pool.query(
        `SELECT 
           TO_CHAR(created_at, 'YYYY-MM-DD') as date, 
           COUNT(*) as total 
         FROM bookings 
         WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
         GROUP BY 1 
         ORDER BY date ASC`
      );

      // 2. Data Bulanan (12 Bulan Terakhir)
      const { rows: monthlyStats } = await pool.query(
        `SELECT 
           TO_CHAR(created_at, 'YYYY-MM') as date, 
           COUNT(*) as total 
         FROM bookings 
         WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
         GROUP BY 1 
         ORDER BY date ASC`
      );

      // 3. Status Distribusi (Pie Chart)
      const { rows: statusStats } = await pool.query(
        `SELECT status, COUNT(*) as total FROM bookings GROUP BY status`
      );

      res.json({
        daily: dailyStats,
        monthly: monthlyStats,
        status: statusStats
      });
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// --- MANAJEMEN LAYANAN (SERVICES) ---

// 1. GET ALL SERVICES
router.get("/services", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM services ORDER BY price ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// 2. ADD SERVICE
router.post("/services", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;
    await pool.query(
      "INSERT INTO services (name, description, price, duration) VALUES ($1, $2, $3, $4)",
      [name, description, price, duration]
    );
    res.json({ message: "Service created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" });
  }
});

// 3. UPDATE SERVICE
router.put("/services/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration } = req.body;
    await pool.query(
      "UPDATE services SET name=$1, description=$2, price=$3, duration=$4 WHERE id=$5",
      [name, description, price, duration, id]
    );
    res.json({ message: "Service updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update service" });
  }
});

// 4. DELETE SERVICE
router.delete("/services/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM services WHERE id=$1", [id]);
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" });
  }
});

export default router;