export const oauthProviders = [
  {
    id: "google",
    label: "Google",
    setupName: "Google Cloud OAuth client",
  },
] as const;

export type OAuthProviderId = (typeof oauthProviders)[number]["id"];

export function getOAuthProviderLabel(provider: string | null | undefined) {
  return (
    oauthProviders.find((item) => item.id === provider)?.label ??
    "third-party provider"
  );
}
