require("dotenv").config(); // load .env first
const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;


mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting:", err.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
