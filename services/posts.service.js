const PostsRepository = require('../repositories/posts.respository');
const LikesRepository = require('../repositories/likes.repository');

class PostsService {
    postsRepository = new PostsRepository();
    likesRepository = new LikesRepository();

    findOnePost = async (postId) => {
        return await this.postsRepository.findOnePost(postId);
    };

    findSomePosts = async (postIds) => {
        return await this.postsRepository.findSomePosts(postIds);
    };

    findAllPost = async () => {
        const posts = await this.postsRepository.findAllPost();

        const postsLikesAdded = [];
        for (const val of posts) {
            const likes = await this.likesRepository.findByPost(
                val.dataValues.postId
            );
            val.dataValues.likes = likes;
            postsLikesAdded.push(val.dataValues);
        }
        return postsLikesAdded.sort((a, b) => b.likes - a.likes);
    };

    createPost = async (userId, title, content) => {
        return await this.postsRepository.createPost(userId, title, content);
    };

    findPostDetail = async (postId) => {
        const post = await this.postsRepository.findPostDetail(postId);
        const likes = await this.likesRepository.findByPost(postId);
        post.dataValues.likes = likes;
        console.log(post);
        return post;
    };

    updatePost = async (postId, title, content) => {
        return this.postsRepository.updatePost(postId, title, content);
    };

    deletePost = async (postId) => {
        return await this.postsRepository.deletePost(postId);
    };
}

module.exports = PostsService;
