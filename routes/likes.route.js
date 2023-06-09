const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth-middleware');
const LikesController = require('../controllers/likes.controller')
const likesController = new LikesController

router.put('/:postId/like', auth, likesController.toggleLike);
router.get('/like/list', auth, likesController.findAllLikedPosts);

module.exports = router;
