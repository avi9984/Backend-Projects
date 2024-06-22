const mongoose = require("mongoose");


/////////////////// -AUTHOR SCHEMA- /////////////////////////////

const authorSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim:true
    },
    lname: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      trim:true,
      enum: ["Mr", "Mrs", "Miss"],
      required:true
      

    },
    email: {
      type: String,
      unique: true,
      required:true
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project_authors", authorSchema);
