const CommentsService = require('../services/comments.service');
const PostsService = require('../services/posts.service');

class CommentsController {
    commentsService = new CommentsService();
    postsService = new PostsService();

    // postId 게시글의 댓글 반환 컨트롤러
    getComments = async (req, res, next) => {
        // 요청 파라미터에서 postId를 얻어서,
        const { postId } = req.params;
        // 게시글 내용이 있는지 posts 서비스로부터 확인
        const post = await this.postsService.findOnePost(postId);
        // 게시글이 없다면, 404 코드와 메시지 반환
        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }
        // 게시글이 있는 경우, 해당 게시글의 댓글 comments 서비스에 요청
        try {
            const comments = await this.commentsService.findAllComments(postId);
            // 반환
            return res.status(200).json({ comments });
        } catch (error) {
            // 과정 중 예기치 못한 에러 발생 시 400 코드와 메시지 반환
            console.log(error);
            return res.status(400).json({
                errorMessage: '댓글 조회에 실패하였습니다.',
            });
        }
    };

    // postId 게시글의 댓글 작성 컨트롤러
    createComment = async (req, res, next) => {
        // 요청 파라미터에서 postId를 얻고,
        const { postId } = req.params;
        // 요청 바디에서 댓글 내용을 받고,
        const { comment } = req.body;
        // auth 미들웨어에서 저장한 user 아이디를 확인해서,
        const { userId } = res.locals.user;
        // 게시글이 있는지 확인 하고,
        const post = await this.postsService.findOnePost(postId);
        // 댓글 내용이 없다면, 412 코드와 에러메시지 반환
        if (!comment) {
            return res
                .status(412)
                .json({ message: '데이터 형식이 올바르지 않습니다.' });
        }
        // 게시글이 없다면, 404 코드와 에러메시지 반환
        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }
        // 게시글이 있다면,
        try {
            // 댓글 생성
            await this.commentsService.createComment(userId, postId, comment);
            return res.status(201).json({ message: '댓글을 작성하였습니다.' });
        } catch {
            //과정 중 예기치 못한 에러 발생 시 400 코드와 에러메시지 반환
            return res
                .status(400)
                .json({ errorMessage: '댓글 작성을 실패하였습니다.' });
        }
    };

    // postId 게시글의 댓글 업데이트 컨트롤러
    updateComment = async (req, res, next) => {
        // 요청 파라미터에서 postId와 commentId를 얻고,
        const { postId, commentId } = req.params;
        // 요청 바디에서 댓글 내용을 받고,
        const { comment } = req.body;
        // auth 미들웨어에서 저장한 user 아이디를 확인해서,
        const { userId } = res.locals.user;
        
        // 댓글 내용이 없다면, 400와 에러메시지 반환
        if (!comment) {
            return res
                .status(400)
                .json({ message: '댓글 내용을 입력해주세요.' });
        }
        // 게시글 존재 여부 확인하고,
        const post = await this.postsService.findOnePost(postId);
        // 없다면 404와 에러메시지 반환
        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }
        // 댓글 존재 여부 확인하고,
        const thisComment = await this.commentsService.findOneComment(
            commentId
        );
        // 없다면 404와 에러메시지 반환
        if (!thisComment) {
            return res
                .status(404)
                .json({ errorMessage: '댓글이 존재하지 않습니다.' });
        }
        // 댓글 작성자가 요청자와 다르다면, 403와 에러메시지 반환
        if (thisComment.UserId !== userId) {
            return res.status(403).json({
                errorMessage: '댓글의 수정 권한이 존재하지 않습니다.',
            });
        }
        // 요건 충족 시,
        try {
            // 댓글 수정
            this.commentsService
                .updateComment(commentId, comment)
                .then(() => {
                    return res
                        .status(201)
                        .json({ message: '댓글을 수정하였습니다.' });
                })
                // DB 처리에 에러 발생 시, 401과 에러메시지 반환
                .catch((error) => {
                    console.log(error);
                    return res.status(401).json({
                        errorMessage:
                            '댓글 수정이 정상적으로 처리되지 않았습니다.',
                    });
                });
        } catch (err) {
            // 예기치 못한 에러 발생 시, 400과 에러메시지 반환
            console.error(err)
            return res
                .status(400)
                .json({ errorMessage: '댓글 수정에 실패하였습니다.' });
        }
    };

    // postI
    deleteComment = async (req, res, next) => {
        const { postId, commentId } = req.params;
        const { userId } = res.locals.user;
        // 게시글 존재 여부 확인하고,
        const post = await this.postsService.findOnePost(postId);
        // 없다면 404와 에러메시지 반환
        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }
        // 댓글 존재 여부 확인하고,
        const thisComment = await this.commentsService.findOneComment(
            commentId
        );
        // 없다면 404와 에러메시지 반환
        if (!thisComment) {
            return res
                .status(404)
                .json({ errorMessage: '댓글이 존재하지 않습니다.' });
        }
        // 댓글 작성자가 요청자와 다르다면, 403와 에러메시지 반환
        if (thisComment.UserId !== userId) {
            return res.status(403).json({
                errorMessage: '댓글의 삭제 권한이 존재하지 않습니다.',
            });
        }
        // 요건 충족 시
        try {
            // 댓글 삭제
            this.commentsService
                .destroyComment(commentId)
                .then(() => {
                    return res
                        .status(201)
                        .json({ message: '댓글을 삭제하였습니다.' });
                })
                // 삭제 과정 중 에러 발생 시, 401과 에러메시지 반환
                .catch((error) => {
                    console.log(error);
                    return res.status(401).json({
                        errorMessage:
                            '댓글 삭제가 정상적으로 처리되지 않았습니다.',
                    });
                });
        } catch (err) {
            // 예기치 못한 에러 발생 시, 400과 에러메시지 반환
            console.error(err)
            return res
                .status(400)
                .json({ errorMessage: '댓글 수정에 실패하였습니다.' });
        }
    };
}

// 댓글 컨트롤러 export
module.exports = CommentsController;
