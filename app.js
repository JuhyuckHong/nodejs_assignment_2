const express = require('express');
const cookieParser = require('cookie-parser');
const {
    indexRouter,
    usersRouter,
    postsRouter,
    commentsRouter,
} = require('./routes');
const app = express();
const PORT = 3000;

// cookie-parser 사용
app.use(cookieParser());

// request json parsing, route 사용
app.use(express.json());
app.use('/api', [indexRouter, usersRouter, postsRouter, commentsRouter]);

// 랜딩페이지 눈부심 방지
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
        <title>My Page</title>
    </head>
    <body style="background-color: black; color: white;">
        <h1>Node 숙련주차 과제</h1>
        <small> 홍주혁 파트타임1기</small>
    </body>
    </html>`);
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} now.`);
});
