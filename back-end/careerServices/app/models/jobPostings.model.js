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
    companyLocation: {
      type: String,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
    jobDesc: {
      type: String,
      required: true,
    },
    workLocation: {
      type: String,
    },
    totalOpenings: {
      type: String,
    },
  })
);

module.exports = JobPosting;
