const PostsService = require('../services/posts.service');

class PostsController {
    // 게시글 서비스 객체 선언
    postsService = new PostsService();

    // 게시글 전체 조회
    getPosts = async (req, res, next) => {
        try {
            // 전체 게시글 조회 후 반환
            const posts = await this.postsService.findAllPost();
            return res.status(200).json({ posts });
        } catch (error) {
            // 예기치 못한 에러 발생 시 400과 에러메시지 반환
            console.log(error);
            return res.status(400).json({
                errorMessage: '게시글 조회에 실패하였습니다.',
            });
        }
    };

    // 게시글 생성
    createPost = async (req, res, next) => {
        // auth 에서 저장한 userId 획득,
        const { userId } = res.locals.user;
        // 요청 body에서 title과 content 가져와서,
        const { title, content } = req.body;

        // 둘 중 하나라도 없다면 412와 에러메시지 반환
        if (!title || !content) {
            return res
                .status(412)
                .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
        }
        // 요건 충족 시,
        try {
            // 게시글 작성
            this.postsService.createPost(userId, title, content);
            return res
                .status(201)
                .json({ message: '게시글 작성에 성공하였습니다.' });
        } catch (error) {
            // 예기치 못한 에러 발생 시 400과 에러메시지 반환
            return res
                .status(400)
                .json({ errorMessage: '게시글 작성에 실패하였습니다.' });
        }
    };

    // 특정 게시글 세부내용 조회
    findPostDetail = async (req, res, next) => {
        // postId 요청 파라미터에서 획득,
        const { postId } = req.params;
        // 게시글 조회
        try {
            // 성공
            const post = await this.postsService.findPostDetail(postId);
            return res.status(200).json({ post });
        } catch {
            // 예기치 못한 에러 400과 메시지 반환
            return res.status(400).json({
                errorMessage: '게시글 조회에 실패하였습니다.',
            });
        }
    };

    // 특정 게시글 제목과 내용 수정
    updatePost = async (req, res, next) => {
        // 요청 파라미터와 바디에서 postId, title, content 획득,
        const { postId } = req.params;
        const { title, content } = req.body;
        // auth에서 저장한 userId 획득,
        const { userId } = res.locals.user;
        // 조건 충족 시
        try {
            // 조건 검토
            // 제목이나 내용 없는 경우 412와 에러메시지반환
            if (!title || !content) {
                return res
                    .status(412)
                    .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
            }
            // 게시글 존재 여부 확인 후
            const post = await this.postsService.findOnePost(postId);
            if (!post) {
                // 없다면 404와 에러메시지 반환
                return res.status(404).json({
                    errorMessage: '게시글이 존재하지 않습니다.',
                });
            } else if (post.UserId !== userId) {
                // 게시글 작성자가 일치하지 않는 경우 403과 에러메시지 반환
                return res.status(403).json({
                    errorMessage: '게시글 수정의 권한이 존재하지 않습니다.',
                });
            }

            // 게시글 수정
            this.postsService
                .updatePost(postId, title, content)
                .then((updatedPostData) => {
                    // 내가 왜 이런 조건을 검사했을까 기억이 없다.
                    if (typeof updatedPostData !== 'number') {
                        return res
                            .status(201)
                            .json({ message: '게시글 수정에 성공하였습니다.' });
                    } else {
                        return res.status(400).json({
                            errorMessage: '게시글 수정에 실패하였습니다.',
                        });
                    }
                })
                // 수정 과정에서 에러 발생 한 경우, 401과 메시지 반환
                .catch((error) => {
                    console.log(error);
                    return res.status(401).json({
                        errorMessage:
                            '게시글이 정상적으로 수정되지 않았습니다.',
                    });
                });
        } catch (error) {
            // 예기치 못한 에러 발생 시 400과 메시지 반환
            console.log(error);
            return res.status(400).json({
                errorMessage: '게시글 수정에 실패하였습니다.',
            });
        }
    };

    // 게시글 삭제
    deletePost = async (req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        try {
            // 게시글 존재 확인
            const post = await this.postsService.findOnePost(postId);
            if (!post) {
                // 없다면, 404에러
                return res
                    .status(404)
                    .json({ errorMessage: '게시글이 존재하지 않습니다.' });
            } else if (post.UserId !== userId) {
                // 게시글 작성자와 로그인 사용자가 다른경우 403 에러
                return res.status(403).json({
                    errorMessage: '게시글 삭제의 권한이 존재하지 않습니다.',
                });
            }

            // 삭제
            this.postsService
                .deletePost(postId)
                .then((deletePostResult) => {
                    // 삭제 완료
                    if (deletePostResult === 1) {
                        return res
                            .status(201)
                            .json({ message: '게시글 삭제하였습니다.' });
                    } else {
                        // 1개 이상 삭제 하는 경우가 발생할 수 있나?
                        return res.status(400).json({
                            errorMessage: '게시글 삭제가 잘못되었습니다.',
                        });
                    }
                })
                // 삭제 중 에러 발생 시
                .catch((error) => {
                    console.log(error);
                    return res.status(400).json({
                        errorMessage: '게시글 삭제에 실패하였습니다.',
                    });
                });
        } catch (error) {
            // 예기치 못한 에러 발생 시, 400과 메시지 반환
            console.log(error);
            return res.status(400).json({
                errorMessage: '게시글 삭제에 실패하였습니다.',
            });
        }
    };
}

module.exports = PostsController;
