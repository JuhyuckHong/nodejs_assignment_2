'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        static associate(models) {
            // postId @ Posts -||--|<- PostId @ Comments
            this.belongsTo(models.Posts, {
                targetKey: 'postId',
                foreignKey: 'PostId',
            });
            // uersId @ Users -||--|<- UserId @ Comments
            this.belongsTo(models.Users, {
                targetKey: 'userId',
                foreignKey: 'UserId',
            });
        }
    }
    Comments.init(
        {
            // PK
            commentId: {
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
            // FK from Posts
            PostId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Posts',
                    key: 'postId',
                },
                onDelete: 'CASCADE',
            },
            comment: {
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
            modelName: 'Comments',
        }
    );
    return Comments;
};
