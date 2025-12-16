"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function BookingPage() {
  const [pickup, setPickup] = useState(false);
  const searchParams = useSearchParams();

  const serviceFromUrl = searchParams.get("service");
  const priceFromUrl = searchParams.get("price");
  const [selectedService] = useState(serviceFromUrl || "");

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

          {/* SELECTED SERVICE ALERT */}
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 flex items-center gap-2 rounded-lg bg-[#be9020]/10 px-4 py-2 text-sm text-[#3a2f1c]"
            >
              <span className="h-2 w-2 rounded-full bg-[#be9020]" />
              Layanan <strong>{selectedService}</strong> telah dipilih
            </motion.div>
          )}

          <form className="mt-6 md:mt-8 space-y-5 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <Input label="Nama" placeholder="Nama lengkap" />
              <Input label="No. WhatsApp" placeholder="08xxxxxxxx" />
            </div>

            <Textarea label="Alamat" placeholder="Alamat lengkap pickup" />

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <Select label="Jenis Sepatu" options={["Sneakers", "Leather", "Suede", "Boots"]} />
              <Input label="Tanggal Pickup" type="date" />
            </div>

            {/* SERVICE SUMMARY */}
            <div>
              <label className="text-sm font-semibold text-[#3a2f1c]">
                Layanan Dipilih
              </label>
              <div className="mt-2 rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-4 py-3 flex justify-between items-center">
                <span className="font-semibold text-[#3a2f1c] text-sm md:text-base">
                  {selectedService || "Belum dipilih"}
                </span>
                {priceFromUrl && (
                  <span className="font-bold text-[#be9020] text-sm md:text-base">
                    Rp {priceFromUrl}
                  </span>
                )}
              </div>
              {!selectedService && (
                <p className="mt-2 text-xs text-[#5c4a2f]">
                  Silakan pilih layanan dari halaman Pricing
                </p>
              )}
            </div>

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
              className="w-full rounded-xl bg-[#be9020] py-3 md:py-4 font-bold text-[#f4efe8] hover:bg-[#a67c1c] transition text-sm md:text-base"
            >
              Booking Sekarang
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
            Percayakan sepatu favoritmu kepada tim profesional kami. Proses mudah,
            cepat, dan bisa pickup & delivery langsung ke rumah.
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

function Select({ label, options }: any) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#3a2f1c]">{label}</label>
      <select className="mt-1.5 w-full rounded-lg md:rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base">
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}