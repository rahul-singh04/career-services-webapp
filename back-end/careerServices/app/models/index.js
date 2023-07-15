const applicationModel = require("./applications.model");
const jobPostingsModel = require("./jobPostings.model");
const roleModel = require("./role.model");
const userModel = require("./user.model");
const ROLES = ["employer", "candidate", "admin"];
const mongoose = require("mongoose");
module.exports = {
  applicationModel,
  jobPostingsModel,
  roleModel,
  userModel,
  ROLES,
  mongoose,
};
