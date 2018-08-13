var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express();

mongoose.connect("mongodb://localhost:27017/auth_demo", {useNewUrlParser: true});
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Hidden Secret Message, Text could be anything",
    resave: false,
    saveUninitialized: false
}));
//We need the following 2 lines below, anytime we want to use passport
app.use(passport.initialize());
app.use(passport.session());
//Responsible for reading the sessions
passport.serializeUser(User.serializeUser());       // Encoding it (serialize) and putting it back into the session
passport.deserializeUser(User.deserializeUser());   // Taking the data thats encoded in the sessions and un encoding it (deserialize)

//Home Page
app.get("/", function(req,res){
    res.render("home.ejs");
});
//Secret Page
app.get("/secret", function(req,res){
    res.render("secret");
});



//Error Page
app.get("/*", function(req,res){
    res.send("Error: Could not load page");
});
//Start Server
app.listen(5500, function(){
    console.log("Auth Demo Server has Started");
    console.log("Go to 'localhost:5500'");
});
