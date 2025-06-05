const axios = require('axios');
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
});

const API_KEY = process.env.WEATHER_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const fetchWeatherByCity = async (city) => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
    },
  });
  const { name, main, weather, dt, timezone, sys } = response.data;
  const localTime = getLocalTime(dt, timezone);
  function getLocalTime(unixTime, timezoneOffsetInSeconds) {
    const localTimestamp = (unixTime + timezoneOffsetInSeconds) * 1000; // Convert to milliseconds
    const localDate = new Date(localTimestamp);
    return localDate.toLocaleString(); // Returns a human-readable local time
  }

  return {
    city: name,
    countryCode: sys.country,
    temperature: Math.round(main.temp - 273.15),
    description: weather[0].description,
    localTime: localTime,
  };
};
fetchWeatherByCity('Tokyo');
module.exports = fetchWeatherByCity;
