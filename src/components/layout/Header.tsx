// Placeholder for Header component
// This will be used in the public layout

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="font-playfair text-2xl font-bold text-primary-600">
            OOMA
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm font-medium hover:text-primary-500 transition-colors">
            Tentang
          </a>
          <a href="#menu" className="text-sm font-medium hover:text-primary-500 transition-colors">
            Menu
          </a>
          <a href="#courts" className="text-sm font-medium hover:text-primary-500 transition-colors">
            Lapangan
          </a>
          <a href="#booking" className="text-sm font-medium hover:text-primary-500 transition-colors">
            Pesan Sekarang
          </a>
        </nav>
      </div>
    </header>
  );
}
