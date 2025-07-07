const Complaint = require('../models/Complaint');
const User = require('../models/User');

// 📌 File a new complaint
const fileComplaint = async (req, res) => {
  try {
    const { title, description, type, severity } = req.body;

    const complaint = new Complaint({
      title,
      description,
      type,
      severity,
      createdBy: req.user._id,
      flatCode: req.user.flatCode,
    });

    await complaint.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { complaintsFiled: complaint._id },
    });

    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to file complaint' });
  }
};

// 📌 Get all complaints in the user's flat
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ flatCode: req.user.flatCode })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
};

// 📌 Resolve a complaint and reward karma
const resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) return res.status(404).json({ message: 'Not found' });

    complaint.resolved = true;
    await complaint.save();

    await User.findByIdAndUpdate(req.user._id, { $inc: { karma: 10 } });

    res.json({ message: 'Complaint resolved', complaint });
  } catch (err) {
    res.status(500).json({ message: 'Error resolving complaint' });
  }
};
const getTrendingComplaint = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const flatCode = user.flatCode;

    const complaints = await Complaint.find({ flatCode });

    if (!complaints.length) {
      return res.status(200).json({ message: 'No complaints found in your flat.' });
    }

    // Log one complaint for debugging
    console.log("Sample complaint:", complaints[0]);

    // Guard against votes not being an array
    const sorted = complaints.sort((a, b) => {
      const aVotes = Array.isArray(a.votes) ? a.votes : [];
      const bVotes = Array.isArray(b.votes) ? b.votes : [];

      const aUpvotes = aVotes.filter(v => v.voteType === 'upvote').length;
      const bUpvotes = bVotes.filter(v => v.voteType === 'upvote').length;

      return bUpvotes - aUpvotes;
    });

    const topVotes = Array.isArray(sorted[0].votes)
      ? sorted[0].votes.filter(v => v.voteType === 'upvote').length
      : 0;

    const trending = sorted.filter(c => {
      const voteArr = Array.isArray(c.votes) ? c.votes : [];
      return voteArr.filter(v => v.voteType === 'upvote').length === topVotes && topVotes > 0;
    });

    res.status(200).json({
      message: 'Trending complaint(s) in your flat',
      complaints: trending
    });
  } catch (error) {
    console.error('Error in trending complaint:', error);
    res.status(500).json({ message: 'Failed to fetch trending complaint' });
  }
};

// 📦 Export all controllers
module.exports = {
  fileComplaint,
  getComplaints,
  resolveComplaint,
  getTrendingComplaint
};
