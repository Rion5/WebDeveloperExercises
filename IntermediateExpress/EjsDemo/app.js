var express = require("express");
var app = express();

//Home
app.get("/",function(req,res){
    res.render("home.ejs");
    //res.send("<h1>Welcome to the Home Page!</h1><h2>Chai Grindean</h2>");
})


app.get("/love/:thing", function(req,res){
    var thing = req.params.thing;
    //res.send("You love "+ thing);
    res.render("love.ejs", {thingInput: thing});
});


//Start Server
app.listen(5500,function(req,res){
    console.log("Server Started!");
    console.log("Go to 'localhost:5500'");
});