const express = require("express");

const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

const weatherData = require("./data/weather.json");
const res = require("express/lib/response");

function findCity(data, searchItems) {
    const searchObject = {city_name:searchItems.query.city_name, lon: +searchItems.query.lon, lat: +searchItems.query.lat};
    console.log(searchObject);
    // const keys = Object.keys(searchItems);
    const keys = Object.keys(searchObject)
    let result;
   for(let i= 0; i < keys.length; i++){
    if(!searchObject[keys[i]]) {
        continue;
    }
        result = data.find((item) => item[keys[i]] == searchObject[keys[i]])
        console.log(result);
            if(result) {
                const array = result.data.map(weatherDay => {return {date: weatherDay.valid_date, description: weatherDay.weather.description}});
                return array;
            }
                else return console.log("No parameters found");
   }

}

// findCity(weatherData, {city_name:"Paris", lon:2.35, lat:48.86})

// function findCity(item){
//     const theGame = weatherData.find((game) => game.lon == item);
//     return theGame;
// }

app.get("/weather", (req, res) => {
    let data = weatherData;
    let dataToReturn = data;
    // findCity(data, req)
    
    dataToReturn = findCity(data, req)
   
    // let dataToReturn = findCity(req.query.lon)
    // res.json(data)
    res.json(dataToReturn)
    // res.json(findCity("Paris", 2.35, 48.86))
})

app.get("/", (req, res) => {
    res.json("you've reached the root")
})

// if (request.query.title) {
//     dataToReturn = fitlerGamesByTitle(request.query.title);
//   } else if (request.query.year) {
//     dataToReturn = filterGamesByYear(request.query.year);
//   }



app.listen(PORT, () => console.log(`app is running on port ${PORT}`));