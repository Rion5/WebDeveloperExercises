var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
app.set("view engine","ejs");
//Home
app.get("/",function(req,res){
    res.render("search");
});
//Results
app.get("/results",function(req,res){
    //Getting query from the input on the home page and build url
    var query = req.query.searchQuery;
    var url = "http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
    //1st - Send a request,
    //2nd - Check for errors
    //3rd - Parse the html body string into JSON
    //4th - Res.send desired result
    request(url,function(error,response,body){
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