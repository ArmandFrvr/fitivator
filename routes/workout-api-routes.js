// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of a user's workouts
  app.get("/api/workouts", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Workout
    db.Workout.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbWorkout) {
      res.json(dbUser);
    });
  });

  // POST route for creating a new workout
  app.post("/api/workouts", function(req, res) {
    db.Post.create(req.body).then(function(dbWorkout) {
      res.json(dbWorkout);
    });
  });

  // DELETE route for deleting workouts
  app.delete("/api/workouts/:id", function(req, res) {
    db.Workout.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbWorkout) {
      res.json(dbWorkout);
    });
  });

  // PUT route for updating workouts
  // Will get called whenever user changes a workout day or time
  app.put("/api/workouts", function(req, res) {
    db.Workout.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbWorkout) {
        res.json(dbWorkout);
      });
  });
};
