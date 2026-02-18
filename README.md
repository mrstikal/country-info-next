    # Country Info

A small but “enterprise-flavored” demo app built with **Next.js (App Router)** to showcase a practical **SOAP Web Service integration** in a modern React/Next stack.

**Data source (public WSDL):**  
http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL

> Disclaimer: This is a public demo SOAP service without an SLA. The app is intentionally built with caching and aggregation patterns to remain stable even when the upstream endpoint is slow or temporarily unavailable.

---

## Design (UI philosophy)

The UI is intentionally designed like a daily-work **workhorse**: calm, efficient, and optimized for scanning and getting things done.

- **Minimal, low-noise look** — no decorative elements that compete with the data.
- **Single blue accent** — adds a bit of character and improves orientation within the layout.
- **No distracting visuals** — no “hero” imagery or attention-grabbing UI flourishes.
- **Optimized for comfortable reading width** — the layout aims to sit within a natural eye-scan width.

---

## What this demo demonstrates

This project is intentionally focused on integration patterns you can reuse in real client projects:

- **Server-side SOAP adapter** (UI never talks SOAP directly)
- **SOAP envelope building + SOAPAction handling**
- **XML parsing and normalization** into UI-friendly objects
- **Timeout + retry** to handle transient network issues
- **Batch + controlled concurrency** for expensive operations
- **JSON API caching (ISR / `revalidate`)** for aggregated views
- Reusable UI building blocks:
    - `CountryOverview` (shared “country detail” view)
    - `CountryDialog` (native `<dialog>` overlay using the same detail view)

---

## Pages

- **Home**  
  Shows a country overview (tries to infer visitor country from proxy/CDN headers; falls back to a default ISO2 code in local/dev environments).

- **Countries**  
  Two searchable selects (Name + ISO2) that stay in sync. Selecting a country loads detailed info via `/api/country/[iso2]`.

- **Currencies**  
  Lists all currencies and the countries using them. Includes a text filter. Each country opens `CountryDialog` with full country info.

- **Capitals**  
  Lists capitals and their countries. Includes a text filter. Country opens `CountryDialog`.

- **Languages**  
  Aggregated view built from a batch SOAP response (all countries + languages). Text filter + country dialog.

- **Continents**  
  Continent view with country counts and country lists. Text filter + country dialog.

- **Report**  
  “Full export / report” page that summarizes totals and provides a few top lists. Includes an **Export JSON** link.

---

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- `fast-xml-parser` (XML → JS)
- `react-select` (searchable selects)

---

## Getting started

### Install dependencies

    npm i

### Run in development

    npm run dev

Open: http://localhost:3000

---

## Project structure (high level)

- `src/lib/soap-adapter/`
    - `index.ts`  
      Generic SOAP client: envelope, fetch, XML parsing, SOAP faults, timeout, retry, and `soapRequestAndPick`.
    - `integrations/*`  
      Service-specific “use cases” (countries, currencies, continents, languages, etc.). These modules translate SOAP responses into typed, UI-friendly data.

- `src/app/api/*`  
  JSON endpoints used as a caching layer (ISR). Heavy/aggregated pages fetch data from these endpoints rather than re-running all SOAP calls on every request.

- `src/components/`
    - `CountryOverview`  
      Shared country detail UI (name, capital, currency, languages, continent, flag).
    - `CountryDialog`  
      Native `<dialog>` overlay that lazy-loads full country info from `/api/country/[iso2]`.

---

## SOAP integration approach

### 1) Server-only adapter
SOAP calls are executed server-side only. This keeps the client bundle clean and avoids exposing SOAP details in the browser.

### 2) Normalized data contracts
SOAP responses are mapped into small, predictable TypeScript shapes. UI components never depend on SOAP XML structure directly.

### 3) Resilience basics
The adapter includes:
- **Timeout** (AbortController)
- **Retry** (for transient network / gateway errors)
- **Fault handling** (SOAP Fault → typed error)

---

## Caching strategy (important for demo stability)

### “Simple” SOAP calls
Most integration functions use `force-cache` + `revalidate` to keep the demo snappy.

### Aggregated pages (Currencies / Capitals / Languages / Continents / Report)
These pages use **JSON API cache**:
- Route handlers export `revalidate = ...` (e.g., 1 day / 1 week)
- Pages fetch from `/api/...` with `cache: "force-cache"`

This yields:
- fast repeat loads
- fewer upstream SOAP calls
- stable demo UX when the public SOAP service is flaky

---

## Images (flags)
Country flags are loaded via `next/image`. Remote image domains are allowed in `next.config.ts`.

---

## “Pseudo responsiveness” (by design)
The layout is intentionally “pseudo responsive”:
- If the viewport is narrower than the main content width (`max-w-5xl`), the app shows a **horizontal scrollbar** rather than aggressively reflowing dense tables.

This keeps tabular data readable for an integration demo.

---

## Troubleshooting

### Some fields may be empty
The upstream public SOAP service can return incomplete data for certain elements. The UI handles this gracefully and shows `—`.

### Country detection in local development
In local dev, geo headers (e.g., from a CDN/proxy) are usually missing. The Home page uses a fallback ISO2 code so the demo still works locally.

---

## License / disclaimer
License: MIT
This repository is a demo of SOAP integration patterns. The external SOAP endpoint is a public sample service and may change or become unavailable.