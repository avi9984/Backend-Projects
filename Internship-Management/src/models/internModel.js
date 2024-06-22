const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },

  mobile: {
    type: Number,
    unique: true,
    required: [true, "Mobile number is required"],
    maxlength: 10,
  },

  collegeId: {
    type: ObjectId,
    ref: "College",
    required: true
  },

  isDeleted: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("intern", internSchema);
