var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    userName: String,
    password: String
});

userSchema.plugin(passportLocalMongoose); //Takes our 'passport-local-mongoose', and adds a bunch of methods that come with the package to the userSchema

module.exports = mongoose.model("User", userSchema);