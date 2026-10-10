# Shanaya Mahendran — Personal Web Portfolio 2.0 🚀

A modern, high-performance personal portfolio built with Next.js App Router, React, and TypeScript. Designed to effectively showcase full-stack projects, academic journey, leadership programmes, volunteering initiatives, and technical skills with dynamic glassmorphism aesthetics and an accessible UX.

A database-driven personal portfolio and case-study platform built with Next.js App Router, React, TypeScript, and Prisma ORM. Features a single-admin CMS (`/admin`) and a dedicated competition showcase called **The Arena** (`/arena`).

Live Website: [https://shanaya-paul.vercel.app/](https://shanaya-paul.vercel.app/)  
Repository: [https://github.com/shanaya-mahendran/Portfolio](https://github.com/shanaya-mahendran/Portfolio)

---

## 🌟 Features

- **Next.js App Router**: Lightning fast, production-ready routing and server component optimization.
- **Academic Journey & Course Breakdown**:
  - Dual-degree tracking for **BSc in Information Technology** (University of Moratuwa - GPA 3.76) and **BSc in Computer Science** (University of the People - CGPA 3.97).
  - Interactive course tables with grade badges and expandable **"What I Gained"** knowledge panels for each course.
  - Single-accordion card expansion for clean timeline navigation.
- **Programmes, Volunteering & Achievements**:
  - **IEEE Computer Society R10 Summer School 2026** — Completed; Team Leader of HungryBeast, 3rd Place in Mini Ideathon with **SmartPark**.
  - **OMLAS Champion 2026** — One Million Leaders Asia (*Almost Completed*).
  - **National Entrepreneurship Development Programme (NEDP Phase 3)** — National Innovation Agency / UoM / Union Bank (*Completed, Jun–Oct 2026*).
  - **1st International Sustainable Research Symposium 2026** — Volunteer (TRACE Expert City).
  - **DevConnect Ambassador** — DevConnect (*Active*).
  - **IEEE Young Professionals Sri Lanka** — Y2NPro Social Media Coordinator.
  - **1st Alliance Cup Full Contact Karate 2025** — Gold Medalist (UWMAFS SL / UWMF Japan).
- **Projects Showcase**:
  - Filterable by **Full-Stack**, **Web Apps**, **Open Source**, and **Learning Journal**.
  - Direct **GitHub** and **Live Demo** action links on cards with modal view details.
- **Interactive Canvas Hero**: Custom particle networking simulation using native HTML5 Canvas.
- **Glassmorphism Aesthetic**: Modern dark/light theme switching with smooth CSS variables and Framer Motion micro-interactions.
- **Performance Optimized**: Optimized for speed, zero layout shifts, strict WCAG accessibility, and clean responsive design.

## 🌟 What's New in Portfolio 2.0

### 1. ⚔️ The Arena — Builds Under Pressure (`/arena` & `/arena/[slug]`)
A dedicated competition showcase organized into three distinct categories:
- **01. 🏆 Podium Finishes**: Major awards, 1st/2nd/3rd place finishes, and validated competition milestones (e.g., **SmartPark** at IEEE Computer Society R10 Summer School 2026 Mini Ideathon — 3rd Place).
- **02. ⚔️ The Attempts**: Submissions that did not advance or win (e.g., **Smart Travel** at Cre8X Oracle Challenge 2026). Given an honest presentation with deep technical retrospectives rather than hiding unsuccessful builds.
- **03. 🧪 The Experimental Lab**: Active prototypes, multi-agent frameworks, and ongoing research builds.

#### Deep-Dive Case Studies (`/arena/[slug]`):
Every Arena project has its own dedicated case study featuring:
- **Competition Overview & Context**
- **The Problem Statement & Constraints** (time pressures, network edge requirements)
- **Role & Team Dynamics** (e.g., Team Leader, HungryBeast)
- **Personal Contribution & Leadership**
- **Technical Solution & Architecture Specifications**
- **The Retrospective**: What worked, what failed, and what would be changed
- **Core Takeaways & Lessons Learned**
- **Evidence Links**: Verifiable certificates, presentation decks, and GitHub repositories

---

### 2. 🔐 Private Admin CMS (`/admin`)
A protected, single-administrator management system with zero public signup:
- **Overview Dashboard (`/admin`)**: Key metrics (project counts, draft statuses, inbound contact messages, quick action bar).
- **Project Management (`/admin/projects`)**: Create, read, update, delete, archive, toggle featured status, and reorder projects.
- **The Arena Management (`/admin/arena`)**: Manage competitions and Arena entries with full retrospective and evidence editors.
- **Skills Management (`/admin/skills`)**: Update technical skills and percentage proficiencies.
- **Experience & Education (`/admin/experience`, `/admin/education`)**: Edit career milestones and course grades.
- **Media Library (`/admin/media`)**: Secure image upload with MIME validation, 5MB size limit, collision-free safe filenames, and 1-click clipboard URL copying.
- **Site Settings (`/admin/settings`)**: Global site titles, hero taglines, verified PR counts, and social links.
- **Draft Preview Protection**: Draft entries are only visible to authorized administrators using `?preview=true`. Anonymous visitors receive a strict 404.

---

### 3. 🎯 Baseline & Performance Fixes
- **Duplicated Projects Fixed**: Removed redundant array duplication in featured projects carousel; cards render cleanly without duplicates.
- **Animated Counters Fixed**: Replaced fragile DOM-mutating observers with a reactive `AnimatedCounter` component using `requestAnimationFrame`, ensuring stats never stay stuck at 0.
- **Harmonized Metrics**: Synchronized open-source pull request counts across all files to 43 merged PRs.

---

## 💻 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM & Database**: [Prisma](https://www.prisma.io/) (SQLite for local zero-dependency development; PostgreSQL schema mirror in `prisma/schema.postgresql.prisma` for production)
- **Authentication**: Salted `crypto.scrypt` password hashing + HMAC SHA-256 HttpOnly session cookies
- **Styling**: Vanilla CSS (`globals.css`) with curated purple/dark theme tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.x or v20+ recommended)
- **npm** (v9+)

### 2. Installation
```bash
git clone https://github.com/shanaya-mahendran/Portfolio.git
cd Portfolio
npm install
```

### 3. Database Initialization & Seeding
Push the database schema and populate with initial verified records:
```bash
# Push schema to local database
npx prisma db push

# Seed initial projects, competitions, The Arena entries, and admin account
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 🔑 Admin CMS Access

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) (or `/admin/login`).

Default provisioned credentials (from `prisma/seed.js`):
- **Email**: 
- **Password**: 

*(You can update your credentials or site details anytime in the Admin Settings panel).*

---

## 🛠️ Verification & Production Build

Run TypeScript type check:
```bash
npm run type-check
```

Create production build:
```bash
npm run build
```
*(Turbopack will compile all 33 public and admin routes and generate the sitemaps via `next-sitemap`).*

---

## 🌐 Deploying to Production (Vercel / Supabase)

To deploy to production with PostgreSQL:
1. Set `DATABASE_URL` in your production environment (e.g. Supabase connection string).
2. Use `prisma/schema.postgresql.prisma` if deploying directly with a remote PostgreSQL datasource:
   ```bash
   cp prisma/schema.postgresql.prisma prisma/schema.prisma
   npx prisma generate
   ```
3. Set `ADMIN_JWT_SECRET` in your production environment variables to a secure random string.
4. Deploy to Vercel via Git integration or Vercel CLI.

---

## 📄 License

This project is licensed under the [ISC](LICENSE) License.
