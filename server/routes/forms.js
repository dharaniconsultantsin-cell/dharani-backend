const express = require("express");
const router = express.Router();
const multer = require("multer");
const Form = require("../models/Form");

// upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// SERVICE
router.post("/service", upload.single("file"), async (req, res) => {
  const data = await Form.create({
    type: "service",
    name: req.body.name,
    desc: req.body.desc,
    file: req.file?.filename
  });
  res.json(data);
});

// PROJECT
router.post("/project", upload.single("file"), async (req, res) => {
  const data = await Form.create({
    type: "project",
    name: req.body.name,
    desc: req.body.desc,
    file: req.file?.filename
  });
  res.json(data);
});

// CONTACT
router.post("/contact", async (req,res)=>{

  try{

    const form = await Form.create({

      type:req.body.type,

      name:req.body.name,

      email:req.body.email,

      phone:req.body.phone,

      serviceType:req.body.serviceType,

      message:req.body.message

    });

    res.json(form);

  }

  catch(err){

    res.status(500).json(err);

  }

});

// GET ALL
router.get("/", async (req, res) => {
  const data = await Form.find().sort({ createdAt: -1 });
  res.json(data);
});

module.exports = router;
router.get("/clear", async (req, res) => {
  await Form.deleteMany({});
  res.send("All data deleted");
});