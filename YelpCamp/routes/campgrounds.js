var express = require("express");
var router = express.Router();
//Models
var Campground  = require("../models/campground");

//========================
// CAMPGROUND ROUTES - '/campgrounds'
//========================
//GET: Campgrounds Page - (INDEX) campgrounds
router.get("/", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds, currentUser: req.user}); //{name: data} name can be anything, data must be allCampgrounds
        }
    });
});
//GET: Campgrounds/New Page (NEW) - Shows form that will send data to POST route
router.get("/new",isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});
//POST: Campgrounds Page (CREATE) - Where you can create a new campground ...
router.post("/", isLoggedIn,function(req,res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;  
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author:author}; //{name: data}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");   // Redirect back to campgrounds page as a GET request
        }
    });
});
//GET: Single Campgrounds Page (SHOW) - Render will show more info about one campground
//Note: Must be placed at bottom, otherwise campgrounds/[...] will trigger this page.
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
//GET: Campgrounds Edit Page (EDIT) - Shows edit form for one campground
router.get("/:id/edit", function(req,res){
    //Campground.findById(req.params.id).
    res.render("campgrounds/edit");
});

//========================
// MIDDLEWARE
//========================
//Check there is a User Logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;