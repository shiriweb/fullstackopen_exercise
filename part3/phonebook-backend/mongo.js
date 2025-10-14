require("dotenv").config(); // load .env first
const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting:", err.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
