"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authApi, bookingApi } from "@/lib/api";

export default function BookingPage() {
  const router = useRouter();
  const [pickup, setPickup] = useState(false);
  const searchParams = useSearchParams();

  const serviceFromUrl = searchParams.get("service");
  const priceFromUrl = searchParams.get("price");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup_address: "",
    shoe_type: "Sneakers",
    pickup_date: "",
    pickup_time: "",
    service: serviceFromUrl || "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push("/login");
    } else {
      const user = authApi.getUser();
      if (user) {
        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          phone: user.phone || "",
        }));
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.service) {
      setError("Please select a service");
      setLoading(false);
      return;
    }

    const result = await bookingApi.create({
      service: formData.service,
      shoe_type: formData.shoe_type,
      pickup_address: formData.pickup_address,
      pickup_date: formData.pickup_date,
      pickup_time: formData.pickup_time,
      notes: formData.notes,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/my-bookings");
      }, 2000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-linear-to-br from-[#f4efe8] via-[#f0e6d2] to-[#e8dbc3]"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20 grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
        {/* FORM CARD - MOBILE: DI ATAS, DESKTOP: DI KANAN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-2 lg:order-2 rounded-2xl md:rounded-3xl bg-[#f4efe8] p-6 md:p-8 shadow-lg md:shadow-xl border border-[#be9020]/30"
        >
          <h2 className="text-xl md:text-2xl font-bold text-[#3a2f1c]">
            Form Booking
          </h2>
          <p className="mt-1 text-sm text-[#5c4a2f]">
            Lengkapi data di bawah ini
          </p>

          {formData.service && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 flex items-center gap-2 rounded-lg bg-[#be9020]/10 px-4 py-2 text-sm text-[#3a2f1c]"
            >
              <span className="h-2 w-2 rounded-full bg-[#be9020]" />
              Layanan <strong>{formData.service}</strong> telah dipilih
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
            >
              Booking berhasil! Redirecting...
            </motion.div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 md:mt-8 space-y-5 md:space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <Input
                label="Nama"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama lengkap"
                required
              />
              <Input
                label="No. WhatsApp"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxx"
                required
              />
            </div>

            <Textarea
              label="Alamat"
              name="pickup_address"
              value={formData.pickup_address}
              onChange={handleChange}
              placeholder="Alamat lengkap pickup"
              required
            />

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <Select
                label="Jenis Sepatu"
                name="shoe_type"
                value={formData.shoe_type}
                onChange={handleChange}
                options={[
                  "Sneakers",
                  "Leather",
                  "Suede",
                  "Boots",
                  "Canvas",
                  "Sport",
                ]}
              />
              <Input
                label="Tanggal Pickup"
                name="pickup_date"
                value={formData.pickup_date}
                onChange={handleChange}
                type="date"
                required
              />
            </div>

            <Input
              label="Waktu Pickup"
              name="pickup_time"
              value={formData.pickup_time}
              onChange={handleChange}
              type="time"
              required
            />

            <div>
              <label className="text-sm font-semibold text-[#3a2f1c]">
                Layanan Dipilih
              </label>
              <div className="mt-2 rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-4 py-3 flex justify-between items-center">
                <span className="font-semibold text-[#3a2f1c] text-sm md:text-base">
                  {formData.service || "Belum dipilih"}
                </span>
                {priceFromUrl && (
                  <span className="font-bold text-[#be9020] text-sm md:text-base">
                    Rp {priceFromUrl}
                  </span>
                )}
              </div>
              {!formData.service && (
                <p className="mt-2 text-xs text-[#5c4a2f]">
                  Silakan pilih layanan dari halaman Pricing
                </p>
              )}
            </div>

            <Textarea
              label="Catatan (Opsional)"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Catatan tambahan"
            />

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={pickup}
                onChange={() => setPickup(!pickup)}
                className="h-4 w-4 accent-[#be9020]"
              />
              <span className="text-sm text-[#3a2f1c]">
                Gunakan Pickup & Delivery
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#be9020] py-3 md:py-4 font-bold text-[#f4efe8] hover:bg-[#a67c1c] transition text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Booking Sekarang"}
            </motion.button>
          </form>
        </motion.div>

        {/* LEFT INFO - MOBILE: DI BAWAH, DESKTOP: DI KIRI */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="order-1 lg:order-1"
        >
          <span className="inline-block rounded-full bg-[#be9020]/20 px-3 py-1 text-xs md:text-sm font-semibold text-[#be9020]">
            Newt Shoes & Clean
          </span>

          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#3a2f1c] leading-tight">
            Booking Layanan
            <span className="block text-[#be9020]">
              Cuci & Perawatan Sepatu
            </span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-[#5c4a2f] max-w-lg">
            Percayakan sepatu favoritmu kepada tim profesional kami. Proses
            mudah, cepat, dan bisa pickup & delivery langsung ke rumah.
          </p>

          <ul className="mt-6 md:mt-8 space-y-3 md:space-y-4 text-sm text-[#5c4a2f]">
            {[
              "Deep Cleaning & Treatment Profesional",
              "Layanan Fleksibel sesuai Kebutuhan",
              "Pickup & Delivery Aman",
            ].map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start"
              >
                <span className="mr-2 text-[#be9020] mt-0.5">✔</span>
                <span className="text-sm md:text-base">{text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#3a2f1c]">{label}</label>
      <input
        {...props}
        className="mt-1.5 w-full rounded-lg md:rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-2 focus:ring-[#be9020] outline-none"
      />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#3a2f1c]">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="mt-1.5 w-full rounded-lg md:rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-2 focus:ring-[#be9020] outline-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#3a2f1c]">{label}</label>
      <select
        {...props}
        className="mt-1.5 w-full rounded-lg md:rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-2 focus:ring-[#be9020] outline-none"
      >
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
