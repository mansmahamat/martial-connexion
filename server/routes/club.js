const router = require("express").Router()
const Team = require("../models/Team")
const User = require("../models/User")
const multer = require("multer")
const dotenv = require("dotenv")

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

router.post("/team", upload.single("logo"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path)

  const team = new Team({
    clubName: req.body.clubName,
    discipline: req.body.discipline,
    description: req.body.description,
    emailContact: req.body.emailContact,
    slug: req.body.slug,
    logo: result.secure_url,
    //avatar: req.body.avatar,
    city: req.body.city,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    address: req.body.address,
    postalCode: req.body.postalCode,
    county: req.body.county,
    userId: req.body.userId,
    cloudinary_id: result.public_id,
    kids: req.body.kids,
    number: req.body.number,
    schedule: req.body.schedule,
    price: req.body.price,
  })
  try {
    const savedTeam = await team.save()

    user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { isTeam: true, teamId: team._id },
      {
        useFindAndModify: false,
      }
    )

    res.status(201).json({ success: "created", data: savedTeam })
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/team/:id", async (req, res) => {
  const id = req.params.id

  Team.findById(id)
    .populate("userId")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Team with id " + id })
      else res.status(200).json(data)
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id })
    })
})

router.get("/teams", async (req, res) => {
  try {
    const getTeams = await Team.find({}).populate("userId")
    res.status(200).json(getTeams)
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
