const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: DataTypes.STRING,
  },
  {
    sequelize, 
    modelName: "user",
    underscored: true,
    timestamps: false,
  }
);

module.exports = User;
