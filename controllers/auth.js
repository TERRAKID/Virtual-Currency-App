const DefaultUser = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    let fistName = req.body.firstname;
    let lastName = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password;

    const user = new DefaultUser({username: username, firstname: fistName, lastname: lastName, amount: 100});
    await user.setPassword(password);
    await user.save().then(result => {
        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, 'KcWI4adb6H')
        res.json({
            status : 'success',
            data : { 'token' : token }
        })
    }).catch(error => {
        res.json({
            status : 'error',
            message : error
        })
    });
};

const login = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    await DefaultUser.authenticate()(username, password).then(result => {
        if (!result.user) {
            res.json({
                status : 'fail',
                message : 'Login failed'
            });
        }

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username
        }, 'KcWI4adb6H')

        return res.json({
            status : 'success',
            data : { 'token' : token }
        })
    }).catch(error => {
        res.json({
            status : 'error',
            message : error
        });
    });
}

module.exports.signup = signup;
module.exports.login = login;