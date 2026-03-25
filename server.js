const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 🔥 Connect to MongoDB (DBaaS)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ DB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/notes", require("./routes/notes"));

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});