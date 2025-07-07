const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  fileComplaint,
  getComplaints,
  resolveComplaint
} = require('../controllers/complaintController');

router.post('/', auth, fileComplaint);
router.get('/', auth, getComplaints);
router.put('/:id/resolve', auth, resolveComplaint);

module.exports = router;
