module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        isAlphanumeric: true  // only allow letters
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        isAlpha: true  // only allow letters
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        len: [7],
        isInt: true
      }
    },
    aboutMe: {
      type: DataTypes.TEXT
    },
    fitCash: {
      type: DataTypes.DECIMAL(10,2),
      default: 0.00
    },
    wantsCalls: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false
    },
    team: {
      type: DataTypes.STRING,
      default: "Bootcamp Brawlers"  // hardcoded value until we support multiple teams
    },
    makesCalls: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false
    },
    matchQuestions: {
      type: DataTypes.STRING,
      get: function() {
        return this.getDataValue("matchQuestions").split(";");
      },
      set: function(val) {
        this.setDataValue("matchQuestions", val.join(";"));
      }
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    externalID: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  // Users have 0 or more Workouts
  User.associate = function(models) {

    User.hasMany(models.Workout, {
      onDelete: "cascade"   // delete their workouts if a user is deleted
    });

    // User associated with another user for their match
    User.hasOne(User, {
      as: "matchedUser",
      onDelete: "set null"
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
