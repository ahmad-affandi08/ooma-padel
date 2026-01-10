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
        animate={{
          y: 0,
          opacity: 1,
          width: isScrolled ? "90%" : "100%",
          maxWidth: isScrolled ? "1024px" : "100%",
          top: isScrolled ? "1.5rem" : "0rem",
          borderRadius: isScrolled ? "50px" : "0px",
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          border: isScrolled ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid transparent",
          height: isScrolled ? "70px" : "96px"
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // smooth elastic-like spring
        className={`fixed z-50 left-1/2 -translate-x-1/2 flex items-center transition-all`}
      >
        <div className="w-full h-full flex items-center justify-between px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center justify-center shrink-0"
          >
            <a href="#" className="flex flex-col items-center justify-center cursor-pointer group">
              <div>
                <Image
                  src="/logohitam.png"
                  alt="OOMA Padel & Eatery"
                  width={100}
                  height={35}
                  className={`h-7 md:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${isScrolled ? "" : "brightness-0 invert"}`}
                  priority
                />

                <p className={`logo-tagline text-[0.6rem] md:text-[0.65rem] font-light tracking-[0.25em] uppercase transition-colors mt-1 ${isScrolled ? "text-primary-950 group-hover:text-primary-700" : "text-white group-hover:text-orange-200"}`} style={{ fontFamily: "'Sackers Gothic', Georgia, serif" }}>
                  <span className={`mx-1 ${isScrolled ? "text-primary-950/60" : "text-white/60"}`}>•</span>
                  <span className="drop-cap">P</span>adel <span className="mx-0.5">&</span> <span className="drop-cap">E</span>eatery
                  <span className={`mx-1 ${isScrolled ? "text-primary-950/60" : "text-white/60"}`}>•</span>
                </p>
              </div>
            </a>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-widest transition-colors relative group ${isScrolled ? "text-primary-950 hover:text-primary-700" : "text-white hover:text-white/80"}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-primary-950" : "bg-white"}`}></span>
              </a>
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors z-50 shrink-0 ${isScrolled ? "text-primary-950 hover:bg-black/5" : "text-white hover:bg-white/10"}`}
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
                className="fixed inset-0 bg-black/60 z-[40] md:hidden"
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-[75%] bg-[#1c1917] shadow-2xl z-[45] md:hidden border-l border-white/10 flex flex-col pt-28"
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