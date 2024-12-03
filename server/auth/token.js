const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function generateUserToken(userData) {
    return jwt.sign(userData, process.env.JWT_SECRET);
}

async function verifyUserToken(req,res) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        console.log("authenticated")
        res.send({ message: 'Authentication successfull', user:decodedUser});
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = {
    generateUserToken,
    verifyUserToken
}