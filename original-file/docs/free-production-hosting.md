# Free Production Hosting Plan

Goal: keep the app online for demos without the Vercel root-directory problem.

## Best Free Option

Use a clean GitHub repository where the repository root is the Next.js app itself.

Right now the real app lives in:

```text
original-file/
```

The parent repo wrapper is what confused Vercel earlier. A clean repo avoids that.

## Simple Steps

1. Create a new GitHub repo, for example `AI-ACADEMY-LIVE`.
2. Copy the contents of `original-file/` into the root of that new repo.
3. Push that repo to GitHub.
4. Import the new repo into Vercel on the free Hobby plan.
5. Vercel should auto-detect Next.js because `package.json`, `app/`, and `next.config.ts` are now at the repo root.
6. Add these Vercel environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL=https://pemwiimosecgutoksfyi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_3FDkF5dt2DGn-uF1B3wmAw_SgmaQ79t
```

Do not add the old service role key. Rotate it in Supabase before using service-role access again.

## Free Service Stack

- Frontend and Next.js server: Vercel Hobby.
- Database and auth: Supabase Free.
- Source control: GitHub Free.
- Video hosting: YouTube unlisted or public videos.
- Analytics before paid launch: Vercel Analytics free tier or simple Supabase event table later.

## Why This Is Better Than Fighting Root Directory

- No special Vercel root-directory setting.
- No "framework not detected" deployment screen.
- Easier investor demos.
- Easier future handoff to other developers.
- Less chance that Vercel builds the wrapper folder instead of the app.

## Alternative

Keep the current repo and set Vercel Project Settings -> General -> Root Directory to:

```text
original-file
```

This works, but the clean repo is easier for a public launch.
