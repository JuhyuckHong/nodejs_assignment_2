const { Users, Posts, Sequelize } = require('../models');

class PostsRepository {
    // 게시글 한개 찾기
    findOnePost = async (postId) => {
        try {
            return await Posts.findOne({ where: { postId } });
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.repository > findOnePost');
        }
    };

    // postId 여러개의 게시글 찾기
    findSomePosts = async (postIds) => {
        try {
            return await Posts.findAll({
                attributes: [
                    'postId',
                    'UserId',
                    'title',
                    'createdAt',
                    'updatedAt',
                    // nickname을 조인한 테이블에서 찾기위해 alias
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

    // 모든 게시글 찾기
    findAllPost = async () => {
        try {
            return await Posts.findAll({
                attributes: [
                    'postId',
                    'UserId',
                    'title',
                    'createdAt',
                    'updatedAt',
                    // nickname을 조인한 테이블에서 찾기위해 alias
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

    // 게시글 생성
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

    // 게시글 세부내용 찾기
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
                    // nickname을 조인한 테이블에서 찾기위해 alias
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

    // 게시글 수정
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

    // 게시글 삭제
    deletePost = async (postId) => {
        try {
            return await Posts.destroy({ where: { postId } });
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.repository > deletePost');
        }
    };
}

// 게시글 repository export
module.exports = PostsRepository;
