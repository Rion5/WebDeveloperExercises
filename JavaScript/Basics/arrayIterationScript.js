//For Loop - To loop over an array using a for loop, we need to make use of the array's length property

var colors = [
    "red",
    "orange",
    "yellow",
    "green"
];

for(var i = 0; i < colors.length; i++){
    console.log(colors[i]);
}
console.log("");
//ForEach - JS provides an easy built in way of iterating over an array, with ForEach
//arr.forEach(someFunction)

//Foreach element in colors, store the element in a variable called colors
//This will console log each color once
colors.forEach(function(colors){
    //note, the argument being passed in, 'colors' could be named anything.
    console.log(colors);
});
console.log("");

//This will print the entire content of colors, foreach element within the colors array.
colors.forEach(function(){
    console.log(colors);
});
console.log("");

function printColors(color){
    console.log("**********");
    console.log(color);
    console.log("**********");
}

//Foreach element pass the value of colors into the printColors function
colors.forEach(printColors);

