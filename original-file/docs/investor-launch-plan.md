# Investor Launch Plan

## Demo Goal

Show AI Academy as a working SaaS learning platform, not a concept. The investor demo should prove four things:

- Learners can sign up, log in, and track progress.
- The curriculum has enough depth to become a serious AI education product.
- The product can monetize through subscriptions, credentials, and team training.
- The technical foundation is ready for video, AI coaching, and scale.

## Demo Script

1. Open the homepage and explain the thesis: practical AI training for operators, builders, and founders.
2. Open Module 1 and show the gold-standard course experience.
3. Open a lesson and show deep notes, workflow, practice lab, worksheet, video plan, and progress.
4. Open the prompt vault and copy a prompt.
5. Open the dashboard and show progress tracking.
6. Open careers and certifications to connect learning to outcomes.

## What The Owner Must Do

1. Rotate the Supabase service role key before any public demo.
2. Create a Vercel account or give deployment access.
3. Add production environment variables in Vercel.
4. Buy or choose the domain.
5. Create Stripe test and live accounts before paid launch.
6. Prepare a demo learner account for investors.

## What Codex Can Build Next

1. Polish Module 1 visuals and add downloadable worksheets.
2. Add lesson video placeholders and Supabase video fields.
3. Add Stripe checkout and customer portal.
4. Add premium/free course gates.
5. Add AI Coach with rate limiting and retrieval over lessons.
6. Add admin analytics and content management.
7. Deploy to Vercel and verify production.

## Performance Plan

- Host the app on Vercel.
- Keep public curriculum pages server-rendered with selective caching.
- Store video on Mux or Cloudflare Stream.
- Lazy-load video players and heavy client components.
- Keep prompt vault and course filters client-side only where needed.
- Use Sentry and Vercel analytics to find slow routes.

## Security Plan

- Rotate exposed Supabase keys.
- Never expose service role keys to browser code.
- Keep Supabase Row Level Security enabled.
- Add role checks for admin pages.
- Verify Stripe webhook signatures.
- Rate-limit AI Coach and expensive API routes.
- Keep production secrets only in Vercel environment variables.

## Reliability Plan

- Use GitHub checks for typecheck, lint, tests, import validation, and build.
- Run database migrations intentionally, not manually during demos.
- Enable Supabase backups.
- Add Sentry for runtime errors.
- Add uptime monitoring for the production URL.
- Keep a seed script for demo data.
