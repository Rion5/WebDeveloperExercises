var express = require("express");
var router = express.Router();
//Models
var Campground  = require("../models/campground");
var middleware  = require("../middleware"); //If we require the middleware directory, it will automatically require the contents of index.js
//NodeGeocoder
var NodeGeocoder = require("node-geocoder");
var options = {
    provider: "google",
    httpAdapter: "https",
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};
var geocoder = NodeGeocoder(options);

//========================
// CAMPGROUND ROUTES - '/campgrounds'
//========================
//GET: /campgrounds (INDEX) - Display a list of all campgrounds
router.get("/", function(req,res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else{
                res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds, currentUser: req.user, page: 'campgrounds'}); //{name: data} name can be anything, data must be allCampgrounds
            }
        });
    } else{
        //Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else{
                res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds, currentUser: req.user, page: 'campgrounds'}); //{name: data} name can be anything, data must be allCampgrounds
            }
        });
    }
});
//Fuzzy Search
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
//GET: /campgrounds/new (NEW) - Displays form to make a new campground
router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});
//POST: /campgrounds (CREATE) - Add new campground to DB
router.post("/", middleware.isLoggedIn,function(req,res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;  
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function(err, data){
        if(err || !data.length){
            req.flash("error", err.message);
            return res.redirect("back");
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCampground = {name: name, price: price, image: image, description: desc, author:author, location: location, lat: lat, lng: lng}; //{name: data}
        // Create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
                req.flash("error", "Something went wrong!");
            } else{
                req.flash("success", "Successfully added a new campground!");
                res.redirect("/campgrounds");   // Redirect back to campgrounds page as a GET request
            }
        });
    });
});
//GET: /campgrounds/:id (SHOW) - Shows info about one campground
//Note: Must be placed at bottom, otherwise campgrounds/[...] will trigger this page.
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
            req.flash("error", "Campground was not found");
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
//GET: /campgrounds/:id/edit (EDIT) - Shows edit form for one campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            req.flash("error", "Campground was not found");
        } else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});
//PUT: /campgrounds/:id (UPDATE) - Update a particular campground, then redirect back to that /campground/:id page
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
    geocoder.geocode(req.body.location, function(err, data){
        if(err || !data.length){
            req.flash("error", err.message);
            return res.redirect("back");
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCampground = {name: req.body.name, image: req.body.image, description: req.body.description, location: location, latitude: lat, longitude: lng};
        //.findByIdAndUpdate(id, update, callback)
        Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err, updatedCampground){
            if(err){
                console.log(err);
                req.flash("error", "Update Failed: Something went wrong!");
                res.redirect("/campgrounds");
            } else{
                req.flash("success", "Successfully updated campground");
                res.redirect("/campgrounds/"+updatedCampground._id); //req.params.id will also work for the id
            }
        });
    });
});
//DELETE: /campgrounds/:id (DESTROY) - Delete a particular campground, then redirect back to /campgrounds
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Delete Failed: Something went wrong!");
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "Successfully deleted campground");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;