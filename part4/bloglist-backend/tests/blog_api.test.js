const assert = require("node:assert");
const { test, beforeEach, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const { SECRET } = require("../utils/config");

const api = supertest(app);

let token = null;

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const passwordHash = await bcrypt.hash("password123", 10);
  const user = new User({
    username: "testuser",
    name: "Test User",
    passwordHash,
  });
  await user.save();

  const userForToken = { username: user.username, id: user._id };
  token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 });

  const blog = new Blog({
    title: "First Blog",
    author: "Author1",
    url: "http://example.com",
    likes: 5,
    user: user._id,
  });
  await blog.save();
});

test("blogs are returned as JSON", async () => {
  const response = await api.get("/api/blogs");
  assert.equal(response.status, 200);
  assert.ok(response.headers["content-type"].includes("application/json"));
});

test("a valid blog can be added with token", async () => {
  const newBlog = {
    title: "New Blog",
    author: "Author2",
    url: "http://newblog.com",
    likes: 2,
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog);

  assert.equal(response.status, 201);

  const blogsAtEnd = await Blog.find({});
  assert.equal(blogsAtEnd.length, 2);
  const titles = blogsAtEnd.map((b) => b.title);
  assert.ok(titles.includes("New Blog"));
});

test("adding a blog fails without token", async () => {
  const newBlog = {
    title: "Fail Blog",
    author: "Author3",
    url: "http://fail.com",
  };

  const response = await api.post("/api/blogs").send(newBlog);
  assert.equal(response.status, 401);

  const blogsAtEnd = await Blog.find({});
  assert.equal(blogsAtEnd.length, 1);
});

after(async () => {
  await mongoose.connection.close();
});
