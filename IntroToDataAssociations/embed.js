var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true}); //Creates blog_demo if db doesn't exist

/**
 * 1) Set up Mongoose Schema
 * 2) Set up Mongoose Model
 * 3) Create New Model Object
 * 4) Save to DB
 */

 //Post - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

//Note: Must place userSchema below Post since we are referencing [postSchema]
// User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// Create & Save
// var newPost = new Post({
//     title: "New Test Post",
//     content: "This is a test post to show how data association works in mongo/mongoose"
// });
// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(post);
//     }
// });
// var newUser = new User({
//     email: "JohnDoe@email.com",
//     name: "John Doe"
// });
// newUser.posts.push({
//     title: "Test Post",
//     content: "Post made by John Doe"
// });
// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });
User.findOne({name: "John Doe"},function(err, foundUser){
    if(err){
        console.log(err);
    } else{
        foundUser.posts.push({
            title: "Test Post 2",
            content: "Another Test Post"
        });
        foundUser.save(function(err, user){
            if(err){
                console.log(err);
            } else{
                console.log(user);
            }
        });
    }
});