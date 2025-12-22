const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");

    await request.post("/api/users", {
      data: {
        name: "Test User",
        username: "testuser",
        password: "password123",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown when Togglable button clicked", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /log in/i }).click();

    const inputs = page.locator("input");
    await expect(inputs.nth(0)).toBeVisible();
    await expect(inputs.nth(1)).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "testuser", "password123");
      await expect(page.locator("text=Test User").first()).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      page.once("dialog", (dialog) => dialog.accept());

      await loginWith(page, "testuser", "wrong");
      await expect(page.locator("text=Test User").first()).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "testuser", "password123");
    });

    test("a blog can be created", async ({ page }) => {
      await createBlog(page, "Playwright Blog", "Tester", "http://example.com");
      await expect(
        page.locator(".blog").filter({ hasText: "Playwright Blog" }).first()
      ).toBeVisible();
    });

    test("only creator sees delete button", async ({ page, request }) => {
      await createBlog(page, "Private Blog", "Author", "url.com");

      await request.post("/api/users", {
        data: {
          name: "Other User",
          username: "other",
          password: "password123",
        },
      });

      await page.getByRole("button", { name: /logout/i }).click();
      await loginWith(page, "other", "password123");

      const blog = page
        .locator(".blog")
        .filter({ hasText: "Private Blog" })
        .first();
      await blog.getByRole("button", { name: /view/i }).click();

      await expect(
        blog.getByRole("button", { name: /remove/i })
      ).not.toBeVisible();
    });
    //   await createBlog(page, "Third Blog", "C", "3.com");

    //   const blogs = page.locator(".blog");

    //   // Like "Second Blog" twice
    //   const second = blogs.filter({ hasText: "Second Blog" }).first();
    //   await second.getByRole("button", { name: /view/i }).click();
    //   await second.getByRole("button", { name: /like/i }).click();
    //   await second.getByRole("button", { name: /like/i }).click();

    //   // Wait for DOM update
    //   await page.waitForTimeout(500);

    //   // The first blog in the list should now be "Second Blog"
    //   await expect(blogs.first()).toContainText("Second Blog");
    // });
  });
});
