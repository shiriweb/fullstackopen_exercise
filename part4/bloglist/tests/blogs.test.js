const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");
const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("Blog API tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("unique identifier is named id", async () => {
    const response = await api.get("/api/blogs");
    assert.ok(response.body[0].id);
  });

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Async/Await Blog",
      author: "Author Three",
      url: "http://async.blog",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  });

  test("missing likes defaults to 0", async () => {
    const newBlog = {
      title: "Blog without likes",
      author: "Author Four",
      url: "http://nolikes.blog",
    };

    const response = await api.post("/api/blogs").send(newBlog);
    assert.strictEqual(response.body.likes, 0);
  });

  test("missing title or url returns 400", async () => {
    const newBlog = { author: "No URL" };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

describe('updating a blog', () => {
  test('succeeds in updating likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedData = { likes: blogToUpdate.likes + 1 }

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, blogToUpdate.likes + 1)
  })
})


after(async () => {
  await Blog.deleteMany({});
});
