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
    res.render("login");
});
//Handle Login Logic using passport middleware
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
    
});
//Show Register Form
router.get("/register", function(req, res){
    res.render("register");
});
//Handle Sign-Up Logic
router.post("/register", function(req,res){
    //Create new user object,
    var newUser = new User({username: req.body.username});
    //.register is from 'passport-local-mongoose'
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/campgrounds");
            });
        }
    });
});
//Logout Route
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
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