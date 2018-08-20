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
// GET: /users/new (NEW route) - Displays form to make a new User
//POST: /users (CREATE route) - Add new User to DB

// GET: /users/:id (SHOW route) - Shows info about one User
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
//GET: /users/:id/edit (EDIT route) - Shows edit form for one User
//PUT: /users/:id (UPDATE route) - Update a particular user, then redirect back to SHOW route
//DELETE:  /users/:id (DESTROY route) - Delete a particular User, then redirect back to Campgrounds SHOW route
module.exports = router;