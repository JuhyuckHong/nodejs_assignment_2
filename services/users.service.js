const UsersRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');

class ValidationIdPw {
    nicknameCheck = (nickname) => {
        try {
            return nickname.length < 3 || !/^[a-zA-Z0-9]+$/.test(nickname);
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > ValidationIdPw.nicknameCheck');
        }
    };

    pwLenghtCheck = (password) => {
        try {
            return password.length < 4;
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > ValidationIdPw.pwLenghtCheck');
        }
    };

    pwIncludeNicknameCheck = (nickname, password) => {
        try {
            return password.includes(nickname);
        } catch (err) {
            console.error(err.message);
            throw new Error(
                'users.service > ValidationIdPw.pwIncludeNicknameCheck'
            );
        }
    };

    pwConfirm = (password, confirm) => {
        try {
            return password !== confirm;
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > ValidationIdPw.pwConfirm');
        }
    };
}

class UsersService {
    usersRepository = new UsersRepository();
    validation = new ValidationIdPw();

    findOneUser = async (nickname) => {
        try {
            return await this.usersRepository.findOneUser(nickname);
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > findOneUser');
        }
    };

    createUser = async (nickname, password) => {
        try {
            return await this.usersRepository.createUser(nickname, password);
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > createUser');
        }
    };

    isExistNickname = async (nickname) => {
        try {
            return Boolean(await this.findOneUser(nickname));
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > isExistNickname');
        }
    };

    grantToken = (userId) => {
        try {
            return jwt.sign({ userId }, 'ghdwngur');
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > grantToken');
        }
    };
}

module.exports = UsersService;
