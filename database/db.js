/* const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose
  .connect("mongodb://127.0.0.1:27017/discordbot")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db; */
