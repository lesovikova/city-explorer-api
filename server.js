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