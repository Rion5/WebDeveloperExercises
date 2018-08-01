var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongoose_demo", {useNewUrlParser: true});

var personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number
});

var Person = mongoose.model("Person", personSchema);

// Adding a new person to the DB
/*
var john = new Person({
    firstName: "John",
    lastName: "Doe",
    age: 55
});

john.save(function(err, person){
    if(err){
        console.log("Error");
    } else{
        console.log("Saved to DB");
        console.log(person);
    }
});
*/

//Adding a new person to the DB with Create
//This is similar to using new and .save
/*
Person.create({
    firstName: "Another",
    lastName: "Person",
    age: 20
},function(err, newPerson){
    if(err){
        console.log(err);
    } else{
        console.log(newPerson);
    }
});
*/

// Retrieve all people from the DB and console.log each one
Person.find({}, function(err, people){
    if(err){
        console.log("Error");
        console.log(err);
    } else{
        console.log("All People in Database");
        console.log(people);
    }
});


//Remove all people from DB
/*
Person.remove({},function(err){
    console.log("Collection Removed");
});
*/


