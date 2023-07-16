const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../../config");
const serverConfig = config.serverConfig;

const models = require("../../models");
const userModel = models.userModel;
const roleModel = models.roleModel;

exports.checkDuplicateUsernameOrEmail = async (username, email) => {
  const usernameUser = await userModel.findOne({ username }).exec();
  const emailUser = await userModel.findOne({ email }).exec();

  if (usernameUser && emailUser) {
    throw new Error("Username and email are already in use!");
  }

  if (usernameUser) {
    throw new Error("Username is already in use!");
  }

  if (emailUser) {
    throw new Error("Email is already in use!");
  }
};

exports.checkRolesExisted = async (roles) => {
  try {
    const existingRoles = await roleModel.find({});
    for (let i = 0; i < roles.length; i++) {
      const foundRole = existingRoles.find((role) => role.name === roles[i]);
      if (!foundRole) {
        throw new Error(`Role ${roles[i]} does not exist!`);
      }
    }
  } catch (err) {
    throw err;
  }
};

exports.signup = async (username, email, password, roles) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new userModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const foundRoles = roles
      ? await roleModel.find({ name: { $in: roles } })
      : await roleModel.findOne({ name: "user" });

    user.roles = foundRoles.map((role) => role._id);
    await user.save();
  } catch (err) {
    throw err;
  }
};

exports.signin = async (username, password) => {
  try {
    const user = await userModel
      .findOne({ username: username })
      .populate("roles", "-__v");
    if (!user) {
      throw new Error("User not found.");
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new Error("Invalid Password!");
    }

    const token = jwt.sign({ id: user.id }, serverConfig.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    };
  } catch (err) {
    throw err;
  }
};

exports.verifyToken = async (token) => {
  try {
    return await jwt.verify(token, serverConfig.secret);
  } catch (err) {
    throw new Error("Unauthorized!");
  }
};

exports.getUserRoles = async (userId) => {
  try {
    const user = await userModel.findById(userId).exec();
    const roles = await roleModel.find({ _id: { $in: user.roles } }).exec();
    return roles.map((role) => role.name);
  } catch (err) {
    throw new Error(err.message);
  }
};
