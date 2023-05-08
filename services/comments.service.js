const CommentsRepository = require('../repositories/comments.repository');

class CommentsService {
    // 댓글 repository 객체 선언
    commentsRepository = new CommentsRepository();

    // 특정 댓글 하나 찾기 서비스
    findOneComment = async (commentId) => {
        try {
            return await this.commentsRepository.findOneComment(commentId);
        } catch (err) {
            console.error(err.message);
            throw new Error('comments.service > findOneComment');
        }
    };

    // 특정 글의 모든 댓글 찾기 서비스
    findAllComments = async (postId) => {
        try {
            return await this.commentsRepository.findAllComments(postId);
        } catch (err) {
            console.error(err.message);
            throw new Error('comments.service > findAllComments');
        }
    };

    // 특정 글의 댓글 만들기 서비스
    createComment = async (postId, userId, comment) => {
        try {
            return this.commentsRepository.createComment(
                postId,
                userId,
                comment
            );
        } catch (err) {
            console.error(err.message);
            throw new Error('comments.service > createComment');
        }
    };

    // 특정 댓글의 업데이트 서비스
    updateComment = async (commentId, comment) => {
        try {
            return this.commentsRepository.updateComment(commentId, comment);
        } catch (err) {
            console.error(err.message);
            throw new Error('comments.service > updateComment');
        }
    };

    // 특정 댓글 지우기 서비스
    deleteComment = async (commentId) => {
        try {
            return this.commentsRepository.deleteComment(commentId);
        } catch (err) {
            console.error(err.message);
            throw new Error('comments.service > deleteComment');
        }
    };
}

// 댓글 서비스 export
module.exports = CommentsService;
