const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

const weatherData = require("./data/weather.json");
const city = require("./lib/city");
const currentWeather = require("./lib/current_weather");

app.locals.lon = 0;
app.locals.lat = 0;


// function findCity(data, searchItems) {
//     const searchObject = {city_name:searchItems.query.city_name, lon: +searchItems.query.lon, lat: +searchItems.query.lat};
//     console.log(searchObject);
//     const keys = Object.keys(searchObject)
//     let result;
//    for(let i= 0; i < keys.length; i++){
//     if(!searchObject[keys[i]]) {
//         continue;
//     }
//         result = data.find((item) => item[keys[i]] == searchObject[keys[i]])
//         console.log(result);
//             if(result) {
//                 const array = result.data.map(weatherDay => {return {date: weatherDay.valid_date, description: weatherDay.weather.description}});
//                 return array;
//             }
//                 else return console.log("No parameters found");
//    }

// }


app.get("/city", city);
app.get("/currentweather", currentWeather);


// app.get("/city", lonLat)


// app.get("/weather", (req, res) => {
//     let data = weatherData;
//     let dataToReturn = data;
    
//     dataToReturn = findCity(data, req)

//     res.json(dataToReturn)
// })

app.get("/", (req, res) => {
    res.json("you've reached the root")
})


app.listen(PORT, () => console.log(`app is running on port ${PORT}`));