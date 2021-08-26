const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const weatherData = require('./data/weather.json');

app.get('/weather', (request, response) => {
  try {
    const cityWeather = weatherData.find(lmnt => lmnt.city_name == request.searchQuery);
    response.send(cityWeather);
  } catch (error) {
    response.send('weather error');
  } finally {
    response.send('server error');
  }
});

app.get('*', (request, response) => {
  response.status(404).send('404');
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))