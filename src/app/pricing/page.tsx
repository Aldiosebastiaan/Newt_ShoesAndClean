import Link from "next/link";

const prices = [
  { title: "Cleaning", price: "25K", popular: false, features: ["Basic cleaning", "Shoes only"] },
  { title: "Deep Clean", price: "30K", popular: false, features: ["Deep cleaning", "Odor removal"] },
  { title: "Deep Clean Express", price: "35K", popular: true, features: ["Deep cleaning", "24-hour service", "Express delivery"] },
  { title: "Whitening", price: "35K", popular: false, features: ["Whitening treatment", "UV protection"] },
  { title: "Unyellowing", price: "45K", popular: false, features: ["Yellow stain removal", "Color restoration"] },
  { title: "Women Shoes", price: "25K", popular: false, features: ["Delicate handling", "Special care"] },
  { title: "Bag", price: "35K", popular: false, features: ["Handbag cleaning", "Leather care"] },
  { title: "Helmet", price: "35K", popular: false, features: ["Helmet cleaning", "Interior sanitization"] },
  { title: "Reglue", price: "35K", note: "Start From", popular: false, features: ["Sole reattachment", "Glue application"] },
  { title: "Repaint", price: "45K", note: "Start From", popular: false, features: ["Color matching", "Paint application", "Protection coat"] },
];

export default function PricingPage() {
  return (
    <section className="min-h-screen bg-linear-to-b from-[#f9f5eb] to-[#f4ecdf] py-8 sm:py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[#be9020]/10">
            <span className="w-2 h-2 rounded-full bg-[#be9020] animate-pulse"></span>
            <span className="text-xs font-semibold text-[#be9020] tracking-wider">PRICELIST</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#3a2f1c] mb-4">
            NEWT SHOES AND CLEAN
            <span className="block text-[#be9020] mt-2">Pricing</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#5c4a2f]/80">
            Harga yang jelas tanpa hidden fee. Semua paket sudah termasuk pickup & delivery.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-16">
          {prices.map((item) => (
            <div
              key={item.title}
              className={`relative rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                item.popular 
                  ? 'border-[#be9020] bg-linear-to-br from-[#fef9f0] to-[#f8e8c9] shadow-lg' 
                  : 'border-[#be9020]/20 bg-white/50 backdrop-blur-sm'
              }`}
            >
              {/* POPULAR BADGE */}
              {item.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-linear-to-r from-[#be9020] to-[#d4a734] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* PRICE TAG */}
                <div className="mb-4">
                  {item.note && (
                    <span className="text-xs font-semibold text-[#be9020] uppercase tracking-wider">
                      {item.note}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl md:text-4xl font-bold text-[#3a2f1c]">
                      Rp
                    </span>
                    <span className="text-4xl md:text-5xl font-extrabold text-[#be9020]">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-[#3a2f1c] mb-4">
                  {item.title}
                </h3>

                {/* FEATURES */}
                <div className="space-y-3 mb-6">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#be9020]/10 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-[#be9020]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-[#5c4a2f]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA BUTTON */}
                <Link
                  href="/booking"
                  className={`block text-center rounded-xl py-3 font-semibold transition-all ${
                    item.popular
                      ? 'bg-linear-to-r from-[#be9020] to-[#d4a734] text-white hover:shadow-lg'
                      : 'bg-[#f4ecdf] text-[#3a2f1c] hover:bg-[#ebe0cc]'
                  }`}
                >
                  Pilih Layanan
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE FOR DESKTOP */}
        <div className="hidden lg:block mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#be9020]/10 p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-[#3a2f1c] mb-6 text-center">
              Service Comparison
            </h3>
            <div className="grid grid-cols-5 gap-4 text-sm">
              <div className="font-semibold text-[#be9020]">Service</div>
              <div className="font-semibold text-[#3a2f1c]">Price</div>
              <div className="font-semibold text-[#3a2f1c]">Time</div>
              <div className="font-semibold text-[#3a2f1c]">Pickup</div>
              <div className="font-semibold text-[#3a2f1c]">Warranty</div>
              
              {prices.slice(0, 5).map((item) => (
                <>
                  <div className="py-3 border-t border-[#be9020]/10 font-medium text-[#3a2f1c]">{item.title}</div>
                  <div className="py-3 border-t border-[#be9020]/10 text-[#be9020] font-bold">{item.price}</div>
                  <div className="py-3 border-t border-[#be9020]/10 text-[#5c4a2f]">24-48h</div>
                  <div className="py-3 border-t border-[#be9020]/10 text-[#5c4a2f]">✓ Included</div>
                  <div className="py-3 border-t border-[#be9020]/10 text-[#5c4a2f]">30 days</div>
                </>
              ))}
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#8b6627] via-[#d28a26] to-[#b6770a] p-8 md:p-12 text-center">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#be9020]/10 rounded-full"></div>
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#be9020]/10 rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Butuh Custom Service?
            </h2>
            <p className="text-[#f4ecdf]/80 mb-8 max-w-2xl mx-auto">
              Kami menyediakan layanan custom untuk kebutuhan khusus sepatu Anda. 
              Konsultasi gratis dengan tim ahli kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="px-8 py-4 rounded-full bg-linear-to-r from-[#58481f] to-[#503e10] text-white font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Book Custom Service
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold hover:bg-white/20 transition-all duration-300"
              >
                Chat Konsultasi
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#5c4a2f]/70">
            * Harga dapat berubah tergantung kondisi dan material sepatu. <br />
            ** Semua harga sudah termasuk PPN dan biaya administrasi.
          </p>
        </div>
      </div>
    </section>
  );
}