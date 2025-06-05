const express = require('express');
const weatherLogController = require('.././controllers/weatherController');
// const authController = require('./../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(authMiddleware.protect, weatherLogController.getAllLogs);

router
  .route('/display')
  .post(authMiddleware.protect, weatherLogController.displayWeather);

router
  .route('/save')
  .post(authMiddleware.protect, weatherLogController.saveLog)
  .delete(authMiddleware.protect, weatherLogController.deleteAllLogs);

router
  .route('/save/:id')
  .delete(authMiddleware.protect, weatherLogController.deleteLog);
module.exports = router;
