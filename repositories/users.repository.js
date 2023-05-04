const { Users } = require('../models');

class UserRepository {
    findOneUser = async (nickname) => {
        const user = await Users.findOne({ where: { nickname } });
        return user
    }

    createUser = async (nickname, password) => {
        const user = await Users.create({ nickname, password });
        return user
    }
}

module.exports = UserRepository