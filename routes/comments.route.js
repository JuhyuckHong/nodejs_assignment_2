const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth-middleware');
const CommentsController = require('../controllers/comments.controller')
const commentsController = new CommentsController

router.get('/posts/:postId/comments', commentsController.getComments);
router.post('/posts/:postId/comments', auth, commentsController.createComment);
router.put('/posts/:postId/comments/:commentId', auth, commentsController.updateComment);
router.delete('/posts/:postId/comments/:commentId', auth, commentsController.deleteComment);

module.exports = router;
