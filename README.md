# Arul Prakash U — Single-Page Portfolio Website Theme

A modern, high-performance, globally accepted single-page developer portfolio website designed for **Arul Prakash U** (Senior Web Developer & Consultant).

## 🌐 Live Site

**https://arulprakashu1-cpu.github.io/arul-prakash-portfolio/** (GitHub Pages, deploys automatically on push to `main`)

## 📁 Project Structure

```
├── index.html          # Frontend — standalone single-page portfolio (no build step)
├── backend/            # Backend — Node.js / Express API
│   ├── server.js       #   /api/health, /api/profile, POST /api/contact
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Running Locally

**Frontend** (zero dependencies):
- Double-click `index.html`, or run `npx serve .`

**Backend API**:
```bash
cd backend
npm install
npm run dev        # starts http://localhost:3001 with auto-reload
```
Endpoints: `GET /api/health`, `GET /api/profile`, `POST /api/contact` (validated + rate-limited, messages persisted to `backend/messages.json`).

**Wiring the contact form to the API**: the form in `index.html` points visitors to LinkedIn when no backend is configured. After deploying the backend (Render, Railway, Fly.io — GitHub Pages only hosts the static frontend), set `API_BASE` in `index.html` to its URL and set `ALLOWED_ORIGIN` in the backend env to the Pages origin.
- **Contact channels**: all contact goes through LinkedIn and the on-site form — no personal email, phone number, or resume file is published in this repo.
- **Profile Photo**: The hero's 3D profile card loads `profile.jpg` from this folder. Save your LinkedIn profile photo (or any square headshot) as `profile.jpg` next to `index.html`; until then a gradient "AP" monogram is shown automatically.

---

## 🎨 Global Acceptance Design System Principles

This portfolio theme follows international design standards used by leading global tech companies (Linear, Stripe, Vercel, GitHub):

1. **Information Architecture (Scannable in 6 Seconds)**:
   - **Hero Section**: Immediate statement of seniority (5+ years), core competencies (Angular, React, Node.js, Cloud/DevOps), and direct CTA links.
   - **Impact Metrics Strip**: Quantifiable highlights (5+ Years Exp, 5x API Performance Optimization, 5+ Enterprise Systems, 100% CI/CD automated).
   - **Competency Matrix**: Grouped logically by engineering domain (Frontend, Backend, Cloud & DevOps, Data/AI) rather than subjective percentage bars.
   - **Filterable Enterprise Showcase**: Tagged project cards with clear problem-solution-impact narratives.
   - **Visual Career Timeline**: Progressive career narrative from foundational multi-project delivery to senior consulting engagements.
   - **Tactile Contact Hub**: Direct one-click copy buttons for email and phone with instant toast feedback.

2. **Visual Hierarchy & Typography**:
   - Modern Neo-Grotesque sans-serif (`Plus Jakarta Sans`) paired with code-oriented monospace (`JetBrains Mono`).
   - Deep slate obsidian aesthetic (`#0A0E17`) with electric indigo (`#6366F1`) and cyan (`#06B6D4`) highlights.
   - Subtle ambient engineering grid background and glassmorphic navigation header.
   - Built-in Dark / Light theme toggle with automatic persistence in `localStorage`.

3. **Accessibility & Responsive Standards**:
   - WCAG 2.1 AA compliant color contrast ratios.
   - Fluid typography using CSS clamp.
   - Fully responsive for mobile (320px+), tablet, and ultrawide desktop viewports.

---

## 🌐 1-Click Deployment Options

### Deploy to GitHub Pages:
1. Initialize git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio theme"
   ```
2. Push to your GitHub repository and enable **Settings > Pages > Deploy from Branch**.

### Deploy to Vercel or Netlify:
- Simply drag-and-drop this folder onto [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for instant global edge deployment with custom domain and SSL.
