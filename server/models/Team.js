const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
    max: 100,
    min: 6,
  },
  slug: {
    type: String,
    required: true,
    max: 100,
    min: 6,
  },
  discipline: {
    type: Array,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  emailContact: {
    type: String,
    required: false,
    max: 100,
    min: 6,
  },
  logo: {
    type: String,
    required: false,
    //max: 1024,
    //min: 6
  },
  city: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  latitude: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  longitude: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  address: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  postalCode: {
    type: String,
    required: false,
    max: 1024,
    min: 5,
  },
  county: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  number: {
    type: String,
    required: false,
    max: 1024,
    min: 2,
  },
  kids: {
    type: Boolean,
    required: false,
    max: 1024,
    min: 6,
  },
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  cloudinary_id: {
    type: String,
    required: false,
  },
  schedule: {
    type: String,
    required: false,
    max: 100,
    min: 6,
  },
  price: {
    type: Array,
    required: true,
    max: 100,
    min: 6,
  },
  disciplinePrices: {
    type: Array,
  },
  payments: {
    type: Array,
  },
})

const Team = mongoose.model("Team", TeamSchema)

module.exports = Team
