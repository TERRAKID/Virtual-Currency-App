const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    reason: Number,
    message: String
},
{timestamps: true});

const Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;