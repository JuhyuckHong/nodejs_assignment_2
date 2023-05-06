const { Users, Posts, Comments, Likes, Sequelize } = require('../models');

class LikeRepository {
    findLike = async (postId, userId) => {
        return await Likes.findOne({
            where: {
                UserId: userId,
                PostId: postId,
            },
        });
    };

    createLike = async (postId, userId) => {
        return await Likes.create({
            UserId: userId,
            PostId: postId,
        });
    };

    deleteLike = async (postId, userId) => {
        return await Likes.destroy({
            where: {
                PostId: postId,
                UserId: userId,
            },
        });
    };

    findAllLikedPosts = async (userId) => {
        const likedPosts = await Likes.findAll({
            attributes: ['PostId'],
            include: [{ model: Posts, attributes: [] }],
            raw: true,
            where: { UserId: userId },
        });
        return likedPosts;
    };
}

module.exports = LikeRepository;
