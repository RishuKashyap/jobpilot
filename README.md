# JobPilot 🚀

A modern, full‑stack **Job Application Tracker** that helps users organize job applications, track statuses, manage follow‑ups, and visualize progress — all in one clean dashboard.

Built with **Next.js (App Router)**, **Supabase**, and **Tailwind CSS**, JobPilot focuses on real‑world usability, secure authentication, and scalable architecture.

---

## ✨ Features

### 🔐 Authentication & Security

* Email/password authentication using **Supabase Auth**
* Email confirmation & password reset flow
* Protected routes using **Next.js middleware**
* **Row Level Security (RLS)** so users can only access their own data

### 📋 Job Management

* Add, edit, and delete job applications
* Track job status: `Applied`, `Interview`, `Offer`, `Rejected`
* Store company name, role, date, notes, and links
* Persistent data with Supabase PostgreSQL

### ⏰ Follow‑ups & Reminders

* Automatic follow‑up prompts based on job status & age

  * Applied → 7 days
  * Interview → 4 days
  * Offer → 2 days
* Dedicated **Reminders page**
* Fully customizable follow‑up durations via user settings

### 📊 Analytics & Insights

* Stats dashboard powered by **Recharts**
* Visual breakdown of job statuses
* Track application trends over time

### ⚙️ User Settings

* Custom follow‑up trigger durations
* Designed to scale for future preferences:

  * Theme
  * Notifications
  * Profile settings

### 📁 Utilities

* CSV export of job data
* Active sidebar navigation
* Responsive layout (desktop‑first)

---

## 🛠️ Tech Stack

**Frontend**

* Next.js 14 (App Router)
* React
* Tailwind CSS
* Recharts

**Backend / Services**

* Supabase (PostgreSQL, Auth, RLS)

**Other**

* LocalStorage (UI preferences)
* Client & Server Components

---

## 📂 Project Structure

```
app/
 ├─ (protected)/        # Auth-protected routes
 │   ├─ dashboard/
 │   ├─ reminders/
 │   ├─ stats/
 │   ├─ settings/
 │   └─ layout.tsx      # Protected layout wrapper
 │
 ├─ components/         # Reusable UI components
 ├─ error/              # Global error handling
 ├─ forgot-password/    # Forgot password flow
 ├─ login/              # Login page
 ├─ logout/             # Logout handler
 ├─ reset-password/     # Password reset page
 ├─ signup/             # Signup page
 │
 ├─ lib/                # Supabase clients & helpers
 ├─ types/              # TypeScript types
 │
 ├─ globals.css         # Global styles
 ├─ layout.tsx          # Root layout
 └─ page.tsx            # Landing / entry page

middleware.ts           # Auth protection middleware
public/                 # Static assets
.env.local               # Environment variables
```

---

## 🔒 Database Schema (Core)

### `jobs`

* `id`
* `user_id`
* `company`
* `role`
* `status`
* `date`
* `notes`

### `custom_reminders`

* `id`
* `user_id`
* `status`
* `days`

> RLS policies ensure `user_id = auth.uid()`

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/jobpilot.git
cd jobpilot
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4️⃣ Run the App

```bash
npm run dev
```

---

## 🧠 Design Decisions

* **App Router** for scalable routing & layouts
* **Client‑side fetching** for dashboard interactions
* **Supabase RLS** for production‑grade security
* Modular settings system for future expansion

---

## 🛣️ Roadmap

* Dark / Light theme sync with Supabase
* Email or in‑app notifications
* Tagging & advanced filters
* Calendar view for follow‑ups
* Mobile‑first improvements

---

## 🙌 Inspiration

JobPilot was built to solve a real pain point faced during job hunting — tracking dozens of applications without losing follow‑ups or clarity.

---

## 📜 License

MIT License

---

### 💙 Built with care, learning, and real‑world intent
