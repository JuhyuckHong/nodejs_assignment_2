const express = require("express")
const { Users, Posts, Comments, Sequelize } = require("../models")
const auth = require("../middlewares/auth-middleware")
const router = express.Router()

// 댓글 목록 조회
router.get("/posts/:postId/comments", async (req, res) => {
    const { postId } = req.params

    const post = await Posts.findOne({ where: { postId } })
    if (!post) {
        return res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
    }

    try {
        const comments = await Comments.findAll({
            attributes: [
                "commentId",
                "UserId",
                [Sequelize.col("nickname"), "nickname"],
                "comment",
                "createdAt",
                "updatedAt"
            ],
            include: [{
                model: Users,
                attributes: []
            }],
            order: [['createdAt', 'DESC']]
        }, {
            where: { PostId: postId }
        })
        return res.status(200).json({ comments })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ "errorMessage": "댓글 조회에 실패하였습니다." })
    }
})

// 6. 댓글 작성 API
//     - 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 댓글 작성 가능
//     - 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
//     - 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
router.post("/posts/:postId/comments", auth, async (req, res) => {
    const { postId } = req.params
    const { comment } = req.body
    const { userId } = res.locals.user

    const post = await Posts.findOne({ where: { postId } })
    if (!post) {
        return res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
    }

    if (!comment) {
        return res.status(412).json({ message: "데이터 형식이 올바르지 않습니다." })
    }

    try {
        await Comments.create({ UserId: userId, PostId: postId, comment })
        return res.status(201).json({ message: "댓글을 작성하였습니다." })
    } catch {
        return res.status(400).json({ "errorMessage": "댓글 작성을 실패하였습니다." })
    }
})

// 7. 댓글 수정 API
//     - 로그인 토큰을 검사하여, 해당 사용자가 작성한 댓글만 수정 가능
//     - 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
//     - 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
router.put("/posts/:postId/comments/:commentId", auth, (req, res) => {

})

// 8. 댓글 삭제 API
//     - 로그인 토큰을 검사하여, 해당 사용자가 작성한 댓글만 삭제 가능
//     - 원하는 댓글을 삭제하기
router.delete("/posts/:postId/comments/:commentId", auth, (req, res) => {

})

module.exports = router;