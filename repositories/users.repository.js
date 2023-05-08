const { Users } = require('../models');

class UserRepository {
    // nickname 유저 찾기
    findOneUser = async (nickname) => {
        try {
            return await Users.findOne({ where: { nickname } });
        } catch (err) {
            console.error(err.message);
            throw new Error('users.repository > findOneUser');
        }
    };

    // nickname과 password일치하는 유저 찾기
    createUser = async (nickname, password) => {
        try {
            return await Users.create({ nickname, password });
        } catch (err) {
            console.error(err.message);
            throw new Error('users.repository > createUser');
        }
    };
}

// 유저 repo export
module.exports = UserRepository;
