const express = require("express")
const jwt = require("jsonwebtoken")
const { Users } = require("../models")
const router = express.Router()

// 회원 가입 API
// 닉네임, 비밀번호, 비밀번호 확인을 request에서 전달받기
// 닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성하기
// 비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패로 만들기
// 비밀번호 확인은 비밀번호와 정확하게 일치하기
// 데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 
// "중복된 닉네임입니다." 라는 에러메세지를 response에 포함
router.post("/signup", (req, res) => {

})

// 로그인 API
// 닉네임, 비밀번호를 request에서 전달받기
// 로그인 버튼을 누른 경우 닉네임과 비밀번호가 데이터베이스에 등록됐는지 확인한 뒤, 
// 하나라도 맞지 않는 정보가 있다면 "닉네임 또는 패스워드를 확인해주세요."라는 에러 메세지를 response에 포함하기
// 로그인 성공 시, 로그인에 성공한 유저의 정보를 JWT를 활용하여 클라이언트에게 Cookie로 전달하기
router.post("/login", (req, res) => {

})