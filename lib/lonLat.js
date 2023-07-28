const axios = require("axios");

async function lonLat(req, res) {
    const request = req.query.q;
    const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${request}&format=json`;
    const response = await axios.get(API);
    
    const smth = +response.data[0].lon;
    const smth2 = +response.data.lat[1].lat;
    const lon = Math.round(smth*100)/100;
    const lat =  Math.round(smth2*100)/100;
    const lonLat = [lon, lat];
    console.log(lonLat);
    res.json(lonLat);
}

module.exports = lonLat;