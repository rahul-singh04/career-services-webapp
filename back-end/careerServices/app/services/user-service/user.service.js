const models = require("../../models");
const { logger } = require("../../config").loggerConfig;
const { writeToPdf, extractuserModelIdFromToken } = require("./user.util");
const mongoose = models.mongoose;
const userModel = models.userModel;
const jobPostingsModel = models.jobPostingsModel;
const applicationModel = models.applicationModel;
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const id = extractuserModelIdFromToken(req.headers["x-access-token"]);
    const originalExtension = path.extname(file.originalname);
    cb(null, id + originalExtension);
  },
});

exports.upload = multer({ storage: storage });

exports.getFilteredCandidates = async () => {
  const users = await userModel.find({}).populate("roles").exec();
  const candidates = users.filter((user) =>
    user.roles.some((role) => role.name === "candidate")
  );
  return candidates.map((candidate) => {
    const { password, roles, ...candidateInfo } = candidate._doc;
    return candidateInfo;
  });
};
exports.getAllJobs = async () => {
  const jobs = await jobPostingsModel
    .find()
    .populate("employerID", "username email")
    .exec();
  return jobs.map((job) => {
    const {
      _id,
      jobTitle,
      jobDesc,
      fullName,
      employerID,
      companyLocation,
      workLocation,
      totalOpenings,
      datePosted,
    } = job;
    const { username, email } = employerID;
    return {
      _id,
      jobTitle,
      jobDesc,
      fullName,
      companyLocation,
      workLocation,
      totalOpenings,
      datePosted,
      employerID: {
        username,
        email,
      },
    };
  });
};

exports.getJobs = async (token) => {
  const userId = new mongoose.Types.ObjectId(
    extractuserModelIdFromToken(token)
  );
  return jobPostingsModel.find({ employerID: userId }).exec();
};

exports.getUserProfile = async (token) => {
  const userId = new mongoose.Types.ObjectId(
    extractuserModelIdFromToken(token)
  );
  return userModel.findOne({ _id: userId }, { password: 0, roles: 0 }).exec();
};

exports.updateUserProfile = async (token, updatedFields) => {
  const userId = new mongoose.Types.ObjectId(
    extractuserModelIdFromToken(token)
  );

  try {
    const result = await userModel
      .updateOne({ _id: userId }, { $set: updatedFields })
      .exec();
    return result;
  } catch (error) {
    logger.error("Error updating user profile:", error);
    throw error;
  }
};
exports.updateJobPosting = async (token, updatedFields) => {
  const userId = new mongoose.Types.ObjectId(
    extractuserModelIdFromToken(token)
  );

  try {
    const result = await jobPostingsModel
      .updateOne({ _id: userId }, { $set: updatedFields })
      .exec();
    return result;
  } catch (error) {
    logger.error("Error updating job posting:", error);
    throw error;
  }
};

exports.generateResumePdf = async (token) => {
  try {
    const user = await this.getUserProfile(token);
    return await writeToPdf(user);
  } catch (error) {
    logger.error(`Error generating resume for user: ${userId}`);
    throw error;
  }
};

exports.createJob = async (token, jobTitle, jobDesc, additionalParams) => {
  try {
    console.log(additionalParams);
    const userId = extractuserModelIdFromToken(token);
    const job = {
      employerID: userId,
      jobTitle: jobTitle,
      jobDesc: jobDesc,
      ...additionalParams,
    };
    const createdJob = await jobPostingsModel.create(job);
    return createdJob;
  } catch (error) {
    throw new Error("Failed to create job: " + error.message);
  }
};

exports.getApplicants = async (jobID, token) => {
  const jobObjectId = new mongoose.Types.ObjectId(jobID);
  const applications = await applicationModel
    .find({ jobID: jobObjectId })
    .exec();
  const candidateIDs = applications.map((app) => app.candidateID);
  const users = await userModel
    .find({ _id: { $in: candidateIDs } })
    .select("-password -roles") // Exclude 'password' and 'roles' fields
    .exec();
  return applications.map((app) => {
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
};

exports.updateApplicationStatus = async (jobID, candidateID) => {
  const jobObjectId = new mongoose.Types.ObjectId(jobID);
  const candidateObjectId = new mongoose.Types.ObjectId(candidateID);
  logger.log(jobObjectId);
  logger.log(candidateObjectId);
  const updatedApplication = await applicationModel.findOneAndUpdate(
    { jobID: jobObjectId, candidateID: candidateObjectId },
    { status: "Interview Posted" },
    { useFindAndModify: false, new: true }
  );
  if (updatedApplication) {
    return { updated: true, application: updatedApplication };
  } else {
    return { updated: false };
  }
};

exports.createApplication = async (candidateID, token) => {
  const application = {
    candidateID: new models.mongoose.Types.ObjectId(candidateID),
    jobID: new models.mongoose.Types.ObjectId(
      extractuserModelIdFromToken(token)
    ),
    status: "New",
  };
  return applicationModel.create(application);
};

exports.getAlluserModels = async () => {
  return userModel.find().exec();
};

exports.updateuserModel = async (userID, userData) => {
  return userModel
    .findByIdAndUpdate(userID, userData, {
      new: true,
      useFindAndModify: false,
    })
    .exec();
};

exports.deleteuserModel = async (userID) => {
  return userModel
    .findByIdAndRemove(userID, { useFindAndModify: false })
    .exec();
};

exports.getAlljobPostingsModels = async () => {
  return jobPostingsModel.find().exec();
};

exports.updatejobPostingsModel = async (jobID, jobPostingData) => {
  return jobPostingsModel
    .findByIdAndUpdate(jobID, jobPostingData, {
      new: true,
      useFindAndModify: false,
    })
    .exec();
};

exports.deletejobPostingsModel = async (jobID) => {
  return userModel.findByIdAndRemove(jobID, { useFindAndModify: false }).exec();
};

exports.getAllApplications = async () => {
  return applicationModel.find().exec();
};

exports.updateApplication = async (applicationID, applicationData) => {
  return applicationModel
    .findByIdAndUpdate(applicationID, applicationData, {
      new: true,
      useFindAndModify: false,
    })
    .exec();
};

exports.deleteApplication = async (applicationID) => {
  return applicationModel
    .findByIdAndRemove(applicationID, { useFindAndModify: false })
    .exec();
};

exports.deleteApplication = async (applicationID) => {
  return applicationModel
    .findByIdAndRemove(applicationID, { useFindAndModify: false })
    .exec();
};

exports.getResume = async (id) => {
  const user = await userModel.findById(id);

  if (user && user.resumeUploaded !== "") {
    const baseDir = path.resolve(__dirname, "../../../");
    const filePath = path.join(baseDir, user.resumeUploaded);
    return filePath;
  } else {
    throw new Error("Resume not uploaded.");
  }
};

exports.getPhoto = async (id) => {
  const user = await userModel.findById(id);

  if (user && user.photoUploaded !== "") {
    const baseDir = path.resolve(__dirname, "../../../");
    const filePath = path.join(baseDir, user.photoUploaded);
    return filePath;
  } else {
    throw new Error("Photo not uploaded.");
  }
};

exports.postResume = async (file, token, filePath) => {
  if (!file) {
    throw new Error("No file uploaded.");
  } else {
    try {
      const id = extractuserModelIdFromToken(token);
      const resumeUploaded = filePath;

      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { resumeUploaded },
        { new: true }
      );

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("File uploaded successfully.");
        }, 1000);
      });
    } catch (error) {
      throw new Error("Failed to update the database.");
    }
  }
};

exports.postPhoto = async (file, token, filePath) => {
  if (!file) {
    throw new Error("No photo uploaded.");
  } else {
    try {
      const id = extractuserModelIdFromToken(token);
      const photoUploaded = filePath;

      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { photoUploaded },
        { new: true }
      );

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Photo uploaded successfully.");
        }, 1000);
      });
    } catch (error) {
      throw new Error("Failed to update the database.");
    }
  }
};
