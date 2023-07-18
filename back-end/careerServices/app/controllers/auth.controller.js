const service = require("../services");
const authService = service.authService;

exports.verifySignUp = async (req, res, next) => {
  try {
    await authService.checkDuplicateUsernameOrEmail(
      req.body.username,
      req.body.email
    );

    authService.checkRolesExisted(req.body.roles);

    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    await authService.signup(username, email, password, roles);
    res.status(200).json({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authService.signin(username, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    await authService.verifyToken(token);
    const decoded = await authService.verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const roles = await authService.getUserRoles(req.userId);

    if (roles.includes("admin")) {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.isEmployer = async (req, res, next) => {
  try {
    const roles = await authService.getUserRoles(req.userId);

    if (roles.includes("employer")) {
      next();
    } else {
      res.status(403).send({ message: "Require Employer Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.isCandidate = async (req, res, next) => {
  try {
    const roles = await authService.getUserRoles(req.userId);

    if (roles.includes("candidate")) {
      next();
    } else {
      res.status(403).send({ message: "Require Candidate Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
