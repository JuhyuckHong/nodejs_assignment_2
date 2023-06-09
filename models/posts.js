'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        static associate(models) {
            // userId @ Users -||--|<- UserId @ Posts
            this.belongsTo(models.Users, {
                targetKey: 'userId',
                foreignKey: 'UserId',
            });
            // postId @ Posts -||--|<- PostId @ Comments
            this.hasMany(models.Comments, {
                sourceKey: 'postId',
                foreignKey: 'PostId',
            });
            // postId @ Posts -||--|<- PostId @ Likes
            this.hasMany(models.Likes, {
                sourceKey: 'postId',
                foreignKey: 'PostId',
            });
        }
    }

    Posts.init(
        {
            // PK
            postId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            // FK from Users
            UserId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'userId',
                },
                onDelete: 'CASCADE',
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING,
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
            },
        },
        {
            sequelize,
            modelName: 'Posts',
        }
    );
    return Posts;
};
