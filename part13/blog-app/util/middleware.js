const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { Session, User } = require("../models");

const tokenExtractor = async (req, res, next) => {
  const auth = req.get("authorization");
  if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "token missing" });
  }

  const token = auth.substring(7);

  try {
    const decoded = jwt.verify(token, SECRET);
    req.decodedToken = decoded;

    const session = await Session.findOne({ where: { token } });
    if (!session) {
      return res.status(401).json({ error: "token invalid or logged out" });
    }

    const user = await User.findByPk(decoded.id);
    if (!user || user.disabled) {
      return res.status(401).json({ error: "account disabled" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "token invalid" });
  }
};

module.exports = { tokenExtractor };
