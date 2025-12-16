"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";


export default function BookingPage() {
  const [pickup, setPickup] = useState(false);

  const searchParams = useSearchParams();

const serviceFromUrl = searchParams.get("service");
const priceFromUrl = searchParams.get("price");

const [selectedService, setSelectedService] = useState(serviceFromUrl || "");


  return (
    <section className="min-h-screen bg-linear-to-br from-[#f4efe8] via-[#f0e6d2] to-[#e8dbc3]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 md:py-20 lg:py-24 grid gap-8 sm:gap-12 md:grid-cols-2 md:gap-16 items-center">
        {/* LEFT INFO */}
        <div className="order-1 md:order-1">
          <span className="inline-block rounded-full bg-[#be9020]/20 px-3 py-1 text-xs sm:text-sm font-semibold text-[#be9020]">
            Newt Shoes & Clean
          </span>
          <h1 className="mt-3 sm:mt-4 md:mt-6 text-2xl xs:text-2.5xl sm:text-6xl md:text-4xl lg:text-5xl font-extrabold leading-snug sm:leading-tight text-[#3a2f1c]">
            Booking Layanan
            <span className="block text-[#be9020]">
              Cuci & Perawatan Sepatu
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 md:mt-6 max-w-lg text-[#5c4a2f] text-xs xs:text-sm sm:text-sm md:text-base">
            Percayakan sepatu favoritmu kepada tim profesional kami. Proses
            mudah, cepat, dan bisa pickup & delivery langsung ke rumah.
          </p>

          <ul className="mt-4 sm:mt-6 md:mt-10 space-y-2 sm:space-y-3 md:space-y-4 text-xs xs:text-sm text-[#5c4a2f]">
            <li className="flex items-start">
              <span className="mr-2 text-[#be9020]">✔</span>
              Deep Cleaning & Treatment Profesional
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-[#be9020]">✔</span>
              Paket Fleksibel sesuai Kebutuhan
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-[#be9020]">✔</span>
              Pickup & Delivery Aman
            </li>
          </ul>
        </div>

        {/* FORM CARD */}
        <div className="order-1 md:order-2 rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#f4efe8] p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg md:shadow-xl border border-[#be9020]/30">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#3a2f1c]">
            Form Booking
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#5c4a2f]">
            Lengkapi data di bawah ini
          </p>

          {selectedService && (
  <div className="mt-3 mb-4 flex items-center gap-2 rounded-lg bg-[#be9020]/10 px-4 py-2 text-sm text-[#3a2f1c]">
    <span className="h-2 w-2 rounded-full bg-[#be9020]" />
    Layanan <strong>{selectedService}</strong> telah dipilih
  </div>
)}



          <form className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6">
            <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2">
              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#3a2f1c]">
                  Nama
                </label>
                <input
                  type="text"
                  placeholder="Nama lengkap"
                  className="mt-1 sm:mt-2 w-full rounded-lg sm:rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-3 sm:px-4 py-2 sm:py-3 text-[#3a2f1c] focus:ring-2 focus:ring-[#be9020] outline-none text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#3a2f1c]">
                  No. WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="08xxxxxxxx"
                  className="mt-1 sm:mt-2 w-full rounded-lg sm:rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-3 sm:px-4 py-2 sm:py-3 text-[#3a2f1c] focus:ring-2 focus:ring-[#be9020] outline-none text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm font-semibold text-[#3a2f1c]">
                Alamat
              </label>
              <textarea
                rows={3}
                placeholder="Alamat lengkap pickup"
                className="mt-1 sm:mt-2 w-full rounded-lg sm:rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-3 sm:px-4 py-2 sm:py-3 text-[#3a2f1c] focus:ring-2 focus:ring-[#be9020] outline-none text-sm sm:text-base"
              />
            </div>

            <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2">
              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#3a2f1c]">
                  Jenis Sepatu
                </label>
                <select className="mt-1 sm:mt-2 w-full rounded-lg sm:rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-3 sm:px-4 py-2 sm:py-3 text-[#3a2f1c] text-sm sm:text-base">
                  <option>Sneakers</option>
                  <option>Leather</option>
                  <option>Suede</option>
                  <option>Boots</option>
                </select>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#3a2f1c]">
                  Tanggal Pickup
                </label>
                <input
                  type="date"
                  className="mt-1 sm:mt-2 w-full rounded-lg sm:rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-3 sm:px-4 py-2 sm:py-3 text-[#3a2f1c] text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
  <label className="text-xs sm:text-sm font-semibold text-[#3a2f1c]">
    Layanan Dipilih
  </label>

  <div className="mt-3 rounded-xl border border-[#be9020]/30 bg-[#ede4d6] px-4 py-3">
    {selectedService ? (
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[#3a2f1c]">
          {selectedService}
        </span>
        <span className="font-bold text-[#be9020]">
          Rp {priceFromUrl}
        </span>
      </div>
    ) : (
      <span className="text-sm text-[#5c4a2f]">
        Silakan pilih layanan dari halaman Pricing
      </span>
    )}
  </div>
</div>


            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="checkbox"
                checked={pickup}
                onChange={() => setPickup(!pickup)}
                className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 accent-[#be9020]"
              />
              <span className="text-xs sm:text-sm text-[#3a2f1c]">
                Gunakan Pickup & Delivery
              </span>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg sm:rounded-xl md:rounded-2xl bg-[#be9020] py-2 sm:py-3 md:py-4 font-bold text-[#f4efe8] hover:bg-[#a67c1c] transition text-sm sm:text-base"
            >
              Booking Sekarang
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
