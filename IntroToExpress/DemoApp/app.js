//Include Express
var express = require("express");
//Execute and save into variable called 'app'
var app = express();

// "Route" => "Response"
// "/"  => "Hello"
app.get("/", function(req, res){
    res.send("Hello");
});

// "/bye" => Good Bye
app.get("/bye", function(req, res){
    res.send("Good Bye");
}) ;

// "/contact" => Contact Page
app.get("/contact", function(req, res){
    res.send("Contact Page");
});

//* Route Matcher
//This will run anytime there is a get request to a URL that isn't defined. (!= /, /bye, /contact)
app.get("*", function(req, res){
    res.send("* Route Matcher");
});

//Tell Express to listen for requests (start server)
//Note: process.env.PORT to use in c9
app.listen(5500, function(){
    console.log("Server has Started");
    console.log("Go to 'localhost:5500'");
});