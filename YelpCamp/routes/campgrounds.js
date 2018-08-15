var express = require("express");
var router = express.Router();
//Models
var Campground  = require("../models/campground");

//========================
// CAMPGROUND ROUTES - '/campgrounds'
//========================
//GET: /campgrounds (INDEX) - Display a list of all campgrounds
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
//GET: /campgrounds/new (NEW) - Displays form to make a new campground
router.get("/new",isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});
//POST: /campgrounds (CREATE) - Add new campground to DB
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
//GET: /campgrounds/:id (SHOW) - Shows info about one campground
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
//GET: /campgrounds/:id/edit (EDIT) - Shows edit form for one campground
router.get("/:id/edit", checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
//PUT: /campgrounds/:id (UPDATE) - Update a particular campground, then redirect back to that /campground/:id page
router.put("/:id", function(req,res){
    //.findByIdAndUpdate(id, update, callback)
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/"+updatedCampground._id); //req.params.id will also work for the id
        }
    });
});
//DELETE: /campgrounds/:id (DESTROY) - Delete a particular campground, then redirect back to /campgrounds
router.delete("/:id", function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
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
//Check if User is the campground's author
function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else{
                //2) If they are, does the user match the campground's author? (person who created the campground)
                if(foundCampground.author.id.equals(req.user._id)){
                   next();
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        //3) If not, redirect User back to previous page
        res.redirect("back");   
    }
}
module.exports = router;