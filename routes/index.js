const express = require("express")
const indexRouter = express.Router()
const usersRouter = require("./users")
const postsRouter = require("./posts")
const commentsRouter = require("./comments")

indexRouter.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
        <title>API index page</title>
    </head>
    <body style="background-color: black; color: white;">
        <h1>API index page</h1>
    </body>
    </html>`)
})

module.exports = { indexRouter, usersRouter, postsRouter, commentsRouter }