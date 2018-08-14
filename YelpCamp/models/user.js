var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
//Model Schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
//Inject passport methods to User Model
userSchema.plugin(passportLocalMongoose);
//Compile into a model
var User = mongoose.model("User", userSchema);
//Return User
module.exports = User;