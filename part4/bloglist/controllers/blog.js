const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  const user = request.user;
  const body = request.body;

  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response
      .status(201)
      .json(await savedBlog.populate("user", { username: 1, name: 1 }));
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const user = request.user;
  const id = request.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return response.status(400).json({ error: "malformatted id" });
  }
  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).end();
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: "only the creator can delete the blog" });
    }

    await Blog.findByIdAndDelete(id);

    user.blogs = user.blogs.filter((b) => b.toString() !== id);
    await user.save();

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});


blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return response.status(400).json({ error: "malformatted id" });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes: body.likes },
      { new: true, runValidators: true, context: "query" }
    );

    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
