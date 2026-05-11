const express = require("express");

const router = express.Router();

const multer = require("multer");

const Project =
require("../models/Project");

const storage = multer.diskStorage({

  destination:(req,file,cb)=>{

    cb(null,"uploads/");

  },

  filename:(req,file,cb)=>{

    cb(
      null,
      Date.now() + "-" + file.originalname
    );

  }

});

const upload = multer({ storage });

router.post(
  "/add",
  upload.single("image"),

  async(req,res)=>{

    try{

      const project =
      await Project.create({

        title:req.body.title,

        description:req.body.description,

        location:req.body.location,

        image:req.file.filename

      });

      res.json(project);

    }

    catch(err){

      res.status(500).json(err);

    }

});

router.get("/all", async(req,res)=>{

  const projects =
  await Project.find()
  .sort({ createdAt:-1 });

  res.json(projects);

});

router.delete("/:id", async(req,res)=>{

  await Project.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message:"Deleted"
  });

});

module.exports = router;