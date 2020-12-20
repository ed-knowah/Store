const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  number: Number,
  address: String,
  gender: String,
  password: String,
});

const suggestSchema = mongoose.Schema({
  itemName: String,
  itemDescription: String,
  itemCategory: { type: String, enum: ["electronics", "furniture", "grocery"] },
  reasonForSuggestion: String,
});

//this is how to define a model
const userModel = mongoose.model("user", userSchema);
const suggestModel = mongoose.model("suggest", suggestSchema);

module.exports = {
  userModel,
  suggestModel,
};
