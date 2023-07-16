const jwt = require("jsonwebtoken");
const models = require("../../models");
const { logger } = require("../../config").loggerConfig;
const { writeToPdf } = require("./user.util")
const mongoose = models.mongoose;
const userModel = models.userModel;
const jobPostingsModel = models.jobPostingsModel;
const applicationModel = models.applicationModel;

exports.getPublicContent = async () => {
  return "Public Content.";
};

exports.getCandidateContent = async () => {
  return "Candidate Content.";
};

exports.getEmployerContent = async () => {
  return "Employer Content.";
};

exports.getAdminContent = async () => {
  return "Admin Content.";
};

exports.getFilteredCandidates = async () => {
  const users = await userModel.find({}).populate("roles").exec();
  const candidates = users.filter((user) =>
    user.roles.some((role) => role.name === "candidate")
  );
  return candidates.map((candidate) => {
    const { _id, password, roles, ...candidateInfo } = candidate._doc;
    return candidateInfo;
  });
};

exports.getAllJobs = async () => {
  const jobs = await jobPostingsModel
    .find()
    .populate("employerID", "username email")
    .exec();
  return jobs.map((job) => {
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
};

exports.getJobsPosted = async (token) => {
  const userId = new mongoose.Types.ObjectId(
    extractuserModelIdFromToken(token)
  );
  return jobPostingsModel.find({ employerID: userId }).exec();
};

exports.getUserProfile = async (token) => {
  const userId = new mongoose.Types.ObjectId(
    extractuserModelIdFromToken(token)
  );
  return userModel
    .findOne({ _id: userId }, { password: 0, _id: 0, roles: 0 })
    .exec();
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
    console.error("Error updating user profile:", error);
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
}

exports.createJob = async (token, jobTitle, jobDesc) => {
  const userId = new mongoose.Types.ObjectId(
    extractuserModelIdFromToken(token)
  );
  const job = {
    employerID: userId,
    jobTitle: jobTitle,
    jobDesc: jobDesc,
  };
  return jobPostingsModel.create(job);
};

exports.getApplicants = async (jobID, token) => {
  const jobObjectId = new mongoose.Types.ObjectId(jobID);
  const applications = await applicationModel
    .find({ jobID: jobObjectId })
    .exec();
  const candidateIDs = applications.map((app) => app.candidateID);
  const users = await userModel.find({ _id: { $in: candidateIDs } }).exec();
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
  console.log(jobObjectId);
  console.log(candidateObjectId);
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

const extractuserModelIdFromToken = (token) => {
  const decodedToken = jwt.decode(token, { complete: true });
  if (!decodedToken) {
    throw new Error("Invalid token");
  }
  return decodedToken.payload.id;
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
