const express = require("express");
const cors = require("cors");

const config = require("./app/config/config");

const db = require("./app/models");
const Role = db.role;

var corsOptions = {
  origin: config.corsOrigin,
};

const PORT = process.env.PORT || config.serverPort;

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to careerServices application!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
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

      console.log("Roles added to the collection");
    }
  } catch (err) {
    console.log("Error adding roles to the collection", err);
  }
}

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
