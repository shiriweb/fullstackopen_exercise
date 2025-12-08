const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    likes: 2,
  },
];

test("dummy returns one", () => {
  assert.strictEqual(listHelper.dummy([]), 1);
});

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test("of one blog equals likes", () => {
    assert.strictEqual(listHelper.totalLikes([blogs[0]]), 7);
  });

  test("of many blogs is calculated right", () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36);
  });
});

describe("favoriteBlog", () => {
  test("returns blog with most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("mostBlogs", () => {
  test("returns author with most blog posts", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("mostLikes", () => {
  test("returns author with highest total likes", () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
