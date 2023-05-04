const UserService = require('../services/users.service');

class UserController {
    userService = new UserService();

    signup = async (req, res, next) => {
        const { nickname, password, confirm } = req.body;
        try {
            if (this.userService.nicknameCheck(nickname)) {
                return res.status(412).json({
                    errorMessage: '닉네임의 형식이 일치하지 않습니다.',
                });
            }
            if (this.userService.pwLenghtCheck(password)) {
                return res.status(412).json({
                    errorMessage: '패스워드 형식이 일치하지 않습니다.',
                });
            }
            if (this.userService.pwIncludeNicknameCheck(nickname, password)) {
                return res.status(412).json({
                    errorMessage: '패스워드에 닉네임이 포함되어 있습니다.',
                });
            }
            if (this.userService.pwConfirm(password, confirm)) {
                return res
                    .status(412)
                    .json({ errorMessage: '패스워드가 일치하지 않습니다.' });
            }
            if (await this.userService.isExistNickname(nickname)) {
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

        const user = await this.userService.createUser(nickname, password);
        const token = this.userService.grantToken(user.userId);
        res.cookie('authorization', `Bearer ${token}`);
        return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    };

    login = async (req, res, next) => {
        const { nickname, password } = req.body;
        try {
            const user = await this.userService.findOneUser(nickname);
            if (!user || password !== user.password) {
                return res.status(412).json({
                    errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
                });
            } else {
                const token = this.userService.grantToken(user.userId);
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

module.exports = UserController