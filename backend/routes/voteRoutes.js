const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { voteComplaint } = require('../controllers/voteController');

router.post('/:id', auth, voteComplaint);

module.exports = router;
