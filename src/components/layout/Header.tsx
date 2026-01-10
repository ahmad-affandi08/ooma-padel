"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#about", label: "Tentang" },
    { href: "#menu", label: "Menu" },
    { href: "#courts", label: "Lapangan" },
    { href: "#booking", label: "Pesan Sekarang" }
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${isScrolled
          ? "bg-black/20 backdrop-blur-md border-b border-white/10 h-20"
          : "bg-transparent border-transparent h-24"
          }`}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            <a href="#" className="flex flex-col items-center justify-center cursor-pointer group">
              <Image
                src="/logohitam.png"
                alt="OOMA Padel & Eatery"
                width={100}
                height={35}
                className="h-7 md:h-9 w-auto object-contain transition-transform group-hover:scale-105 brightness-0 invert"
                priority
              />

              <p className="logo-tagline text-[0.6rem] md:text-[0.65rem] font-light text-white tracking-[0.25em] uppercase transition-colors group-hover:text-orange-200" style={{ fontFamily: "'Sackers Gothic', Georgia, serif" }}>
                <span className="mx-1 text-white/60">•</span>
                <span className="drop-cap">P</span>adel <span className="mx-0.5">&</span> <span className="drop-cap">E</span>eatery
                <span className="mx-1 text-white/60">•</span>
              </p>
            </a>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest text-white/90 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.header>

      {isMounted && (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 z-[998] md:hidden"
                style={{ top: "80px" }}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 bottom-0 w-[75%] bg-[#1c1917] shadow-2xl z-[999] md:hidden border-l border-white/10 flex flex-col"
                style={{ top: "80px" }}
              >
                <nav className="flex flex-col p-6 gap-2">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleNavClick}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1, duration: 0.3 }}
                      className="group relative text-sm font-medium uppercase tracking-widest text-white/90 py-4 px-4 rounded-xl hover:bg-white/10 transition-all border-b border-white/5"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-auto p-8 border-t border-white/10">
                  <div className="flex flex-col items-center justify-center opacity-50">
                    <p className="text-[0.6rem] text-stone-300 tracking-[0.25em] uppercase">
                      OOMA Padel & Eatery
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </>
  );
}