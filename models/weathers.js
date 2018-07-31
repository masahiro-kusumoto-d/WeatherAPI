'use strict';
module.exports = (sequelize, DataTypes) => {
  const weathers = sequelize.define('weathers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    prefecture_id: DataTypes.INTEGER,
    condition: DataTypes.STRING,
    date: DataTypes.DATE,
    temp_min: DataTypes.INTEGER,
    temp_max: DataTypes.INTEGER,
    icon_url: DataTypes.STRING
  }, {
      timestamps: false
    });
  weathers.associate = function (models) {
    models.weathers.belongsTo(models.prefectures, {
      onDelete: "CASCADE",
      foreignKey: 'id'
    });
  };
  return weathers;
};