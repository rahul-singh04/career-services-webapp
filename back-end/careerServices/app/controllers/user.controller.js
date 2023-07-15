const { userModel } = require("../models");
const service = require("../services");
const userService = service.userService;

exports.allAccess = async (req, res) => {
  try {
    const result = await userService.getPublicContent();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

exports.candidateBoard = async (req, res) => {
  try {
    const result = await userService.getCandidateContent();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

exports.employerBoard = async (req, res) => {
  try {
    const result = await userService.getEmployerContent();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

exports.adminBoard = async (req, res) => {
  try {
    const result = await userService.getAdminContent();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

exports.browseCandidates = async (req, res) => {
  try {
    const candidateData = await userService.getFilteredCandidates();
    res.status(200).send(candidateData);
  } catch (error) {
    console.error("Failed to fetch candidates:", error);
    res.status(500).send("Failed to fetch candidates");
  }
};

exports.browseJobs = async (req, res) => {
  try {
    const jobData = await userService.getAllJobs();
    res.status(200).send(jobData);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    res.status(500).send("Failed to fetch jobs");
  }
};

exports.getJobsPosted = async (req, res) => {
  try {
    const jobs = await userService.getJobsPosted(req.headers["x-access-token"]);
    res.status(200).send(jobs);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    res.status(500).send("Failed to fetch jobs");
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const profile = await userService.getUserProfile(
      req.headers["x-access-token"]
    );
    res.status(200).send(profile);
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    res.status(500).send("Failed to fetch profile");
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const updatedFields = req.body;

    await userService.updateUserProfile(
      req.headers["x-access-token"],
      updatedFields
    );
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postJob = async (req, res) => {
  try {
    const createdJob = await userService.createJob(
      req.headers["x-access-token"],
      req.query.jobTitle,
      req.query.jobDesc
    );
    res.status(200).send(createdJob);
  } catch (error) {
    console.error("Failed to save job:", error);
    res.status(500).send("Failed to save job");
  }
};

exports.getApplicants = async (req, res) => {
  try {
    const result = await userService.getApplicants(
      req.query.jobID,
      req.headers["x-access-token"]
    );
    res.status(200).send(result);
  } catch (error) {
    console.error("Failed to fetch applicants:", error);
    res.status(500).send("Failed to fetch applicants");
  }
};

exports.putInterview = async (req, res) => {
  try {
    const result = await userService.updateApplicationStatus(
      req.query.jobID,
      req.query.candidateID
    );
    if (result.updated) {
      res.send({ message: "Application updated successfully." });
    } else {
      res.status(404).send({
        message: `Cannot update application with jobID=${req.query.jobID} and candidateID=${req.query.candidateID}. Application not found!`,
      });
    }
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).send("Error updating application");
  }
};

exports.applyJob = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update cannot be empty!",
      });
    }
    const token = req.headers["x-access-token"];
    const candidateID = req.query.candidateID;

    const createdApplication = await userService.createApplication(
      candidateID,
      token
    );
    res.status(200).send(createdApplication);
  } catch (error) {
    console.error("Failed to save application:", error);
    res.status(500).send("Failed to save application");
  }
};

exports.readUsers = async (req, res) => {
  try {
    const users = await userService.getAlluserModels();
    res.status(200).send(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).send("Failed to fetch users");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error("Failed to update User:", error);
    res.status(500).send("Failed to update User");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(deletedUser);
    }
  } catch (error) {
    console.error("Failed to delete user:", error);
    res.status(500).send("Failed to delete user");
  }
};

exports.readJobPostings = async (req, res) => {
  try {
    const jobPostings = await userService.getAllJobPostings();
    res.status(200).send(jobPostings);
  } catch (error) {
    console.error("Failed to fetch jobPostings:", error);
    res.status(500).send("Failed to fetch jobPostings");
  }
};

exports.updateJobPosting = async (req, res) => {
  try {
    const updatedJobPostings = await userService.updateJobPosting(
      req.params.id,
      req.body
    );
    if (!updatedJobPostings) {
      res.status(404).send("JobPosting not found");
    } else {
      res.status(200).json(updatedJobPostings);
    }
  } catch (error) {
    console.error("Failed to update JobPostings:", error);
    res.status(500).send("Failed to update JobPostings");
  }
};
