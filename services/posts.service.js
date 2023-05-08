const PostsRepository = require('../repositories/posts.respository');
const LikesRepository = require('../repositories/likes.repository');

class PostsService {
    postsRepository = new PostsRepository();
    likesRepository = new LikesRepository();

    addLikes = async (posts) => {
        const postsLikesAdded = []
        for (const post of posts) {
            const likes = await this.likesRepository.findByPost(
                post.dataValues.postId
            )
            post.dataValues.likes = likes
            postsLikesAdded.push(post.dataValues)
        }
        return postsLikesAdded
    }

    findOnePost = async (postId) => {
        return await this.postsRepository.findOnePost(postId);
    };

    findSomePosts = async (postIds) => {
        const posts = await this.postsRepository.findSomePosts(postIds);
        return this.addLikes(posts)
    };

    findAllPost = async () => {
        const posts = await this.postsRepository.findAllPost();      
        return this.addLikes(posts)
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
