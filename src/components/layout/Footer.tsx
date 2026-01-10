import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex flex-col items-start justify-center mb-4">
              <Image
                src="/logohitam.png"
                alt="OOMA Padel & Eatery"
                width={100}
                height={35}
                className="h-7 md:h-9 w-auto object-contain"
              />
              <p className="logo-tagline text-[0.6rem] md:text-[0.65rem] font-light text-black tracking-[0.25em] uppercase mt-1" style={{ fontFamily: "'Sackers Gothic', Georgia, serif" }}>
                <span className="mx-1 text-stone-400">•</span>
                <span className="drop-cap">P</span>adel <span className="mx-0.5">&</span> <span className="drop-cap">E</span>eatery
                <span className="mx-1 text-stone-400">•</span>
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Rasakan perpaduan sempurna antara olahraga dan gaya hidup dalam suasana hangat dan natural.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-primary-500 transition-colors">Tentang</a></li>
              <li><a href="#menu" className="hover:text-primary-500 transition-colors">Menu</a></li>
              <li><a href="#courts" className="hover:text-primary-500 transition-colors">Lapangan</a></li>
              <li><a href="#booking" className="hover:text-primary-500 transition-colors">Pemesanan</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Jl. Gatot Subroto, Kebayan 1</li>
              <li>Sragen Kulon, Kec. Sragen</li>
              <li>Kabupaten Sragen</li>
              <li>Jawa Tengah 57212</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OOMA Padel & Eatery. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
