const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1]; // Get the token part only
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in',
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User no longer exists',
      });
    }

    if (user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: 'fail',
        message: 'User recently changed password! Please log in again.',
      });
    }

    // ✅ Attach user to request and allow access
    req.user = user;

    next();
  } catch (err) {
    console.error('JWT error:', err);
    res.status(401).json({
      status: 'fail',
      message: 'Invalid or expired token',
    });
  }
};
