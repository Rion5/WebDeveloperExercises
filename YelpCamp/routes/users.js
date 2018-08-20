var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
//Models
var User        = require("../models/user"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

//========================
// USER ROUTES
//========================
//TODO: SHOW / CREATE / UPDATE Routes

//GET: /users/:id (SHOW route) - Shows info about one User
router.get("/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error", "User was not found");
            return res.redirect("/");
        }
        Campground.findById().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
            if(err){
                req.flash("error", "Campground was not found");
                return res.redirect("/");
            } else {
                res.render("users/show.ejs", {user: foundUser, campgrounds: campgrounds});
            }
        });
    });
});
module.exports = router;