// const mongoose = require("mongoose");

// const noteSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   image: String,
//   user: String
// });

// module.exports = mongoose.model("Note", noteSchema);


// const mongoose = require("mongoose");

// const noteSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   image: String,
//   user: String,
// });

// module.exports = mongoose.model("Note", noteSchema);


const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  user: String,
});

module.exports = mongoose.model("Note", noteSchema);