# Tech Context

## Technology Stack (Proposed)

### Frontend
- **Framework**: **Next.js 14+** (App Router).
  - *Reasoning*: Best-in-class performance, easy API route integration (serverless backend), and great SEO.
- **Language**: **TypeScript**.
  - *Reasoning*: Type safety prevents many data-related bugs, especially when dealing with order objects.
- **Styling**: **Tailwind CSS**.
  - *Reasoning*: Rapid development, utility-first, ensures responsiveness (mobile-first is critical for BD market).
- **State Management**: **Zustand** or **React Context**.
  - *Reasoning*: Lightweight solution for managing Cart state globally.

### Backend / Serverless
- **Runtime**: **Node.js** (via Next.js API Routes).
- **API**: REST endpoints (e.g., `/api/submit-order`).
- **Database (As Requested)**: **Google Sheets**.
  - *Library*: `googleapis` (npm).
  - *Auth*: Google Service Account (JSON key).

### Services
- **Hosting**: **Vercel** (recommended) or Netlify.
  - *Reasoning*: Zero-config deployment for Next.js.
- **Google Cloud Platform**: Required for enabling Sheets API and getting credentials.

## Architecture Patterns
- **Monorepo-style**: Direct directory structure within Next.js (`/app`, `/components`, `/lib`).
- **Facade Pattern**: `lib/googleSheets.ts` will act as an abstraction layer. The app doesn't need to know *how* `googleapis` works, just that it can `appendOrder()`.

## Development Environment
- **OS**: Windows (User's environment).
- **Package Manager**: `npm` or `yarn`.
- **Formatting**: Prettier + ESLint.
