// Users have workouts
// Workout fields:  user ID (FK ref. user), day (string), time (datetime)

// when a user is deleted their workouts must be deleted, but not vice versa
// probably don't need to handle deletes right now anyway but still

// Workout model goes here

var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

module.exports = function(sequelize, DataTypes) {
  var Workout = sequelize.define("Workout", {


    day: {
      type: DataTypes.STRING,
      // allowNull: false,    // have to let these be null if we want them to update independently
      validate: {
        isIn: daysOfWeek
      }
    },
    time: {
      type: DataTypes.DATE
      // allowNull: false
    }
  });

  // Workouts belong to users
  Workout.associate = function(models) {
    Workout.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Workout;
};
