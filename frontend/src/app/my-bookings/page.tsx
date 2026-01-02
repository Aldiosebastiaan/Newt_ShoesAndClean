"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authApi, bookingApi } from "@/lib/api";

interface Booking {
  id: number;
  service: string;
  shoe_type: string;
  pickup_address: string;
  pickup_date: string;
  pickup_time: string;
  status: string;
  created_at: string;
  total_price?: number; // Tambahkan ini agar harga tampil
  notes?: string;
}

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push("/login");
      return;
    }

    fetchBookings();
  }, [router]);

  const fetchBookings = async () => {
    try {
      const result = await bookingApi.getAll();

      if (result.error) {
        setError(result.error);
      } else {
        // --- PERBAIKAN DI SINI ---
        // Backend mengirim array langsung, jadi ambil result.data
        // Cek apakah result.data itu array, jika ya pakai, jika tidak array kosong
        const dataBookings = Array.isArray(result.data) ? result.data : [];
        setBookings(dataBookings);
        // -------------------------
      }
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "confirmed":
      case "processing": // Status yang kita set setelah bayar
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f9f5eb] to-[#f4ecdf] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#3a2f1c]">My Bookings</h1>
              <p className="text-[#5c4a2f] mt-1">Riwayat pesanan cuci sepatu kamu</p>
            </div>
            <button
              onClick={() => router.push("/booking")}
              className="bg-[#be9020] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#a67c1c] transition-all shadow-md"
            >
              + Booking Baru
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-10 h-10 border-4 border-[#be9020] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
              {error}
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
              <p className="text-gray-400 text-lg mb-4">Belum ada riwayat booking.</p>
              <button
                onClick={() => router.push("/booking")}
                className="text-[#be9020] font-bold hover:underline"
              >
                Buat pesanan pertamamu sekarang
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#be9020]/10 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#3a2f1c]">
                        {booking.service}
                      </h3>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mt-1">
                        ORDER #{booking.id}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 border-t border-dashed border-gray-200 pt-4">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">DETAIL SEPATU</p>
                      <p className="font-medium text-[#3a2f1c]">{booking.shoe_type}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">JADWAL PICKUP</p>
                      <p className="font-medium text-[#3a2f1c]">
                         {new Date(booking.pickup_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })} • {booking.pickup_time}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                       <p className="text-gray-400 text-xs mb-1">ALAMAT</p>
                       <p className="font-medium text-[#3a2f1c]">{booking.pickup_address}</p>
                    </div>
                    {booking.notes && (
                      <div className="md:col-span-2 bg-yellow-50 p-2 rounded-lg">
                        <span className="font-bold text-xs text-yellow-700">Catatan:</span> <span className="text-yellow-800">{booking.notes}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}