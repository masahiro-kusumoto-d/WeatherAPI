'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('weathers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prefecture_id: {
        type: Sequelize.INTEGER
      },
      condition: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      temp_min: {
        type: Sequelize.INTEGER
      },
      temp_max: {
        type: Sequelize.INTEGER
      },
      icon_url: {
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
  down: (queryInterface) => {
    return queryInterface.dropTable('weathers');
  }
};