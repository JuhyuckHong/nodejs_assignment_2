const CommentRepository = require('../repositories/comment.repository');

class CommentService {
    commentRepository = new CommentRepository();

    findOneComment = async (commentId) => {
        const comment = await this.commentRepository.findOneComment(commentId);
        return comment;
    };

    findAllComments = async (postId) => {
        const comments = await this.commentRepository.findAllComments(postId);
        return comments;
    };

    createComment = async (postId, userId, comment) => {
        const createdCommentData = this.commentRepository.createComment(
            postId,
            userId,
            comment
        );
        return createdCommentData;
    };

    updateComment = async (commentId, comment) => {
        const updatedCommentData = this.commentRepository.updateComment(
            commentId,
            comment
        );
        return updatedCommentData;
    };

    deleteComment = async (commentId) => {
        const deletedCommentData =
            this.commentRepository.deleteComment(commentId);
        return deletedCommentData;
    };
}

module.exports = CommentService;
