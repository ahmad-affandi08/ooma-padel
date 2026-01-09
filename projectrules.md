Project Context & Philosophy
Project Name: OOMA PADEL AND EATERY Type: Fullstack Web App (Public Landing Page + Admin Dashboard) Vibe: Lifestyle, Premium, Earthy, Organic, Warm (Not Corporate/Tech). Goal: A high-performance, scalable platform for a Padel court and Cafe. It must handle content (Menu) and complex interactions (Booking System) with top-tier SEO and speed.

Tech Stack & Standards
Framework: Next.js 14+ (App Router).

Language: TypeScript (Strict Mode).

Styling: Tailwind CSS + Framer Motion (Animations).

UI Components: Shadcn/ui (Heavily customized for "Earthy" theme).

Database: PostgreSQL (via Prisma ORM).

Form/Validation: React Hook Form + Zod.

State Management: Zustand (Client) + TanStack Query (Server State for Dashboard).

Auth: NextAuth.js (v5) or Clerk.

1. Clean Architecture & Scalability Rules
Adhere to Feature-Sliced Design principles tailored for Next.js.

Separation of Concerns:

app/ -> Routing & Page Layouts (Server Components primarily).

components/ui/ -> Atomic design elements (buttons, inputs).

features/ -> Domain logic. Example: features/booking/, features/menu/. Each folder contains its own components, hooks, actions, and types.

lib/ -> Universal utilities (DB connection, date formatting).

Server Actions: Use Server Actions for all data mutations (POST/PUT/DELETE). Do not use API Routes unless necessary for external webhooks.

Type Safety: NO any. Define interfaces for all Props, DTOs (Data Transfer Objects), and DB models.

2. Design & UI/UX Rules (The "OOMA" Aesthetic)
Color Palette Enforcement:

Primary: Sage Green / Deep Forest (Nature/Sport).

Secondary: Warm Beige / Sand / Cream (Cafe/Comfort).

Accent: Terracotta / Burnt Orange.

Avoid: Default Blue, Neon colors, Pure #000000 black (use #1a1a1a).

Typography: Serif for Headings (Elegant), Sans-serif for Body (Clean).

Responsiveness: Mobile-First approach. All dashboards must be usable on tablets.

Interactions: Use framer-motion for subtle entry animations. Buttons should have "pill" shapes and soft shadows.

3. SEO & Performance Rules
Metadata: Every page.tsx must export a generateMetadata function.

Images: ALWAYS use next/image with proper sizes prop and placeholder="blur".

Rendering: Default to Server Components (RSC). Only add 'use client' at the leaves of the component tree (e.g., interactive buttons, forms).

Lighthouse Score Target: 95+ on all metrics.

4. Feature Specifics
A. Landing Page (Public)
Sections: Hero (Lifestyle Video/Image), About (Padel + Eatery), Menu Highlight, Court Details, Footer.

Speed: Use ISR (Incremental Static Regeneration) for the Menu section so it loads instantly but updates periodically.

B. Booking System (Logic)
Entities: Court, BookingSlot, User, Payment.

Validation: Prevent double booking. Handle timezone (WIB).

Flow: Select Date -> Select Available Time Slot -> Input Details -> Payment Gateway Mockup -> Confirmation.

C. Admin Dashboard (Protected)
Layout: Sidebar navigation. Clean data tables (tanstack-table).

Menu Manager: CRUD for Food/Drinks (Upload image, set price, description, category).

Booking Manager: Calendar View (Day/Week) to see occupied slots. Manual override for admin booking.

5. Coding Style (Clean Code)
Functional: Use functional components and hooks. Avoid classes.

Naming:

Components: BookingCard.tsx

Functions: getAvailableSlots(), createOrder()

Variables: isAvailable, bookingList

Early Returns: Use early returns to avoid deep nesting.

Error Handling: Use try/catch in Server Actions and return standard Result objects { success: boolean, error?: string, data?: T }.

6. Folder Structure Blueprint
/src
  /app
    /(public)       # Landing page routes
    /(admin)        # Dashboard routes (protected)
  /components
    /ui             # Generic UI (Button, Card)
    /layout         # Header, Sidebar, Footer
  /features
    /booking        # All booking logic
      /components   # BookingForm, SlotPicker
      /actions.ts   # Server Actions for booking
      /schema.ts    # Zod schema
    /menu           # All menu logic
  /lib
    db.ts           # Prisma client
    utils.ts        # Helper functions
  /types            # Global types