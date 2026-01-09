// Placeholder for Footer component

export function Footer() {
  return (
    <footer className="border-t border-border bg-neutral-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-xl font-bold text-primary-600 mb-4">
              OOMA Padel & Eatery
            </h3>
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
