const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  message: String,
  email: String
});

module.exports = mongoose.model("Contact", contactSchema);