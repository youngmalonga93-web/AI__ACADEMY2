const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";

const routes = [
  "/api/health",
  "/auth/client-callback",
  "/",
  "/courses",
  "/courses/1",
  "/lessons/what-ai-really-is",
  "/lessons/anatomy-perfect-prompt",
  "/prompts",
  "/pricing",
  "/careers",
  "/certifications",
  "/login",
  "/signup",
];

const failures = [];

for (const route of routes) {
  const url = new URL(route, baseUrl);

  try {
    const response = await fetch(url, { redirect: "manual" });

    if (response.status < 200 || response.status >= 400) {
      failures.push(`${route} returned ${response.status}`);
    } else {
      console.log(`${response.status} ${route}`);
    }
  } catch (error) {
    failures.push(
      `${route} failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

if (failures.length > 0) {
  console.error("Site QA failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Site QA passed for ${baseUrl}`);
