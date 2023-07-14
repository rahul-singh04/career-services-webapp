const config = require("../config/config");
const dbConfig = require("../config/config.js");
const db = {};
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model");
db.role = require("./role.model");
db.jobPostings = require("./jobPostings.model");
db.applications = require("./applications.model");
db.ROLES = ["employer", "candidate", "admin"];

module.exports = db;
