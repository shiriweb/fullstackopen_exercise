const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blog");

const app = express();

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info("Connected to MongoDB"))
  .catch(err => logger.error(err));

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
