var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); //Allows up to leave out .ejs at the end of res.render pageName.ejs

//Home Page
app.get("/",function(req,res){
    res.render("home.ejs");
});
//GET: Campgrounds Page - Show campgrounds
var campgrounds = [
    {name: "Campground 1", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg"},
    {name: "Campground 2", image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg"},
    {name: "Campground 3", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047_b.jpg"}
];
app.get("/campgrounds", function(req,res){
    
    res.render("campgrounds.ejs", {campgrounds: campgrounds}); //{name: data} name can be anything, data must be campGrounds
});
//POST: Campgrounds Page - Where you can create a new campground
app.post("/campgrounds",function(req,res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;       // name = the name of the Name TextBox
    var image = req.body.image;     // image = the name of the Image TextBox
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");   // Redirect back to campgrounds page as a GET request
   
});
//GET: Campgrounds/New Page - Shows form that will send data to POST route
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});
//Error Page
//Note: Must be placed at the bottom otherwise all links after /[...] will trigger an error
app.get("/*",function(req,res){
    res.send("Error: Response Failed.")
});
///Start Listen
app.listen(5500,function(){
    console.log("Server has Started");
    console.log("Go to 'localhost:5500'");
});