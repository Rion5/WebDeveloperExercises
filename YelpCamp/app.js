var express = require("express");
var app = express();
app.set("view engine", "ejs"); //Allows up to leave out .ejs at the end of res.render pageName.ejs

//Home Page
app.get("/",function(req,res){
    res.render("home.ejs");
});
//Campgrounds Page
app.get("/campgrounds", function(req,res){
    var campgrounds = [
        {name: "Campground 1", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg"},
        {name: "Campground 2", image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg"},
        {name: "Campground 3", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047_b.jpg"}
    ];
    res.render("campgrounds.ejs", {campgrounds: campgrounds}); //{name: data} name can be anything, data must be campGrounds
});
//Error Page
app.get("/*",function(req,res){
    res.send("Error: Response Failed.")
});

///Start Listen
app.listen(5500,function(){
    console.log("Server has Started");
    console.log("Go to 'localhost:5500'");
});