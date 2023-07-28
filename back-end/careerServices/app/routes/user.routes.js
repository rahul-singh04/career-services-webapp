const controller = require("../controllers");
const authController = controller.authController;
const userController = controller.userController;

const config = require("../config");
const endPointConfig = config.endPointConfig;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    endPointConfig.candidateEndpoint + "/getUserProfile",
    [authController.verifyToken, authController.isCandidate],
    userController.getUserProfile
  );
  app.get(
    endPointConfig.employerEndpoint + "/getEmployerProfile",
    [authController.verifyToken, authController.isEmployer],
    userController.getUserProfile
  );
  app.put(
    endPointConfig.candidateEndpoint + "/updateUserProfile",
    [authController.verifyToken, authController.isCandidate],
    userController.updateUserProfile
  );
  app.get(
    endPointConfig.candidateEndpoint + "/browseJobs",
    [authController.verifyToken, authController.isCandidate],
    userController.browseJobs
  );
  app.post(
    endPointConfig.candidateEndpoint + "/applyJob",
    [authController.verifyToken, authController.isCandidate],
    userController.applyJob
  );

  app.get(
    endPointConfig.employerEndpoint + "/getCandidates",
    [authController.verifyToken, authController.isEmployer],
    userController.browseCandidates
  );
  app.delete(
    endPointConfig.employerEndpoint + "/deleteJobPosting",
    [authController.verifyToken, authController.isEmployer],
    userController.deleteJobPosting
  );
  app.get(
    endPointConfig.employerEndpoint + "/updateJobPosting",
    [authController.verifyToken, authController.isEmployer],
    userController.updateJobPosting
  );

  app.get(
    endPointConfig.employerEndpoint + "/getJobs",
    [authController.verifyToken, authController.isEmployer],
    userController.getJobs
  );
  app.post(
    endPointConfig.employerEndpoint + "/postJob",
    [authController.verifyToken, authController.isEmployer],
    userController.postJob
  );
  app.put(
    endPointConfig.employerEndpoint + "/updateEmployerProfile",
    [authController.verifyToken, authController.isEmployer],
    userController.updateUserProfile
  );

  app.get(
    endPointConfig.employerEndpoint + "/getApplicants",
    [authController.verifyToken, authController.isEmployer],
    userController.getApplicants
  );
  app.put(
    endPointConfig.employerEndpoint + "/putInterview",
    [authController.verifyToken, authController.isEmployer],
    userController.putInterview
  );
  app.get(
    endPointConfig.adminEndpoint + "/readUsers",
    [authController.verifyToken, authController.isAdmin],
    userController.readUsers
  );
  app.get(
    endPointConfig.adminEndpoint + "/readJobPostings",
    [authController.verifyToken, authController.isAdmin],
    userController.readJobPostings
  );
  app.get(
    endPointConfig.candidateEndpoint + "/resume",
    [authController.verifyToken, authController.isCandidate],
    userController.generateUserResume
  );

  app.get(
    endPointConfig.candidateEndpoint + "/getResume",
    [authController.verifyToken],
    userController.getResume
  );
  app.get(
    endPointConfig.candidateEndpoint + "/getPhoto",
    [authController.verifyToken],
    userController.getPhoto
  );

  app.post(
    endPointConfig.candidateEndpoint + "/postResume",
    [authController.verifyToken, authController.isCandidate],
    userController.uploadFileMiddleware,
    userController.postResume
  );
  app.post(
    endPointConfig.candidateEndpoint + "/postPhoto",
    [authController.verifyToken],
    userController.uploadFileMiddleware,
    userController.postPhoto
  );
  app.get(
    endPointConfig.candidateEndpoint + "/getApplications",
    [authController.verifyToken, authController.isCandidate],
    userController.getApplications
  );
  app.get(
    endPointConfig.adminEndpoint + "/getUsers",
    [authController.verifyToken, authController.isAdmin],
    userController.getUsers
  );

  app.delete(
    endPointConfig.adminEndpoint + "/deleteUser",
    [authController.verifyToken, authController.isAdmin],
    userController.deleteUser
  );
  app.get(
    endPointConfig.adminEndpoint + "/getJobs",
    [authController.verifyToken, authController.isAdmin],
    userController.browseJobs
  );
  app.delete(
    endPointConfig.adminEndpoint + "/deleteJobPosting",
    [authController.verifyToken, authController.isAdmin],
    userController.deleteJobPosting
  );
  app.get(
    endPointConfig.adminEndpoint + "/getApplications",
    [authController.verifyToken, authController.isAdmin],
    userController.getApplications
  );
  app.get(
    endPointConfig.adminEndpoint + "/getApplicationStats",
    [authController.verifyToken, authController.isAdmin],
    userController.getApplicationStats
  );
  app.delete(
    endPointConfig.adminEndpoint + "/deleteApplication",
    [authController.verifyToken, authController.isAdmin],
    userController.deleteApplication
  );
};
