const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Helper to sign JWT
const signToken = (user) => {
  return jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ========== SIGNUP ==========
exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    const token = signToken(newUser);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// ========== LOGIN ==========
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password',
    });
  }

  const user = await User.findOne({ email }).select('+password').select('name');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password',
    });
  }

  const token = signToken(user);

  res.status(200).json({
    status: 'success',
    token,
  });
};
// ================== LOG OUT =====================
exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .json({ status: 'success', message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};
