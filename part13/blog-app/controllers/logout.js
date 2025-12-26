const { Session } = require("../models");
const { tokenExtractor } = require("../util/middleware");
const router = require("./readinglist");

router.delete("/", tokenExtractor, async (req, res) => {
  const token = req.get("authorization").substring(7);
  await Session.destroy({ where: { token } });
  res.status(204).end();
});

module.exports = router;
