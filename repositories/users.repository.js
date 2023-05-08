const { Users } = require('../models');

class UserRepository {
    findOneUser = async (nickname) => {
        try {
            return await Users.findOne({ where: { nickname } });
        } catch (err) {
            console.error(err.message);
            throw new Error('users.repository > findOneUser');
        }
    };

    createUser = async (nickname, password) => {
        try {
            return await Users.create({ nickname, password });
        } catch (err) {
            console.error(err.message);
            throw new Error('users.repository > createUser');
        }
    };
}

module.exports = UserRepository;
