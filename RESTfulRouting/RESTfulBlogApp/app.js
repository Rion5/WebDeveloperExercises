var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    app         = express();
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public")); // Use the following code to serve images, CSS files, and JavaScript files in a directory named public
app.use(bodyParser.urlencoded({extended: true}));

//MongoDB Schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

//Compile into Model
var Blog = mongoose.model("Blog",blogSchema);

//Creating sample data
// Blog.create({
//     title: "Test Blog",
//     image: "https://bit.ly/2MgRARF",
//     body: "First Blog Post"
// });

//RESTful Routes
app.get("/",function(req,res){
    res.redirect("/blogs");
});

//GET - (INDEX)
app.get("/blogs",function(req,res){
    res.render("index.ejs");
});

//Error Page
app.get("/*",function(req,res){
    res.send("Error loading the page");
});

//Start Server
app.listen(5500,function(){
    console.log("RESTful Blog Server Started!");
    console.log("Go to 'localhost:5500'");
});