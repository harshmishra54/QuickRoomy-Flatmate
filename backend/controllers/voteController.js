const Complaint = require('../models/Complaint');
const { generatePunishment } = require('../utils/punishmentGenerator');

exports.voteComplaint = async (req, res) => {
  const { voteType } = req.body;
  const userId = req.user._id;
  const complaintId = req.params.id;

  try {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    // Remove user from both vote arrays to prevent duplicates
    complaint.votes.upvotes.pull(userId);
    complaint.votes.downvotes.pull(userId);

    if (voteType === 'upvote') {
      complaint.votes.upvotes.push(userId);
    } else if (voteType === 'downvote') {
      complaint.votes.downvotes.push(userId);
    } else {
      return res.status(400).json({ message: 'Invalid vote type' });
    }

    await complaint.save();

    let punishment = null;
    if (complaint.votes.upvotes.length >= 10) {
      punishment = generatePunishment(complaint.type);
    }

    res.json({ message: 'Vote recorded', complaint, punishment });
  } catch (err) {
    res.status(500).json({ message: 'Error voting' });
  }
};
