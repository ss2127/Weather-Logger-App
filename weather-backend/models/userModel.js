const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: 6,
    select: false, // Don't return password in queries
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE !
      // Creating user and updating user password
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  passwordChangedAt: Date,
});

// Hash Password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

// Compare login password with hashed password
userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
