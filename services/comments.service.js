const CommentsRepository = require('../repositories/comments.repository');

class CommentsService {
    commentsRepository = new CommentsRepository();

    findOneComment = async (commentId) => {
        try {
            return await this.commentsRepository.findOneComment(commentId);
        } catch (err) {
            console.error({ err });
            throw new Error('comment.service > findOneComment');
        }
    };

    findAllComments = async (postId) => {
        try {
            return await this.commentsRepository.findAllComments(postId);
        } catch (err) {
            console.error({ err });
            throw new Error('comment.service > findAllComments');
        }
    };

    createComment = async (postId, userId, comment) => {
        try {
            return this.commentsRepository.createComment(
                postId,
                userId,
                comment
            );
        } catch (err) {
            console.error({ err });
            throw new Error('comment.service > createComment');
        }
    };

    updateComment = async (commentId, comment) => {
        try {
            return this.commentsRepository.updateComment(commentId, comment);
        } catch (err) {
            console.error({ err });
            throw new Error('comment.service > updateComment');
        }
    };

    deleteComment = async (commentId) => {
        try {
            return this.commentsRepository.deleteComment(commentId);
        } catch (err) {
            console.error({ err });
            throw new Error('comment.service > deleteComment');
        }
    };
}

module.exports = CommentsService;