const User = require("../models/User");

// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   User.findById(id)
//     .then((data) => {
//       if (!data)
//         res.status(404).send({ message: "Not found Tutorial with id " + id });
//       else res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(req.params.userId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.userId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving message with id " + id,
      });
    });
};
