var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
var app         = express();

mongoose.connect("mongodb://localhost:27017/yelpCamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); //Allows up to leave out .ejs at the end of res.render pageName.ejs

// SCHEMA Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//Compile into a model
var Campground = mongoose.model("Campground", campgroundSchema);

//Create new campground
// Campground.create({
//     name: "Campground 1", 
//     image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//     description: "Test Campground"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("Created new campground: ");
//         console.log(campground);
//     }
// });

// Campground.remove({},function(err){
//     console.log("Collection Removed");
// });
///////////////////////////////////////////////////////////////

//Home Page
app.get("/",function(req,res){
    res.render("home.ejs");
});
//GET: Campgrounds Page - (INDEX) campgrounds
app.get("/campgrounds", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds", {campgrounds:allCampgrounds}); //{name: data} name can be anything, data must be allCampgrounds
        }
    });
});
//POST: Campgrounds Page (CREATE) - Where you can create a new campground
app.post("/campgrounds",function(req,res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;  
    var image = req.body.image;    
    var newCampground = {name: name, image: image}; //{name: data}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");   // Redirect back to campgrounds page as a GET request
        }
    });
   
});
//GET: Campgrounds/New Page (NEW) - Shows form that will send data to POST route
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

//GET: Single Campgrounds Page (SHOW) - Render will show more info about one campground
//Note: Must be placed at bottom, otherwise campgrounds/[...] will trigger this page.
app.get("/campgrounds/:id",function(req,res){
    res.render("show");
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