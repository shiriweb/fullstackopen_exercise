const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET } = require("../utils/config");

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: "token missing" });
  }

  try {
    const decodedToken = jwt.verify(request.token, SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(401).json({ error: "user not found" });
    }

    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userExtractor;
