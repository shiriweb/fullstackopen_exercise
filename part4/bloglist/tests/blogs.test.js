const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");

let testUser, token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  testUser = await helper.getTestUser();
  token = helper.getTokenForUser(testUser);

  const blogsWithUser = helper.initialBlogs.map(b => ({ ...b, user: testUser._id }));
  await Blog.insertMany(blogsWithUser);
});

describe("Blog API tests (with auth)", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Async/Await Blog",
      author: "Author Three",
      url: "http://async.blog",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  });

  test("missing likes defaults to 0", async () => {
    const newBlog = {
      title: "No Likes Blog",
      author: "Author Four",
      url: "http://nolikes.blog"
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

    assert.strictEqual(response.body.likes, 0);
  });

  test("missing title or url returns 400", async () => {
    const newBlog = { author: "No URL" };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe("Deletion tests", () => {
  test("succeeds with status code 204 if id is valid and user is creator", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(b => b.title);
    assert(!titles.includes(blogToDelete.title));
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  });

  test("fails with 401 if user is not the creator", async () => {
    const otherUser = new User({ username: "other", passwordHash: await require('bcrypt').hash("pass",10), name: "Other" });
    await otherUser.save();
    const otherToken = helper.getTokenForUser(otherUser);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });
});

describe("Update tests", () => {
  test("succeeds updating likes", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedData = { likes: blogToUpdate.likes + 1 };

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200);

    assert.strictEqual(result.body.likes, blogToUpdate.likes + 1);
  });

  test("returns 404 when updating non-existing id", async () => {
    const nonExisting = await helper.nonExistingId(); // implement helper to create a valid but nonexisting id
    await api.put(`/api/blogs/${nonExisting}`).send({ likes: 1 }).expect(404);
  });

  test("returns 400 when id is invalid", async () => {
    const invalidId = "1234invalidid";
    await api.put(`/api/blogs/${invalidId}`).send({ likes: 1 }).expect(400);
  });
});

after(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
});
