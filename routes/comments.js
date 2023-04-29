const express = require("express")
const { Comments } = require("../models")
const auth = require("../middlewares/auth-middleware")
const router = express.Router()

// 6. 댓글 작성 API
//     - 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 댓글 작성 가능
//     - 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
//     - 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
router.post("/posts/:postId/comments", auth, (req, res) => {

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