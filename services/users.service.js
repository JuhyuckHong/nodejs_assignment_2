const UserRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');

class UserService {
    userRepository = new UserRepository();

    findOneUser = async (nickname) => {
        return await this.userRepository.findOneUser(nickname);
    };

    createUser = async (nickname, password) => {
        return await this.userRepository.createUser(nickname, password);
    };

    nicknameCheck = (nickname) => {
        return nickname.length < 3 || !/^[a-zA-Z0-9]+$/.test(nickname);
    };

    pwLenghtCheck = (password) => {
        return password.length < 4;
    };

    pwIncludeNicknameCheck = (nickname, password) => {
        return password.includes(nickname);
    };

    pwConfirm = (password, confirm) => {
        return password !== confirm;
    };

    isExistNickname = async (nickname) => {
        return Boolean(await this.findOneUser(nickname));
    };

    grantToken = (userId) => {
        return jwt.sign({ userId }, 'ghdwngur');
    };
}

module.exports = UserService;
