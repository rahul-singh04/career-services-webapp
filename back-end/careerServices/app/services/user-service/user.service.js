const models = require("../../models");
const { logger } = require("../../config").loggerConfig;
const { writeToPdf, extractuserModelIdFromToken } = require("./user.util");
const mongoose = models.mongoose;
const userModel = models.userModel;
const jobPostingsModel = models.jobPostingsModel;
const applicationModel = models.applicationModel;
const roleModel = models.roleModel;
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
    .populate("employerID", "username email fullName")
    .exec();
  return jobs.map((job) => {
    const {
      _id,
      jobTitle,
      jobDesc,
      employerID,
      companyLocation,
      workLocation,
      totalOpenings,
      datePosted,
    } = job;
    const { username, email, fullName , _id:employerId } = employerID;
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
        fullName,
        _id:employerId
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

exports.createApplication = async (token, jobID) => {
  const application = {
    candidateID: new models.mongoose.Types.ObjectId(
      extractuserModelIdFromToken(token)
    ),
    jobID: new models.mongoose.Types.ObjectId(jobID),
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

// exports.deleteuserModel = async (userID) => {
//   return userModel
//     .findByIdAndRemove(userID, { useFindAndModify: false })
//     .exec();
// };

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

exports.getApplications = async (token) => {
  const id = extractuserModelIdFromToken(token);
  console.log(id);
  const applications = await applicationModel.find({ candidateID: id }).exec();
  const candidateIDs = applications.map((app) => app.candidateID);
  const jobIDs = applications.map((app) => app.jobID);
  const jobs = await jobPostingsModel.find({ _id: { $in: jobIDs } }).exec();

  const users = await userModel
    .find({ _id: { $in: candidateIDs } })
    .select("-password -roles") // Exclude 'password' and 'roles' fields
    .exec();

  return applications.map((app) => {
    const user = users.find(
      (user) => user._id.toString() === app.candidateID.toString()
    );

    const job = jobs.find((job) => job._id.toString() === app.jobID.toString());

    return {
      _id: app._id,
      candidateID: app.candidateID,
      jobID: app.jobID,
      status: app.status,
      job: job,
    };
  });
};

exports.getUsers = async (token) => {
  const id = extractuserModelIdFromToken(token);
  const users = await userModel.find({ _id: { $ne: id } }).exec();
  const adminRole = await roleModel.findOne({ name: "admin" }).exec();
  if (!adminRole) {
    throw new Error("Admin role not found!");
  }
  const filteredUsers = users.filter((user) => {
    return !user.roles.some((roleId) => roleId.equals(adminRole._id));
  });
  return filteredUsers.map((user) => {
    const { password, roles, ...userInfo } = user._doc;
    const userRole = roles.find((roleId) => !roleId.equals(adminRole._id));
    const userType = userRole ? userRole.name : null;
    return { ...userInfo, userType };
  });
};

exports.getApplicationsAdmin = async () => {
  const applications = await applicationModel.find().exec();
  const candidateIDs = applications.map((app) => app.candidateID);
  const jobIDs = applications.map((app) => app.jobID);
  const jobs = await jobPostingsModel.find({ _id: { $in: jobIDs } }).exec();
  const users = await userModel
    .find({ _id: { $in: candidateIDs } })
    .select("-password -roles")
    .exec();

  return applications.map((app) => {
    const user = users.find(
      (user) => user._id.toString() === app.candidateID.toString()
    );

    const job = jobs.find((job) => job._id.toString() === app.jobID.toString());

    return {
      _id: app._id,
      candidateID: app.candidateID,
      jobID: app.jobID,
      status: app.status,
      user: user,
      job: job,
    };
  });
};

exports.getApplicationStats = async () => {
  const pipeline = [
    // Group applications by jobID, jobTitle, companyLocation, and status
    {
      $group: {
        _id: {
          jobID: "$jobID",
          jobTitle: "$jobTitle",
          companyLocation: "$companyLocation",
          status: "$status",
        },
        count: { $sum: 1 },
      },
    },
    // Add missing combinations of jobID, jobTitle, and companyLocation with 0 counts for each status
    {
      $group: {
        _id: {
          jobID: "$_id.jobID",
          jobTitle: "$_id.jobTitle",
          companyLocation: "$_id.companyLocation",
        },
        statuses: {
          $push: {
            k: "$_id.status",
            v: "$count",
          },
        },
        totalApplications: { $sum: "$count" },
      },
    },
    // Add missing status entries with 0 count
    {
      $addFields: {
        statuses: {
          $concatArrays: [
            {
              $map: {
                input: [
                  "In progress",
                  "Accepted",
                  "New",
                  "Interview Posted",
                  "Rejected",
                ],
                as: "status",
                in: {
                  k: "$$status",
                  v: {
                    $cond: [
                      {
                        $eq: ["$$status", { $arrayElemAt: ["$statuses.k", 0] }],
                      },
                      { $arrayElemAt: ["$statuses.v", 0] },
                      0,
                    ],
                  },
                },
              },
            },
            "$statuses",
          ],
        },
      },
    },
    // Reshape the data to convert statuses array to an object
    {
      $project: {
        _id: 0,
        jobID: "$_id.jobID",
        jobTitle: "$_id.jobTitle",
        companyLocation: "$_id.companyLocation",
        statuses: { $arrayToObject: "$statuses" },
        totalApplications: 1,
      },
    },
  ];

  const applicationStats = await applicationModel.aggregate(pipeline).exec();

  return applicationStats;
};

exports.getUserCount = async () => {
  const pipeline = [
    {
      $group: {
        _id: "$roles",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        roles: "$_id",
        count: 1,
      },
    },
  ];

  const userTypesWithIds = await userModel.aggregate(pipeline).exec();
  const roleIdToNameMap = {
    "64b0418f959c57c5476cb9fa": "Candidate",
    "64b0418f959c57c5476cb9fb": "Employer",
    "64b0418f959c57c5476cb9fc": "Admin",
  };
  const userTypes = userTypesWithIds.map((userType) => {
    const roleName = roleIdToNameMap[userType.roles[0].toString()];
    return { count: userType.count, roles: roleName };
  });
  return userTypes;
};

// write a function which will return the top 3 company locations, top 3 work locations and average number of openings from the job postings model
exports.getJobStats = async () => {
  const pipeline = [
    {
      $match: {
        companyLocation: { $ne: null }, // Filter out documents where companyLocation is null or not present
      },
    },
    {
      $group: {
        _id: "$companyLocation",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        companyLocation: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 3,
    },
  ];

  const companyLocations = await jobPostingsModel.aggregate(pipeline).exec();

  const pipeline2 = [
    {
      $match: {
        workLocation: { $ne: null }, // Filter out documents where workLocation is null or not present
      },
    },
    {
      $group: {
        _id: "$workLocation",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        workLocation: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 3,
    },
  ];

  const workLocations = await jobPostingsModel.aggregate(pipeline2).exec();

  const pipeline3 = [
    {
      $match: {
        totalOpenings: { $ne: null }, // Filter out documents where totalOpenings is null or not present
      },
    },
    {
      $group: {
        _id: null,
        avgOpenings: { $avg: { $toInt: "$totalOpenings" } },
      },
    },
    {
      $project: {
        _id: 0,
        avgOpenings: { $round: ["$avgOpenings", 0] },
      },
    },
  ];

  const avgOpenings = await jobPostingsModel.aggregate(pipeline3).exec();

  return {
    companyLocations,
    workLocations,
    avgOpenings,
  };
};

exports.getCandidateStats = async () => {
  const pipeline = [
    {
      $match: {
        location: { $ne: null }, // Filter out documents where location is null or not present
      },
    },
    {
      $group: {
        _id: "$location",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        location: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 3,
    },
  ];

  const locations = await userModel.aggregate(pipeline).exec();

  const pipeline2 = [
    {
      $match: {
        skills: { $ne: null }, // Filter out documents where skills is null or not present
      },
    },
    {
      $unwind: "$skills",
    },
    {
      $group: {
        _id: "$skills",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        skill: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 3,
    },
  ];

  const skills = await userModel.aggregate(pipeline2).exec();

  return {
    locations,
    skills,
  };
};

exports.deleteUserCandidate = async (userID) => {
  try {
    const deletedUser = await userModel.findByIdAndRemove(userID).exec();
    const deletedApplications = await applicationModel
      .deleteMany({ candidateID: userID })
      .exec();
    return { deletedUser, deletedApplications };
  } catch (error) {
    throw new Error("Failed to delete the user and its applications.");
  }
};

exports.deleteUserEmployer = async (userID) => {
  try {
    // Step 1: Find the user and get the jobIDs associated with the user's job postings
    const deletedUser = await userModel.findByIdAndRemove(userID).exec();
    const userJobIDs = await jobPostingsModel
      .find({ employerID: userID }, "_id")
      .exec();
    const jobIDs = userJobIDs.map((job) => job._id);

    // Step 2: Delete the job postings associated with the user
    const deletedJobs = await jobPostingsModel
      .deleteMany({ employerID: userID })
      .exec();

    // Step 3: Delete the corresponding applications using the jobIDs
    const deletedApplications = await applicationModel
      .deleteMany({ jobID: { $in: jobIDs } })
      .exec();
    // Assuming applicationModel is the model for the applications collection

    return { deletedUser, deletedJobs, deletedApplications };
  } catch (error) {
    throw new Error(
      "Failed to delete the user, its jobs, and corresponding applications."
    );
  }
};

// // write a function to delete the user, if the user is of type employer delete all the corresponding job postings and applications as well
// exports.deleteUser = async (userID) => {
//   try {
//     const deletedUser = await userModel.findByIdAndRemove(userID).exec();
//     const deletedApplications = await applicationModel
//       .deleteMany({ candidateID: userID })
//       .exec();
//     const deletedJobs = await jobPostingsModel
//       .deleteMany({ employerID: userID })
//       .exec();
//     return { deletedUser, deletedApplications, deletedJobs };
//   } catch (error) {
//     throw new Error("Failed to delete the user and its applications.");
//   }
// };

exports.deleteJobPosting = async (jobId) => {
  try {
    const deletedJob = await jobPostingsModel.findByIdAndRemove(jobId).exec();
    const deletedApplications = await applicationModel
      .deleteMany({ jobID: jobId })
      .exec();
    return { deletedJob, deletedApplications };
  } catch (error) {
    throw new Error("Failed to delete the job and its applications.");
  }
};

exports.deleteApplication = async (applicationID) => {
  return applicationModel
    .findByIdAndRemove(applicationID, { useFindAndModify: false })
    .exec();
};

// write a function which calls deleteUserCandidate or deleteUserEmployer based on the userType which has to be extracted from the roles array
exports.deleteUser = async (userID) => {
  const user = await userModel.findById(userID).exec();
  const role = await user.roles[0].toString();
  if (role === "64b0418f959c57c5476cb9fa") {
    return this.deleteUserCandidate(userID);
  }
  if (role === "64b0418f959c57c5476cb9fb") {
    return this.deleteUserEmployer(userID);
  }
  return null;
};
