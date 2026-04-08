# Wall Calendar — Interactive React Component

A polished, interactive wall calendar built with **Next.js 14**, **TypeScript**, **Framer Motion**, **Three.js**, and **shadcn/ui**.

## Features

- **Wall Calendar Aesthetic** — Spiral binding, hero image per month, wave SVG divider, paper-like card with depth shadow
- **Day Range Selector** — Click start date, hover to preview range, click end date to confirm. Clear visual states for start, end, and in-between days
- **Integrated Notes** — Add notes scoped to a selected date range or the whole month. Edit/delete inline. Persisted to `localStorage`
- **Three.js Particle Background** — Ambient floating particles rendered via WebGL
- **Framer Motion Animations** — Page entrance, month image crossfade, range indicator slide-in, note list animations
- **Fully Responsive** — Works on mobile (stacked) and desktop. Touch-friendly tap targets
- **Month-specific Hero Images** — Each month loads a unique Unsplash photo
- **Today Indicator** — Ring highlight on today's date
- **Weekend Coloring** — SAT/SUN highlighted in blue, matching the reference design
- **Tooltip Note Indicators** — Dot on days with notes, tooltip shows count

## Tech Stack

| Library | Purpose |
|---|---|
| Next.js 15 + TypeScript | Framework |
| Tailwind CSS v4 | Styling |
| shadcn/ui (base-ui) | UI primitives (Tooltip, Badge, Textarea, Button) |
| Framer Motion | Animations |
| Three.js | WebGL particle background |
| date-fns | Date math |
| lucide-react | Icons |
| localStorage | Notes persistence |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Usage

1. **Navigate months** — Use the arrow buttons on the hero image (top-right)
2. **Select a date range** — Click a start date, hover to preview, click an end date
3. **Clear selection** — Click the ✕ in the range indicator bar
4. **Add a note** — Type in the notes textarea and press Enter or click +
5. **Edit/delete notes** — Hover a note to reveal edit/delete icons
6. **Go to today** — Click the ↺ button between the arrows
