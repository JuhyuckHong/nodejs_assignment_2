const PostsRepository = require('../repositories/posts.respository');
const LikesRepository = require('../repositories/likes.repository');

class PostsService {
    // 게시글 repository 객체 선언
    postsRepository = new PostsRepository();
    // 좋아요 repository 객체 선언
    likesRepository = new LikesRepository();

    // 조회한 내용에 좋아요 데이터 추가
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

    // 특정 게시글 찾기
    findOnePost = async (postId) => {
        try {
            return await this.postsRepository.findOnePost(postId);
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > findOnePost');
        }
    };

    // 특정 게시글 여러개 찾기
    findSomePosts = async (postIds) => {
        try {
            const posts = await this.postsRepository.findSomePosts(postIds);
            // 좋아요 정보 추가해서 반환
            return this.addLikes(posts);
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > findSomePosts');
        }
    };

    // 전체 게시글 찾기
    findAllPost = async () => {
        try {
            const posts = await this.postsRepository.findAllPost();
            // 좋아요 정보 추가해서 반환
            return this.addLikes(posts);
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > findAllPost');
        }
    };

    // 게시글 생성
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

    // 게시글 세부내용 조회
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

    // 게시글 수정
    updatePost = async (postId, title, content) => {
        try {
            return this.postsRepository.updatePost(postId, title, content);
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > updatePost');
        }
    };

    // 게시글 삭제
    deletePost = async (postId) => {
        try {
            return await this.postsRepository.deletePost(postId);
        } catch (err) {
            console.error(err.message);
            throw new Error('posts.service > deletePost');
        }
    };
}

// 게시글 서비스 export
module.exports = PostsService;
