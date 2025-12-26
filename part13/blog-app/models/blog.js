const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db"); // Make sure this is { sequelize }

class Blog extends Model {}

Blog.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize, // ✅ must be the Sequelize instance
    modelName: "blog",
    underscored: true,
    timestamps: false,
  }
);

module.exports = Blog;
