var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    app         = express();

mongoose.connect("mongodb://localhost:27017/restful_blog_app");