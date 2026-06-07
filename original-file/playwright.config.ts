import { defineConfig, devices } from "@playwright/test";

const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ??
  process.env.QA_BASE_URL ??
  "http://127.0.0.1:3000";
const shouldStartLocalServer =
  baseURL.startsWith("http://127.0.0.1") ||
  baseURL.startsWith("http://localhost");

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 60_000,
  use: {
    baseURL,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: shouldStartLocalServer
    ? {
        command: "npm run dev",
        reuseExistingServer: true,
        timeout: 120_000,
        url: baseURL,
      }
    : undefined,
});
