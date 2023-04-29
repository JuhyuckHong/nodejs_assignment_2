'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // userId @ Users -||--|<- UserId @ Posts
      this.hasMany(modles.Posts, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      })

      // userId @ Users -||--|<- UserId @ Comments
      this.hasMany(modles.Comments, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      })
    }
  }

  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};