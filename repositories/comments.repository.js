const { Users, Comments, Sequelize } = require('../models');

class CommentsRepository {
    findOneComment = async (commentId) => {
        try {
            return await Comments.findOne({ where: { commentId } });
        } catch (err) {
            console.error({ err });
            throw new Error('Comment.Repository > findOneComment');
        }
    };

    findAllComments = async (postId) => {
        try {
            const comments = await Comments.findAll({
                attributes: [
                    'commentId',
                    'UserId',
                    [Sequelize.col('nickname'), 'nickname'],
                    'comment',
                    'createdAt',
                    'updatedAt',
                ],
                include: [
                    {
                        model: Users,
                        attributes: [],
                    },
                ],
                order: [['createdAt', 'DESC']],
                where: { postId },
            });
            return comments;
        } catch (err) {
            console.error({ err });
            throw new Error('Comment.Repository > findAllComments');
        }
    };

    createComment = async (postId, userId, comment) => {
        try {
            return await Comments.create({
                UserId: userId,
                PostId: postId,
                comment,
            });
        } catch (err) {
            console.error({ err });
            throw new Error('Comment.Repository > createComment');
        }
    };

    updateComment = async (commentId, comment) => {
        try {
            return await Comments.update({ comment }, { where: { commentId } });
        } catch (err) {
            console.error({ err });
            throw new Error('Comment.Repository > updateComment');
        }
    };

    deleteComment = async (commentId) => {
        try {
            return await Comments.destroy({
                where: { commentId },
            });
        } catch (err) {
            console.error({ err });
            throw new Error('Comment.Repository > deleteComment');
        }
    };
}

module.exports = CommentsRepository;
