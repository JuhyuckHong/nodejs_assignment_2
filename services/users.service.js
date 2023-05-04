const UserRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');

class UserService {
    userRepository = new UserRepository();

    findOneUser = async (nickname) => {
        const user = await this.userRepository.findOneUser(nickname);
        return user;
    };

    createUser = async (nickname, password) => {
        const user = await this.userRepository.createUser(nickname, password);
        return user;
    };

    nicknameCheck = (nickname) => {
        console.log(nickname)
        const regex = /^[a-zA-Z0-9]+$/;
        if (nickname.length < 3 || !regex.test(nickname)) {
            return true;
        } else {
            return false;
        }
    };

    pwLenghtCheck = (password) => {
        if (password.length < 4) {
            return ture;
        } else {
            return false;
        }
    };

    pwIncludeNicknameCheck = (nickname, password) => {
        if (password.includes(nickname)) {
            return true;
        } else {
            return false;
        }
    };

    pwConfirm = (password, confirm) => {
        if (password !== confirm) {
            return true;
        } else {
            return false;
        }
    };

    isExistNickname = async (nickname) => {
        const user = await this.findOneUser(nickname);
        if (user) {
            return true;
        } else {
            return false;
        }
    };

    grantToken = (userId) => {
        const token = jwt.sign({ userId }, 'ghdwngur');
        return token;
    };
}

module.exports = UserService;
