const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth-middleware');
const PostController = require('../controllers/posts.controller');
const postController = new PostController();

router.get('/posts', postController.getPosts);
router.post('/posts', auth, postController.createPost);
router.get('/posts/:postId', postController.findPostDetail);
router.put('/posts/:postId', auth, postController.updatePost);
router.delete('/posts/:postId', auth, postController.deletePost);

module.exports = router;
