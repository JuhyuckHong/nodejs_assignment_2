const PostRepository = require('../repositories/posts.respository');

class PostService {
    postRepository = new PostRepository();

    findOne = async (postId) => {
        const post = await this.postRepository.findOne(postId);
        return post;
    };

    findAllPost = async () => {
        const allPost = await this.postRepository.findAllPost();
        return allPost.map((post) => {
            return {
                postId: post.postId,
                UserId: post.UserId,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                nickname: post.nickname,
            };
        });
    };

    createPost = async (userId, title, content) => {
        const createdPostData = await this.postRepository.createPost(
            userId,
            title,
            content
        );
        return createdPostData;
    };

    findOneDetail = async (postId) => {
        const post = await this.postRepository.findOneDetail(postId);
        return post;
    };

    updatePost = async (postId, title, content) => {
        const updatedPostData = this.postRepository.updatePost(
            postId,
            title,
            content
        );
        return updatedPostData;
    };

    deletePost = async (postId) => {
        const deletePostResult = await this.postRepository.deletePost(postId);
        return deletePostResult;
    };
}

module.exports = PostService;
