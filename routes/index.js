var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/transfer', function(req, res, next) {
  res.render('transfer');
});

router.get('/leaderboard', function(req, res, next) {
  res.render('leaderboard');
});

router.get('/transfer/history', function(req, res, next) {
  res.render('history');
});

module.exports = router;
