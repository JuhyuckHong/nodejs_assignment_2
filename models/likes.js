'use strict';
const { Model } = require('sequelize');
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
            userId: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Likes',
        }
    );
    return Likes;
};
