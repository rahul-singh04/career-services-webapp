module.exports = (app) => {
  const dummy = require("../controllers/dummy.controller.js");

  var router = require("express").Router();

  router.post("/", dummy.create);
  router.get("/", dummy.findAll);
  router.put("/:id", dummy.update);
  router.delete("/:id", dummy.delete);
  app.use("/api/dummy", router);
};
