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

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());       // Encoding it (serialize) and putting it back into the session
passport.deserializeUser(User.deserializeUser());   // Taking the data thats encoded in the sessions and un encoding it (deserialize)

//============
// ROUTES
//============
//Home Page
app.get("/", function(req,res){
    res.render("home.ejs");
});
//Secret Page
//Notes on middleware: When a get request is made to /secret, run the isLoggedIn function, then run the callback
app.get("/secret", isLoggedIn,function(req,res){
    res.render("secret");
});

//============
// AUTH Routes
//============
//Displays form to register a new user
app.get("/register", function(req,res){
    res.render("register");
});
//Register New User to DB
app.post("/register", function(req,res){
     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
         if(err){
             console.log(err);
             return res.render("register");
         } else{
             passport.authenticate("local")(req,res,function(){ //"local" can be swapped out with "twitter", "google", etc...
                res.redirect("/secret");
             });
         }
     });
});

//============
// LOGIN Routes
//============
//Display login form
app.get("/login", function(req,res){
    res.render("login");
});
//Login Logic, contains middleware
//When we get a post request at /login, it will run the middleware code immediately.
//passport will check the user and password from the body and check if it matches with the hashed password.
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
    
});
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});
function isLoggedIn(req, res, next){
    //If request is authenticated (method from passport), return next, Otherwise go back to login form
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//============
//Error Page
app.get("/*", function(req,res){
    res.send("Error: Could not load page");
});
//Start Server
app.listen(5500, function(){
    console.log("Auth Demo Server has Started");
    console.log("Go to 'localhost:5500'");
});
