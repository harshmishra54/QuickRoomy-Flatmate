const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: {
    type: String,
    enum: ['Noise', 'Cleanliness', 'Bills', 'Pets', 'Other'],
    default: 'Other'
  },
  severity: {
    type: String,
    enum: ['Mild', 'Annoying', 'Major', 'Nuclear'],
    default: 'Mild'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flatCode: String,
  votes: {
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  resolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
