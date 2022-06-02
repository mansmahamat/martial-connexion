const router = require("express").Router()
const User = require("../models/User")
const crypto = require("crypto")
const dotenv = require("dotenv")
const session = require("express-session")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
} = require("../routes/validation")
const ErrorResponse = require("../utils/errorResponse")
const sendEmail = require("../utils/sentEmail")
const Stripe = require("../stripe")
const stripe = require("stripe")(
  "sk_test_51KEwIMLXQl0DCJw6d0bLud77pQXePWgdms4nsY9BxszujE3ZTXCtvua7NzlOy0CcdnsBhHQrYDWgjAepP6Pr2Y6Z00vkDwTP76"
)

const multer = require("multer")
dotenv.config()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true)
  } else {
    cb(new Error("Mauvais format"), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 3 },
})
const cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

// Register
router.post("/register", upload.single("avatar"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path)
  // Validate Data before we create user
  const { error } = registerValidation(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  //Check if User is already in db
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send("L'email est déjà utilisé")

  //Hash passwords
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  let customerInfo = {}

  customerInfo = await Stripe.addNewCustomer(req.body.email)

  const account = await stripe.accounts.create({
    country: "FR",
    type: "express",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: "individual",
    business_profile: { url: "https://exaequoi.com" },
  })

  // Create New User
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: result.secure_url,
    //avatar: req.body.avatar,
    city: req.body.city,
    postalCode: req.body.postalCode,
    discipline: req.body.discipline,
    userId: req.body.userId,
    cloudinary_id: result.public_id,
    isComplete: false,
    billingID: customerInfo.id,
    plan: "none",
    endDate: null,
    accountId: account.id,
  })
  try {
    const savedUser = await user.save()

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    const { password, ...rest } = user._doc
    res.json({
      token,
      user: rest,
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

// Login
router.post("/login", async (req, res) => {
  // Validate Data before we create user
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //Check if email exist
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("Cet email n'existe pas !")

  //Check Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
    return res.status(400).send("Le mot de passe est incorrect !")

  //Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  })

  //console.log(user);

  const subscriptions = await stripe.subscriptions.list({
    customer: user.billingID,
    status: "all",
    expand: ["data.default_payment_method"],
  })

  // if (!subscriptions.data.length) return res.json([]);

  // req.session.email = user
  // res.header("auth-token", token).send({ user, token })
  const { password, ...rest } = user._doc

  res.json({
    token,
    user: rest,
  })
})

//Forgot password
router.post("/forgotpassword", async (req, res, next) => {
  // Validate Data before we create user
  const { error } = forgotPasswordValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).send("L'email ne peut être envoyé")
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken()

    await user.save()

    // Create reset url to email to provided email
    const resetUrl = `https://confident-visvesvaraya-394dab.netlify.app/passwordreset/${resetToken}`

    // HTML Message
    const message = `
    




<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          <a href="https://rakeshmandal.com" title="logo" target="_blank">
                            <img width="60" src="https://i.ibb.co/N6d8NNY/letter-m.png" title="logo" alt="logo">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            It seems that you have forgotten the password of your Website account. <br>

You can change your password by clicking on the button below:
                                        </p>
                                        <a href=${resetUrl} 

                                            style="background:#DDCB9C;text-decoration:none !important; font-weight:500; margin-top:35px; color:#000;text-transform:uppercase; font-size:14px;padding: 1.5rem 3rem;;display:inline-block;border-radius:50px;" clicktracking=off>Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.mans_js.com</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      })

      res.status(200).json({ success: true, data: "Email Sent" })
    } catch (err) {
      console.log(err)

      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      return next(new ErrorResponse("Email could not be sent", 500))
    }
  } catch (error) {
    next(error)
  }
})

//Reset password
router.put("/resetpassword/:resetToken", async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex")

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).send("Token invalide")
    }

    user.date = Date.now()

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    })
  } catch (error) {
    return res.status(400).send(error)
  }
})

router.get("/user/:id", async (req, res) => {
  const id = req.params.id

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id })
      else res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken()
  res.status(statusCode).json({ sucess: true, token })
}

module.exports = router
