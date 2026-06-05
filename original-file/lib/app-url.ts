export function getConfiguredAppUrl(fallback: string) {
  const configuredUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!configuredUrl) {
    return fallback;
  }

  const candidate = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;

  try {
    return new URL(candidate).origin;
  } catch {
    return fallback;
  }
}
