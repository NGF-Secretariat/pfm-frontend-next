# Nigeria choropleth kit (states + LGAs)

Copy **`portable/nigeria-choropleth-kit/`** into another **React** / **Next.js** project. After you add **dependencies** and **two GeoJSON files** under `public/geo/` (see below), both maps work with **no** ties to this dashboard’s `lib/data` or scorecard types.

| Component | What it draws |
|-----------|----------------|
| **`NigeriaStatesChoropleth`** | All **36 states + F** boundaries (or **one state** with `focusStateSlug`). You supply **`valueForState(slug) => number`** (0–100 for the green scale). |
| **`StateLGAChoropleth`** | **LGAs** inside one **`stateSlug`**. Colors via **`lgaValues`**, **`valueForLGA`**, and/or **`lgaColors`**. |

---

## 1. Copy files

| From this kit | Into your app (example) |
|---------------|-------------------------|
| `src/` | `src/components/nigeria-choropleth-kit/` (or any folder) |
| `public/geo/README.md` | Reference only — follow it to create **`public/geo/`** in your app |

All imports inside **`src/`** are **relative** to each other.

---

## 2. GeoJSON (required)

Place **both** assets in **`public/geo/`**:

1. **`nigeria-states.geo.json`** → served at **`/geo/nigeria-states.geo.json`**
2. **`nigeria-lgas.geo.json`** → served at **`/geo/nigeria-lgas.geo.json`**

Step-by-step sources and field expectations: **`public/geo/README.md`** in this kit.

Until both files exist, the maps will show a load error or “no features matched”.

---

## 3. `package.json` dependencies

Merge into your app’s **`package.json`** (or install manually):

**`dependencies`**

```json
{
  "clsx": "^2.1.1",
  "d3-geo": "^3.1.1",
  "d3-scale": "^4.0.2",
  "framer-motion": "^11.18.0",
  "tailwind-merge": "^2.6.0"
}
```

**`devDependencies`** (TypeScript)

```json
{
  "@types/d3-geo": "^3.1.0",
  "@types/d3-scale": "^4.0.9",
  "@types/geojson": "^7946.0.16"
}
```

One-shot:

```bash
npm install clsx d3-geo d3-scale framer-motion tailwind-merge
npm install -D @types/d3-geo @types/d3-scale @types/geojson
```

This kit’s root **`package.json`** mirrors the same lists for easy copy-paste.

---

## 4. Imports in your app

Example with a path alias `"@/*": ["./src/*"]` and the kit at `src/components/nigeria-choropleth-kit/`:

```tsx
import {
  NigeriaStatesChoropleth,
  StateLGAChoropleth,
} from "@/components/nigeria-choropleth-kit";
```

Or import from `./index` / individual files with a **relative** path.

Components are **`"use client"`** — use them from client components (or pages with client boundaries in the App Router).

---

## 5. Usage examples

### National (or focused) **states** map

You own the numbers: **`valueForState`** receives the **slug** derived from each feature’s `properties.name` (see `stateFeatureSlug` / `slugs.ts`).

```tsx
"use client";

import { NigeriaStatesChoropleth } from "@/components/nigeria-choropleth-kit";

const DEMO_SCORES: Record<string, number> = {
  lagos: 78,
  kano: 62,
  fct: 71,
};

export function NigeriaMap() {
  return (
    <NigeriaStatesChoropleth
      height={520}
      valueLabel="Score"
      valueForState={(slug) => DEMO_SCORES[slug] ?? 45}
      onSelect={(slug, info) => console.log(slug, info)}
      onHover={(slug, info) => {
        /* slug null on mouse leave */
      }}
    />
  );
}
```

Optional props:

- **`focusStateSlug`** — draw and fit **only** that state (same slug rules).
- **`showLabels`** — label at polygon centroid (from GeoJSON geometry).
- **`geoUrl`** — override default `/geo/nigeria-states.geo.json`.

### **State** (LGA) map

```tsx
"use client";

import { StateLGAChoropleth } from "@/components/nigeria-choropleth-kit";

export function LagosLgas() {
  return (
    <StateLGAChoropleth
      stateSlug="lagos"
      stateName="Lagos"
      height={480}
      lgaColors={{ ikeja: "#dc2626" }}
      lgaValues={{ epe: 62 }}
      valueForLGA={(_name, key) => (key.length % 40) + 45}
    />
  );
}
```

Fill precedence: **`lgaColors`** → **`lgaValues`** → **`valueForLGA`** → **`defaultFill`**.

---

## 6. Styling

Components use Tailwind-style utility class names (`text-muted-foreground`, `bg-popover/95`, etc.). If your stack does not define them, swap **`className`s** in the source or wrap maps in your layout.

---

## 7. Files in `src/`

| File | Role |
|------|------|
| `index.ts` | Barrel exports |
| `NigeriaStatesChoropleth.tsx` | National / single-state **state** map |
| `StateLGAChoropleth.tsx` | **LGA** map for one `stateSlug` |
| `states-geo.ts` | State Feature types + **`stateFeatureSlug`** |
| `lga-geo.ts` | LGA Feature types + **`stateSlugFromLGAProps`** / **`lgaKeyFromName`** |
| `slugs.ts` | Shared **`normalizeStateName`** / **`slugify`** |
| `score-color.ts` | **`scoreColor`** scale (0–100) |
| `cn.ts` | `clsx` + `tailwind-merge` helper |

---

## 8. License note (boundaries)

Boundary GeoJSON is third-party data. Confirm license and attribution before shipping.
