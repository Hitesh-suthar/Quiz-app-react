const User = require('../model/user');
const { getHashedPassword, verifyPassword } = require('../auth/encryption')
const { generateUserToken } = require('../auth/token')

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) res.send({ message: 'User not found' });
        else if (await verifyPassword(password, user.password)) {

            res.status(200).send(user);
        }
        else {
            res.send({ message: 'Incorrect password' });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'Something went wrong, please try again later!' });
    }
}

async function userSignUp(req, res) {
    try {
        let { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) res.send({ message: 'User already exists, Try Login' });
        else {
            password = await getHashedPassword(password);
            const newUser = await User.create({
                name,
                email,
                password
            })
            newUser.save();
            console.log('User created successfully');
            res.send({ message: 'Registration successfull. Login now' });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'Something went wrong, please try again later!' });
    }
}

async function userUpdate(req, res) {

}

async function userDelete(req, res) {

}


module.exports = {
    userLogin,
    userSignUp,
    userUpdate,
    userDelete
}