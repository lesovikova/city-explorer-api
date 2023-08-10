
const axios = require("axios");

async function city(req, res){
    try{
        const request = req.query.q;
        const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${request}&format=json`;
        const response = await axios.get(API);
        res.json(response.data);      
    }
    catch(error) {
        res.json(error);
    }
}

module.exports = city;

