var express = require("express");
var app = express();
app.set("view engine", "ejs");


app.get("/",function(req,res){
    res.render("home");
});

app.get("/friends", function(req,res){
    var friends = ["Tony", "Matt", "David"];

    res.render("friends", {friends: friends});
});





//Start Server
app.listen(5500,function(req,res){
    console.log("Server Started!");
    console.log("Go to 'localhost:5500'");
});