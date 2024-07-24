'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      purchaseDate: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB
      },
      description: {
        type: Sequelize.STRING
      },
      warrantyExpired: {
        type: Sequelize.STRING
      },
      serialNumber: {
        type: Sequelize.STRING
      },
      assignedFor: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};