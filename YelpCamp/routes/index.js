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
//Logout Route
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged Out!");
    res.redirect("/campgrounds");
});

module.exports = router;