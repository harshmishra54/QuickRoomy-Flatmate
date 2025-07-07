const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, flatCode } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashed, flatCode });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1d' });

    res.status(201).json({ token, user: { id: newUser._id, name, email, flatCode } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, name: user.name, email, flatCode: user.flatCode } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
