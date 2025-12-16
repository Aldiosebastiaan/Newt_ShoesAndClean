import Link from "next/link";
import Logo from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md border-b border-[#be9020]/20">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo */}
          {/* <div className="relative w-10 h-10">
            <Logo
              src="/newt_logo.jpg" 
              alt="Newt Shoes&Clean Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          */}
          
          {/* Teks Brand */}
          <span className="text-xl font-extrabold tracking-wide text-[#252527]">
            Newt Shoes&Clean
          </span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-[#3a2f1c]">
          <Link href="/" className="hover:text-[#be9020]">Home</Link>
          <Link href="/services" className="hover:text-[#be9020]">Services</Link>
          <Link href="/pricing" className="hover:text-[#be9020]">Pricing</Link>
          <Link href="/booking" className="hover:text-[#be9020]">Booking</Link>
        </nav>

        <Link
          href="/Acount"
          className="rounded-xl bg-[#252527] px-5 py-2 text-sm font-semibold text-[#f4efe8] hover:bg-[#a67c1c]"
        >
          Login
        </Link>
      </div>
    </header>
  );
}