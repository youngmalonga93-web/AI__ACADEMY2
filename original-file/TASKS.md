# Tasks

## Next 20 Implementation Tasks

1. [x] Create a Next.js 15 application scaffold with TypeScript, App Router, Tailwind CSS, ESLint, Prettier, and Vitest.
2. [x] Add shadcn/ui configuration and install baseline UI components for buttons, cards, inputs, tabs, dialogs, badges, and navigation.
3. [x] Move the existing prototype into a temporary `legacy-prototype` route so the current experience remains viewable during migration.
4. [x] Extract course, module, lesson, project, certification, career, prompt, and tool data from `ai-platform new.jsx` into typed modules under `data/`.
5. [x] Remove duplicate prototype constants and make extracted data compile cleanly under TypeScript.
6. [x] Define shared TypeScript domain types for courses, modules, lessons, prompts, projects, certifications, tools, careers, users, progress, and subscriptions.
7. [x] Build the production app shell with authenticated app layout, primary navigation, responsive sidebar, top bar, and empty route states.
8. [x] Implement a course catalog route using extracted course/module data with phase filters and search.
9. [x] Implement a course detail route with module overview, objectives, lessons, tools, projects, key takeaways, and common mistakes.
10. [x] Implement a lesson player route with lesson metadata, concept, application, exercise, completion action, and next/previous navigation.
11. [x] Implement the prompt vault route with category, tier, tool, tag, and text search filters.
12. [x] Add prompt detail and copy interactions with accessible feedback and browser clipboard fallback handling.
13. [x] Add Supabase client/server helpers, environment variable validation, and local development configuration.
14. [x] Create Supabase migrations for profiles, courses, modules, lessons, projects, prompts, tools, certifications, and user progress.
15. [x] Add seed scripts that load extracted curriculum and prompt data into Supabase.
16. [x] Implement Supabase authentication for signup, login, logout, OAuth callback handling, and protected app routes.
17. [x] Implement profile creation on first login with role support for learner, mentor, and admin users.
18. [x] Implement lesson progress tracking with completion state, percent complete, and dashboard summaries.
19. [x] Add unit tests for extracted content utilities, filters, route helpers, and progress calculations.
20. [x] Add CI checks for type-checking, linting, tests, and production build.

## Backlog

- [x] Use Supabase as the runtime content source with local JSON fallback.
- [x] Upgrade dashboard progress with next lesson, module summaries, and recent completions.
- [x] Upgrade course detail pages with live content and completion badges.
- [x] Add course catalog search and filters for phase, difficulty, and tool.
- [x] Complete all modules to gold-standard lesson depth before Stripe.
- [x] Add lesson quizzes, rubrics, downloadable worksheets, and video placeholders.
- [x] Expand prompt vault to 100+ practical, career/business-ready prompts.
- [x] Add site-wide production QA pass for all links, empty states, and auth flows.
- [x] Add 7-day trial messaging, free prompt access, and Stripe-ready pricing plan.
- [x] Link lessons to approved third-party teaching resources with attribution.
- [x] Document free production hosting path that avoids the Vercel root-directory issue.
- [x] Add production hardening pass for security headers, safe redirects, error fallbacks, formatting, health checks, and chunk stability verification.
- [x] Add investor demo metrics and admin snapshot page.
- [x] Stripe Checkout integration.
- [x] Stripe Customer Portal integration.
- [x] Stripe webhook subscription sync.
- [x] Entitlement checks for premium courses and certifications.
- [x] Add module animation visuals and video-coming-soon plates from supplied SVG pack.
- [x] Curate high-value training prompts from supplied workbook into the prompt vault.
- [x] Remove the investor-only page from the production navigation and QA path.
- [x] Add production runbook and smoother local/live server scripts.
- [x] Remove stale demo CTAs, hide disabled GitHub login, and re-run launch navigation QA before Stripe.
- [x] AI Coach API using OpenAI and Anthropic adapters.
- [x] RAG retrieval over course, lesson, project, and prompt content.
- [x] AI Project Reviewer.
- [x] AI Career Advisor.
- [ ] Certification exams.
- [ ] Certificate PDF generation.
- [ ] Community posts and comments.
- [ ] Project showcase gallery.
- [ ] Admin content management.
- [ ] Admin analytics dashboard.
- [ ] Production deployment to Vercel.
