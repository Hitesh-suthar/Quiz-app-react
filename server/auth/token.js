const jwt = require('json-web-token');

const secretKey = 'My name is hitesh kumar';
async function generateUserToken(userData){
    const token = jwt.sign(userData,secretKey);
    
}

async function verifyUserToken(tokenRecieved){
    
}

module.exports = {
    generateUserToken,
    verifyUserToken
}