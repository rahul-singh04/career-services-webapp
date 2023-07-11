const db = require("../models");
const Dummy = db.dummy;
exports.create = (req, res) => {
  if (!req.body.first) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const dummy = new Dummy({
    first: req.body.first,
    second: req.body.second,
  });

  dummy
    .save(dummy)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the dummy.",
      });
    });
};

exports.findAll = (req, res) => {
  const first = req.query.first;
  var condition = first
    ? { first: { $regex: new RegExp(first), $options: "i" } }
    : {};

  Dummy.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving dummys.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Dummy.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update dummy with id=${id}. Maybe dummy was not found!`,
        });
      } else res.send({ message: "dummy was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating dummy with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Dummy.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete dummy with id=${id}. Maybe dummy was not found!`,
        });
      } else {
        res.send({
          message: "dummy was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete dummy with id=" + id,
      });
    });
};
