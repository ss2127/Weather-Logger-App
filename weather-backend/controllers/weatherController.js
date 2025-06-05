const weatherLog = require('../models/WeatherLogModel');

const fetchWeatherByCity = require('../services/weatherAPI');

// Show all the weather data that user has stored
// GET /api/v1/weatherLogs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await weatherLog.find({ user: req.user._id });
    res.status(200).json(logs);
  } catch (err) {
    console.error('getAllLogs error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve all weather logs',
    });
  }
};

// Display Weather Data
// POST /api/v1/weatherLogs/display
exports.displayWeather = async (req, res) => {
  try {
    const city = req.body.city;

    if (!city)
      return res.status(400).json({
        success: false,
        message: 'City name is required',
      });
    const weatherData = await fetchWeatherByCity(city);
    if (!weatherData) {
      return res.status(502).json({
        success: false,
        message: 'Failed to fetch weather data from API.',
      });
    }
    res.status(200).json(weatherData);
  } catch (err) {
    console.error('Display error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Unexpected server error',
    });
  }
};

// Create Log
// save weather log to database
// POST /api/v1/weatherLogs/save
exports.saveLog = async (req, res) => {
  try {
    const log = await weatherLog.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(log);
  } catch (err) {
    console.error('Error saving log:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again',
    });
  }
};
// UPDATE
// DELETE A LOG
// DELETE /api/v1/weatherLogs/save/:id
exports.deleteLog = async (req, res) => {
  try {
    const log = await weatherLog.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!log) {
      return res.status(404).json({
        success: false,
        message: 'Log not found.',
      });
    }
    res.status(200).json(log);
  } catch (err) {
    console.error('deletedLog error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete log',
    });
  }
};

// DELETE ALL LOGS
// DELETE /api/v1/weatherLogs/save
exports.deleteAllLogs = async (req, res) => {
  try {
    const result = await weatherLog.deleteMany({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} weather logs deleted`,
    });
  } catch (err) {
    console.error('deletedAllLogs error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Fail to delete all logs',
    });
  }
};
