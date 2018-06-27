//List of Colors
var colors = [
    "rgb(255, 0, 0)",
    "rgb(255, 255, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 255, 255)",
    "rgb(0, 0, 255)",
    "rgb(255, 0, 255)",
];
var pickedColor = pickColor();
//Display the pickedColor
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
//Square Elements
var squares = document.querySelectorAll(".square");
//Display Message (Correct or Try Again)
var messageDisplay = document.querySelector("#message");

//Loop though each square 
//      assign it a color from the colors array
//      add a click event listener
for(var i = 0; i<squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor;
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            changeColors(clickedColor);             //Changes all squares to the clickedColor
        }
        else{
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
}

//Change the color of ALL squares
function changeColors(color){
    for(var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

//Pick a random color
function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}
