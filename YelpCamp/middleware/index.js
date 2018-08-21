//Models
var Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    User        = require("../models/user");
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
                req.flash("error", "Campground was not found");
                res.redirect("back");
            } else{
                //2) Does the user match the campground's author? (person who created the campground)
                //     if true, then continue to call the next(); function
                if(foundCampground.author.id.equals(req.user._id)){
                   next();
                } else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else{
        //3) If not, redirect User back to previous page
        req.flash("error", "Please Login First!");
        res.redirect("back");   
    }
};
//Check if User is the comment's author
middlewareObj.checkCommentOwnership = function(req, res, next){
    //1) Is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment was not found");
                res.redirect("back");
            } else{
                //2) Does the user match the comments' author?
                //     if true, then continue to call the next(); function
                if(foundComment.author.id.equals(req.user._id)){
                   next();
                } else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else{
        //3) If not, redirect User back to previous page
        req.flash("error", "Please Login First!");
        res.redirect("back");   
    }
};
//Check if User is the logged in user (For User EDIT route)
middlewareObj.checkUserOwnership = function(req, res, next){ 
    //1) Is user logged in?
    if(req.isAuthenticated()){
        //2) Find User by id
        User.findById(req.params.user_id, function(err, foundUser){
            if(err){
                req.flash("error", "User was not found");
                res.redirect("back");
            } else {
                if(foundUser._id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else{
        //3) If not, redirect User back to previous page
        req.flash("error", "Please Login First!");
        res.redirect("/login");  
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