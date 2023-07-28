
const axios = require("axios");

async function current_weather(req, res){

    try{
        const lon = req.query.lon;
        const lat = req.query.lat;
        const API = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
        const response = await axios.get(API);
        res.json(response.data);
    }
    catch(error) {
        res.json(error);
    }
}

module.exports = current_weather;


