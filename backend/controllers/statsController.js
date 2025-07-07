const User = require('../models/User');
const Complaint = require('../models/Complaint');

exports.getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find({ flatCode: req.user.flatCode })
      .sort({ karma: -1 })
      .limit(5)
      .select('name karma');

    res.json({ topFlatmates: topUsers });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load leaderboard' });
  }
};

exports.getFlatStats = async (req, res) => {
  try {
    const flatCode = req.user.flatCode;

    // Most upvoted = Flatmate Problem of the Week
    const complaints = await Complaint.find({ flatCode });
    const mostUpvoted = complaints.sort((a, b) => b.votes.upvotes.length - a.votes.upvotes.length)[0];

    // Count complaints by type
    const categoryCount = {};
    for (const c of complaints) {
      if (!categoryCount[c.type]) categoryCount[c.type] = 0;
      categoryCount[c.type]++;
    }

    // User with most complaints filed against them
    const userComplaintCount = {};
    for (const c of complaints) {
      const userId = c.createdBy.toString();
      userComplaintCount[userId] = (userComplaintCount[userId] || 0) + 1;
    }

    // Find top offender
    let topOffenderId = null;
    let maxCount = 0;
    for (const [uid, count] of Object.entries(userComplaintCount)) {
      if (count > maxCount) {
        topOffenderId = uid;
        maxCount = count;
      }
    }

    let topOffender = null;
    if (topOffenderId) {
      const offenderUser = await User.findById(topOffenderId).select('name email');
      topOffender = { ...offenderUser._doc, complaints: maxCount };
    }

    res.json({
      problemOfWeek: mostUpvoted || null,
      complaintStats: categoryCount,
      topOffender
    });

  } catch (err) {
    res.status(500).json({ message: 'Failed to load flat stats' });
  }
};
