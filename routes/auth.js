// (Security as a Service)
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = [];

router.post("/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  users.push({email:req.body.email,password:hash});
  res.send("Registered");
});

router.post("/login", async (req,res)=>{
  const user = users.find(u=>u.email===req.body.email);
  if(!user) return res.send("Not found");

  const valid = await bcrypt.compare(req.body.password,user.password);
  if(!valid) return res.send("Wrong password");

  const token = jwt.sign({email:user.email},process.env.JWT_SECRET);
  res.json({token});
});

module.exports = router;