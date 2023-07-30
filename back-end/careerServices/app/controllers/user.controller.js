const fs = require("fs");
const onFinished = require("on-finished");

const service = require("../services");
const { logger } = require("../config").loggerConfig;
const userService = service.userService;

exports.browseCandidates = async (req, res) => {
  try {
    const candidateData = await userService.getFilteredCandidates();
    res.status(200).send(candidateData);
  } catch (error) {
    logger.error("Failed to fetch candidates:", error);
    res.status(500).send("Failed to fetch candidates");
  }
};

exports.browseJobs = async (req, res) => {
  try {
    const jobData = await userService.getAllJobs();
    res.status(200).send(jobData);
  } catch (error) {
    logger.error("Failed to fetch jobs:", error);
    res.status(500).send("Failed to fetch jobs");
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await userService.getJobs(req.headers["x-access-token"]);
    res.status(200).send(jobs);
  } catch (error) {
    logger.error("Failed to fetch jobs:", error);
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
    logger.error("Failed to fetch profile:", error);
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
    logger.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postJob = async (req, res) => {
  try {
    const { jobTitle, jobDesc, ...additionalParams } = req.body;
    const createdJob = await userService.createJob(
      req.headers["x-access-token"],
      jobTitle,
      jobDesc,
      additionalParams
    );
    res.status(200).send(createdJob);
  } catch (error) {
    logger.error("Failed to save job:", error);
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
    logger.error("Failed to fetch applicants:", error);
    res.status(500).send("Failed to fetch applicants");
  }
};

exports.getApplicationsCandidate = async (req, res) => {
  try {
    const result = await userService.getApplicationsCandidate(
      req.headers["x-access-token"]
    );
    res.status(200).send(result);
  } catch (error) {
    logger.error("Failed to fetch applications:", error);
    res.status(500).send("Failed to fetch applications");
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
    logger.error("Error updating application:", error);
    res.status(500).send("Error updating application");
  }
};

exports.applyJob = async (req, res) => {
  try {
    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        message: "Data to update cannot be empty!",
      });
    }
    const token = req.headers["x-access-token"];
    const jobId = req.query.jobID;
    const createdApplication = await userService.createApplication(
      token,
      jobId
    );
    res.status(200).send(createdApplication);
  } catch (error) {
    logger.error("Failed to save application:", error);
    res.status(500).send("Failed to save application");
  }
};

exports.readUsers = async (req, res) => {
  try {
    const users = await userService.getAlluserModels();
    res.status(200).send(users);
  } catch (error) {
    logger.error("Failed to fetch users:", error);
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
    logger.error("Failed to update User:", error);
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
    logger.error("Failed to delete user:", error);
    res.status(500).send("Failed to delete user");
  }
};

exports.deleteJobPosting = async (req, res) => {
  try {
    const deletedJobPosting = await userService.deleteJobPosting(
      req.query.jobID
    );
    if (!deletedJobPosting) {
      res.status(404).send("Job not found");
    } else {
      res.status(200).json("Successfully deleted jobPosting!");
    }
  } catch (error) {
    logger.error("Failed to delete Job:", error);
    res.status(500).send("Failed to delete Job");
  }
};

exports.readJobPostings = async (req, res) => {
  try {
    const jobPostings = await userService.getAllJobPostings();
    res.status(200).send(jobPostings);
  } catch (error) {
    logger.error("Failed to fetch jobPostings:", error);
    res.status(500).send("Failed to fetch jobPostings");
  }
};

exports.updateJobPosting = async (req, res) => {
  try {
    const updatedFields = req.body;
    console.log(req.query.jobID);
    console.log(updatedFields);
    await userService.updatejobPostingsModel(req.query.jobID, updatedFields);
    res.status(200).json({ message: "JobPosting updated successfully" });
  } catch (error) {
    logger.error("Error updating JobPosting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.generateUserResume = async (req, res) => {
  try {
    const filePath = await userService.generateResumePdf(
      req.headers["x-access-token"]
    );
    res.download(filePath);
    onFinished(res, () => {
      fs.unlink(filePath, (err) => {
        if (err) logger.error("Failed to delete resume from disk:", filePath);
      });
    });
  } catch (error) {
    logger.error("Error generating resume-controller");
    res.status(500).send("Failed to generate resume");
  }
};

exports.getResume = async (req, res) => {
  try {
    const resume = await userService.getResume(req.query.candidateID);
    res.status(200).sendFile(resume);
  } catch (error) {
    logger.error("Failed to fetch resume:", error);
    res.status(500).send("Failed to fetch resume");
  }
};

exports.getResume = async (req, res) => {
  try {
    const resume = await userService.getResume(req.query.candidateID);

    if (resume === "resume not uploaded.") {
      res.status(200).send("resume not uploaded.");
    } else if (resume && fs.existsSync(resume)) {
      res.status(200).sendFile(resume);
    } else {
      res.status(200).send("No resume found");
    }
  } catch (error) {
    logger.error("Failed to fetch resume:", error);
    res.status(200).send("Failed to fetch resume");
  }
};

exports.getPhoto = async (req, res) => {
  try {
    const photo = await userService.getPhoto(req.query.candidateID);

    if (photo === "Photo not uploaded.") {
      res.status(200).send("Photo not uploaded.");
    } else if (photo && fs.existsSync(photo)) {
      res.status(200).sendFile(photo);
    } else {
      res.status(200).send("No photo found");
    }
  } catch (error) {
    logger.error("Failed to fetch photo:", error);
    res.status(200).send("Failed to fetch photo");
  }
};

exports.uploadFileMiddleware = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      userService.upload.single("file")(req, res, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.postResume = async (req, res) => {
  try {
    logger.info(req.file);
    const result = await userService.postResume(
      req.file,
      req.headers["x-access-token"],
      req.file.path
    );
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.postPhoto = async (req, res) => {
  try {
    logger.info(req.file);
    const result = await userService.postPhoto(
      req.file,
      req.headers["x-access-token"],
      req.file.path
    );
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers(req.headers["x-access-token"]);
    res.status(200).send(users);
  } catch (error) {
    logger.error("Failed to fetch users:", error);
    res.status(500).send("Failed to fetch users");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.query.id);
    if (!deletedUser) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json("Successfully deleted user!");
    }
  } catch (error) {
    logger.error("Failed to delete user:", error);
    res.status(500).send("Failed to delete user");
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applicationsData = await userService.getApplicationsAdmin();
    res.status(200).send(applicationsData);
  } catch (error) {
    logger.error("Failed to fetch applications:", error);
    res.status(500).send("Failed to fetch applications");
  }
};

exports.getApplicationStats = async (req, res) => {
  try {
    const applicationsData = await userService.getApplicationStats();
    res.status(200).send(applicationsData);
  } catch (error) {
    logger.error("Failed to fetch applications:", error);
    res.status(500).send("Failed to fetch applications");
  }
};

exports.getAllCandidateStats = async (req, res) => {
  try {
    const stats = await userService.getAllCandidateStats(
      req.headers["x-access-token"]
    );
    res.status(200).send(stats);
  } catch (error) {
    logger.error("Failed to fetch stats:", error);
    res.status(500).send("Failed to fetch stats");
  }
};

exports.getAllEmployerStats = async (req, res) => {
  try {
    const stats = await userService.getAllEmployerStats(
      req.headers["x-access-token"]
    );
    res.status(200).send(stats);
  } catch (error) {
    logger.error("Failed to fetch stats:", error);
    res.status(500).send("Failed to fetch stats");
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await userService.deleteApplication(
      req.query.id
    );
    if (!deletedApplication) {
      res.status(404).send("Application not found");
    } else {
      res.status(200).json("Successfully deleted application!");
    }
  } catch (error) {
    logger.error("Failed to delete application:", error);
    res.status(500).send("Failed to delete application");
  }
};

exports.getAllStats = async (req, res) => {
  try {
    const stats = await userService.getAllStats();
    res.status(200).send(stats);
  } catch (error) {
    logger.error("Failed to fetch stats:", error);
    res.status(500).send("Failed to fetch stats");
  }
};

exports.search = async (req, res) => {
  try {
    const { model, key, value } = req.body;
    const results = await userService.search(
      model,
      key,
      value,
      req.headers["x-access-token"]
    );
    res.status(200).send(results);
  } catch (error) {
    logger.error("Failed to fetch results:", error);
    res.status(500).send("Failed to fetch results");
  }
};
