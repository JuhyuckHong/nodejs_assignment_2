const { Users, Posts, Comments, Sequelize } = require('../models');

class CommentRepository {
    findOneComment = async (commentId) => {
        const comment = await Comments.findOne({ where: { commentId } });
        return comment;
    };

    findAllComments = async (postId) => {
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
                }
            ],
            order: [['createdAt', 'DESC']],
            where: { postId },
        });
        return comments;
    };

    createComment = async (postId, userId, comment) => {
        const createdCommentData = await Comments.create({
            UserId: userId,
            PostId: postId,
            comment,
        });
        return createdCommentData;
    };

    updateComment = async (commentId, comment) => {
        const updatedCommentData = await Comments.update(
            { comment },
            { where: { commentId } }
        );
        return updatedCommentData;
    };

    deleteComment = async (commentId) => {
        const deleteCommentResult = await Comments.destroy({
            where: { commentId },
        });
        return deleteCommentResult;
    };
}

module.exports = CommentRepository;
