import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-28">
      {/* HERO SECTION */}
      <section className="bg-linear-to-br from-[#F9F8F6] via-[#f4efe8] to-[#f7f1e9]">
        <div className="mx-auto max-w-7xl px-6 py-28 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#3a2f1c]">
              Premium Shoe
              <span className="block text-[#be9020]">Cleaning WebApp</span>
            </h1>
            <p className="mt-6 text-lg text-[#5c4a2f] max-w-xl">
              Layanan cuci, perawatan, dan restorasi sepatu profesional dengan sistem booking online & pickup delivery.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/booking"
                className="rounded-2xl bg-[#be9020] px-7 py-3 font-semibold text-[#f4efe8] hover:bg-[#a67c1c]"
              >
                Book Sekarang
              </Link>
              <Link
                href="/services"
                className="rounded-2xl border border-[#be9020]/40 px-7 py-3 font-semibold text-[#3a2f1c] hover:bg-[#be9020]/10"
              >
                Lihat Layanan
              </Link>
            </div>
          </div>

          <div className="h-96 rounded-3xl overflow-hidden flex items-center justify-center">
            <Image
              src="/hero_img.jpg"
              alt="Premium Shoe Cleaning Service"
              width={600}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-5xl font-bold text-[#3a2f1c]">Paket & Harga</h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {["Basic", "Premium", "Ultimate"].map((plan, i) => (
            <div
              key={plan}
              className={`rounded-3xl border p-8 shadow-sm bg-[#f4efe8] ${
                i === 1 ? "border-[#be9020] shadow-md" : "border-[#be9020]/30"
              }`}
            >
              <h3 className="text-xl font-bold text-[#be9020]">{plan}</h3>
              <p className="mt-4 text-4xl font-extrabold text-[#3a2f1c]">Rp {i === 0 ? "50K" : i === 1 ? "80K" : "120K"}</p>
              <p className="mt-2 text-sm text-[#5c4a2f]">per pasang</p>
              <ul className="mt-6 space-y-2 text-sm text-[#5c4a2f]">
                <li>• Deep Cleaning</li>
                <li>• Odor Treatment</li>
                {i > 0 && <li>• Protection</li>}
                {i > 1 && <li>• Repaint Minor</li>}
              </ul>
              <Link
                href="/booking"
                className="mt-6 block text-center rounded-xl bg-[#be9020] py-2 font-semibold text-[#f4efe8] hover:bg-[#a67c1c]"
              >
                Pilih Paket
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#f4efe8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-5xl font-bold text-[#3a2f1c]">Layanan Kami</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-5">
            {["Deep Cleaning", "Protection", "Repainting", "Whitening", "Repairs"].map((service) => (
              <div
                key={service}
                className="rounded-2xl border border-[#be9020]/30 bg-[#ede4d6] p-6 text-center hover:shadow-md transition"
              >
                <p className="font-semibold text-[#3a2f1c]">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-5xl font-bold text-[#3a2f1c]">Testimoni NEWTIZEN</h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-3xl bg-[#f4efe8] p-8 border border-[#be9020]/30"
            >
              <p className="text-sm text-[#5c4a2f]">
                "Sepatu saya jadi seperti baru lagi. Pelayanan cepat dan profesional!"
              </p>
              <p className="mt-4 font-semibold text-[#be9020]">Customer {i}</p>
              <p className="text-xs text-[#5c4a2f]">★★★★★</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#be9020]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-4xl font-extrabold text-[#f4efe8]">
            Siap Bersihin Sepatu Favoritmu?
          </h2>
          <p className="mt-4 text-[#f4efe8]/90 text-xl">
            Booking sekarang dan nikmati layanan pickup & delivery
          </p>
          <Link
            href="/booking"
            className="mt-8 inline-block rounded-2xl bg-[#f4efe8] px-8 py-3 font-bold text-[#be9020] hover:bg-[#ede4d6]"
          >
            Booking Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}