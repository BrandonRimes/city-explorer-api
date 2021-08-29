const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

app.get('/weather', (request, response) => {
  try {
    const cityWeather = weatherData.find(lmnt => lmnt.city_name == request.query.searchQuery);
    const cityForecast = cityWeather.data.map(day => new Forecast(day));
    response.send(cityForecast);
  } catch (error) {
    response.send('weather error');
  }
});

class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp}, with ${day.weather.description}`;
    this.date = day.datetime;
  }
}

app.get('*', (request, response) => {
  response.status(404).send('404');
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
