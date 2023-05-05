const CommentRepository = require('../repositories/comment.repository');

class CommentService {
    commentRepository = new CommentRepository();

    findOneComment = async (commentId) => {
        return await this.commentRepository.findOneComment(commentId);
    };

    findAllComments = async (postId) => {
        return await this.commentRepository.findAllComments(postId);
    };

    createComment = async (postId, userId, comment) => {
        return this.commentRepository.createComment(postId, userId, comment);
    };

    updateComment = async (commentId, comment) => {
        return this.commentRepository.updateComment(commentId, comment);
    };

    deleteComment = async (commentId) => {
        return this.commentRepository.deleteComment(commentId);
    };
}

module.exports = CommentService;
