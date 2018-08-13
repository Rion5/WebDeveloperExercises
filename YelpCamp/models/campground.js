var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
//Compile into a model
var Campground = mongoose.model("Campground", campgroundSchema);
//Return Campground
module.exports = Campground;