const controller = require("../controllers");
const authController = controller.authController;
const userController = controller.userController;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", userController.allAccess);

  app.get(
    "/api/test/candidate",
    [authController.verifyToken],
    userController.candidateBoard
  );

  app.get(
    "/api/test/employer",
    [authController.verifyToken, authController.isEmployer],
    userController.employerBoard
  );

  app.get(
    "/api/test/candidate/getUserProfile",
    [authController.verifyToken, authController.isCandidate],
    userController.getUserProfile
  );
  app.put(
    "/api/test/candidate/updateUserProfile",
    [authController.verifyToken, authController.isCandidate],
    userController.updateUserProfile
  );

  app.get(
    "/api/test/admin",
    [authController.verifyToken, authController.isAdmin],
    userController.adminBoard
  );

  app.get(
    "/api/test/employer/browseCandidates",
    [authController.verifyToken, authController.isEmployer],
    userController.browseCandidates
  );
  app.get(
    "/api/test/candidate/browseJobs",
    [authController.verifyToken, authController.isCandidate],
    userController.browseJobs
  );
  app.get(
    "/api/test/employer/getJobsPosted",
    [authController.verifyToken, authController.isEmployer],
    userController.getJobsPosted
  );
  app.post(
    "/api/test/employer/postJob",
    [authController.verifyToken, authController.isEmployer],
    userController.postJob
  );
  app.post(
    "/api/test/candidate/applyJob",
    [authController.verifyToken, authController.isCandidate],
    userController.applyJob
  );
  app.get(
    "/api/test/employer/getApplicants",
    [authController.verifyToken, authController.isEmployer],
    userController.getApplicants
  );
  app.put(
    "/api/test/employer/putInterview",
    [authController.verifyToken, authController.isEmployer],
    userController.putInterview
  );
  app.get(
    "/api/test/admin/readUsers",
    [authController.verifyToken, authController.isAdmin],
    userController.readUsers
  );
  app.get(
    "/api/test/admin/readJobPostings",
    [authController.verifyToken, authController.isAdmin],
    userController.readJobPostings
  );
  app.get(
    "/api/test/candidate/resume",
    // [authController.verifyToken, authController.isCandidate],
    userController.generateUserResume
  );
};
