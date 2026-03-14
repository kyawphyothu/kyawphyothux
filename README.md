# Kyaw Phyo Thu — Portfolio

Personal portfolio site built with Next.js 15, React 19, TypeScript, and [next-intl](https://next-intl-docs.vercel.app/) for internationalization (English, Japanese, Burmese).

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Install and run

```bash
# Install dependencies
npm install

# Copy environment variables (optional, for contact form)
cp .env.example .env
# Edit .env and add your values (see Environment variables below)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app will use the default locale (see `i18n/routing.ts`).

### Build and start (production)

```bash
npm run build
npm start
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GMAIL_USER` | For contact form | Gmail address used to send contact form emails |
| `GMAIL_APP_PASSWORD` | For contact form | [Gmail App Password](https://myaccount.google.com/apppasswords) (not your normal password) |
| `GMAIL_USER_RECEIVER` | For contact form | Address where contact form submissions are sent |

Copy `.env.example` to `.env` and fill in the values. If these are not set, the contact form API returns 503 and the form shows an error.

## Project structure

- `app/[locale]/` — Locale-specific pages (home, about, projects, contact)
- `app/api/contact/` — Contact form API (rate-limited, env-validated)
- `components/` — UI components and navigation
- `messages/` — Translation JSON files (`en.json`, `ja.json`, `my.json`)
- `i18n/` — next-intl routing and request config

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode (Vitest) |
| `npm run test:run` | Run tests once (CI) |

## Testing

Tests use [Vitest](https://vitest.dev/) and focus on the highest-value logic:

- **API route tests** (`app/api/contact/route.test.ts`) — Contact form API: validation (required fields, email format, max length), honeypot and timing bot checks, rate limiting, missing-env (503), successful send with mocked nodemailer, and HTML escaping (XSS).

To add more coverage later:

- **Unit tests** — Pure helpers (e.g. if you extract validation or `escapeHtml` into `lib/`) and `lib/utils.ts` if it gains logic.
- **Component tests** — Contact form with React Testing Library and mocked `fetch` (submit, error display).
- **E2E tests** — Optional: [Playwright](https://playwright.dev/) for smoke tests (load home, navigate to contact, maybe submit with a test address).

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl](https://next-intl-docs.vercel.app/)
