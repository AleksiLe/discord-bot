const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let SlashLoggerSchema = new Schema({
  quildId: String,
  commandName: String,
  commandUrl: String,
  userId: String,
  username: String,
  timestamp: Number,
});

module.exports = mongoose.model("Slashlogger", SlashLoggerSchema);
