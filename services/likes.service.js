const LikesRepository = require('../repositories/likes.repository');
const PostsService = require('./posts.service');

class LikesService {
    likeRepository = new LikesRepository();
    postService = new PostsService();

    findLikeExist = async (postId, userId) => {
        return await this.likesRepository.findLike(postId, userId);
    };

    createLike = async (postId, userId) => {
        return await this.likesRepository.createLike(postId, userId);
    };

    deleteLike = async (postId, userId) => {
        return await this.likesRepository.deleteLike(postId, userId);
    };

    findByPost = async (postId) => {
        return await this.likesRepository.findByPost(postId);
    };

    findAllLikedPosts = async (userId) => {
        const likeAllPosts = await this.likesRepository.findAllLikedPosts(
            userId
        );
        const postIds = likeAllPosts.map((val) => val.PostId);
        const posts = await this.postsService.findSomePosts(postIds);
        console.log(posts);
        // sorting
        return posts;
    };
}

module.exports = LikesService;
