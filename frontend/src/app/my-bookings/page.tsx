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
    const result = await bookingApi.getAll();

    if (result.error) {
      setError(result.error);
    } else {
      setBookings(result.data.bookings || []);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "processing":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F8F6] via-[#f4efe8] to-[#f7f1e9] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#3a2f1c]">
                My Bookings
              </h1>
              <p className="text-[#5c4a2f] mt-2">
                Manage your shoe cleaning orders
              </p>
            </div>
            <button
              onClick={() => router.push("/booking")}
              className="bg-[#be9020] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#a67c1c] transition-all"
            >
              New Booking
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#be9020] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-[#5c4a2f]">Loading bookings...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
              {error}
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl shadow-lg">
              <p className="text-[#5c4a2f] text-lg">No bookings yet</p>
              <button
                onClick={() => router.push("/booking")}
                className="mt-4 bg-[#be9020] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#a67c1c] transition-all"
              >
                Make Your First Booking
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-[#be9020]/20 hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#3a2f1c]">
                        {booking.service}
                      </h3>
                      <p className="text-sm text-[#5c4a2f] mt-1">
                        Order #{booking.id}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#5c4a2f]">
                      <span className="font-semibold">Shoe Type:</span>
                      <span>{booking.shoe_type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5c4a2f]">
                      <span className="font-semibold">Pickup Date:</span>
                      <span>
                        {new Date(booking.pickup_date).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5c4a2f]">
                      <span className="font-semibold">Pickup Time:</span>
                      <span>{booking.pickup_time}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#5c4a2f]">
                      <span className="font-semibold">Address:</span>
                      <span className="flex-1">{booking.pickup_address}</span>
                    </div>
                    {booking.notes && (
                      <div className="flex items-start gap-2 text-[#5c4a2f]">
                        <span className="font-semibold">Notes:</span>
                        <span className="flex-1">{booking.notes}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#be9020]/20">
                    <p className="text-xs text-[#5c4a2f]">
                      Booked on{" "}
                      {new Date(booking.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
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
