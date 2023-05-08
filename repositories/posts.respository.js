const { Users, Posts, Sequelize } = require('../models');

class PostsRepository {
    findOnePost = async (postId) => {
        try {
            return await Posts.findOne({ where: { postId } });
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.repository > findOnePost');
        }
    };

    findSomePosts = async (postIds) => {
        try {
            return await Posts.findAll({
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
                where: { postId: postIds },
            });
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.repository > findSomePost');
        }
    };

    findAllPost = async () => {
        try {
            return await Posts.findAll({
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
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.repository > findAllPost');
        }
    };

    createPost = async (userId, title, content) => {
        try {
            return await Posts.create({
                UserId: userId,
                title,
                content,
            });
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.repository > createPost');
        }
    };

    findPostDetail = async (postId) => {
        try {
            return await Posts.findOne({
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
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.repository > findPostDetail');
        }
    };

    updatePost = async (postId, title, content) => {
        try {
            return await Posts.update(
                { title, content },
                { where: { postId } }
            );
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.repository > updatePost');
        }
    };

    deletePost = async (postId) => {
        try {
            return await Posts.destroy({ where: { postId } });
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.repository > deletePost');
        }
    };
}

module.exports = PostsRepository;
