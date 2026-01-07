# Event & Attendee Management Portal

A full-stack dashboard built with Next.js that allows users to create events and manage attendee registrations with a strong focus on data modeling, UX, and server-state management.

---

## 🚀 Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Shadcn/UI
- **Backend:** Next.js API Routes
- **Database:** Prisma + SQLite
- **Forms & Validation:** React Hook Form + Zod
- **Server State:** TanStack Query
- **UX Enhancements:** Optimistic UI, Skeleton Loaders, Toast Notifications (Sonner)

---

## ✨ Features

### Event Management
- Create events with title, description, date, and capacity
- View a list of all events
- View detailed event pages

### Attendee Management
- Register attendees for specific events
- Enforced capacity limits
- Prevent duplicate registrations per event

### Advanced UX
- Skeleton loaders for loading states
- Empty & error states
- Optimistic UI updates for instant feedback
- Toast notifications for success & failure

---

## 🧠 Data Modeling
- One-to-many relationship between **Event → Attendees**
- Unique constraint to prevent duplicate attendee registrations
- Cascade delete for relational integrity

---

## ⚙️ Local Setup

```bash
git clone https://github.com/bilalsadiq03/event-attendee-portal.git
cd event-attendee-portal
npm install
npx prisma migrate dev
npm run dev
