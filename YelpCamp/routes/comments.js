var express = require("express");
var router = express.Router({mergeParams: true});
//Models
var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
//========================
// COMMENT ROUTES - "/campgrounds/:id/comments"
//========================
//GET: Comments (NEW route) - Shows form that will send data to POST route
router.get("/new", isLoggedIn, function(req,res){
    // Find Campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new.ejs", {campground: campground});
        }
    });
});
//POST: Comments (CREATE route) - Add new comment to DB
router.post("/", isLoggedIn, function(req, res){
    //Lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            //Create a new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    //Connect comment with signed in user.
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //Connect comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //Redirect campground's show page
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
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

module.exports = router;