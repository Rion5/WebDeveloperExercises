var express = require("express");
var router = express.Router({mergeParams: true});
//Models
var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
//========================
// COMMENT ROUTES - "/campgrounds/:id/comments"
//========================
//GET: /campgrounds/:id/comments/new (NEW route) - Shows form that will send data to POST route
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
//POST: /campgrounds/:id/comments (CREATE route) - Add new comment to DB
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
//GET: /campgrounds/:id/comments/:comment_id/edit (EDIT route) - Shows edit form for one comment
router.get("/:comment_id/edit", checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            //NOTE: /campgrounds/:id = req.params.id since we had to pass the campground's id, to reach the comments route
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});
//PUT: /campgrounds/:id/comments/:comment_id (UPDATE route) - Update a particular comment, then redirect back to that /campgrounds/:id
router.put("/:comment_id", checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            //NOTE: /campgrounds/:id = req.params.id since we had to pass the campground's id, to reach the comments route
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
//DELETE: /campgrounds/:id/comments/:comment_id (DESTROY route) - Update a particular comment, then redirect back to that /campgrounds/:id
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/"+req.params.id);
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
//Check if User is the comment's author (person who created the campground)
function checkCommentOwnership(req, res, next){
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
}

module.exports = router;