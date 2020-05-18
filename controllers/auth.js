const DefaultUser = require('../models/User');

const signup = async (req, res, next) => {
    let fistName = req.body.firstname;
    let lastName = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password;

    const user = new DefaultUser({username: username, firstname: fistName, lastname: lastName, amount: 100});
    await user.setPassword(password);
    await user.save().then(result => {
        res.json({
            status : 'success',
            data : { 'user' : result }
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
        res.json({
            status : 'success',
            data : result
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