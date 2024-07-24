"use strict";
const { Model } = require("sequelize");
const { hasPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Project, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "name is required",
          },
          notNull: { msg: "name is required" },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Invalid email format" },
        },
        unique: {
          args: true,
          msg: "Email must be unique",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 10],
          notNull: { msg: "Password is required" },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hasPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
