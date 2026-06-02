# AI Academy Architecture

## Current State

AI Academy currently exists as a single React prototype in `ai-platform new.jsx`. The prototype is a self-contained curriculum browser with embedded data, inline styling, and local React state. It presents the core product surface for courses, modules, lessons, prompt templates, projects, tool coverage, certifications, and career paths.

The repository does not yet contain the planned production application structure. There is no Next.js app, package manifest, TypeScript configuration, Tailwind setup, Supabase schema, automated test suite, or deployment configuration in the writable project folder.

## Target Platform

The production platform should be a Next.js 15 SaaS application backed by Supabase, with paid access through Stripe and AI features powered by OpenAI and Anthropic.

Planned layers:

- Frontend: Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui.
- Backend: Supabase Auth, Postgres, Row Level Security, Storage, and Edge Functions where appropriate.
- AI: OpenAI and Anthropic adapters behind application service APIs.
- Billing: Stripe Checkout, Customer Portal, subscriptions, and webhooks.
- Deployment: Vercel for the web app, Supabase for database/auth/storage, Stripe for billing.

## Application Domains

### Learning

The learning domain owns courses, modules, lessons, quizzes, projects, certifications, and learner progress. Content should be extracted from the prototype into typed seed data first, then migrated into Supabase tables.

Core entities:

- `courses`
- `modules`
- `lessons`
- `lesson_objectives`
- `lesson_exercises`
- `projects`
- `quizzes`
- `quiz_questions`
- `certifications`
- `certificate_awards`
- `user_progress`

### Prompt Vault

The prompt vault owns reusable prompt templates, categories, tags, tool compatibility, favorites, and search. The current prototype already contains useful prompt data, but it should be normalized into typed records and searchable in the app.

Core entities:

- `prompt_templates`
- `prompt_categories`
- `prompt_tags`
- `prompt_template_tags`
- `prompt_tools`
- `prompt_favorites`

### AI Assistance

AI assistance should be implemented as server-side features so API keys and model routing stay private. The first production AI features should be AI Coach, AI Tutor, Project Reviewer, and Career Advisor.

Recommended shape:

- Provider adapters for OpenAI and Anthropic.
- Shared prompt and safety policy helpers.
- RAG retrieval over course, lesson, prompt, and project content.
- Conversation persistence tied to authenticated users.
- Usage logging for cost control and abuse detection.

### Community

The community domain should support posts, comments, project showcases, mentorship, and moderation. Community should depend on authentication and profile data before it is exposed.

Core entities:

- `profiles`
- `posts`
- `comments`
- `showcases`
- `mentorship_requests`
- `moderation_events`

### Commerce

Stripe should gate premium courses, certifications, AI usage, and enterprise features. Subscription state should be synchronized from Stripe webhooks into Supabase and used by server-side authorization checks.

Core entities:

- `plans`
- `subscriptions`
- `stripe_customers`
- `invoices`
- `entitlements`

### Admin

The admin domain should provide secure management for users, course content, analytics, billing status, project review queues, and moderation. Admin access must be role-gated in Supabase and checked again in server code.

## Proposed Next.js Structure

```text
app/
  (marketing)/
  (app)/
    dashboard/
    courses/
    prompts/
    projects/
    certifications/
    community/
    admin/
  api/
    ai/
    stripe/
components/
  ui/
  learning/
  prompts/
  billing/
  admin/
lib/
  ai/
  auth/
  billing/
  content/
  supabase/
  validation/
data/
  courses/
  prompts/
supabase/
  migrations/
  seed/
tests/
```

## Migration Strategy

1. Extract the embedded prototype data into typed content modules.
2. Scaffold the Next.js 15 app with TypeScript, Tailwind, shadcn/ui, linting, testing, and build scripts.
3. Rebuild the prototype's main navigation as production routes.
4. Move course and prompt data into reusable TypeScript modules.
5. Add Supabase schema and seed scripts for extracted content.
6. Add authentication and profile creation.
7. Build the course catalog, lesson player, and progress tracking.
8. Build the prompt vault with filters, search, and favorites.
9. Add billing gates and Stripe subscription sync.
10. Add AI assistance features through server-side APIs.

## Important Risks

- The prototype file has duplicate top-level constants for `TOOL_MAP` and `PCATS`, which will fail in a normal JavaScript/TypeScript module build until cleaned up.
- Much of the current product data is embedded directly in UI code, making testing, reuse, search, and database seeding difficult.
- Inline styling and single-file component structure will not scale to the target SaaS surface.
- The repository does not yet have automated checks, so current Definition of Done requirements cannot be satisfied until the application scaffold exists.
- AI and billing features must be implemented server-side to protect secrets and enforce entitlement checks.

## Initial Production Milestone

The first milestone should produce a working Next.js application that can:

- Build, lint, type-check, and test successfully.
- Display extracted course, prompt, certification, career, and tool data.
- Provide a production-ready route structure.
- Support Supabase migrations and seed scripts.
- Establish the foundation for authentication, progress tracking, Stripe, and AI features.
