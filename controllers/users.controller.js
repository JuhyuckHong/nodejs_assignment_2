const UsersService = require('../services/users.service');

class UsersController {
    usersService = new UsersService();

    signup = async (req, res, next) => {
        const { nickname, password, confirm } = req.body;
        try {
            if (this.usersService.validation.nicknameCheck(nickname)) {
                return res.status(412).json({
                    errorMessage: '닉네임의 형식이 일치하지 않습니다.',
                });
            }
            if (this.usersService.validation.pwLenghtCheck(password)) {
                return res.status(412).json({
                    errorMessage: '패스워드 형식이 일치하지 않습니다.',
                });
            }
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
            if (this.usersService.validationpwConfirm(password, confirm)) {
                return res
                    .status(412)
                    .json({ errorMessage: '패스워드가 일치하지 않습니다.' });
            }
            if (await this.usersService.isExistNickname(nickname)) {
                return res
                    .status(412)
                    .json({ errorMessage: '중복된 닉네임입니다.' });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
            });
        }

        const user = await this.usersService.createUser(nickname, password);
        const token = this.usersService.grantToken(user.userId);
        res.cookie('authorization', `Bearer ${token}`);
        return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    };

    login = async (req, res, next) => {
        const { nickname, password } = req.body;
        try {
            const user = await this.usersService.findOneUser(nickname);
            if (!user || password !== user.password) {
                return res.status(412).json({
                    errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
                });
            } else {
                const token = this.usersService.grantToken(user.userId);
                res.cookie('authorization', `Bearer ${token}`);
                return res.status(200).json({ token });
            }
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ errorMessage: '로그인에 실패하였습니다.' });
        }
    };
}

module.exports = UsersController;
