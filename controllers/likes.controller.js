const LikesService = require('../services/likes.service');
const PostsService = require('../services/posts.service');

class LikesController {
    // 좋아요 서비스 객체 선언
    likesService = new LikesService();
    // 게시글 서비스 객체 선언
    postsService = new PostsService();

    // 좋아요 토글 컨트롤러
    toggleLike = async (req, res) => {
        // 요청에서 postId 받고,
        const { postId } = req.params;
        // auth에서 저장한 userId 가져와서
        const { userId } = res.locals.user;

        // 게시글 존재 여부 확인 후 없다면 404와 에러메시지 반환
        const post = await this.postsService.findOnePost(postId);
        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }

        // 게시글 있는 경우,
        try {
            // 좋아요 있는지 확인
            const likeExist = await this.likesService.findLikeExist(
                postId,
                userId
            );
            // 좋아요 없다면,
            if (!likeExist) {
                // 좋아요 추가
                await this.likesService.createLike(postId, userId);
                return res
                    .status(200)
                    .json({ message: '게시글의 좋아요를 등록하였습니다.' });
            } else {
                // 좋아요 있다면, 좋아요 삭제
                await this.likesService.deleteLike(postId, userId);
                return res
                    .status(200)
                    .json({ message: '게시글의 좋아요를 취소하였습니다.' });
            }
        } catch (error) {
            // 예기치 못한 에러 발생시 400과 에러메시지 반환
            console.log(error);
            return res
                .status(400)
                .json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
        }
    };

    // 전체 좋아요한 게시글 조회 컨트롤러
    findAllLikedPosts = async (req, res) => {
        // auth에서 저장한 userId 획득
        const { userId } = res.locals.user;

        try {
            // userId가 전체 좋아요한 게시글 postId 찾아서 반환
            const allLikedPosts = await this.likesService.findAllLikedPosts(
                userId
            );
            return res
                .status(200)
                .json({
                    posts: allLikedPosts.sort((a, b) => b.likes - a.likes),
                });
        } catch (error) {
            // 예기치 못한 에러 발생 시 400과 에러메시지 반환
            console.log(error);
            return res
                .status(400)
                .json({ errorMessage: '좋아요 게시글 조회에 실패하였습니다.' });
        }
    };
}

// 좋앙 컨트롤러 export
module.exports = LikesController;
