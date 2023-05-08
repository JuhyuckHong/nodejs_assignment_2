const { Users, Comments, Sequelize } = require('../models');

class CommentsRepository {
    // DB에서 특정 댓글 한개 찾기
    findOneComment = async (commentId) => {
        try {
            return await Comments.findOne({ where: { commentId } });
        } catch (err) {
            console.error(err.message);
            throw new Error('comments.repository > findOneComment');
        }
    };

    // DB에서 특정 게시글의 전체 댓글 찾기
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
            console.error(err.message);
            throw new Error('comments.repository > findAllComments');
        }
    };

    // 특정 게시글의 특정 댓글 찾기
    createComment = async (postId, userId, comment) => {
        try {
            return await Comments.create({
                UserId: userId,
                PostId: postId,
                comment,
            });
        } catch (err) {
            console.error(err.message);
            throw new Error('comments.repository > createComment');
        }
    };

    // 특정 댓글 업데이트 하기
    updateComment = async (commentId, comment) => {
        try {
            return await Comments.update({ comment }, { where: { commentId } });
        } catch (err) {
            console.error(err.message);
            throw new Error('comments.repository > updateComment');
        }
    };

    // 특정 댓글 지우기
    deleteComment = async (commentId) => {
        try {
            return await Comments.destroy({
                where: { commentId },
            });
        } catch (err) {
            console.error(err.message);
            throw new Error('comments.repository > deleteComment');
        }
    };
}

// 댓글 repository export
module.exports = CommentsRepository;
