const UsersRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');

class UsersService {
    usersRepository = new UsersRepository();

    findOneUser = async (nickname) => {
        return await this.usersRepository.findOneUser(nickname);
    };

    createUser = async (nickname, password) => {
        return await this.usersRepository.createUser(nickname, password);
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

module.exports = UsersService;
