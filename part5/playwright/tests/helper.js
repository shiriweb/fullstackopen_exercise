const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: /log in/i }).click();

  const inputs = page.locator("input");
  await inputs.nth(0).fill(username);
  await inputs.nth(1).fill(password);
  await page.getByRole("button", { name: /login/i }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: /create new blog/i }).click();

  const inputs = page.locator("input");
  await inputs.nth(0).fill(title);
  await inputs.nth(1).fill(author);
  await inputs.nth(2).fill(url);
  await page.getByRole("button", { name: /create/i }).click();
};

module.exports = { loginWith, createBlog };
