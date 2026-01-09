"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <Image
            src="/logohitam.png"
            alt="OOMA Padel & Eatery"
            width={120}
            height={40}
            className="h-20 w-auto mt-3"
            priority
          />
          <span className="text-base  font-medium text-muted-foreground tracking-wide border-l border-border pl-3">
            Padel & Eatery
          </span>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden md:flex items-center gap-6"
        >
          {[
            { href: "#about", label: "Tentang" },
            { href: "#menu", label: "Menu" },
            { href: "#courts", label: "Lapangan" },
            { href: "#booking", label: "Pesan Sekarang" }
          ].map((link, idx) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, color: "rgb(var(--primary-500))" }}
              className="text-lg font-medium hover:text-primary-500 transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.nav>
      </div>
    </motion.header>
  );
}
