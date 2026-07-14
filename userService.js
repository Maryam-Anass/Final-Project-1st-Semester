const User = require('../models/userModel');

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    return user;
};

const createUser = async (userData) => {
    return await User.craete(userData);
};

module.exports = {
    findUserByEmail, createUser
};