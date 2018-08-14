var mongoose = require("mongoose");
//Model Schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
//Compile into a model
var User = mongoose.model("User", userSchema);
//Return User
module.exports = User;