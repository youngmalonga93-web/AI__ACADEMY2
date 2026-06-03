# OAuth Setup

Google and GitHub signup require both app code and Supabase provider settings.

## Supabase settings

In Supabase, open the AI Academy project and configure:

1. Authentication > URL Configuration
2. Site URL:
   - Local: `http://127.0.0.1:3001`
   - Production: your public Vercel domain
3. Redirect URLs:
   - `http://127.0.0.1:3001/auth/callback`
   - `http://localhost:3000/auth/callback`
   - `https://YOUR-PRODUCTION-DOMAIN/auth/callback`

Then enable providers:

1. Authentication > Providers > Google
2. Add Google Client ID and Client Secret
3. Authentication > Providers > GitHub
4. Add GitHub Client ID and Client Secret

## Provider callback URLs

Use the Supabase callback URL inside Google Cloud Console and GitHub OAuth App:

`https://pemwiimosecgutoksfyi.supabase.co/auth/v1/callback`

## Vercel environment variables

Production needs:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://pemwiimosecgutoksfyi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_3FDkF5dt2DGn-uF1B3wmAw_SgmaQ79t
NEXT_PUBLIC_APP_URL=https://YOUR-PRODUCTION-DOMAIN
```

Do not commit provider secrets or service role keys.
