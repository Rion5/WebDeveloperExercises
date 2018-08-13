var mongoose = require("mongoose");

// User - email, name, post
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    //The user schema has a posts attribute thats an array of mongoose objectId, belonging to a "Post" mongoose object. Hence why we had to place this below the 'Post' schema
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
var User = mongoose.model("User", userSchema);
// Returns User
module.exports = User;