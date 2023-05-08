const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth-middleware');
const CommentsController = require('../controllers/comments.controller')
const commentsController = new CommentsController

router.get('/:postId/comments', commentsController.getComments);
router.post('/:postId/comments', auth, commentsController.createComment);
router.put('/:postId/comments/:commentId', auth, commentsController.updateComment);
router.delete('/:postId/comments/:commentId', auth, commentsController.deleteComment);

module.exports = router;
