'use strict';
module.exports = (sequelize, DataTypes) => {
  const prefectures = sequelize.define('prefectures', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    symbol_url: DataTypes.STRING
  }, {
      timestamps: false
    });
  prefectures.associate = function (models) {
    models.prefectures.hasOne(models.weathers, { foreignKey: 'prefecture_id' });
  };
  return prefectures;
};
