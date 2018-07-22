var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["Tony", "Matt", "David"];

app.get("/",function(req,res){
    res.render("home");
});

app.get("/friends", function(req,res){
    res.render("friends", {friends: friends});
});

app.post("/addFriend", function(req, res){
    var newFriend = req.body.newFriendName;
    console.log(req.body.newFriendName);
    friends.push(newFriend);
    res.redirect("/friends");
});



//Start Server
app.listen(5500,function(req,res){
    console.log("Server Started!");
    console.log("Go to 'localhost:5500'");
});