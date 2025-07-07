const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getLeaderboard, getFlatStats } = require('../controllers/statsController');

router.get('/leaderboard', auth, getLeaderboard);
router.get('/flat', auth, getFlatStats);

module.exports = router;
