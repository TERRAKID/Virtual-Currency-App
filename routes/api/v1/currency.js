const express = require('express');
const router = express.Router();
const currencyController = require('../../../controllers/api/v1/currency');

router.post('/transfers', currencyController.addTransfer);
router.get('/transfers', currencyController.getCurrency);
router.get('/transfers/:id', currencyController.getCurrencyId);
router.get('/leaderboard', currencyController.getLeaderboard);
router.post('/deductcurrency', currencyController.deductCurrency);
router.post('/addcurrency', currencyController.addCurrency);

module.exports = router;