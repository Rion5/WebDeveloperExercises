var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo2", {useNewUrlParser: true}); //Creates blog_demo if db doesn't exist

/**
 * 1) Set up Mongoose Schema
 * 2) Set up Mongoose Model
 * 3) Create New Model Object
 * 4) Save to DB
 */
var Post = require("./models/post.js");
var User = require("./models/user.js"); //Note: Must place userSchema below Post since we are referencing [postSchema]

//Create a new User without a post
User.create({
    email: "bob@email.com",
    name: "Bob Belcher"
});

//Create a Post,
//  Then try and find the User with email of 'bob@email.com'
//  If the user is found, push the newly created post to the User's Post property
//  If everything succeeds, console.log the data
Post.create({
    title: "How to cook the best burger",
    content: "Start by coming up with an amazing name for your 'Burger of the Day'"
},function(err, post){
    User.findOne({
        email: "bob@email.com"
    }, function(err, foundUser){
        if(err){
            console.log(err);
        } else{
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else{
                    console.log(data);
                }
            });
        }
    });
});

//Find user
//Find all posts for the User
User.findOne({email: "bob@email.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    } else{
        console.log(user);
    }
});