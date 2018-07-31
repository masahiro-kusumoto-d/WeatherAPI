'use strict';
module.exports = (sequelize, DataTypes) => {
  const prefectures = sequelize.define('prefectures', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    symbol_url: DataTypes.STRING,
  }, {
      timestamps: false
    });
  prefectures.associate = function (models) {
    models.prefectures.hasMany(models.weathers, { foreignKey: 'prefecture_id' });
  };
  return prefectures;
};