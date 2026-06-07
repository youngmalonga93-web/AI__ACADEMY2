import {
  expect,
  test,
  type APIRequestContext,
  type Page,
} from "@playwright/test";

const seedRoutes = [
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

function shouldCheckHref(href: string) {
  return (
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.startsWith("/auth/logout")
  );
}

async function collectInternalLinks(page: Page) {
  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href") ?? "").filter(Boolean)
    );

  return hrefs
    .filter(shouldCheckHref)
    .map((href) => href.split("#")[0])
    .filter(Boolean);
}

async function assertRouteHealthy(request: APIRequestContext, route: string) {
  const response = await request.get(route, { maxRedirects: 0 });

  expect(
    response.status(),
    `${route} returned ${response.status()}`
  ).toBeLessThan(400);
}

test.describe("launch navigation QA", () => {
  test("key pages load without server errors", async ({ request }) => {
    for (const route of seedRoutes) {
      await assertRouteHealthy(request, route);
    }
  });

  test("visible internal links from key pages are healthy", async ({
    page,
    request,
  }) => {
    const links = new Set<string>();

    for (const route of seedRoutes) {
      await page.goto(route);
      for (const href of await collectInternalLinks(page)) {
        links.add(href);
      }
    }

    for (const href of links) {
      await assertRouteHealthy(request, href);
    }
  });
});
