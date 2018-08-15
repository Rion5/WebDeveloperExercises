//@ts-nocheck //Turn JavaScript Type Checking off. Shows errors on injected passport methods
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

var indexRoutes     = require("./routes/index"),
    campgroundRoutes= require("./routes/campgrounds"),
    commentRoutes   = require("./routes/comments");
    

mongoose.connect("mongodb://localhost:27017/yelpCamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");                  //Allows us to leave out .ejs at the end of res.render pageName.ejs
app.use(express.static(__dirname+ "/public"));  //__dirname refers to the directory that this script was running from
app.use(methodOverride("_method"));             //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
//seedDB(); //Seed the DB

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
//This middleware will be called on every route
app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    next();
});
//========================
// ROUTES
//========================
//Express Router
app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes); //appends '/campgrounds' to each request. Helps keep code DRY since we don't have to type out app.get(/campgrounds/...)
app.use("/campgrounds/:id/comments",commentRoutes);
//========================
// ERROR Page
//========================
//Note: Must be placed at the bottom otherwise all links after /[...] will trigger an error
app.get("/*",function(req,res){
    res.send("Error: Response Failed.");
});
//========================
///Start Server
//========================
app.listen(5500,function(){
    console.log("Server has Started");
    console.log("Go to 'localhost:5500'");
});