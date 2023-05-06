'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        static associate(models) {
            // postId @ Posts -||--|<- PostId @ Likes
            this.belongsTo(models.Posts, {
                targetKey: 'postId',
                foreignKey: 'PostId',
            });
            // userId @ Users -||--|<- UserId @ Likes
            this.belongsTo(models.Users, {
                targetKey: 'userId',
                foreignKey: 'UserId',
            });
        }
    }
    Likes.init(
        {
            likeId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            UserId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'userId',
                },
                onDelete: 'CASCADE',
            },
            PostId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Posts',
                    key: 'postId',
                },
                onDelete: 'CASCADE',
            },
        },
        {
            sequelize,
            modelName: 'Likes',
        }
    );
    return Likes;
};
