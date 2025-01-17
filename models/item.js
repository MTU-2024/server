'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    name: DataTypes.STRING,
    purchaseDate: DataTypes.STRING,
    productionYear: DataTypes.STRING,
    image: DataTypes.BLOB,
    unitCode: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    warrantyExpired: DataTypes.STRING,
    description: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    assignedFor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};