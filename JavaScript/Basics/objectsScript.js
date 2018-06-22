/**movieDB
 * Create an array of movie objects. Each movie should have a title, rating, and hasWatched properties. Iterate through the array and print out something that looks like:
 * You have watched "Mad Max Fury Road" - 5 stars
 * You have not seen "Frozen" - 4.5 stars
 * You have seen "...." - 3.5 stars
 */

 var movies = [
     {
         title: "Mad Max Fury Road",
         hasWatched: true,
         rating: 5
     },
     {
         title: "Deadpool 2",
         hasWatched: false,
         rating: 4.5
     },
     {
         title: "Jurassic Park Fallen Kingdom",
         hasWatched: false,
         rating: '?'
     }
 ];

 //Function that takes in a movie argument,
 //creates and returns the result string.
 function buildString(movie){
    var result = "You have ";
    if(movie.hasWatched){
        result += "watched ";
    }
    else{
        result += "not seen ";
    }
    result += "\"" + movie.title + "\" ";
    result += " - " + movie.rating + " stars";
    return result;
 }

 //Iterate through each object in 'movies'
 //Each object will be a movie that we pass into the buildString function.
 movies.forEach(function(movie){
     console.log(buildString(movie));
 });


