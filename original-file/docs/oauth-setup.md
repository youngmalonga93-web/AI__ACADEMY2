# Third-Party Login Setup

Google signup requires both app code and Supabase provider settings. The launch
app renders Google because it is familiar for most learners. GitHub can be added
later after the Supabase provider is enabled and tested.

## Supabase settings

In Supabase, open the AI Academy project and configure:

1. Authentication > URL Configuration
2. Site URL:
   - Local: `http://127.0.0.1:3001`
   - Production: your public Vercel domain
3. Redirect URLs:
   - `http://127.0.0.1:3001/auth/client-callback`
   - `http://127.0.0.1:3001/auth/callback`
   - `http://localhost:3001/auth/client-callback`
   - `http://localhost:3001/auth/callback`
   - `http://localhost:3000/auth/client-callback`
   - `http://localhost:3000/auth/callback`
   - `https://YOUR-PRODUCTION-DOMAIN/auth/client-callback`
   - `https://YOUR-PRODUCTION-DOMAIN/auth/callback`

Then enable providers:

1. Authentication > Providers > Google.
2. Add Google Client ID and Client Secret.
3. Keep email/password enabled as the fallback signup path.

## Provider callback URLs

Use the Supabase callback URL inside Google Cloud Console:

`https://pemwiimosecgutoksfyi.supabase.co/auth/v1/callback`

Do not use the app's `/auth/callback` URL inside Google. Google should return
to Supabase first. Supabase then redirects users back to AI Academy through
`/auth/client-callback`.

## App-side flow

AI Academy starts social login through server routes:

- `/auth/start/google`

Those routes ask Supabase to create the provider authorization URL. After the
provider finishes, Supabase sends the browser to `/auth/client-callback`, which
can show helpful errors and forward valid codes to `/auth/callback` for the
server-side session exchange.

## Vercel environment variables

Production needs:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://pemwiimosecgutoksfyi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_3FDkF5dt2DGn-uF1B3wmAw_SgmaQ79t
NEXT_PUBLIC_APP_URL=https://YOUR-PRODUCTION-DOMAIN
```

Do not commit provider secrets or service role keys.

## Future providers

Supabase also supports providers such as Apple, Azure/Microsoft, GitLab,
Discord, LinkedIn, Slack, Twitter/X, WorkOS, and Zoom. Do not add buttons for
them until the matching provider is enabled in Supabase and the provider app has
approved redirect URLs. For launch, Google plus email gives the cleanest
coverage without overwhelming users.
