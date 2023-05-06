const LikeRepository = require('../repositories/like.repository')
const PostService = require('./posts.service')

class LikeService {
    likeRepository = new LikeRepository()
    postService = new PostService()

    findLikeExist = async (postId, userId) => {
        return await this.likeRepository.findLike(postId, userId)
    }

    createLike = async (postId, userId) => {
        return await this.likeRepository.createLike(postId, userId)
    }

    deleteLike = async (postId, userId) => {
        return await this.likeRepository.deleteLike(postId, userId)
    }

    findByPost = async (postId) => {
        return await this.likeRepository.findByPost(postId)
    }

    findAllLikedPosts = async (userId) => {
        const likeAllPosts = await this.likeRepository.findAllLikedPosts(userId)
        const postIds = likeAllPosts.map((val) => val.PostId)
        const posts = await this.postService.findSomePosts(postIds)
        console.log(posts)
        // sorting
        return posts
    }
}

module.exports = LikeService