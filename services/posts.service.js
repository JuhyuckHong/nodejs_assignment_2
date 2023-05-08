const PostRepository = require('../repositories/posts.respository');
const LikeRepository = require('../repositories/like.repository');
const likes = require('../models/likes');

class PostService {
    postRepository = new PostRepository();
    likeRepository = new LikeRepository();

    findOnePost = async (postId) => {
        return await this.postRepository.findOnePost(postId);
    };

    findSomePosts = async (postIds) => {
        return await this.postRepository.findSomePosts(postIds);
    };

    findAllPost = async () => {
        const posts = await this.postRepository.findAllPost();

        const postsLikesAdded = [];
        for (const val of posts) {
            const likes = await this.likeRepository.findByPost(
                val.dataValues.postId
            );
            val.dataValues.likes = likes;
            postsLikesAdded.push(val.dataValues);
        }
        return postsLikesAdded.sort((a, b) => b.likes - a.likes);
    };

    createPost = async (userId, title, content) => {
        return await this.postRepository.createPost(userId, title, content);
    };

    findPostDetail = async (postId) => {
        const post = await this.postRepository.findPostDetail(postId);
        const likes = await this.likeRepository.findByPost(postId);
        post.dataValues.likes = likes;
        console.log(post)
        return post;
    };

    updatePost = async (postId, title, content) => {
        return this.postRepository.updatePost(postId, title, content);
    };

    deletePost = async (postId) => {
        return await this.postRepository.deletePost(postId);
    };
}

module.exports = PostService;
