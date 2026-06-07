# Launch QA

Use Playwright for fast browser checks before inviting testers.

## Commands

Run the full launch QA suite against a running local or production site:

```bash
npm run qa:launch
```

Run only auth checks:

```bash
npm run qa:auth
```

Run only link checks:

```bash
npm run qa:links
```

Run against production:

```bash
PLAYWRIGHT_BASE_URL=https://ai-academy-h8r2.vercel.app npm run qa:launch
```

On Windows PowerShell:

```powershell
$env:PLAYWRIGHT_BASE_URL="https://ai-academy-h8r2.vercel.app"; npm.cmd run qa:launch
```

## Email Login Test Account

The email-login test is skipped until these variables exist:

```bash
E2E_TEST_EMAIL=tester@example.com
E2E_TEST_PASSWORD=replace-with-test-password
```

PowerShell example:

```powershell
$env:E2E_TEST_EMAIL="tester@example.com"
$env:E2E_TEST_PASSWORD="replace-with-test-password"
$env:PLAYWRIGHT_BASE_URL="https://ai-academy-h8r2.vercel.app"
npm.cmd run qa:launch
```

Keep this account non-admin and safe for automated testing.
