const { Posts, Likes } = require('../models');

class LikesRepository {
    findLike = async (postId, userId) => {
        try {
            return await Likes.findOne({
                where: {
                    UserId: userId,
                    PostId: postId,
                },
            });
        } catch (err) {
            console.error({ err });
            throw new Error('likes.repository > findLike');
        }
    };

    findByPost = async (postId) => {
        try {
            const users = await Likes.findAll({
                where: { PostId: postId },
            });
            return users.length;
        } catch (err) {
            console.error({ err });
            throw new Error('likes.repository > findByPost');
        }
    };

    createLike = async (postId, userId) => {
        try {
            return await Likes.create({
                UserId: userId,
                PostId: postId,
            });
        } catch (err) {
            console.error({ err });
            throw new Error('likes.repository > createLike');
        }
    };

    deleteLike = async (postId, userId) => {
        try {
            return await Likes.destroy({
                where: {
                    PostId: postId,
                    UserId: userId,
                },
            });
        } catch (err) {
            console.error({ err });
            throw new Error('likes.repository > deleteLike');
        }
    };

    findAllLikedPosts = async (userId) => {
        try {
            return await Likes.findAll({
                attributes: ['PostId'],
                include: [{ model: Posts, attributes: [] }],
                raw: true,
                where: { UserId: userId },
            });
        } catch (err) {
            console.error({ err });
            throw new Error('likes.repository > findAllLikedPosts');
        }
    };
}

module.exports = LikesRepository;
