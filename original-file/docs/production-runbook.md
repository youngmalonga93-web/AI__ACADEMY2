# Production Runbook

AI Academy is moving from investor-demo mode to full production readiness. Stripe
configuration is the remaining launch blocker for paid access.

## Recommended Live Setup

Use Vercel for the Next.js app and Supabase for authentication, database, and
session storage. This keeps the site live without needing a computer or local
root folder running all day.

## Day-to-Day Local Commands

- `npm run dev:local` starts the development server on `http://127.0.0.1:3001`.
- `npm run preview:prod` builds and starts a production preview on port `3001`.
- `npm run ci` runs formatting, type checks, import validation, tests, lint, and
  a production build.
- `npm run deploy:prod` deploys the linked Vercel project to production.

## Production Environment Variables

Set these in Vercel Project Settings, not in committed files:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_PRO_MONTHLY`
- `STRIPE_PRICE_TEAM_MONTHLY`
- `STRIPE_PRICE_PRO_YEARLY`
- `STRIPE_PRICE_TEAM_YEARLY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Launch Checklist

1. Confirm Google and GitHub OAuth redirect URLs in Supabase include the Vercel
   production URL and local development URL.
2. Add Stripe products, prices, and webhook signing secret.
3. Run `npm run ci`.
4. Run `npm run deploy:prod`.
5. Open `/api/health`, `/courses`, `/prompts`, `/pricing`, `/login`, and
   `/signup` on the production URL.
6. Test email signup, Google signup, GitHub signup, trial messaging, free prompt
   access, premium module gates, and billing buttons.

## Animation Plan

The SVG animation pack is useful for course cards, module hero sections, and
video placeholders. Keep it as lightweight visual polish while original video
lessons are produced. For final video tutorials, use the image-generation
prompts in `docs/video-image-prompts.md`, animate them in short scenes, and add
the finished hosted videos later.
