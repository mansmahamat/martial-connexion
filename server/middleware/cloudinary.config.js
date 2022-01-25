const multer = require("multer");

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "mansdesmez",
  api_key: "318321927792211",
  api_secret: "je9hSnY8_brgN7vLlMvEMvYSXzE",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatar",
    format: async () => "png",
    public_id: (req, file) => file.filename,
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
