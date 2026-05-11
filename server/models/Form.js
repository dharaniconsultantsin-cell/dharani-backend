const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({

  type:String,

  name:String,

  email:String,

  phone:String,

  message:String,

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports =
mongoose.model("Form", formSchema);