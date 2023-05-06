const LikeRepository = require('../repositories/like.repository')

class LikeService {
    likeRepository = new LikeRepository()

    findLikeExist = async (postId, userId) => {
        return await this.likeRepository.findLike(postId, userId)
    }

    createLike = async (postId, userId) => {
        return await this.likeRepository.createLike(postId, userId)
    }

    deleteLike = async (postId, userId) => {
        return await this.likeRepository.deleteLike(postId, userId)
    }

    findAllLikedPosts = async (userId) => {
        const likeAllPosts = this.likeRepository.findAllLikedPosts(userId)
        console.log(likeAllPosts)
        // count likes
        // sorting
        return likeAllPosts
    }
}

module.exports = LikeService