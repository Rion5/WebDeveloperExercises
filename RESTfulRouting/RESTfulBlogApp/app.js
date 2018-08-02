var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    app         = express();
mongoose.connect("mongodb://localhost:27017/restful_blog_app");

app.set("view engine", "ejs");
app.use(express.static("public")); // Use the following code to serve images, CSS files, and JavaScript files in a directory named public
app.use(bodyParser, urlencoded({extended: true}));





//Start Server
app.listen(5500,function(){
    console.log("RESTful Blog Server Started!");
    console.log("Go to 'localhost:5500'");
});