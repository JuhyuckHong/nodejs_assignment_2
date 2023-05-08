const { Users, Posts, Sequelize } = require('../models');

class PostsRepository {
    findOnePost = async (postId) => {
        const post = await Posts.findOne({ where: { postId } });

        return post;
    };

    findSomePosts = async (postIds) => {
        return await Posts.findAll({ where: { postId: postIds } });
    };

    findAllPost = async () => {
        const posts = await Posts.findAll({
            attributes: [
                'postId',
                'UserId',
                'title',
                'createdAt',
                'updatedAt',
                [Sequelize.col('nickname'), 'nickname'],
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
            order: [['createdAt', 'DESC']],
        });

        return posts;
    };

    createPost = async (userId, title, content) => {
        const createPostData = await Posts.create({
            UserId: userId,
            title,
            content,
        });

        return createPostData;
    };

    findPostDetail = async (postId) => {
        const post = await Posts.findOne({
            attributes: [
                'postId',
                'UserId',
                'title',
                'content',
                'createdAt',
                'updatedAt',
                [Sequelize.col('nickname'), 'nickname'],
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
            where: { postId },
        });

        return post;
    };

    updatePost = async (postId, title, content) => {
        const updatePostData = await Posts.update(
            { title, content },
            { where: { postId } }
        );

        return updatePostData;
    };

    deletePost = async (postId) => {
        const deletePostResult = await Posts.destroy({ where: { postId } });

        return deletePostResult;
    };
}

module.exports = PostsRepository;
