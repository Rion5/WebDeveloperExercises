var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),   
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelpCamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");                  //Allows us to leave out .ejs at the end of res.render pageName.ejs
app.use(express.static(__dirname+ "/public"));  //__dirname refers to the directory that this script was running
seedDB();

//========================
// PASSPORT CONFIGURATIONS
//========================
app.use(require("express-session")({
    secret: "Secret can be anything, this is used to compute the hash",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//========================
// CAMPGROUND ROUTES
//========================
//Home Page
app.get("/",function(req,res){
    res.render("home.ejs");
});
//GET: Campgrounds Page - (INDEX) campgrounds
app.get("/campgrounds", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds}); //{name: data} name can be anything, data must be allCampgrounds
        }
    });
});
//GET: Campgrounds/New Page (NEW) - Shows form that will send data to POST route
app.get("/campgrounds/new",isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});
//POST: Campgrounds Page (CREATE) - Where you can create a new campground ...
app.post("/campgrounds", isLoggedIn,function(req,res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;  
    var image = req.body.image;
    var desc = req.body.description;   
    var newCampground = {name: name, image: image, description: desc}; //{name: data}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");   // Redirect back to campgrounds page as a GET request
        }
    });
});
//GET: Single Campgrounds Page (SHOW) - Render will show more info about one campground
//Note: Must be placed at bottom, otherwise campgrounds/[...] will trigger this page.
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
//========================
// COMMENT ROUTES
//========================
//GET: Comments (NEW route) - Shows form that will send data to POST route
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
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
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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
                    //Connect a new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //Redirect campground show page
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });   
});
//========================
// AUTHENTICATION ROUTES
//========================
//Show Login Form
app.get("/login", function(req, res){
    res.render("login");
});
//Handle Login Logic using passport middleware
//app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
    
});
//Show Register Form
app.get("/register", function(req, res){
    res.render("register");
});
//Handle Sign-Up Logic
app.post("/register", function(req,res){
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
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});
//Middleware: Check there is a User Logged in.
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//========================
//Error Page
//Note: Must be placed at the bottom otherwise all links after /[...] will trigger an error
app.get("/*",function(req,res){
    res.send("Error: Response Failed.");
});
//========================
///Start Listen
app.listen(5500,function(){
    console.log("Server has Started");
    console.log("Go to 'localhost:5500'");
});