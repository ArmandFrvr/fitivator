var db = require("../models");

module.exports = function(app) {

  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/users/:uname", function(req, res) {

    db.User.findOne({
      where: {
        username: req.params.uname
      },
      include: [db.Workout]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.put("/api/users/:uname", function(req, res) {
    db.User.update(
      req.body,
      {
        where: {
          username: req.params.uname
        }
      }).then(function(dbUser) {
        res.json(dbUser);
      });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
