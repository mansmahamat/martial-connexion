const router = require("express").Router();
const dotenv = require("dotenv");
const updateMentors = require("../controllers/updateMentors");
const deleteMentors = require("../controllers/deleteMentors");
const getOneMentors = require("../controllers/getOneMentors");

const Fighter = require("../models/Fighter");
const User = require("../models/User");

const multer = require("multer");
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Mauvais format"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 3 },
});
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "mansdesmez",
  api_key: "318321927792211",
  api_secret: "je9hSnY8_brgN7vLlMvEMvYSXzE",
});

router.post("/fighter", upload.single("avatar"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const fighter = new Fighter({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: result.secure_url,
    //avatar: req.body.avatar,
    city: req.body.city,
    postalCode: req.body.postalCode,
    discipline: req.body.discipline,
    userId: req.body.userId,
    cloudinary_id: result.public_id,
  });
  try {
    const savedFighter = await fighter
      .save()
      .populate("userId") // key to populate
      .then((user) => {
        res.json(user);
      });

    // SEND FILE TO CLOUDINARY

    res.status(201).send({ fighter });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/fighter/:id", upload.single("avatar"), async (req, res) => {
  try {
    const id = req.params.id;
    let mentor = await User.findById(id);
    // Delete image from cloudinary
    //  await cloudinary.uploader.destroy(mentor.cloudinary_id);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: result.secure_url,
      //avatar: req.body.avatar,
      city: req.body.city,
      postalCode: req.body.postalCode,
      discipline: req.body.discipline,
      isComplete: true,
      userId: req.body.userId,
      cloudinary_id: result.public_id,
    };
    user = await User.findByIdAndUpdate(id, data, {
      useFindAndModify: false,
    });
    // SEND FILE TO CLOUDINARY

    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.get("fighter/:orderId", (req, res, next) => {
//   Fighter.findById(req.params.orderId)
//     .populate("User")
//     .exec()
//     .then((order) => {
//       if (!order) {
//         return res.status(404).json({
//           message: "Order not found",
//         });
//       }
//       res.status(200).json(
//         {
//           order: order,

//           request: {
//             type: "GET",
//             url: "http://localhost:3000/orders",
//           },
//         },
//         console.log(order)
//       );
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// router.get("/mentors", async (req, res) => {
//   try {
//     const fetchMentor = await Mentor.find({});
//     res.status(200).send(fetchMentor);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

router.get("/fighters/:userId", getOneMentors.findOne);

// router.patch("/mentors/:id", upload.single("avatar"), async (req, res) => {
//   try {
//     const id = req.params.id;
//     let mentor = await Mentor.findById(id);
//     // Delete image from cloudinary
//     await cloudinary.uploader.destroy(mentor.cloudinary_id);
//     // Upload image to cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path);

//     const data = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       avatar: result.secure_url,
//       //avatar: req.body.avatar,
//       title: req.body.title,
//       disponible: req.body.disponible,
//       presentation: req.body.presentation,
//       technos: req.body.technos,
//       socials: req.body.socials,
//       userId: req.body.userId,
//     };
//     user = await Mentor.findByIdAndUpdate(id, data, {
//       useFindAndModify: false,
//     });
//     // SEND FILE TO CLOUDINARY

//     res.json(user);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.delete("/mentors/:id", deleteMentors.delete);

module.exports = router;
