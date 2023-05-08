const CommentRepository = require('../repositories/comment.repository');

class CommentService {
    commentRepository = new CommentRepository();

    findOneComment = async (commentId) => {
        try {
            return await this.commentRepository.findOneComment(commentId);
        } catch (err) {
            console.error({ err });
            throw new Error('comment.service > findOneComment');
        }
    };

    findAllComments = async (postId) => {
        try {
            return await this.commentRepository.findAllComments(postId);
        } catch (err) {
            console.error({ err });
            throw new Error('comment.service > findAllComments');
        }
    };

    createComment = async (postId, userId, comment) => {
        try {
            return this.commentRepository.createComment(
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
            return this.commentRepository.updateComment(commentId, comment);
        } catch (err) {
            console.error({ err });
            throw new Error('comment.service > updateComment');
        }
    };

    deleteComment = async (commentId) => {
        try {
            return this.commentRepository.deleteComment(commentId);
        } catch (err) {
            console.error({ err });
            throw new Error('comment.service > deleteComment');
        }
    };
}

module.exports = CommentService;
