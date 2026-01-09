export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-playfair text-4xl font-bold text-primary-700 mb-6">
        Dashboard
      </h1>
      <p className="text-neutral-600">
        Admin dashboard content will be displayed here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white rounded-lg shadow-soft border border-border">
          <h3 className="font-semibold text-lg mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-soft border border-border">
          <h3 className="font-semibold text-lg mb-2">Menu Items</h3>
          <p className="text-3xl font-bold text-accent-500">0</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-soft border border-border">
          <h3 className="font-semibold text-lg mb-2">Active Courts</h3>
          <p className="text-3xl font-bold text-secondary-600">0</p>
        </div>
      </div>
    </div>
  );
}
