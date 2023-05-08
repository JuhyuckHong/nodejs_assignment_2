const CommentsService = require('../services/comments.service');
const PostService = require('../services/posts.service');

class CommentsController {
    commentsService = new CommentsService();
    postService = new PostService();

    getComments = async (req, res, next) => {
        const { postId } = req.params;

        const post = await this.postService.findOnePost(postId);

        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }

        try {
            const comments = await this.commentsService.findAllComments(postId);
            return res.status(200).json({ comments });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                errorMessage: '댓글 조회에 실패하였습니다.',
            });
        }
    };

    createComment = async (req, res, next) => {
        const { postId } = req.params;
        const { comment } = req.body;
        const { userId } = res.locals.user;

        const post = await this.postService.findOnePost(postId);
        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }

        if (!comment) {
            return res
                .status(412)
                .json({ message: '데이터 형식이 올바르지 않습니다.' });
        }

        try {
            await this.commentsService.createComment(userId, postId, comment);
            return res.status(201).json({ message: '댓글을 작성하였습니다.' });
        } catch {
            return res
                .status(400)
                .json({ errorMessage: '댓글 작성을 실패하였습니다.' });
        }
    };

    updateComment = async (req, res, next) => {
        const { postId, commentId } = req.params;
        const { comment } = req.body;
        const { userId } = res.locals.user;

        const post = await this.postService.findOnePost(postId);
        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }

        const thisComment = await this.commentsService.findOneComment(commentId);
        if (!thisComment) {
            return res
                .status(404)
                .json({ errorMessage: '댓글이 존재하지 않습니다.' });
        }
        if (thisComment.UserId !== userId) {
            return res.status(403).json({
                errorMessage: '댓글의 수정 권한이 존재하지 않습니다.',
            });
        }

        if (!comment) {
            return res
                .status(400)
                .json({ message: '댓글 내용을 입력해주세요.' });
        }

        try {
            this.commentsService
                .updateComment(commentId, comment)
                .then(() => {
                    return res
                        .status(201)
                        .json({ message: '댓글을 수정하였습니다.' });
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(401).json({
                        errorMessage:
                            '댓글 수정이 정상적으로 처리되지 않았습니다.',
                    });
                });
        } catch (error) {
            return res
                .status(400)
                .json({ errorMessage: '댓글 수정에 실패하였습니다.' });
        }
    };

    deleteComment = async (req, res, next) => {
        const { postId, commentId } = req.params;
        const { userId } = res.locals.user;

        const post = await this.commentsService.findOneComment(commentId);
        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }

        const thisComment = await this.commentsService.findOneComment(commentId);
        if (!thisComment) {
            return res
                .status(404)
                .json({ errorMessage: '댓글이 존재하지 않습니다.' });
        }
        if (thisComment.UserId !== userId) {
            return res.status(403).json({
                errorMessage: '댓글의 삭제 권한이 존재하지 않습니다.',
            });
        }

        try {
            this.commentsService
                .destroyComment(commentId)
                .then(() => {
                    return res
                        .status(201)
                        .json({ message: '댓글을 삭제하였습니다.' });
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(401).json({
                        errorMessage:
                            '댓글 삭제가 정상적으로 처리되지 않았습니다.',
                    });
                });
        } catch (error) {
            return res
                .status(400)
                .json({ errorMessage: '댓글 수정에 실패하였습니다.' });
        }
    };
}

module.exports = CommentsController