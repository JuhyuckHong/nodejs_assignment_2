const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth-middleware');
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts);
router.post('/', auth, postsController.createPost);
router.get('/:postId', postsController.findPostDetail);
router.put('/:postId', auth, postsController.updatePost);
router.delete('/:postId', auth, postsController.deletePost);

module.exports = router;
