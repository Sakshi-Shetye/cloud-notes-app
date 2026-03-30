// // (Security as a Service)
// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// let users = [];

// router.post("/register", async (req,res)=>{
//   const hash = await bcrypt.hash(req.body.password,10);
//   users.push({email:req.body.email,password:hash});
//   res.send("Registered");
// });

// router.post("/login", async (req,res)=>{
//   const user = users.find(u=>u.email===req.body.email);
//   if(!user) return res.send("Not found");

//   const valid = await bcrypt.compare(req.body.password,user.password);
//   if(!valid) return res.send("Wrong password");

//   const token = jwt.sign({email:user.email},process.env.JWT_SECRET);
//   res.json({token});
// });

// module.exports = router;




// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// let users = [];

// router.post("/register", async (req, res) => {
//   const hash = await bcrypt.hash(req.body.password, 10);
//   users.push({ email: req.body.email, password: hash });
//   res.send("Registered");
// });

// router.post("/login", async (req, res) => {
//   const user = users.find((u) => u.email === req.body.email);
//   if (!user) return res.status(404).send("Not found");

//   const valid = await bcrypt.compare(req.body.password, user.password);
//   if (!valid) return res.status(400).send("Wrong password");

//   const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
//   res.json({ token });
// });

// module.exports = router;



// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // ✅ Register
// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).send("User already exists");

//     const hash = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hash });
//     await user.save();

//     res.send("Registered");
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// // ✅ Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).send("Not found");

//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(400).send("Wrong password");

//     const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
//     res.json({ token });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// module.exports = router;



const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).send("Email and password required");

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send("User already exists");

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();

    console.log("Registered new user:", email);
    res.send("Registered");
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).send("Email and password required");

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("Not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).send("Wrong password");

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;