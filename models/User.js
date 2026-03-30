// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   password: String,
// });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);