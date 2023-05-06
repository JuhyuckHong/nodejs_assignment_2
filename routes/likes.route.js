const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth-middleware');
const LikeController = require('../controllers/like.controller')
const likeController = new LikeController

router.put('/posts/:postId/like', auth, likeController.toggleLike);
router.get('/posts/like/list', auth, likeController.findAllLikedPosts);

module.exports = router;
