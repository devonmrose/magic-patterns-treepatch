
# TreePatch — Project Guide for Claude Code

## What This Is
TreePatch is a React app that helps parents in Philadelphia find shaded outdoor play spaces for their kids. It shows shade coverage throughout the day, best times to visit, and location details for parks, playgrounds, splash pads, courts, and fields across the city.

## Tech Stack
- **React 18** + **TypeScript** (strict mode)
- **Vite** for dev server and builds
- **Tailwind CSS 3** with a custom theme (see `tailwind.config.js`)
- **Framer Motion** for animations and page transitions
- **Google Fonts**: Baloo 2 (headings), Nunito (body)
- No router library — pages managed via `useState<PageType>` in `App.tsx`

## Project Structure
```
├── App.tsx                      # Root component, page state + transitions
├── index.tsx                    # React DOM entry point
├── index.css                    # Tailwind imports, CSS variables, global styles
├── types.ts                     # Shared TypeScript types
├── tailwind.config.js           # Custom colors, fonts, blob border-radius, shadows
├── data/
│   └── locations.ts             # Location data + hourly shade generation
├── components/
│   ├── CategoryButton.tsx       # Home page category grid buttons
│   ├── CloudBackground.tsx      # Animated cloud decorations
│   ├── FavoritesDrawer.tsx      # Favorites side drawer
│   ├── LocationCard.tsx         # Location preview card
│   ├── ShadeDayTimeline.tsx     # Hourly shade visualization bar
│   ├── ShadeStrip.tsx           # Compact shade indicator strip
│   ├── StoryBookMap.tsx         # Illustrated map view
│   ├── TreePatchHeader.tsx      # App header with nav
│   └── WeatherIcon.tsx          # Custom SVG weather/nature icons
├── pages/
│   ├── HomePage.tsx             # Landing page with category grid
│   ├── LocationDetailPage.tsx   # Individual location detail view
│   └── MapPage.tsx              # Map view with location cards
```

## Design System

### Colors (CSS custom properties in `index.css`, mapped in Tailwind config)
- `leafy-green` (#5CB85C) — primary brand, shade indicators
- `sky-blue` (#6BB5E0) — water features, secondary accent
- `sunshine-yellow` (#FFCB45) — highlights, active states
- `cloud-white` (#F5F0E8) — background (warm off-white)
- `breezy-teal` (#4DB6AC) — current time indicators, links
- `sunset-orange` (#FF8A65) — sun exposure, warnings
- `earth-brown` (#8D6E63) — text, borders, grounding elements

### Typography
- Headings: `font-heading` → "Baloo 2" (cursive, playful)
- Body: `font-body` → "Nunito" (rounded sans-serif, friendly)

### Visual Style
- Organic "blob" border-radius shapes (`rounded-blob-1` through `rounded-blob-4`)
- Warm shadows (`shadow-warm`, `shadow-warm-lg`)
- Storybook/illustrated aesthetic — hand-drawn feel
- Subtle paper texture on body background

### Shade Levels (4 levels, mapped to 3 visual colors)
- `full-shade` → green (#6BBF6B)
- `partial-shade` / `light-sun` → yellow (#F5D76E)
- `full-sun` → orange (#F0944D)

## Code Conventions
- **Named exports only** — no `export default`
- **Functional components** with TypeScript interfaces for props
- **Framer Motion** for all animations (variants pattern preferred)
- Component files are PascalCase: `TreePatchHeader.tsx`
- Keep components focused — one component per file
- Use Tailwind utility classes; avoid inline styles except for dynamic values
- Icons use the custom `WeatherIcon` component (SVG-based, not lucide)

## Key Patterns

### Page Navigation
```tsx
// App.tsx manages page state
const [currentPage, setCurrentPage] = useState<PageType>('home')
// Pages receive onNavigate callback
<HomePage onNavigate={handleNavigate} />
```

### Shade Data
```tsx
// Each location has 24-hour shade data generated from patterns
generateHourlyShade('heavy-canopy' | 'moderate-trees' | 'open-field' | ..., peakTemp)
```

### Animation Pattern
```tsx
// Staggered children with spring physics
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
}
```

## Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server on port 3000
npm run build        # Type-check + production build
npm run preview      # Preview production build locally
npm run typecheck    # TypeScript check without emitting
```

## Deployment
- Deployed on **Vercel** — `vercel.json` handles SPA routing
- Build command: `npm run build`
- Output directory: `dist`

## Common Tasks

### Adding a new location
Edit `data/locations.ts` — add to the `LOCATIONS` array following the existing pattern. Choose a shade pattern from: `heavy-canopy`, `moderate-trees`, `open-field`, `mixed`, `exposed`, `afternoon-shade`, `morning-shade`, `pavilion`.

### Adding a new page
1. Add the page type to `PageType` in `types.ts`
2. Create the page component in `pages/`
3. Add the route case in `App.tsx` within the `AnimatePresence` block
4. Add navigation button in `TreePatchHeader.tsx` if needed

### Adding a new component
1. Create in `components/` with a TypeScript interface for props
2. Use named export
3. Follow the Framer Motion animation patterns for consistency
