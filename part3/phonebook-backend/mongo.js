const mongoose = require("mongoose")

const connectToDatabase = () => {
  const url = process.env.MONGODB_URI

  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) =>
      console.log("Error connecting to MongoDB:", error.message)
    )
}

module.exports = connectToDatabase
