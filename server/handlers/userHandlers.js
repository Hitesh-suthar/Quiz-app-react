const User = require('../model/user');
const { getHashedPassword, verifyPassword } = require('../auth/encryption')
const { generateUserToken } = require('../auth/token')

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) res.send({ message: 'User not found' });
        else if (await verifyPassword(password, user.password)) {
            const token = await generateUserToken({ name:user.name, email })
            res.cookie('jwt', token, {
                httpOnly: true, // Prevent access from client-side scripts
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict', // Prevent CSRF attacks
            });
            res.status(200).send({message:"Login successfull" , user : {name:user.name,email}});
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
            const token = await generateUserToken({ name, email })
            res.cookie('jwt', token, {
                httpOnly: true, // Prevent access from client-side scripts
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict', // Prevent CSRF attacks
            });

            console.log('User created successfully');
            res.send({
                message: 'Registration successfull',
                user : {name,email}
            });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'Something went wrong, please try again later!' });
    }
}

async function userLogout(req,res){
    res.clearCookie('jwt')
    res.send({message:"Logout successfull"} );
}

module.exports = {
    userLogin,
    userSignUp,
    userLogout
}