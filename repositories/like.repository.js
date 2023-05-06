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
            attribute: ['UserId', 'PostId'],
            include: [{ model: Posts, attribute: [] }],
            where: { UserId: userId },
        });
        console.log(likedPosts);
        return likedPosts;
    };
}

module.exports = LikeRepository;
