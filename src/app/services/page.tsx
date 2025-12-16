import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Deep Cleaning",
    desc: "Pembersihan menyeluruh pada upper, midsole, outsole, dan insole untuk mengembalikan kebersihan sepatu.",
    icon: "🧼",
  },
  {
    title: "Deep Clean Express",
    desc: "Solusi cepat untuk sepatu kotor dengan hasil maksimal dalam waktu singkat.",
    icon: "⚡",
  },
  {
    title: "Whitening",
    desc: "Memutihkan kembali bagian upper atau midsole yang menguning.",
    icon: "✨",
  },
  {
    title: "Unyellowing",
    desc: "Treatment khusus untuk menghilangkan warna kuning pada midsole.",
    icon: "🧪",
  },
  {
    title: "Repaint",
    desc: "Mengembalikan warna sepatu yang pudar agar terlihat seperti baru.",
    icon: "🎨",
  },
  {
    title: "Reglue",
    desc: "Merekatkan kembali bagian sole sepatu yang terlepas.",
    icon: "🧷",
  },
];

export default function ServicesPage() {
  return (
    <section className="bg-[#f4ecdf]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20">

        {/* HERO */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[#be9020]/20 px-4 py-1 text-base font-semibold text-[#be9020]">
            Layanan Kami
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3a2f1c]">
            Perawatan Sepatu Profesional
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#5c4a2f]">
            Setiap sepatu diperlakukan secara khusus oleh tim berpengalaman
            menggunakan metode dan bahan terbaik.
          </p>
        </div>

        {/* GRID SERVICES */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#be9020]/20 bg-[#ede4d6] p-6 hover:border-[#be9020] transition"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-4 text-lg font-bold text-[#3a2f1c]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[#5c4a2f]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* BEFORE AFTER */}
        <div className="mt-20">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#3a2f1c]">
            Before & After
          </h2>
          <p className="mt-3 text-center text-sm text-[#5c4a2f]">
            Hasil nyata dari layanan Newt Shoes & Clean
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {/* Gambar 1 */}
            <div className="rounded-xl overflow-hidden bg-[#e6dccb]">
              <div className="relative w-full h-full">
                <Image
                  src="/before_after1.jpg"
                  alt="Contoh hasil cleaning sepatu 1"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Gambar 2 */}
            <div className="rounded-xl overflow-hidden bg-[#e6dccb]">
              <div className="relative w-full h-80">
                <Image
                  src="/before_after2.jpg"
                  alt="Contoh hasil cleaning sepatu 2"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Gambar 3 */}
            <div className="rounded-xl overflow-hidden bg-[#e6dccb]">
              <div className="relative w-full h-full">
                <Image
                  src="/before_after3.jpg"
                  alt="Contoh hasil cleaning sepatu 3"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/booking"
            className="inline-block rounded-full bg-[#be9020] px-8 py-3 text-sm font-bold text-[#f4efe8] hover:opacity-90 transition"
          >
            Booking Sekarang
          </Link>
        </div>

      </div>
    </section>
  );
}