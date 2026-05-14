# ECU//DIR — Standalone ECU Directory

Community directory for standalone ECU tuners, shops, and vendors.

## Stack
- React 18
- React Router v6
- JSON flat files (Phase 1 data)
- Vercel (hosting)

## Getting started

```bash
cd ecu-directory
npm install
npm start
```

Opens at `http://localhost:3000`

## Project structure

```
src/
  data/
    shops.json        ← add/edit listings here (Phase 1)
  services/
    shops.js          ← ALL data access goes through here
                         swap JSON → Supabase by editing this file only
  components/
    Nav.jsx / Nav.css
    ShopCard.jsx / ShopCard.css   ← handles all 3 tier states
  pages/
    Directory.jsx     ← main tuner directory with zip sort + filters
    Submit.jsx        ← listing submission form
    Placeholders.jsx  ← ECUs + Builds stubs (build out next)
  App.jsx             ← router
  index.css           ← global dark theme variables
```

## Adding a listing (Phase 1)

Edit `src/data/shops.json`. Required fields:

```json
{
  "id": "unique-slug",
  "name": "Shop Name",
  "tier": "free | standard | featured",
  "status": "approved",
  "state": "CA",
  "city": "Los Angeles",
  "lat": 34.0522,
  "lng": -118.2437,
  "specialties": ["ecu-install", "tuning-dyno"],
  "ecuBrands": ["Haltech", "AEM"]
}
```

- `lat` / `lng` only needed for `featured` tier (distance sort)
- `city` only shown for `standard` and `featured`
- `free` tier shows name + state only

## Tier rules

| Tier | Shown to visitors | Sort method |
|---|---|---|
| featured | Full card: bio, contact, website, distance | Exact distance from visitor zip |
| standard | Logo, city/state, specialties, website | Same-state float, then default |
| free | Name + state only | Alphabetical |

## Deploying to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import your repo
3. Framework: Create React App (auto-detected)
4. Deploy — done

## Phase 2 migration (Supabase)

When ready to move off JSON:
1. Create a `shops` table in Supabase matching the JSON schema
2. Run the migration script (to be added) to import existing JSON data
3. Edit `src/services/shops.js` — swap the JSON import for Supabase client calls
4. Add Supabase Auth for vendor login / dashboard

No component files need to change.
