'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pengaduan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pengaduan.init({
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    context: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pengaduan',
  });
  return pengaduan;
};