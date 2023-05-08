const LikesRepository = require('../repositories/likes.repository');
const PostsService = require('./posts.service');

class LikesService {
    // 좋아요 repository 객체 선언
    likesRepository = new LikesRepository();
    // 게시글 repository 객체 선언
    postsService = new PostsService();

    // 좋아요 있는지 확인
    findLikeExist = async (postId, userId) => {
        try {
            return await this.likesRepository.findLike(postId, userId);
        } catch (err) {
            console.error(err.message);
            throw new Error('likes.service > findLikeExist');
        }
    };

    // 좋아요 만들기
    createLike = async (postId, userId) => {
        try {
            return await this.likesRepository.createLike(postId, userId);
        } catch (err) {
            console.error(err.message);
            throw new Error('likes.service > createLike');
        }
    };

    // 좋아요 삭제
    deleteLike = async (postId, userId) => {
        try {
            return await this.likesRepository.deleteLike(postId, userId);
        } catch (err) {
            console.error(err.message);
            throw new Error('likes.service > deleteLike');
        }
    };

    // 특정 게시글에 좋아요 찾기
    findByPost = async (postId) => {
        try {
            return await this.likesRepository.findByPost(postId);
        } catch (err) {
            console.error(err.message);
            throw new Error('likes.service > findByPost');
        }
    };

    // 좋아요한 게시글 모두 찾기
    findAllLikedPosts = async (userId) => {
        try {
            const likeAllPosts = await this.likesRepository.findAllLikedPosts(
                userId
            );
            const postIds = likeAllPosts.map((val) => val.PostId);
            const posts = await this.postsService.findSomePosts(postIds);
            return posts;
        } catch (err) {
            console.error(err.message);
            throw new Error('likes.service > findAllLikedPosts');
        }
    };
}

// 게시글 서비스 export
module.exports = LikesService;
