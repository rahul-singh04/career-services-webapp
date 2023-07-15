const controller = require("../controllers");
const authController = controller.authController;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    authController.verifySignUp,
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);
};
