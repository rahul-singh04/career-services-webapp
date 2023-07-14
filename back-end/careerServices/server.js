const express = require("express");
const cors = require("cors");
const config = require("./app/config/config");
const { logger } = require("./app/config/logger")

const db = require("./app/models");
const Role = db.role;

var corsOptions = {
  origin: config.corsOrigin,
};

const PORT = process.env.PORT || config.serverPort;
const path = __dirname + "/app/views/";

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to careerServices application!" });
// });

app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to the database!");
    initial();
  })
  .catch((err) => {
    logger.error("Cannot connect to the database!", err);
    process.exit();
  });

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new Role({ name: "candidate" }).save(),
        new Role({ name: "employer" }).save(),
        new Role({ name: "admin" }).save(),
      ]);

      logger.notice("Roles added to the collection");
    }
  } catch (err) {
    logger.error("Error adding roles to the collection", err);
  }
}

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
