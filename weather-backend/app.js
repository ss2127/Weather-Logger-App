const express = require('express');
const helmet = require('helmet');
// const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

const weatherLogRoutes = require('./routes/weatherRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// ========== Security Middleware ==========
app.use(express.json({ limit: '10kb' }));
app.use(cors());
app.use(helmet());
// app.use(xss());
app.use(mongoSanitize());

// ========== Routes ==========
app.use('/api/v1/weatherLogs', weatherLogRoutes);
app.use('/api/v1/users', userRoutes);

module.exports = app;
