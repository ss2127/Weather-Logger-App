const mongoose = require('mongoose');
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
});

const DB = process.env.MONGO_URI;
mongoose.connect(DB).then(() => {
  console.log('✅ DB connect successful!');
});

module.exports = DB;
//
