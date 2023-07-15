const mongoose = require("mongoose");

const JobPosting = mongoose.model(
  "JobPosting",
  new mongoose.Schema({
    employerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobDesc: {
      type: String,
      required: true,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = JobPosting;
