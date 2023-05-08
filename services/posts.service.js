const PostsRepository = require('../repositories/posts.respository');
const LikesRepository = require('../repositories/likes.repository');

class PostsService {
    postsRepository = new PostsRepository();
    likesRepository = new LikesRepository();

    addLikes = async (posts) => {
        try {
            const postsLikesAdded = [];
            for (const post of posts) {
                const likes = await this.likesRepository.findByPost(
                    post.dataValues.postId
                );
                post.dataValues.likes = likes;
                postsLikesAdded.push(post.dataValues);
            }
            return postsLikesAdded;
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > addLikes');
        }
    };

    findOnePost = async (postId) => {
        try {
            return await this.postsRepository.findOnePost(postId);
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > findOnePost');
        }
    };

    findSomePosts = async (postIds) => {
        try {
            const posts = await this.postsRepository.findSomePosts(postIds);
            return this.addLikes(posts);
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > findSomePosts');
        }
    };

    findAllPost = async () => {
        try {
            const posts = await this.postsRepository.findAllPost();
            return this.addLikes(posts);
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > findAllPost');
        }
    };

    createPost = async (userId, title, content) => {
        try {
            return await this.postsRepository.createPost(
                userId,
                title,
                content
            );
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > createPost');
        }
    };

    findPostDetail = async (postId) => {
        try {
            const post = await this.postsRepository.findPostDetail(postId);
            const likes = await this.likesRepository.findByPost(postId);
            post.dataValues.likes = likes;
            console.log(post);
            return post;
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > findPostDetail');
        }
    };

    updatePost = async (postId, title, content) => {
        try {
            return this.postsRepository.updatePost(postId, title, content);
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > updatePost');
        }
    };

    deletePost = async (postId) => {
        try {
            return await this.postsRepository.deletePost(postId);
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > deletePost');
        }
    };
}

module.exports = PostsService;
