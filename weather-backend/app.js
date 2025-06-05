const express = require('express');
const weatherLogRoutes = require('./routes/weatherRoutes');
// const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api/v1/weatherLogs', weatherLogRoutes);
// app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
module.exports = app;
