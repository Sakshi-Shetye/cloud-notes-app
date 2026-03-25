// const router = require("express").Router();
// const Note = require("../models/Note");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Auth middleware
// function auth(req,res,next){
//   const token = req.header("Authorization");
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = decoded;
//   next();
// }

// // Add note with image (Storage as a Service)
// router.post("/", auth, upload.single("image"), async (req,res)=>{

//   const result = await cloudinary.uploader.upload_stream(
//     { resource_type: "image" },
//     async (error, result) => {

//       const note = new Note({
//         title: req.body.title,
//         content: req.body.content,
//         image: result.secure_url,
//         user: req.user.email
//       });

//       await note.save();
//       res.send(note);
//     }
//   );

//   result.end(req.file.buffer);
// });

// // Get notes
// router.get("/", auth, async (req,res)=>{
//   const notes = await Note.find({user:req.user.email});
//   res.json(notes);
// });

// module.exports = router;

const router = require("express").Router();
const Note = require("../models/Note");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// 🔥 Cloudinary Config (VERY IMPORTANT)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Auth middleware
function auth(req, res, next) {
  try {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
}

// ✅ Add note with image (Cloudinary upload)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      async (error, result) => {

        if (error) return res.status(500).send(error);

        const note = new Note({
          title: req.body.title,
          content: req.body.content,
          image: result.secure_url,
          user: req.user.email
        });

        await note.save();
        res.json(note);
      }
    );

    // send file buffer to cloudinary
    stream.end(req.file.buffer);

  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ Get notes
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.email });
    res.json(notes);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;