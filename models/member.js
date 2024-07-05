'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      member.hasOne(models.history, {
        foreignKey: "idMembers",
        sourceKey: "id",
        as: "lastHistory",
      });
    }
  }
  member.init({
    idGrup: DataTypes.INTEGER,
    name: DataTypes.STRING,
    ip: DataTypes.STRING,
    lastUpdate: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'member',
  });
  return member;
};