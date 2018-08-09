var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app             = express();
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));  // Use the following code to serve images, CSS files, and JavaScript files in a directory named public
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());        // NOTE: Must place expressSanitizer AFTER bodyParser
app.use(methodOverride("_method"));
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

//GET - INDEX Route
//Display a list of all blogs
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log("Error loading blogs!");
        } else{
            res.render("index.ejs", {blogs: blogs}); //{name: data} Passing in a variable named blogs, which is pulled from Blog.find[...]
        }
    });
});
//GET - NEW Route
//Displays form to make a new blog
app.get("/blogs/new",function(req,res){
    res.render("new.ejs");
});
//POST - CREATE Route
//Add new Blog to DB
app.post("/blogs",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body); //Sanitize the body to not allow <script> tags
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log("Error creating new blog post");
            res.render("new.ejs");
        } else {
            res.redirect("/blogs");
        }
    });
});
//GET - SHOW Route
app.get("/blogs/:id", function(req,res){
    //Blog.findById(id, callback) //Mongoose Code to find the DB
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show.ejs", {blog: foundBlog});
        }
    });
});
//GET - EDIT Route
app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit.ejs", {blog: foundBlog});
        }
    });
});
//PUT - UPDATE Route
app.put("/blogs/:id",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);  //Sanitize the body to not allow <script> tags
    //Blog.findByIdAndUpdate(id, newData, callback){}       //Mongoose Code to find and update
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});
//DELETE - DESTROY Route
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("Error deleting blog");
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs");
        }
    });
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