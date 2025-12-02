const { describe, test } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});
const listWithOneBlog = [
  {
    title: "Test Blog",
    author: "Tester",
    likes: 5,
  },
];

describe("total likes", () => {
  test("one blog → likes of that blog", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
  test("empty list → 0", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
});

describe("favorite blog", () => {
  const blogs = [
    { title: "A", likes: 2 },
    { title: "B", likes: 10 },
    { title: "C", likes: 5 },
  ];
  test("returns the blog with the most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[1]);
  });
});

describe("most blogs", () => {
  const blogs = [
    { author: "Alice", likes: 1 },
    { author: "Bob", likes: 2 },
    { author: "Alice", likes: 3 },
  ];
  test("returns author with most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: "Alice", blogs: 2 });
  });
});

describe("most likes", () => {
  const blogs = [
    { author: "Alice", likes: 5 },
    { author: "Bob", likes: 10 },
    { author: "Alice", likes: 3 },
  ];
  test("returns author with most total likes", () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Bob",
      likes: 10,
    });
  });
});
