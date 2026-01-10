"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  MapPin,
  Clock,
  Phone,
  ChevronDown,
  Sparkles,
  Coffee,
  Salad,
  Wine,
} from "lucide-react";

import Image from "next/image";
import { PublicMenuSection } from "@/components/public/PublicMenuSection";

export default function PublicHomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-40 right-10 w-48 h-48 md:w-72 md:h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-48 h-48 md:w-72 md:h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-3 md:gap-6 mb-6 md:mb-8"
          >
            <Image
              src="/logohitam.png"
              alt="OOMA Padel & Eatery"
              width={600}
              height={180}
              className="w-auto h-16 md:h-28 lg:h-36 brightness-0 invert"
              priority
            />
            <p className="logo-tagline text-base md:text-2xl lg:text-4xl font-light text-white tracking-[0.25em] uppercase" style={{ fontFamily: "'Sackers Gothic', Georgia, serif" }}>
              <span className="mx-2 md:mx-3 lg:mx-4">•</span>
              <span className="drop-cap">P</span>adel <span className="mx-2">&</span> <span className="drop-cap">E</span>atery
              <span className="mx-2 md:mx-3 lg:mx-4">•</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base md:text-xl lg:text-2xl text-white mb-3 md:mb-4 font-light max-w-3xl mx-auto"
          >
            Dimana Olahraga Bertemu Gaya Hidup
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm md:text-base lg:text-lg text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2"
          >
            Rasakan lapangan padel premium dan kuliner organik dalam suasana hangat dan natural
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4 md:pt-8"
          >
            <a
              href="#booking"
              className="group px-8 md:px-10 py-4 md:py-5 bg-white text-primary-600 rounded-pill font-semibold text-base md:text-lg shadow-soft-lg hover:shadow-soft-md hover:bg-primary-50 transition-all duration-300 transform hover:scale-105"
            >
              Pesan Lapangan
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#menu"
              className="px-8 md:px-10 py-4 md:py-5 bg-transparent text-white rounded-pill font-semibold text-base md:text-lg shadow-soft-lg hover:shadow-soft-md border-2 border-white hover:bg-white/10 transition-all duration-300"
            >
              Lihat Menu
            </a>
          </motion.div>
        </motion.div>
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.div>
      </section >

      {/* About Section - Enhanced */}
      < section id="about" className="py-32 px-4 bg-secondary-100 relative overflow-hidden" >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.5, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary-50 to-transparent"
        ></motion.div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-2 bg-primary-50 rounded-pill text-primary-700 font-semibold text-sm"
              >
                Tentang Kami
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-playfair text-5xl md:text-6xl font-bold text-primary-800 leading-tight"
              >
                Cara Baru untuk
                <span className="block text-accent-600">Bermain & Bersantap</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg text-neutral-600 leading-relaxed"
              >
                OOMA Padel & Eatery adalah tempat dimana fasilitas olahraga premium bertemu dengan
                kuliner organik dan artisan. Kami menciptakan tempat perlindungan bagi mereka yang
                menghargai hal-hal terbaik dalam hidup – dari pertandingan padel yang sempurna hingga
                hidangan yang dibuat dengan penuh perhatian.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-neutral-600 leading-relaxed"
              >
                Suasana natural dan hangat kami mengundang Anda untuk melambat, terhubung dengan
                teman, dan merasakan perpaduan sempurna antara gaya hidup aktif dan keunggulan kuliner.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="grid grid-cols-3 gap-6 pt-6"
              >
                {[
                  { value: "#1", label: "Padel di Sragen", color: "text-primary-600" },
                  { value: "FIP", label: "Standar Internasional", color: "text-accent-600" },
                  { value: "5.0", label: "Rating Google", color: "text-secondary-600" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.5, type: "spring" }}
                    className="text-center"
                  >
                    <div className={`text-4xl font-bold ${stat.color} font-playfair`}>{stat.value}</div>
                    <div className="text-sm text-neutral-600 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="aspect-square rounded-3xl shadow-soft-lg overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                  alt="OOMA Cafe Interior"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotate: 5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute -bottom-6 -right-6 w-2/3 h-2/3 rounded-3xl shadow-soft-lg overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&q=80"
                  alt="Healthy Food"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section >

      {/* Menu Highlight - Premium Grid */}
      < section id="menu" className="py-32 px-4 bg-primary-500">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 bg-secondary-100 rounded-pill text-primary-800 font-semibold text-sm mb-4"
            >
              Menu Kami
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-playfair text-5xl md:text-6xl font-bold text-secondary-300 mb-6"
            >
              Organik & Artisan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-secondary-100 max-w-2xl mx-auto"
            >
              Setiap hidangan dibuat dengan bahan-bahan organik yang bersumber lokal.
              Dari smoothie yang menyegarkan hingga makanan yang mengenyangkan, kami mendukung gaya hidup aktif Anda.
            </motion.p>
          </div>

          <div className="mt-12">
            <PublicMenuSection />
          </div>
        </div>
      </section >

      {/* Courts Section - Visual Showcase */}
      < section id="courts" className="py-32 px-4 bg-secondary-100" >
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1 relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="aspect-video rounded-3xl shadow-soft-lg overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80"
                  alt="Padel Court"
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute -top-6 -left-6 w-1/2 h-1/2 rounded-3xl shadow-soft overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=600&q=80"
                  alt="Padel Players"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            <div className="order-1 md:order-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-2 bg-primary-50 rounded-pill text-primary-700 font-semibold text-sm"
              >
                Fasilitas Kami
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-playfair text-5xl md:text-6xl font-bold text-primary-800 leading-tight"
              >
                Lapangan Padel
                <span className="block text-accent-600">Berkualitas</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg text-neutral-600 leading-relaxed"
              >
                Rasakan permainan di lapangan premium kami, yang dirancang sesuai standar internasional.
                Baik Anda pemula atau pemain berpengalaman, fasilitas kami menyediakan
                lingkungan yang sempurna untuk perjalanan padel Anda.
              </motion.p>

              <div className="space-y-4 pt-4">
                {[
                  "Standar FIP - International Padel Federation",
                  "Fasilitas: Musholla, Toilet & Area Parkir",
                  "Suasana Cozy & Casual - Ramah Anak",
                  "Cocok untuk Pemula hingga Profesional"
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-neutral-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Location Map Section */}
      < section className="py-32 px-4 bg-primary-500" >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 bg-primary-50 rounded-pill text-primary-700 font-semibold text-sm mb-4"
            >
              Lokasi Kami
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-playfair text-5xl md:text-6xl font-bold text-secondary-300 mb-6"
            >
              Temukan Kami di
              <span className="block text-secondary-100">Sragen, Jawa Tengah</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-secondary-200 max-w-2xl mx-auto mb-8"
            >
              Jl. Gatot Subroto, Kebayan 1, Sragen Kulon, Kec. Sragen, Kabupaten Sragen, Jawa Tengah 57212
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden shadow-soft-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3956.364609836159!2d111.00916987500135!3d-7.42484069258573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1767954681871!5m2!1sid!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                Icon: MapPin,
                title: "Alamat",
                content: "Jl. Gatot Subroto, Kebayan 1, Sragen Kulon",
                bgColor: "bg-primary-100",
                iconColor: "text-primary-600"
              },
              {
                Icon: Clock,
                title: "Jam Buka",
                content: "Setiap Hari\n06:00 - 22:00 WIB",
                bgColor: "bg-accent-100",
                iconColor: "text-accent-600"
              },
              {
                Icon: Phone,
                title: "Kontak",
                content: "Hubungi kami untuk\nreservasi lapangan",
                bgColor: "bg-secondary-200",
                iconColor: "text-secondary-700"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 whitespace-pre-line">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* Booking CTA - Dramatic */}
      < section id="booking" className="relative py-32 px-4 overflow-hidden bg-secondary-100" >

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-5xl md:text-7xl font-bold text-primary-800 mb-6 leading-tight"
          >
            Siap Bermain?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-neutral-600 mb-12 leading-relaxed"
          >
            Pesan lapangan Anda sekarang dan rasakan perbedaan OOMA.
            <span className="block mt-2 text-lg text-neutral-500">
              Fasilitas premium • Kuliner organik • Pengalaman tak terlupakan
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-primary-600 text-white rounded-pill font-bold text-lg shadow-soft-lg hover:shadow-soft-md transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Pesan Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-primary-600 text-primary-600 rounded-pill font-bold text-lg hover:bg-primary-50 transition-all duration-300"
            >
              Hubungi Kami
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: "★★★★★", label: "Rating Google" },
              { value: "Kedai Kopi", label: "& Padel Court" },
              { value: "Sragen", label: "Jawa Tengah" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                className="text-primary-800"
              >
                <div className="text-3xl font-bold font-playfair">{item.value}</div>
                <div className="text-sm mt-1 text-neutral-600">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >
    </div >
  );
}
