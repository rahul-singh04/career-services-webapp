const express = require("express");
const cors = require("cors");

const config = require("./app/config/");
const serverConfig = config.serverConfig;
const logger = config.loggerConfig.logger;

const models = require("./app/models/");
const { userService } = require("./app/services");
const roleModel = models.roleModel;

var corsOptions = {
  origin: serverConfig.corsOrigin,
};

const PORT = process.env.PORT || serverConfig.serverPort;
const path = __dirname + "/app/views/";
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));

app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
async function printUserCounts() {
  try {
    const userTypes = await userService.getAllCandidateStats(
      "64c31179a5521784747fcad9"
    );
    console.log(userTypes);
  } catch (error) {
    console.error("Error fetching user types:", error);
  }
}

app.use(async (req, res, next) => {
  try {
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.originalUrl);
    console.log("Request Body:", req.body);

    const oldSend = res.send;
    res.send = async function (data) {
      console.log("Response Body:", data);
      await oldSend.apply(res, arguments);
    };

    await next();
  } catch (error) {
    next(error);
  }
});

models.mongoose
  .connect(serverConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to the database!");
    initial();
    //printUserCounts();
  })
  .catch((err) => {
    logger.error("Cannot connect to the database!", err);
    process.exit();
  });

async function initial() {
  try {
    const count = await roleModel.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new roleModel({ name: "candidate" }).save(),
        new roleModel({ name: "employer" }).save(),
        new roleModel({ name: "admin" }).save(),
      ]);

      logger.notice("Roles added to the collection");
    }
  } catch (err) {
    logger.error("Error adding roles to the collection", err);
  }
}

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
