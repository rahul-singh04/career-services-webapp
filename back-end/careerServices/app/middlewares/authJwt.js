const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      Role.find({ _id: { $in: user.roles } })
        .exec()
        .then((roles) => {
          const isAdminRole = roles.some((role) => role.name === "admin");
          if (isAdminRole) {
            next();
          } else {
            res.status(403).send({ message: "Require Admin Role!" });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

const isEmployer = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      Role.find({ _id: { $in: user.roles } })
        .exec()
        .then((roles) => {
          const isEmployerRole = roles.some((role) => role.name === "employer");
          if (isEmployerRole) {
            next();
          } else {
            res.status(403).send({ message: "Require Employer Role!" });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

const isCandidate = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      Role.find({ _id: { $in: user.roles } })
        .exec()
        .then((roles) => {
          const isCandidateRole = roles.some(
            (role) => role.name === "candidate"
          );
          if (isCandidateRole) {
            next();
          } else {
            res.status(403).send({ message: "Require Candidate Role!" });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isEmployer,
  isCandidate,
};
module.exports = authJwt;
