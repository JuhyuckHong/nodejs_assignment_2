const LikeService = require('../services/like.service');
const PostService = require('../services/posts.service');

class LikeController {
    likeService = new LikeService();
    postService = new PostService();

    toggleLike = async (req, res) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;

        const post = await this.postService.findOnePost(postId);
        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }

        try {
            const likeExist = await this.likeService.findLikeExist(
                postId,
                userId
            );
            if (!likeExist) {
                await this.likeService.createLike(postId, userId);
                return res
                    .status(200)
                    .json({ message: '게시글의 좋아요를 등록하였습니다.' });
            } else {
                await this.likeService.deleteLike(postId, userId);
                return res
                    .status(200)
                    .json({ message: '게시글의 좋아요를 취소하였습니다.' });
            }
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
        }
    };

    findAllLikedPosts = async (req, res) => {
        const { userId } = res.locals.user;

        try {
            const allLikedPosts = await this.likeService.findAllLikedPosts(
                userId
            );
            return res.status(200).json({ posts: allLikedPosts });
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ errorMessage: '좋아요 게시글 조회에 실패하였습니다.' });
        }
    };
}

module.exports = LikeController;
