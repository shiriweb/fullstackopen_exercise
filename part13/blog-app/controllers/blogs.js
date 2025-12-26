const router = require("express").Router();
const { Blog, User } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

// Middleware to extract token
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: { model: User, attributes: ["name"] },
      order: [["likes", "DESC"]],
    });
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create blog (only logged-in user)
router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    if (!user) return res.status(401).json({ error: "user not found" });

    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
    });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update likes
router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).end();
    blog.likes = req.body.likes;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
