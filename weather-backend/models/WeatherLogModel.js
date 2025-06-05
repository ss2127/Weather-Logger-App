const mongoose = require('mongoose');

const weatherLogSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String,
  localTime: String,
  countryCode: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const weatherLog = mongoose.model('weatherLog', weatherLogSchema);

module.exports = weatherLog;
