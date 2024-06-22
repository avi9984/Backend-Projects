const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name is already exist"],
      trim: true
    },

    fullName: {
      type: String,
      required: [true, "fullname must be provided"],
    },

    logoLink: {
      type: String,
      required: [true, "logolink must be required"]
    },

    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);// colleges
