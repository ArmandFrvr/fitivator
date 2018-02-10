var Sequelize = require('sequelize');
var EncryptedField = require('sequelize-encrypted');
var key = process.env.ENC_KEY || '6899312f568704dff96d3d86cbceb0649ede2b06e1a9e04df1c58b0b9fc69fe4';
var enc_fields = EncryptedField(Sequelize, key);

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
    encrypted: enc_fields.vault('encrypted'),
    password: enc_fields.field("password", {
      type: DataTypes.STRING,
      validate: {
        notContains: "<",
        notContains: ">",
        len: [5]
      },
      get: function() {
        return this.getDataValue("password");
      },
      set: function(val) {
          this.setDataValue("password", val);
      }
    }),
    firstName: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true,
      validate: {
        min: 1,
        isAlpha: true  // only allow letters
      }
    },
    lastName: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true,
      validate: {
        min: 1,
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true,
      validate: {
        len: [7]
      }
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true,
      default: "I am awesome!"
    },
    fitCash: {
      type: DataTypes.DECIMAL(10,2),
      default: 0.00
    },
    wantsCalls: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    team: {
      type: DataTypes.STRING,
      default: "Bootcamp Brawlers"  // hardcoded value until we support multiple teams
    },
    makesCalls: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    matchQuestions: {
      type: DataTypes.STRING,
      default: null,
      get: function() {
        if(this.getDataValue("matchQuestions")) {
          return this.getDataValue("matchQuestions").split(";");
        }
        return null;
      },
      set: function(val) {
          this.setDataValue("matchQuestions", val.join(";"));
      }
    },
    imgURL: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    externalID: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true
    }
  },
  {
    instanceMethods: {
      toJSON: function() {
        var values = this.get();
        delete values.password;
        delete values.encrypted;
        return values;
        // not working... see https://github.com/mickhansen/ssacl-attribute-roles for
        // alternative
      }
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
