const express = require("express");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const { MONGODB_URI, PORT } = require("./utils/config");

const app = express();

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error.message));

app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
