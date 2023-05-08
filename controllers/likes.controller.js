const LikesService = require('../services/likes.service');
const PostsService = require('../services/posts.service');

class LikesController {
    likesService = new LikesService();
    postsService = new PostsService();

    toggleLike = async (req, res) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;

        const post = await this.postsService.findOnePost(postId);
        if (!post) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }

        try {
            const likeExist = await this.likesService.findLikeExist(
                postId,
                userId
            );
            if (!likeExist) {
                await this.likesService.createLike(postId, userId);
                return res
                    .status(200)
                    .json({ message: '게시글의 좋아요를 등록하였습니다.' });
            } else {
                await this.likesService.deleteLike(postId, userId);
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
            const allLikedPosts = await this.likesService.findAllLikedPosts(
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

module.exports = LikesController;
