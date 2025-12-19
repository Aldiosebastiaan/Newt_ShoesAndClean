import { Router, type Request, type Response } from "express";
import pool from "../config/database";
import { authMiddleware } from "../middleware/auth";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

const router = Router();

// Create booking
router.post(
  "/",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        service,
        shoe_type,
        pickup_address,
        pickup_date,
        pickup_time,
        notes,
      } = req.body;
      const userId = (req as any).user.userId;

      // Validation
      if (
        !service ||
        !shoe_type ||
        !pickup_address ||
        !pickup_date ||
        !pickup_time
      ) {
        res.status(400).json({ error: "All required fields must be filled" });
        return;
      }

      // Insert booking
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO bookings 
      (user_id, service, shoe_type, pickup_address, pickup_date, pickup_time, notes, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [
          userId,
          service,
          shoe_type,
          pickup_address,
          pickup_date,
          pickup_time,
          notes || null,
        ]
      );

      res.status(201).json({
        message: "Booking created successfully",
        booking: {
          id: result.insertId,
          service,
          shoe_type,
          pickup_address,
          pickup_date,
          pickup_time,
          notes,
          status: "pending",
        },
      });
    } catch (error) {
      console.error("[v0] Create booking error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get all bookings (for logged in user)
router.get(
  "/",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.userId;

      const [bookings] = await pool.query<RowDataPacket[]>(
        `SELECT b.*, u.name as user_name, u.email as user_email 
       FROM bookings b 
       JOIN users u ON b.user_id = u.id 
       WHERE b.user_id = ? 
       ORDER BY b.created_at DESC`,
        [userId]
      );

      res.json({
        bookings,
      });
    } catch (error) {
      console.error("[v0] Get bookings error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get booking by ID
router.get(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const [bookings] = await pool.query<RowDataPacket[]>(
        `SELECT b.*, u.name as user_name, u.email as user_email 
       FROM bookings b 
       JOIN users u ON b.user_id = u.id 
       WHERE b.id = ? AND b.user_id = ?`,
        [id, userId]
      );

      if (bookings.length === 0) {
        res.status(404).json({ error: "Booking not found" });
        return;
      }

      res.json({
        booking: bookings[0],
      });
    } catch (error) {
      console.error("[v0] Get booking error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
