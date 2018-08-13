var express     =   require("express"),
    bodyParser  =   require("body-parser"), 
    app         =   express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); 

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
