
# 🌳 TreePatch

**Find the perfect patch of shade to play in Philly.**

TreePatch helps parents discover shaded outdoor play spaces across Philadelphia. See real-time shade coverage, find the best time to visit, and explore parks, playgrounds, splash pads, and more.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple)

## Features

- 🌤️ **Hourly shade timeline** — See shade coverage from 6 AM to 8 PM
- ⛱️ **Best time recommendations** — Know when to visit for maximum shade
- 🗺️ **Illustrated map** — Storybook-style map of Philly play spaces
- 🏷️ **Category browsing** — Filter by playgrounds, parks, splash pads, courts, and more
- ❤️ **Favorites** — Save your go-to spots
- 📱 **Responsive** — Works great on phones, tablets, and desktops

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Build | Vite 6 |
| Fonts | Baloo 2 (headings), Nunito (body) |
| Deploy | Vercel |

## Project Structure

```
├── pages/               # Full-page views (Home, Map, Detail)
├── components/          # Reusable UI components
├── data/                # Location data and shade generation
├── types.ts             # Shared TypeScript types
├── tailwind.config.js   # Custom design tokens
└── CLAUDE.md            # AI coding assistant context
```

## Deployment

This project is configured for **Vercel**:

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Vercel auto-detects Vite — no extra config needed
4. `vercel.json` handles SPA routing

Or deploy manually:
```bash
npm run build
npx vercel --prod
```

## Contributing

See [CLAUDE.md](./CLAUDE.md) for detailed project conventions, design system documentation, and common development tasks.

## License

MIT
