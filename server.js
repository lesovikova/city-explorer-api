const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const mongoose = require("mongoose");
const bp = require("body-parser");
const PORT = process.env.PORT || 8081;
const app = express();
app.use(cors());
app.use(bp.json());

const Weather = require("./models/weatherDay");
mongoose.connect(process.env.DATABASE_URL).then(() => console.log('DB Connected'));


const weatherData = require("./data/weather.json");
const city = require("./lib/city");
const currentWeather = require("./lib/current_weather");


app.get("/city", city);
app.get("/currentweather", currentWeather);


async function checkDate(){
    const todayDate = new Date();
    const thisTodayDate = todayDate.toISOString().slice(0, 10);
    const thisDate = await Weather.find();
    if(!thisDate[thisDate.length-1].date.includes(thisTodayDate)){
        const API = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=52.6285576&lon=1.2923954`;
        const response = await axios.get(API);
                const newEntry = await Weather.create({
                    date: response.data.data[0].ob_time,
                    tempreture: response.data.data[0].temp,
                    windSpeed: response.data.data[0].wind_spd,
                    pressure: response.data.data[0].pres,
                    clouds: response.data.data[0].clouds,
                    humidity: response.data.data[0].rh,
                    snow: response.data.data[0].snow,
                    sunrise: response.data.data[0].sunrise,
                    sunset: response.data.data[0].sunset,
                    comments: "Enter comment",
                })
        }
        else console.log("The item found");
}

checkDate();


app.get("/getPastweather", async (req, res) => {
    console.log(req);
    try{
        const weather = await Weather.find();
        res.status(200).json(weather);
        console.log(weather);
    }
    catch(error) {
        res.json(error);
    }
})

app.get("/", (req, res) => {
    res.json("you've reached the root")
})


app.listen(PORT, () => console.log(`app is running on port ${PORT}`));