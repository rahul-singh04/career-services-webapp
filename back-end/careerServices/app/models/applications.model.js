const mongoose = require("mongoose");

const Application = mongoose.model(
  "Application",
  new mongoose.Schema({
    candidateID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPosting",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  })
);

module.exports = Application;
