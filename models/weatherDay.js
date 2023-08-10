const mongoose = require("mongoose");
const {Schema} = mongoose;
const weatherSchema = new Schema({
    date: String,
    tempreture: Number,
    windSpeed: Number,
    pressure: Number,
    clouds: Number,
    humidity: Number,
    snow: Number,
    sunrise: String,
    sunset: String,
    comments: String
})

const Weather = mongoose.model("Weather", weatherSchema);
module.exports = Weather;
