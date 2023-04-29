const express = require("express")
const { Users, Posts } = require("../models")
const auth = require("../middlewares/auth-middleware")
const router = express.Router()

// 1. 전체 게시글 목록 조회 API
//     - 제목, 작성자명(nickname), 작성 날짜를 조회하기
//     - 작성 날짜 기준으로 내림차순 정렬하기
router.get("/posts", async (req, res) => {
    try {
        const posts = await Posts.findAll({
            attributes: ["postId", "userId", "title", "createdAt", "updatedAt"],
            include: [{
                model: Users,
                attributes: ["nickname"]
            }],
            order: [['createdAt', 'DESC']]
        })
        return res.status(200).json({ posts })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ "errorMessage": "게시글 조회에 실패하였습니다." })
    }

})

// 2. 게시글 작성 API
//     - 토큰을 검사하여, 유효한 토큰일 경우에만 게시글 작성 가능
//     - 제목, 작성 내용을 입력하기
router.post("/posts", auth, async (req, res) => {
    const { userId } = res.locals.user
    const { title, content } = req.body

    try {
        if (!title || !content) {
            return res.status(412).json({ "errorMessage": "데이터 형식이 올바르지 않습니다." })
        } else {
            await Posts.create({ UserId: userId, title, content })
            return res.status(201).json({ "message": "게시글 작성에 성공하였습니다." })
        }
    } catch (error) {
        console.log({ error })
        return res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
    }
})

// 3. 게시글 조회 API
//     - 제목, 작성자명(nickname), 작성 날짜, 작성 내용을 조회하기 
//     (검색 기능이 아닙니다. 간단한 게시글 조회만 구현해주세요.)
router.get("/posts/:postId", (req, res) => {

})

// 4. 게시글 수정 API
//     - 토큰을 검사하여, 해당 사용자가 작성한 게시글만 수정 가능
router.put("/posts/:postId", auth, (req, res) => {

})

// 5. 게시글 삭제 API
//     - 토큰을 검사하여, 해당 사용자가 작성한 게시글만 삭제 가능
router.delete("/posts/:postId", auth, (req, res) => {

})

module.exports = router;