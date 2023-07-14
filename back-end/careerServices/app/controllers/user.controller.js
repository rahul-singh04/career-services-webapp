const db = require("../models");
const applications = db.applications;
const jobPostings = db.jobPostings;
const User = db.user;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JobPosting = require("../models/jobPostings.model");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.candidateBoard = (req, res) => {
  res.status(200).send("Candidate Content.");
};

exports.employerBoard = (req, res) => {
  res.status(200).send("Employer Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.browseCandidates = (req, res) => {
  User.find()
    .populate("roles")
    .exec()
    .then((users) => {
      const candidates = users.filter((user) =>
        user.roles.some((role) => role.name === "candidate")
      );
      const candidateData = candidates.map((candidate) => {
        return {
          username: candidate.username,
          email: candidate.email,
          fullName: candidate.fullName,
          professionalSummary: candidate.professionalSummary,
          location: candidate.location,
          phoneNumber: candidate.phoneNumber,
          linkedInProfile: candidate.linkedInProfile,
          twitterProfile: candidate.twitterProfile,
          githubProfile: candidate.githubProfile,
        };
      });
      res.status(200).send(candidateData);
    })
    .catch((err) => {
      console.error("Failed to fetch candidates:", err);
      res.status(500).send("Failed to fetch candidates");
    });
};

exports.browseJobs = (req, res) => {
  JobPosting.find()
    .populate("employerID", "username email") // Populate employerID with username and email fields
    .exec()
    .then((jobs) => {
      const jobData = jobs.map((job) => {
        const { _id, jobTitle, jobDesc, employerID } = job;
        const { username, email } = employerID;
        return {
          _id,
          jobTitle,
          jobDesc,
          employerID: {
            username,
            email,
          },
        };
      });
      res.status(200).send(jobData);
    })
    .catch((err) => {
      console.error("Failed to fetch jobs:", err);
      res.status(500).send("Failed to fetch jobs");
    });
};

const extractUserIdFromToken = (token) => {
  const decodedToken = jwt.decode(token, { complete: true });
  if (!decodedToken) {
    throw new Error("Invalid token");
  }
  return decodedToken.payload.id;
};

exports.getJobsPosted = (req, res) => {
  const token = req.headers["x-access-token"];
  const userId = new mongoose.Types.ObjectId(extractUserIdFromToken(token));
  jobPostings
    .find({ employerID: userId })
    .exec()
    .then((jobs) => {
      res.status(200).send(jobs);
    })
    .catch((err) => {
      console.error("Failed to fetch jobs:", err);
      res.status(500).send("Failed to fetch jobs");
    });
};

exports.postJob = (req, res) => {
  const token = req.headers["x-access-token"];
  const userId = new mongoose.Types.ObjectId(extractUserIdFromToken(token));
  const { jobTitle, jobDesc } = req.query;

  const job = {
    employerID: userId,
    jobTitle: jobTitle,
    jobDesc: jobDesc,
  };
  jobPostings
    .create(job)
    .then((createdJob) => {
      res.status(200).send(createdJob);
    })
    .catch((err) => {
      console.error("Failed to save job:", err);
      res.status(500).send("Failed to save job");
    });
};

exports.getApplicants = (req, res) => {
  const jobID = new mongoose.Types.ObjectId(req.query.jobID);
  const token = req.headers["x-access-token"];

  applications
    .find({ jobID: jobID })
    .exec()
    .then((applications) => {
      const candidateIDs = applications.map((app) => app.candidateID);

      User.find({ _id: { $in: candidateIDs } })
        .exec()
        .then((users) => {
          const result = applications.map((app) => {
            const user = users.find(
              (user) => user._id.toString() === app.candidateID.toString()
            );
            return {
              _id: app._id,
              candidateID: app.candidateID,
              jobID: app.jobID,
              status: app.status,
              user: user,
            };
          });

          res.status(200).send(result);
        })
        .catch((err) => {
          console.error("Failed to fetch user information:", err);
          res.status(500).send("Failed to fetch user information");
        });
    })
    .catch((err) => {
      console.error("Failed to fetch applications:", err);
      res.status(500).send("Failed to fetch applications");
    });
};

exports.putInterview = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const jobID = new mongoose.Types.ObjectId(req.query.jobID);
  const candidateID = new mongoose.Types.ObjectId(req.query.candidateID);

  applications
    .findOneAndUpdate(
      { jobID: jobID, candidateID: candidateID },
      { status: "Interview Posted" },
      { useFindAndModify: false }
    )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update application with jobID=${jobID} and candidateID=${candidateID}. Application not found!`,
        });
      } else {
        res.send({ message: "Application updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error updating application with jobID=" +
          jobID +
          " and candidateID=" +
          candidateID,
      });
    });
};

exports.applyJob = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }
  const token = req.headers["x-access-token"];
  const jobID = new mongoose.Types.ObjectId(req.query.jobID);
  const candidateID = new mongoose.Types.ObjectId(
    extractUserIdFromToken(token)
  );

  const application = {
    candidateID: candidateID,
    jobID: jobID,
    status: "New",
  };
  applications
    .create(application)
    .then((createdApplication) => {
      res.status(200).send(createdApplication);
    })
    .catch((err) => {
      console.error("Failed to save application:", err);
      res.status(500).send("Failed to save application");
    });
};

exports.readUsers = (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error("Failed to fetch users:", err);
      res.status(500).send("Failed to fetch users");
    });
};

exports.updateUser = (req, res) => {
  const userID = req.params.id;
  const { username, email, password, roles } = req.body;

  User.findByIdAndUpdate(
    userID,
    {
      username,
      email,
      password,
      roles,
    },
    { new: true, useFindAndModify: false }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).send("User not found");
      } else {
        res.status(200).json(updatedUser);
      }
    })
    .catch((err) => {
      console.error("Failed to update User:", err);
      res.status(500).send("Failed to update User");
    });
};

exports.deleteUser = (req, res) => {
  const userID = req.params.id;
  User.findByIdAndRemove(userID, { useFindAndModify: false })
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("User not found");
      } else {
        res.status(200).json(deletedUser);
      }
    })
    .catch((err) => {
      console.error("Failed to delete user:", err);
      res.status(500).send("Failed to delete user");
    });
};

exports.readJobPostings = (req, res) => {
  JobPosting.find()
    .exec()
    .then((jobPostings) => {
      res.status(200).send(jobPostings);
    })
    .catch((err) => {
      console.error("Failed to fetch jobPostings:", err);
      res.status(500).send("Failed to fetch jobPostings");
    });
};

exports.updateJobPosting = (req, res) => {
  const jobID = req.params.id;
  const { employerID, jobTitle, jobDesc, datePosted } = req.body;

  User.findByIdAndUpdate(
    jobID,
    {
      employerID,
      jobTitle,
      jobDesc,
      datePosted,
    },
    { new: true, useFindAndModify: false }
  )
    .then((updatedJobPostings) => {
      if (!updatedJobPostings) {
        res.status(404).send("JobPosting not found");
      } else {
        res.status(200).json(updatedJobPostings);
      }
    })
    .catch((err) => {
      console.error("Failed to update JobPostings:", err);
      res.status(500).send("Failed to update JobPostings");
    });
};

exports.deleteJobPosting = (req, res) => {
  const jobID = req.params.id;
  User.findByIdAndRemove(jobID, { useFindAndModify: false })
    .then((deletedJobPosting) => {
      if (!deletedJobPosting) {
        res.status(404).send("JobPosting not found");
      } else {
        res.status(200).json(deletedJobPosting);
      }
    })
    .catch((err) => {
      console.error("Failed to delete JobPosting:", err);
      res.status(500).send("Failed to delete JobPosting");
    });
};

exports.readApplication = (req, res) => {
  applications
    .find()
    .exec()
    .then((applications) => {
      res.status(200).send(applications);
    })
    .catch((err) => {
      console.error("Failed to fetch applications:", err);
      res.status(500).send("Failed to fetch applications");
    });
};

exports.updateApplication = (req, res) => {
  const applicationID = req.params.id;
  const { candidateID, jobID, status } = req.body;

  User.findByIdAndUpdate(
    applicationID,
    {
      candidateID,
      jobID,
      status,
    },
    { new: true, useFindAndModify: false }
  )
    .then((updatedApplication) => {
      if (!updatedApplication) {
        res.status(404).send("Application not found");
      } else {
        res.status(200).json(updatedApplication);
      }
    })
    .catch((err) => {
      console.error("Failed to update Application:", err);
      res.status(500).send("Failed to update Application");
    });
};

exports.deleteApplication = (req, res) => {
  const applicationID = req.params.id;
  User.findByIdAndRemove(applicationID, { useFindAndModify: false })
    .then((deletedApplication) => {
      if (!deletedApplication) {
        res.status(404).send("Application not found");
      } else {
        res.status(200).json(deletedApplication);
      }
    })
    .catch((err) => {
      console.error("Failed to delete Application:", err);
      res.status(500).send("Failed to delete Application");
    });
};
