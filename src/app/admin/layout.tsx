import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Placeholder */}
      <aside className="w-64 bg-neutral-900 text-white p-6">
        <h2 className="font-playfair text-2xl font-bold mb-8">OOMA Admin</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            Dashboard
          </a>
          <a href="/admin/bookings" className="block px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            Bookings
          </a>
          <a href="/admin/menu" className="block px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            Menu Manager
          </a>
          <a href="/admin/courts" className="block px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            Courts
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-background p-8">
        {children}
      </main>
    </div>
  );
}
