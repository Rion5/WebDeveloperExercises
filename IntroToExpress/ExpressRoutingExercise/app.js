var express = require("express");
var app = express();

/** Instructions
Visiting "/" should print "Hi, welcome to my page."
==========================================================================
Visiting "/speak/pig" should print "The pig says 'Oink'"
Visiting "/speak/cow" should print "The cow says 'Moo'"
Visiting "/speak/dog" should print "the dog says 'Bow Wow'"
==========================================================================
Visiting "/repeat/hello/3" should print "hello hello hello"
Visiting "/repeat/hello/5" should print "hello hello hello hello hello"
Visiting "/repeat/blah/2"  should print "blah blah"

If a user visits any other route, print:
"Sorry, page not found."
 */
app.get("/", function(req, res){
    res.send("Hi, welcome to my page");
});

app.get("/speak/:animal",function(req,res){
    var animal = req.params.animal;
    //Dictionary of Animals and Sounds
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Bow Wow"
    };
    var soundOfAnimal = sounds[animal];
    res.send("The "+animal+" says "+soundOfAnimal);
})

//Adds the me
app.get("/repeat/:message/:times",function(req,res){
    var message = req.params.message;
    var times =  req.params.times;
    var result = "";
    for(var i = 0; i < Number(times); i++){
        result += (message + " ");
    }
    res.send(result);
})

app.get("*",function(req,res){
    res.send("Sorry, page not found");
});

 //Start Server
app.listen(5500,function(){
    console.log("Server has Started");
    console.log("Go to 'localhost:5500'");
});