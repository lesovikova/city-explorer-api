const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL);
const Weather = require("./models/weatherDay");

async function seed() {
    await Weather.create({        
        date: "2023-08-08",
        tempreture: 20,
        windSpeed: 0.5,
        pressure: 1000,
        clouds: 50,
        humidity: 70,
        snow: 0,
        sunrise: "04:25",
        sunset: "19:30",
        comments: "It was a fine day, could wear a t-shirt",
    });
    await Weather.create({        
        date: "2023-08-09",
        tempreture: 18,
        windSpeed: 0.5,
        pressure: 1070,
        clouds: 50,
        humidity: 78,
        snow: 0,
        sunrise: "04:27",
        sunset: "19:25",
        comments: "It was a fine day too",
        });
     console.log("Weather is created!");
     mongoose.disconnect()
}

seed();