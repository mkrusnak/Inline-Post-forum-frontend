const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    profilePic: {type: String},
    drivingNow: {type: String},
    drivingNowImg: {type: String},
    headerImg: {type: String},
    cars: [{type: String}],
    status: {type: String},
    dreamCar: {type: String},
    dreamCarImg: {type: String}
})
