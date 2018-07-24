var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
app.set("view engine","ejs");
//Home
app.get("/",function(req,res){
    res.send("Home Page");
});
//Results
app.get("/results",function(req,res){
    //1st - Send a request,
    //2nd - Check for errors
    //3rd - Parse the html body string into JSON
    //4th - Res.send desired result
    request("http://www.omdbapi.com/?s=star&apikey=thewdb",function(error,response,body){
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            //res.send(results["Search"][0]["Title"]);
            res.render("results", {data: parsedData}); //app.render(view, {nameOfVariable: value})
        }
    });
});
//Request Failed
app.get("/*",function(req,res){
    res.send("Error: Request failed");
});



//Start Server
app.listen(5500, function(){
    console.log("Server has Started");
    console.log("Go to 'localhost:5500'");
});