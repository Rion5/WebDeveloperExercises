var mongoose = require("mongoose");
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});
var Comments = mongoose.model("Comment", commentSchema);

module.exports= Comments;