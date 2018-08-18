//@ts-nocheck
var express = require("express");
var router = express.Router();
var passport = require("passport");
//Models
var User        = require("../models/user"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
//Home Page
router.get("/",function(req,res){
    res.render("home.ejs");
});

//========================
// AUTHENTICATION ROUTES
//========================
//Show Login Form
router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});
//Handle Login Logic using passport middleware
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
}), function(req,res){
    
});
//Show Register Form
router.get("/register", function(req, res){
    res.render("register", {page: 'register'});
});
//Handle Sign-Up Logic
router.post("/register", function(req,res){
    //Create new user object,
    var newUser = new User({
        username: req.body.username, 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email:  req.body.email,
        avatar:  req.body.avatar
    });
    //.register is from 'passport-local-mongoose'
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("register");
        } else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success", "Welcome to YelpCamp "+user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});
//Logout Route
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged Out!");
    res.redirect("/campgrounds");
});
//User Profile
router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error", "User was not found");
            res.redirect("/");
        }
        Campground.findById().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
            if(err){
                req.flash("error", "User was not found");
                res.redirect("/");
            }
            res.render("users/show.ejs", {user: foundUser});
        });
    });
});

module.exports = router;