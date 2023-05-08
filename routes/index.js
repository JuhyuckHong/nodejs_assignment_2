const express = require('express');
const router = express.Router();
const usersRouter = require('./users.route');
const postsRouter = require('./posts.route');
const commentsRouter = require('./comments.route');
const likesRouter = require('./likes.route')

router.use('/posts', [postsRouter, commentsRouter, likesRouter])
router.use('/', usersRouter)

router.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
        <title>API index page</title>
    </head>
    <body style="background-color: black; color: white;">
        <h1>API index page</h1>
    </body>
    </html>`);
});

module.exports = router