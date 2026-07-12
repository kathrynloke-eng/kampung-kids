# Kampung Kids

A Singapore-focused learning app for children ages **4–12** that teaches **culture**, **manners**, and **character** — then rewards kids for applying lessons in real life with grown-up-approved proof.

## What it includes

- Age bands: Little Seeds (4–6), Young Explorers (7–9), Kampung Champions (10–12)
- Lessons spanning shared Singapore values plus Chinese, Malay, Indian, and Eurasian perspectives
- Real-world **missions** with proof notes + parent/teacher approval
- **Stars** and **badges** for completed missions (stored locally in the browser)
- **EN / 中文 / Bahasa Melayu / தமிழ்** UI + lesson translations
- **Offline / PWA** via a custom service worker (Turbopack-friendly on Next.js 16)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Default grown-ups PIN: `1234` (changeable in the dashboard)

## Grown-ups dashboard

Open **More → Parent / Teacher dashboard**, enter the PIN, then approve or send back pending proofs. Parent and teacher views share the same queue; approvals record who reviewed them.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Client-side progress via `localStorage` (no backend yet)
- Custom `public/sw.js` + `manifest.webmanifest` for offline install
