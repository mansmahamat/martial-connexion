const Fighter = require("../models/Fighter");

module.exports.UploadImage = async (req, res) => {
  const createFighter = new Fighter({
    avatar: req.file.path,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    postalCode: req.body.postalCode,
    discipline: req.body.discipline,
    userId: req.body.userId,
  });

  try {
    await createFighter.save();
  } catch (error) {
    return res.status(400).json({
      message: `image upload failed, check to see the ${error}`,
      status: "error",
    });
  }
};
