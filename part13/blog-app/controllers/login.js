const router = require("express").Router();

const jwt = require("jsonwebtoken");
const { User, Session } = require("../models");
const { SECRET } = require("../util/config");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  const passwordCorrect = password === "secret"; 

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  if (user.disabled) {
    return res
      .status(401)
      .json({ error: "account disabled, please contact admin" });
  }

  const tokenPayload = { id: user.id, username: user.username };
  const token = jwt.sign(tokenPayload, SECRET);


  await Session.create({ token, userId: user.id });

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = router;
