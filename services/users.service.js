const UsersRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');

// 닉네임 패스워드 검증
class ValidationIdPw {
    // 닉네임 2자 이하 또는 알파벳과 숫자로 이루어 졌는지 확인
    nicknameCheck = (nickname) => {
        try {
            return nickname.length < 3 || !/^[a-zA-Z0-9]+$/.test(nickname);
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > ValidationIdPw.nicknameCheck');
        }
    };

    // 비밀번호 길이 검증
    pwLenghtCheck = (password) => {
        try {
            return password.length < 4;
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > ValidationIdPw.pwLenghtCheck');
        }
    };

    // 비밀번호에 닉네임 포함여부 확인
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

    // 비밀번호 타이핑 오류 검증
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
    // 유저 repo 객체 선언
    usersRepository = new UsersRepository();
    // 닉네임 패스워드 검증 클래스 객체 선언
    validation = new ValidationIdPw();

    // 한명 유저 찾기
    findOneUser = async (nickname) => {
        try {
            return await this.usersRepository.findOneUser(nickname);
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > findOneUser');
        }
    };

    // 유저 생성
    createUser = async (nickname, password) => {
        try {
            return await this.usersRepository.createUser(nickname, password);
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > createUser');
        }
    };

    // 유저 닉네임 존재여부 확인 (Bool)
    isExistNickname = async (nickname) => {
        try {
            return Boolean(await this.findOneUser(nickname));
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > isExistNickname');
        }
    };

    // 로그인 토큰 생성
    grantToken = (userId) => {
        try {
            return jwt.sign({ userId }, 'ghdwngur');
        } catch (err) {
            console.error(err.message);
            throw new Error('users.service > grantToken');
        }
    };
}

// 유저 서비스 export
module.exports = UsersService;
