const express = require("express");
const router = express.Router();
const usersRouter = require("./users")
const postsRouter = require("./posts")
const commentsRouter = require("./comments")

router.get("/", (req, res) => {
	res.send(`<!DOCTYPE html>
    <html>
    <head>
        <title>API index page</title>
    </head>
    <body style="background-color: black; color: white;">
        <h1>API index page</h1>
    </body>
    </html>`)
});

module.exports = { router, usersRouter, postsRouter, commentsRouter };