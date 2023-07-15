const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    fullName: String,
    professionalSummary: [
      {
        companyName: String,
        title: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    skills: [String],
    location: String,
    phoneNumber: String,
    linkedInProfile: String,
    twitterProfile: String,
    githubProfile: String,
  })
);

module.exports = User;
