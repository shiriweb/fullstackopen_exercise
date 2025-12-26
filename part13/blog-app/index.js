const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const readinglists = require("./controllers/readinglist");
const logoutRouter = require("./controllers/logout");
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/readinglists", readinglists);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ error: err.message });
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
