const router = require("express").Router();
const { ReadingList, Blog, User } = require("../models");
const { tokenExtractor } = require("../util/middleware");

router.post("/", tokenExtractor, async (req, res) => {
  const { blogId, userId } = req.body;
  const entry = await ReadingList.create({ blogId, userId });
  res.json(entry);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const { read } = req.body;
  const entry = await ReadingList.findByPk(req.params.id);
  if (!entry) return res.status(404).end();

  if (entry.userId !== req.decodedToken.id)
    return res.status(401).json({ error: "unauthorized" });

  entry.read = read;
  await entry.save();
  res.json(entry);
});

module.exports = router;
