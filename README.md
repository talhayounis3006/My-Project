# Balkan Food Store (E-Commerce)

A premium, fully functional e-commerce platform for authentic Balkan products. Built with Next.js, featuring real-time authentication, database persistence, and a stunning responsive design.

## Features
- **Premium UI/UX**: Custom HSL color palette, smooth animations, and glassmorphism.
- **Product Gallery**: Categorized products with detailed views and related items.
- **Persistent Cart**: Database-backed cart functionality for registered users.
- **Secure Auth**: Custom JWT-like session management with secure cookie storage.
- **Order Flow**: Integrated contact/order system with cart persistence.
- **Dual DB Support**: Seamlessly switches between local SQLite and production PostgreSQL.

## Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: Vanilla CSS + TailwindCSS (for utility)
- **Database**: SQLite (Local) / PostgreSQL (Production)
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form

## Local Development
1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Environment Setup**:
   Copy `.env.example` to `.env` and set `AUTH_SECRET`.
3. **Run Dev Server**:
   ```bash
   npm run dev
   ```
4. **Run Tests**:
   ```bash
   npm run test
   ```

## Production Deployment (Vercel)
1. **Environment Variables**:
   In Vercel Dashboard, set the following:
   - `AUTH_SECRET`: A secure random string.
   - `POSTGRES_URL`: Your Vercel Postgres connection string.
2. **Database Migration**:
   The app automatically initializes the database schema on the first API call via `initDb()` in `lib/db.ts`.

---
Developed by **HY Consultants** - Pure Authentic Experience.
