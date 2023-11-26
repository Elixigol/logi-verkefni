const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/arrivals', async (req, res) => {
  try {
    // Make a request to the actual API server
    const apiResponse = await axios.get('https://www.isavia.is/fids/arrivals.aspx?_=1700944171329');

    // Send the API response to the React Native app
    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/departures', async (req, res) => {
  try {
    // Make a request to the actual API server
    const apiResponse = await axios.get('https://www.isavia.is/fids/departures.aspx?_=1701004539804');

    // Send the API response to the React Native app
    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});