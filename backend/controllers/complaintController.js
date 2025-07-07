const Complaint = require('../models/Complaint');
const User = require('../models/User');

exports.fileComplaint = async (req, res) => {
  try {
    const { title, description, type, severity } = req.body;

    const complaint = new Complaint({
      title,
      description,
      type,
      severity,
      createdBy: req.user._id,
      flatCode: req.user.flatCode
    });

    await complaint.save();

    // Link to user
    await User.findByIdAndUpdate(req.user._id, {
      $push: { complaintsFiled: complaint._id }
    });

    res.status(201).json(complaint);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Failed to file complaint' });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ flatCode: req.user.flatCode })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
};

exports.resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) return res.status(404).json({ message: 'Not found' });

    complaint.resolved = true;
    await complaint.save();

    // Reward karma to resolver
    await User.findByIdAndUpdate(req.user._id, { $inc: { karma: 10 } });

    res.json({ message: 'Complaint resolved', complaint });
  } catch (err) {
    res.status(500).json({ message: 'Error resolving complaint' });
  }
};
export const getTrendingComplaint = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const flatCode = user.flatCode;

    // Find complaints in the same flat
    const complaints = await Complaint.find({ flatCode });

    if (!complaints.length) {
      return res.status(200).json({ message: 'No complaints found in your flat.' });
    }

    // Sort complaints by upvote count descending
    const sorted = complaints.sort((a, b) => b.upvotes.length - a.upvotes.length);
    const topVotes = sorted[0].upvotes.length;

    // Get all complaints that match top vote count (in case of tie)
    const trending = sorted.filter(c => c.upvotes.length === topVotes && topVotes > 0);

    res.status(200).json({
      message: 'Trending complaint(s) in your flat',
      complaints: trending
    });
  } catch (error) {
    console.error('Error in trending complaint:', error);
    res.status(500).json({ message: 'Failed to fetch trending complaint' });
  }
};
