const { Posts, Likes } = require('../models');

class LikesRepository {
    // DB에서 userId가 postId에 like한 자료가 있는지 확인
    findLike = async (postId, userId) => {
        try {
            return await Likes.findOne({
                where: {
                    UserId: userId,
                    PostId: postId,
                },
            });
        } catch (err) {
            console.error(err.message);
            throw new Error('likes.repository > findLike');
        }
    };

    // postId에 like한 자료의 개수(=like 수) 찾기
    findByPost = async (postId) => {
        try {
            const users = await Likes.findAll({
                where: { PostId: postId },
            });
            return users.length;
        } catch (err) {
            console.error(err.message);
            throw new Error('likes.repository > findByPost');
        }
    };

    // like 생성
    createLike = async (postId, userId) => {
        try {
            return await Likes.create({
                UserId: userId,
                PostId: postId,
            });
        } catch (err) {
            console.error(err.message);
            throw new Error('likes.repository > createLike');
        }
    };

    // like 삭제
    deleteLike = async (postId, userId) => {
        try {
            return await Likes.destroy({
                where: {
                    PostId: postId,
                    UserId: userId,
                },
            });
        } catch (err) {
            console.error(err.message);
            throw new Error('likes.repository > deleteLike');
        }
    };

    // like한 모든 postId 찾기
    findAllLikedPosts = async (userId) => {
        try {
            return await Likes.findAll({
                attributes: ['PostId'],
                include: [{ model: Posts, attributes: [] }],
                raw: true,
                where: { UserId: userId },
            });
        } catch (err) {
            console.error(err.message);
            throw new Error('likes.repository > findAllLikedPosts');
        }
    };
}

// export like repository 
module.exports = LikesRepository;
