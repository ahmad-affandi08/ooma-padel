export default function PublicHomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Premium Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 text-center space-y-8 px-4 py-20">
          <div className="space-y-4">
            <h1 className="font-playfair text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 bg-clip-text text-transparent leading-tight">
              OOMA
            </h1>
            <p className="font-playfair text-3xl md:text-5xl font-semibold text-primary-800">
              Padel & Eatery
            </p>
          </div>

          <p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed font-light">
            Dimana Olahraga Bertemu Gaya Hidup
            <span className="block mt-2 text-lg text-neutral-600">
              Rasakan lapangan padel premium dan kuliner organik dalam suasana hangat dan natural
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="#booking"
              className="group px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-pill font-semibold text-lg shadow-soft-lg hover:shadow-soft-md hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Pesan Lapangan
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a
              href="#menu"
              className="group px-10 py-5 bg-white border-2 border-primary-500 text-primary-600 rounded-pill font-semibold text-lg shadow-soft hover:shadow-soft-md hover:bg-primary-50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Lihat Menu
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section id="about" className="py-32 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary-50 to-transparent opacity-50"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary-50 rounded-pill text-primary-700 font-semibold text-sm">
                Tentang Kami
              </div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary-800 leading-tight">
                Cara Baru untuk
                <span className="block text-accent-600">Bermain & Bersantap</span>
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                OOMA Padel & Eatery adalah tempat dimana fasilitas olahraga premium bertemu dengan
                kuliner organik dan artisan. Kami menciptakan tempat perlindungan bagi mereka yang
                menghargai hal-hal terbaik dalam hidup – dari pertandingan padel yang sempurna hingga
                hidangan yang dibuat dengan penuh perhatian.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Suasana natural dan hangat kami mengundang Anda untuk melambat, terhubung dengan
                teman, dan merasakan perpaduan sempurna antara gaya hidup aktif dan keunggulan kuliner.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 font-playfair">#1</div>
                  <div className="text-sm text-neutral-600 mt-1">Padel di Sragen</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-600 font-playfair">FIP</div>
                  <div className="text-sm text-neutral-600 mt-1">Standar Internasional</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary-600 font-playfair">5.0</div>
                  <div className="text-sm text-neutral-600 mt-1">Rating Google</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-200 rounded-3xl shadow-soft-lg"></div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-gradient-to-br from-accent-100 to-accent-200 rounded-3xl shadow-soft-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Highlight - Premium Grid */}
      <section id="menu" className="py-32 px-4 bg-gradient-to-b from-secondary-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-accent-50 rounded-pill text-accent-700 font-semibold text-sm mb-4">
              Menu Kami
            </div>
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary-800 mb-6">
              Organik & Artisan
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Setiap hidangan dibuat dengan bahan-bahan organik yang bersumber lokal.
              Dari smoothie yang menyegarkan hingga makanan yang mengenyangkan, kami mendukung gaya hidup aktif Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Menu Category Cards */}
            {[
              { title: "Smoothie Segar", color: "from-primary-400 to-primary-600", icon: "🥤" },
              { title: "Kopi Artisan", color: "from-accent-400 to-accent-600", icon: "☕" },
              { title: "Bowl Sehat", color: "from-secondary-400 to-secondary-600", icon: "🥗" },
            ].map((category, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} rounded-full transform translate-x-16 -translate-y-16 opacity-10 group-hover:opacity-20 transition-opacity`}></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="font-playfair text-2xl font-bold text-neutral-800 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Dibuat dengan penuh perhatian menggunakan bahan premium dan organik.
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                    Lihat Menu
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courts Section - Visual Showcase */}
      <section id="courts" className="py-32 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-400 rounded-3xl shadow-soft-lg"></div>
              <div className="absolute -top-6 -left-6 w-1/2 h-1/2 bg-gradient-to-br from-accent-200 to-accent-300 rounded-3xl shadow-soft"></div>
            </div>

            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-block px-4 py-2 bg-primary-50 rounded-pill text-primary-700 font-semibold text-sm">
                Fasilitas Kami
              </div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary-800 leading-tight">
                Lapangan Padel
                <span className="block text-accent-600">Kelas Dunia</span>
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Rasakan permainan di lapangan premium kami, yang dirancang sesuai standar internasional.
                Baik Anda pemula atau pemain berpengalaman, fasilitas kami menyediakan
                lingkungan yang sempurna untuk perjalanan padel Anda.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "Standar FIP - International Padel Federation",
                  "Fasilitas: Musholla, Toilet & Area Parkir",
                  "Suasana Cozy & Casual - Ramah Anak",
                  "Cocok untuk Pemula hingga Profesional"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-32 px-4 bg-secondary-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary-50 rounded-pill text-primary-700 font-semibold text-sm mb-4">
              Lokasi Kami
            </div>
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary-800 mb-6">
              Temukan Kami di
              <span className="block text-accent-600">Sragen, Jawa Tengah</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              Jl. Gatot Subroto, Kebayan 1, Sragen Kulon, Kec. Sragen, Kabupaten Sragen, Jawa Tengah 57212
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-soft-lg">
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
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Alamat</h3>
              <p className="text-sm text-neutral-600">Jl. Gatot Subroto, Kebayan 1, Sragen Kulon</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Jam Buka</h3>
              <p className="text-sm text-neutral-600">Setiap Hari<br />06:00 - 22:00 WIB</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
              <div className="w-12 h-12 bg-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-secondary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Kontak</h3>
              <p className="text-sm text-neutral-600">Hubungi kami untuk<br />reservasi lapangan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA - Dramatic */}
      <section id="booking" className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTE4LTE4YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Siap Bermain?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
            Pesan lapangan Anda sekarang dan rasakan perbedaan OOMA.
            <span className="block mt-2 text-lg text-white/80">
              Fasilitas premium • Kuliner organik • Pengalaman tak terlupakan
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-10 py-5 bg-white text-primary-600 rounded-pill font-bold text-lg shadow-soft-lg hover:shadow-soft-md transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                Pesan Sekarang
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="px-10 py-5 border-2 border-white text-white rounded-pill font-bold text-lg hover:bg-white/10 transition-all duration-300">
              Hubungi Kami
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-white/90">
              <div className="text-3xl font-bold font-playfair">★★★★★</div>
              <div className="text-sm mt-1 text-white/70">Rating Google</div>
            </div>
            <div className="text-white/90">
              <div className="text-3xl font-bold font-playfair">Kedai Kopi</div>
              <div className="text-sm mt-1 text-white/70">& Padel Court</div>
            </div>
            <div className="text-white/90">
              <div className="text-3xl font-bold font-playfair">Sragen</div>
              <div className="text-sm mt-1 text-white/70">Jawa Tengah</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
