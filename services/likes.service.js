const LikesRepository = require('../repositories/likes.repository');
const PostsService = require('./posts.service');

class LikesService {
    likesRepository = new LikesRepository();
    postsService = new PostsService();

    findLikeExist = async (postId, userId) => {
        try {
            return await this.likesRepository.findLike(postId, userId);
        } catch (err) {
            console.error({ err });
            throw new Error('likes.service > findLikeExist');
        }
    };

    createLike = async (postId, userId) => {
        try {
            return await this.likesRepository.createLike(postId, userId);
        } catch (err) {
            console.error({ err });
            throw new Error('likes.service > createLike');
        }
    };

    deleteLike = async (postId, userId) => {
        try {
            return await this.likesRepository.deleteLike(postId, userId);
        } catch (err) {
            console.error({ err });
            throw new Error('likes.service > deleteLike');
        }
    };

    findByPost = async (postId) => {
        try {
            return await this.likesRepository.findByPost(postId);
        } catch (err) {
            console.error({ err });
            throw new Error('likes.service > findByPost');
        }
    };

    findAllLikedPosts = async (userId) => {
        try {
            const likeAllPosts = await this.likesRepository.findAllLikedPosts(
                userId
            );
            const postIds = likeAllPosts.map((val) => val.PostId);
            const posts = await this.postsService.findSomePosts(postIds);
            return posts;
        } catch (err) {
            console.error({ err });
            throw new Error('likes.service > findAllLikedPosts');
        }
    };
}

module.exports = LikesService;
