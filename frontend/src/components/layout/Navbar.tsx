"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#be9020]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold tracking-wide text-[#252527]">
            Newt Shoes&Clean
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-[#3a2f1c]">
          <Link
            href="/"
            className="hover:text-[#be9020] transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="hover:text-[#be9020] transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            href="/pricing"
            className="hover:text-[#be9020] transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            href="/booking"
            className="hover:text-[#be9020] transition-colors duration-200"
          >
            Booking
          </Link>
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-xl bg-[#252527] px-5 py-2 text-sm font-semibold text-white hover:bg-[#be9020] transition-colors duration-200"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative z-60 w-10 h-10 flex flex-col justify-center items-center group"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute top-0 left-0 w-full h-0.5 bg-[#252527] transition-all duration-300 ${
                isMenuOpen ? "rotate-45 top-2" : ""
              }`}
            />
            <span
              className={`absolute top-2 left-0 w-full h-0.5 bg-[#252527] transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute top-4 left-0 w-full h-0.5 bg-[#252527] transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 top-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu - Modern Slide-in */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-out ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-white">
              <span className="text-xl font-extrabold text-[#252527]">
                Newt Shoes&Clean
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-6 space-y-4 bg-white">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center text-lg font-medium text-[#3a2f1c] hover:text-[#be9020] p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Home
              </Link>
              <Link
                href="/services"
                onClick={closeMenu}
                className="flex items-center text-lg font-medium text-[#3a2f1c] hover:text-[#be9020] p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Services
              </Link>
              <Link
                href="/pricing"
                onClick={closeMenu}
                className="flex items-center text-lg font-medium text-[#3a2f1c] hover:text-[#be9020] p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Pricing
              </Link>
              <Link
                href="/booking"
                onClick={closeMenu}
                className="flex items-center text-lg font-medium text-[#3a2f1c] hover:text-[#be9020] p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Booking
              </Link>
            </nav>

            {/* Footer with Login Button */}
            <div className="p-6 border-t border-gray-100 bg-white">
              <Link
                href="/account"
                onClick={closeMenu}
                className="block w-full rounded-xl bg-[#252527] px-5 py-3 text-center font-semibold text-white hover:bg-[#be9020] transition-colors duration-200"
              >
                Login
              </Link>
              <p className="mt-4 text-center text-sm text-gray-500">
                © 2024 Newt Shoes&Clean
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
