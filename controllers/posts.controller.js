const PostService = require('../services/posts.service');

class PostsController {
    postService = new PostService();

    getPosts = async (req, res, next) => {
        try {
            const posts = await this.postService.findAllPost();
            return res.status(200).json({ posts });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                errorMessage: '게시글 조회에 실패하였습니다.',
            });
        }
    };

    createPost = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { title, content } = req.body;

        if (!title || !content) {
            return res
                .status(412)
                .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
        }

        try {
            const createdPostData = this.postService.createPost(
                userId,
                title,
                content
            );
            return res
                .status(201)
                .json({ message: '게시글 작성에 성공하였습니다.' });
        } catch (error) {
            return res
                .status(400)
                .json({ errorMessage: '게시글 작성에 실패하였습니다.' });
        }
    };

    findPostDetail = async (req, res, next) => {
        const { postId } = req.params;
        try {
            const post = await this.postService.findPostDetail(postId);
            return res.status(200).json({ post });
        } catch {
            return res.status(400).json({
                errorMessage: '게시글 조회에 실패하였습니다.',
            });
        }
    };

    updatePost = async (req, res, next) => {
        const { postId } = req.params;
        const { title, content } = req.body;
        const { userId } = res.locals.user;

        try {
            const post = this.postService.findOnePost(postId);

            if (post.UserId !== userId) {
                return res.status(403).json({
                    errorMessage: '게시글 수정의 권한이 존재하지 않습니다.',
                });
            } else if (!title || !content) {
                return res
                    .status(412)
                    .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                errorMessage: '게시글 수정에 실패하였습니다.',
            });
        }

        this.postService
            .updatePost(postId, title, content)
            .then((updatedPostData) => {
                if (typeof updatedPostData !== 'number') {
                    return res
                        .status(201)
                        .json({ message: '게시글 수정에 성공하였습니다.' });
                } else {
                    return res.status(400).json({
                        errorMessage: '게시글 수정에 실패하였습니다.',
                    });
                }
            })
            .catch((error) => {
                return res.status(401).json({
                    errorMessage: '게시글이 정상적으로 수정되지 않았습니다.',
                });
            });
    };

    deletePost = async (req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        try {
            const post = this.postService.findOnePost(postId);
            if (!post) {
                return res
                    .status(404)
                    .json({ errorMessage: '게시글이 존재하지 않습니다.' });
            } else if (post.UserId !== userId) {
                return res.status(403).json({
                    errorMessage: '게시글 삭제의 권한이 존재하지 않습니다.',
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                errorMessage: '게시글 삭제에 실패하였습니다.',
            });
        }

        this.postService
            .deletePost(postId)
            .then((deletePostResult) => {
                if (typeof deletePostResult !== 'number') {
                    return res
                        .status(201)
                        .json({ message: '게시글 삭제하였습니다.' });
                } else {
                    return res.status(400).json({
                        errorMessage: '게시글 수정에 실패하였습니다.',
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                return res.status(400).json({
                    errorMessage: '게시글 삭제에 실패하였습니다.',
                });
            });
    };
}

module.exports = PostsController;