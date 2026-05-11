require("dotenv").config();
require("./models/Form");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./routes/forms");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/forms", formsRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String
});

const Contact = mongoose.model("Contact", ContactSchema);

app.post("/api/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(200).json({
      success: true,
      message: "Data Saved"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("Dharani Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});