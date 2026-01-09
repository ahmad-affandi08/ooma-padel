// Booking feature types

export interface Court {
  id: string;
  name: string;
  description?: string;
  pricePerHour: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingSlot {
  id: string;
  courtId: string;
  date: Date;
  startTime: string; // Format: "HH:mm"
  endTime: string; // Format: "HH:mm"
  isBooked: boolean;
  bookingId?: string;
}

export interface Booking {
  id: string;
  courtId: string;
  userId: string;
  date: Date;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingInput {
  courtId: string;
  date: Date;
  startTime: string;
  endTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
}
