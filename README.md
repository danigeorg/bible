# Bible to Christmas

A tiny reading journal that splits the 66-book Protestant Bible (1,189 chapters) into daily readings from **Oct 7 to Dec 25, 2026** (80 days). Open → see today's reading → check it off → see progress.

## How the plan is calculated
`src/utils/readingPlan.ts` flattens every chapter in order (Genesis 1 → Revelation 22), then divides by the number of days. 1,189 ÷ 80 = 14 remainder 69, so the first 69 days have 15 chapters and the last 11 have 14. Chapters are never split across days, and each appears exactly once. Change `START_DATE` / `END_DATE` to re-plan.

## How progress is stored
Completed day numbers are saved in the browser's `localStorage` (key `bible-to-christmas:v1`). Progress is measured in chapters, not days. Nothing leaves your device. Reset Progress clears it after confirmation.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit tests
npm run build    # production build in dist/
```

## Deploy to GitHub Pages
1. Push to a GitHub repo on the `main` branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml` (test → build → deploy).
