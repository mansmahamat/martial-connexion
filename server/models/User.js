const mongoose = require("mongoose")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 100,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
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
    required: false,
    //max: 1024,
    //min: 6
  },
  city: {
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
  session: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  discipline: {
    type: Array,
    required: true,
    max: 1024,
    min: 2,
  },
  isComplete: {
    type: Boolean,
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
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  billingID: {
    type: String,
    required: false,
    max: 1024,
    min: 1,
  },
  plan: {
    type: String,
    required: false,
    max: 1024,
    min: 1,
  },
  endDate: {
    type: Date,
    default: null,
  },
  subscriptions: [],
  stripe_customer_id: String,
  isTeam: {
    type: Boolean,
    required: false,
    max: 1024,
    min: 6,
    default: false,
  },
  accountId: {
    type: String,
  },
  paymentStatus: {
    type: Object,
  },
  paymentReceived: {
    type: Object,
  },
  invoicesPaid: {
    type: Object,
  },
  invoicesFailed: {
    type: Object,
  },
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex")

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000) // Ten Minutes

  return resetToken
}

const User = mongoose.model("User", userSchema)

module.exports = User
