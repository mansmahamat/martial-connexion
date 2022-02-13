const Fighter = require("../models/Fighter");

exports.delete = (req, res) => {
  const id = req.params.id;

  Fighter.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `This fighter doesn't exist`,
        });
      } else {
        res.send({
          message: "User deleted!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error" + id,
      });
    });
};
