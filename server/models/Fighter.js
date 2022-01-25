const mongoose = require("mongoose");

const fighterSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    max: 100,
    min: 6,
  },
  avatar: {
    type: String,
    required: true,
    //max: 1024,
    //min: 6
  },
  city: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  postalCode: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  discipline: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  cloudinary_id: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Fighter", fighterSchema);
