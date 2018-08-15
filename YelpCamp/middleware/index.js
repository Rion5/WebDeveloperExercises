//Models
var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
//========================
// MIDDLEWARE
//========================
//Create an empty middlewareObj
var middlewareObj = {};
//Add middleware functions as object properties
//Check if User is the campground's author
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //1) Is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else{
                //2) Does the user match the campground's author? (person who created the campground)
                //     if true, then continue to call the next(); function
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
};
//Check if User is the comment's author
middlewareObj.checkCommentOwnership = function(req, res, next){
    //1) Is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                //2) Does the user match the comments's author?
                //     if true, then continue to call the next(); function
                if(foundComment.author.id.equals(req.user._id)){
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
};
//Check there is a User Logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //req.flash("key", "value") //Pass in a key and value before we redirect. To access value, use req.params.flash("key")
    //Note: flash data will not persist if page is reloaded
    req.flash("error", "Please Login First!"); 
    res.redirect("/login");
};

module.exports = middlewareObj;