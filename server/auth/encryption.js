const bcrypt = require('bcrypt');

async function getHashedPassword(userPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    return hashedPassword;
}

async function verifyPassword(userPassword, hashedPassword) {
    return await bcrypt.compare(userPassword, hashedPassword);
}

module.exports = {
    getHashedPassword,
    verifyPassword
}
