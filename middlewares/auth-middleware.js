const jwt = require("jsonwebtoken")
const { Users } = require("../models")

module.exports = async (req, res, next) => {
    try {
        // cookie에 저장된 JWT를 가져와서,
        // 토큰 타입을 확인하고,
        // decode를 통해 verify하고,
        // 사용자 존재 여부 확인해서,
        // res.local에 user로 저장하고,
        // next()로 다음 작업으로 넘겨줌
    } catch {
        // 위 단계 중 뭐 하나 잘못되면
        // 비정상 요청으로 간주
    }
}