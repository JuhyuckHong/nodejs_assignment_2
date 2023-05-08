const UsersService = require('../services/users.service');

class UsersController {
    usersService = new UsersService();

    // 회원가입
    signup = async (req, res, next) => {
        const { nickname, password, confirm } = req.body;
        // 조건 검토
        try {
            // 닉네임
            if (this.usersService.validation.nicknameCheck(nickname)) {
                return res.status(412).json({
                    errorMessage: '닉네임의 형식이 일치하지 않습니다.',
                });
            }
            // 패스워드
            if (this.usersService.validation.pwLenghtCheck(password)) {
                return res.status(412).json({
                    errorMessage: '패스워드 형식이 일치하지 않습니다.',
                });
            }
            // 패스워드에 닉네임 포함 시
            if (
                this.usersService.validation.pwIncludeNicknameCheck(
                    nickname,
                    password
                )
            ) {
                return res.status(412).json({
                    errorMessage: '패스워드에 닉네임이 포함되어 있습니다.',
                });
            }
            // 패스워드 불일치
            if (this.usersService.validationpwConfirm(password, confirm)) {
                return res
                    .status(412)
                    .json({ errorMessage: '패스워드가 일치하지 않습니다.' });
            }
            // 이미 등록된 닉네임
            if (await this.usersService.isExistNickname(nickname)) {
                return res
                    .status(412)
                    .json({ errorMessage: '중복된 닉네임입니다.' });
            }

            // 유저 등록
            const user = await this.usersService.createUser(nickname, password);
            // 과 함께 로그인
            const token = this.usersService.grantToken(user.userId);
            res.cookie('authorization', `Bearer ${token}`);
            return res
                .status(201)
                .json({ message: '회원 가입에 성공하였습니다.' });
        } catch (error) {
            // 예기치 못한에러 발생 400과 메시지 반환
            console.log(error);
            return res.status(400).json({
                errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
            });
        }
    };

    // 로그인
    login = async (req, res, next) => {
        const { nickname, password } = req.body;
        try {
            // 유저 확인
            const user = await this.usersService.findOneUser(nickname);
            // 유저가 없거나 비밀번호 불일치 시
            if (!user || password !== user.password) {
                // 412 에러
                return res.status(412).json({
                    errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
                });
            } else {
                // 로그인 토큰 생성 및 전달
                const token = this.usersService.grantToken(user.userId);
                res.cookie('authorization', `Bearer ${token}`);
                return res.status(200).json({ token });
            }
        } catch (error) {
            // 예기치 못한 에러 발생 400에러
            console.log(error);
            return res
                .status(400)
                .json({ errorMessage: '로그인에 실패하였습니다.' });
        }
    };
}

// 유저 컨트롤러 export
module.exports = UsersController;
