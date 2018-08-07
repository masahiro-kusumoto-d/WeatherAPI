'use strict';
module.exports = (sequelize, DataTypes) => {
  const typhoons = sequelize.define('typhoons', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    center_longitude: DataTypes.FLOAT,
    center_latitude: DataTypes.FLOAT,
    central_pressure: DataTypes.INTEGER,
    intensity: DataTypes.STRING
  }, {
      timestamps: false
    });
  typhoons.associate = function () {
  };
  return typhoons;
};
