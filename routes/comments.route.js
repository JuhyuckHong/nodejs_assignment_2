const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth-middleware');
const CommentController = require('../controllers/comment.controller')
const commentController = new CommentController

router.get('/posts/:postId/comments', commentController.getComments);
router.post('/posts/:postId/comments', auth, commentController.createComment);
router.put('/posts/:postId/comments/:commentId', auth, commentController.updateComment);
router.delete('/posts/:postId/comments/:commentId', auth, commentController.deleteComment);

module.exports = router;
