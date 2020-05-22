const Currency = require('../../../models/Currency');
const DefaultUser = require('../../../models/User');

const addTransfer = (req, res) => {
    if (((req.user.amount - req.body.amount) >= 0) && (req.body.amount - Math.floor(req.body.amount)) === 0) {
        let currency = new Currency();
        currency.amount = req.body.amount;
        currency.to = req.body.to;
        currency.from = req.user.username;
        currency.reason = req.body.reason;
        currency.message = req.body.message;
        currency.save((err, doc) => {
            if (!err) {
                res.json({
                    status: 'success',
                    data: {
                        'currency': doc
                    }
                });
            } else {
                res.json({
                    status: 'error',
                    message: 'Unable to add a transfer'
                });
            }
        });
    } else {
        res.json({
            status: 'error',
            message: 'Unable to add a transfer'
        });
    }
}

const getCurrency = (req, res) => {
    let user = req.user.username;
    Currency.find({
        $or: [{
            to: user
        }, {
            from: user
        }]
    }).sort({
        createdAt: 'desc'
    }).exec((err, doc) => {
        if (!err) {
            res.json({
                status: 'success',
                data: {
                    'currency': doc
                }
            });
        } else {
            res.json({
                status: 'error',
                message: 'Unable to find a transfer'
            });
        }
    });
}

const getCurrencyId = (req, res) => {
    let id = req.params.id;
    Currency.findById(id, (err, doc) => {
        if (!err) {
            res.json({
                status: 'success',
                data: {
                    'currency': doc
                }
            });
        } else {
            res.json({
                status: 'error',
                message: 'Unable to find a transfer'
            });
        }
    });
}

const getLeaderboard = (req, res) => {
    DefaultUser.find({}, 'username firstname lastname amount').sort({amount: 'descending'}).exec((err, doc) => {
        if (!err) {
            res.json({
                status: 'success',
                data: {
                    'currency': doc
                }
            });
        } else {
            res.json({
                status: 'error',
                message: 'Unable to find leaderboard'
            });
        }
    });
}

const deductCurrency = (req, res) => {
    let amount = 0 - req.body.amount;
    let username = req.user.username;
    DefaultUser.findOneAndUpdate({
        "username": username
    }, {
        "$inc": {
            "amount": amount
        }
    }, (err, doc) => {
        if (!err) {
            res.json({
                status: "success",
                data: {
                    "currency": doc
                }
            });
        } else {
            res.json({
                status: "error",
                message: "Unable to update"
            });
        }
    })
}

const addCurrency = (req, res) => {
    let amount = req.body.amount;
    let username = req.body.to;
    DefaultUser.findOneAndUpdate({
        "username": username
    }, {
        "$inc": {
            "amount": amount
        }
    }, (err, doc) => {
        if (!err) {
            res.json({
                status: "success",
                data: {
                    "currency": doc
                }
            });
        } else {
            res.json({
                status: "error",
                message: "Unable to update"
            });
        }
    })
}

const current = (req, res) => {
    let username = req.user.username;
    DefaultUser.findOne({'username': username}, (err, doc) => {
        if (!err) {
            res.json({
                status: 'success',
                data: {
                    "user": doc 
                }
            });
        } else {
            res.json({
                status: 'error',
                message: 'Unable to find user'
            });
        }
    });
}

const currentUsername = (req, res) => {
    let username = req.params.username;
    DefaultUser.findOne({'username': username}, (err, doc) => {
        if (!err) {
            res.json({
                status: 'success',
                data: {
                    "user": doc 
                }
            });
        } else {
            res.json({
                status: 'error',
                message: 'Unable to find user'
            });
        }
    });
}

module.exports.addTransfer = addTransfer;
module.exports.getCurrency = getCurrency;
module.exports.getCurrencyId = getCurrencyId;
module.exports.getLeaderboard = getLeaderboard;
module.exports.deductCurrency = deductCurrency;
module.exports.addCurrency = addCurrency;
module.exports.current = current;
module.exports.currentUsername = currentUsername;