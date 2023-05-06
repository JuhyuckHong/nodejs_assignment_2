const PostRepository = require('../repositories/posts.respository');

class PostService {
    postRepository = new PostRepository();

    findOnePost = async (postId) => {
        return await this.postRepository.findOnePost(postId);
    };

    findSomePosts = async (postIds) => {
        return await this.postRepository.findSomePosts(postIds);
    };

    findAllPost = async () => {
        return await this.postRepository.findAllPost();
    };

    createPost = async (userId, title, content) => {
        return await this.postRepository.createPost(userId, title, content);
    };

    findPostDetail = async (postId) => {
        return await this.postRepository.findPostDetail(postId);
    };

    updatePost = async (postId, title, content) => {
        return this.postRepository.updatePost(postId, title, content);
    };

    deletePost = async (postId) => {
        return await this.postRepository.deletePost(postId);
    };
}

module.exports = PostService;
