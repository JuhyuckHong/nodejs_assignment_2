const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth-middleware');
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/posts', postsController.getPosts);
router.post('/posts', auth, postsController.createPost);
router.get('/posts/:postId', postsController.findPostDetail);
router.put('/posts/:postId', auth, postsController.updatePost);
router.delete('/posts/:postId', auth, postsController.deletePost);

module.exports = router;
