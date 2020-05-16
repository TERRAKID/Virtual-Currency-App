const Currency = require('../../../models/Currency');

//also update user amount .then??
const addCurrency = (req, res) => {
    let currency = new Currency();
    currency.amount = req.body.amount;
    currency.to = req.body.to;
    currency.from = req.body.from;
    currency.reason = req.body.reason;
    currency.message = req.body.message;
    currency.save((err, doc) => {
        if (!err) {
            res.json({
                status : 'success',
                data : { 'currency' : doc }
            });
        } else {
            res.json({
                status : 'error',
                message : 'Unable to add a transfer'
            });
        }
    });
}

const getCurrency = (req, res) => {
    let user = req.body.user;
    Currency.find({ $or:[ {to: user}, {from: user} ]}).sort({createdAt: 'desc'}).exec( (err, doc) => {
        if (!err) {
            res.json({
                status : 'success',
                data : { 'currency' : doc }
            });
        } else {
            res.json({
                status : 'error',
                message : 'Unable to find a transfer'
            });
        }
    });
}

const getCurrencyId = (req, res) => {
    let id = req.params.id;
    Currency.findById(id, (err, doc) => {
        if (!err) {
            res.json({
                status : 'success',
                data : { 'currency' : doc }
            });
        } else {
            res.json({
                status : 'error',
                message : 'Unable to find a transfer'
            });
        }
    });
}

//move to user?
const getLeaderboard = (req, res) => {
    res.json({
        status : 'success',
        data : {
            'currency' : [
                { 'id' : 1, 'username' : 'Jens', 'amount' : 123 },
                { 'id' : 2, 'username' : 'Mathilde', 'amount' : 321 }
            ]
        }
    });
}

module.exports.addCurrency = addCurrency;
module.exports.getCurrency = getCurrency;
module.exports.getCurrencyId = getCurrencyId;
module.exports.getLeaderboard = getLeaderboard;