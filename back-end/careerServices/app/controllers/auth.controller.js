const config = require("../config/config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = db.user;
const Role = db.role;

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user
    .save()
    .then((user) => {
      if (req.body.roles) {
        return Role.find({ name: { $in: req.body.roles } });
      } else {
        return Role.findOne({ name: "user" });
      }
    })
    .then((roles) => {
      user.roles = roles.map((role) => role._id);
      return user.save();
    })
    .then(() => {
      res.status(200).send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.signin = (req, res) => {
  User.findOne({ username: req.body.username })
    .populate("roles", "-__v")
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      });

      const authorities = user.roles.map(
        (role) => "ROLE_" + role.name.toUpperCase()
      );

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
