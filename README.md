# Nova Studio — AI Creative Studio Website

A premium, futuristic AI creative studio website built with React, TypeScript, Framer Motion, and Supabase.

![Nova Studio](https://img.shields.io/badge/status-production-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Fullscreen animated hero** with parallax aurora backgrounds
- **Glassmorphism design** with animated glowing borders
- **Smooth 60fps animations** via Framer Motion
- **Interactive particle network** background
- **Custom cursor effects** with magnetic buttons
- **Animated counters** with scroll-triggered reveals
- **Tilt/hover effects** on cards
- **Responsive** — perfect on desktop, tablet, and mobile
- **Dark mode** with premium color palette
- **Supabase integration** for auth, forms, and content management
- **Admin dashboard** with messages, subscribers, and content management
- **Loading screen** animation
- **SEO optimized** with Open Graph meta tags

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | **React 19** + **Vite 8** |
| Language | **TypeScript 5.7** |
| Styling | **Tailwind CSS 4** — custom glassmorphism, aurora, gradient utilities |
| Animations | **Framer Motion 12** — page transitions, scroll reveals, hover effects |
| Routing | **React Router 7** |
| Backend | **Supabase** — auth, database, RLS |
| Icons | **Lucide React** |
| Forms | **React Hook Form** (contact form) |

## Design System

### Color Palette
```
#050816 — Deep space black (background)
#0F172A — Dark surface
#2563EB — Electric blue
#7C3AED — Neon purple
#06B6D4 — Cyan accent
#FFFFFF — White text
#94A3B8 — Gray text
```

### Typography
- **Headings**: Space Grotesk (display font)
- **Body**: Inter (system/UI)

### Components
- `Button` — primary, secondary, ghost, outline variants with glow effects
- `Card` — glassmorphism cards with hover animations
- `SectionHeading` — scroll-revealed gradient headings
- `MagneticButton` — mouse-tracking magnetic effect
- `Navbar` — scroll-aware glass nav with mobile menu
- `Footer` — newsletter, links, social icons
- `AnimatedBackground` — canvas particle network
- `CursorEffect` — custom cursor with hover detection

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── SectionHeading.tsx
│   │   └── MagneticButton.tsx
│   ├── layout/          # Site shell
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AnimatedBackground.tsx
│   │   └── CursorEffect.tsx
│   ├── sections/        # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Stats.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── LoadingScreen.tsx
│   └── admin/           # Admin components
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useScrollReveal.ts
│   └── useParallax.ts
├── lib/                 # Utilities
│   ├── supabase.ts
│   └── utils.ts
├── services/            # API layer
│   └── api.ts
├── types/               # TypeScript types
│   └── index.ts
├── pages/               # Route pages
│   ├── Home.tsx
│   ├── Login.tsx
│   └── Admin.tsx
├── App.tsx
├── main.tsx
└── index.css            # Tailwind + custom animations

supabase/
├── schema.sql           # Complete database schema + RLS
└── seed.sql             # Sample data
```

## Getting Started

### 1. Clone and Install

```bash
git clone <repo-url> mini-project-ds
cd mini-project-ds
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `supabase/schema.sql`
3. Run `supabase/seed.sql` for sample data
4. Copy your project URL and anon key

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### 4. Run Dev Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 5. Create Admin User

1. Sign up at `/login`
2. In Supabase SQL Editor, promote your user to admin:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
```

3. Visit `/admin` to access the dashboard

### 6. Build for Production

```bash
npm run build
npm run preview
```

## Database Schema

All tables have:
- UUID primary keys
- `created_at` and `updated_at` timestamps  
- Row Level Security (RLS) policies
- Proper indexes
- Auto-updating `updated_at` triggers

### Tables
| Table | Purpose | RLS |
|-------|---------|-----|
| `profiles` | User profiles (auto-created) | Auth-only |
| `services` | Service offerings | Public read |
| `portfolio` | Portfolio projects | Public read |
| `testimonials` | Client testimonials | Public read |
| `pricing` | Pricing plans | Public read |
| `faq` | FAQ items | Public read |
| `contact_messages` | Contact form submissions | Public insert |
| `newsletter` | Newsletter subscribers | Public insert |

## Animation Details

- **Loading Screen**: 2-second animated progress bar with logo entrance
- **Hero**: Staggered text reveal, floating aurora orbs with parallax, animated stats strip
- **Cards**: Tilt on hover, glow border animation, smooth scale transition
- **Counters**: Eased number counting triggered by scroll intersection
- **Portfolio**: Filter tabs with layout animation, hover overlay with description
- **Testimonials**: Slide carousel with dot navigation
- **FAQ**: Accordion with smooth height animation
- **Pricing**: Annual/monthly toggle with scale animation on featured plan

## Performance

- Canvas particle network runs at 60fps via requestAnimationFrame
- Lazy-loaded images with `loading="lazy"`
- Code splitting via Vite
- Tailwind purges unused styles in production
- Framer Motion `AnimatePresence` for clean mount/unmount

## License

MIT

---

**Designed with precision. Built with intelligence.**
