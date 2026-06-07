import { expect, test } from "@playwright/test";

const testEmail = process.env.E2E_TEST_EMAIL;
const testPassword = process.env.E2E_TEST_PASSWORD;

test.describe("authentication launch QA", () => {
  test("login and signup pages are usable", async ({ page }) => {
    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: /log in to ai academy/i })
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /continue with google/i })
    ).toBeVisible();

    await page.goto("/signup");
    await expect(
      page.getByRole("heading", { name: /create your ai academy account/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /start 7-day trial/i })
    ).toBeVisible();
  });

  test("protected routes send guests to login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);

    await page.goto("/coach");
    await expect(page).toHaveURL(/\/login\?next=%2Fcoach/);
  });

  test("Google auth starts with a safe redirect", async ({ request }) => {
    const response = await request.get(
      "/auth/start/google?mode=login&next=%2Fdashboard",
      { maxRedirects: 0 }
    );

    expect([302, 303, 307, 308]).toContain(response.status());
    const location = response.headers().location ?? "";
    expect(location).toContain("supabase.co/auth/v1/authorize");
    expect(location).toContain("provider=google");
  });

  test("password reset request gives a safe response", async ({ request }) => {
    test.skip(!testEmail, "Set E2E_TEST_EMAIL to test password reset.");

    const response = await request.post("/api/auth/password-reset", {
      data: { email: testEmail, next: "/dashboard" },
    });
    const payload = (await response.json()) as { message?: string };

    expect(response.ok()).toBeTruthy();
    expect(payload.message).toContain("If an account exists");
  });

  test("email login reaches the dashboard", async ({ page }) => {
    const email = testEmail;
    const password = testPassword;

    if (!email || !password) {
      test.skip(
        true,
        "Set E2E_TEST_EMAIL and E2E_TEST_PASSWORD to test email login."
      );
      return;
    }

    await page.goto("/login");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: /^log in$/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(
      page.getByRole("heading", { name: /^dashboard$/i })
    ).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
  });
});
