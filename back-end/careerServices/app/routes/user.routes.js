const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/candidate",
    [authJwt.verifyToken],
    controller.candidateBoard
  );

  app.get(
    "/api/test/employer",
    [authJwt.verifyToken, authJwt.isEmployer],
    controller.employerBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/employer/browseCandidates",
    [authJwt.verifyToken, authJwt.isEmployer],
    controller.browseCandidates
  );
  app.get(
    "/api/test/candidate/browseJobs",
    [authJwt.verifyToken, authJwt.isCandidate],
    controller.browseJobs
  );
  app.get(
    "/api/test/employer/getJobsPosted",
    [authJwt.verifyToken, authJwt.isEmployer],
    controller.getJobsPosted
  );
  app.post(
    "/api/test/employer/postJob",
    [authJwt.verifyToken, authJwt.isEmployer],
    controller.postJob
  );
  app.post(
    "/api/test/candidate/applyJob",
    [authJwt.verifyToken, authJwt.isCandidate],
    controller.applyJob
  );
  app.get(
    "/api/test/employer/getApplicants",
    [authJwt.verifyToken, authJwt.isEmployer],
    controller.getApplicants
  );
  app.put(
    "/api/test/employer/putInterview",
    [authJwt.verifyToken, authJwt.isEmployer],
    controller.putInterview
  );
  app.get(
    "/api/test/admin/readUsers",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.readUsers
  );
  app.get(
    "/api/test/admin/readJobPostings",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.readJobPostings
  );
};
