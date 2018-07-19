//Include Express
var express = require("express");
//Execute and save into variable called 'app'
var app = express();

//"route-path" => "Response"
// "/" => "Hello"
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


//Tell Express to listen for requests (start server)
//Note: process.env.PORT to use in c9
app.listen(5500, function(){
    console.log("Server has Started");
    console.log("Go to 'localhost:5500'");
});