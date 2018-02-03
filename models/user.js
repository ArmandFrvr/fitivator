module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        isAlpha: true  // only allow letters
      }
    },
    fitCash: {
      type: DataTypes.DECIMAL(10,2),
      default: 0.00
    }

    // Need to define other user fields here

    // User attributes for matchMaking-- what questions should we ask?
    // We save this in the db so users can be matched in the future
    //Maybe make this a separate table from users



  });

  // Users have 0 or more Workouts
  User.associate = function(models) {
    User.hasMany(models.Workout, {
      onDelete: "cascade"   // delete their workouts if a user is deleted
    });
  };

  // MatchQuestions
    // Model that stores the questions users enter to match with other users

  // Will reference other users when a user is matched with someone

// Associations with other models once we determine what those are
  // User.associate = function(models) {
  //   // Associating Author with Posts
  //   // When an Author is deleted, also delete any associated Posts
  //   User.hasMany(models.Post, {
  //     onDelete: "cascade"
  //   });
  // };

  return User;
};
