//List of Colors
var colors = [
    "rgb(255, 0, 0)",
    "rgb(255, 255, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 255, 255)",
    "rgb(0, 0, 255)",
    "rgb(255, 0, 255)",
];

//Square Elements
var squares = document.querySelectorAll(".square");

var pickedColor = colors[3];

var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
//Loop though each square and assign it a color from the colors array
for(var i = 0; i<squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
}