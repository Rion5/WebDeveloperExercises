var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" //ref refers to the model that we are going to refer to, with the ObjectId
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
//Compile into a model
var Campground = mongoose.model("Campground", campgroundSchema);
//Return Campground
module.exports = Campground;