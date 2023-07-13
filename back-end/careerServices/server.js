const express = require("express");
const cors = require("cors");

const db = require("./app/models");

const app = express();
const Role = db.role;
var corsOptions = {
  origin: "http://localhost:5173",
};

const PORT = process.env.PORT || 3090;

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to careerServices application!" });
});

require("./app/routes/dummy.routes")(app);
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
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
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
