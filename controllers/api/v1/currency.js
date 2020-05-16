const addCurrency = (req, res) => {
    res.json({
        status : 'success',
        data : {
            'currency' : { 'id' : 1, 'amount' : 123, 'to' : 'Jens', 'from' : 'Mathilde', 'reason' : 1, 'message' : 'hello' }}
    });
}

const getCurrency = (req, res) => {
    res.json({
        status : 'success',
        data : {
            'currency' : [
                { 'id' : 1, 'amount' : 123, 'to' : 'Jens', 'from' : 'Mathilde', 'reason' : 1, 'message' : 'hello' },
                { 'id' : 1, 'amount' : 123, 'to' : 'Jens', 'from' : 'Mathilde', 'reason' : 1, 'message' : 'hello' }
            ]
        }
    });
}

const getCurrencyId = (req, res) => {
    res.json({
        status : 'success',
        data : {
            'currency' : { 'id' : 1, 'amount' : 123, 'to' : 'Jens', 'from' : 'Mathilde', 'reason' : 1, 'message' : 'hello' }}
    });
}

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