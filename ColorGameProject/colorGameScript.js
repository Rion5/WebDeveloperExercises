//List of Colors
var colors = [
    "rgb(255, 0, 0)",
    "rgb(255, 255, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 255, 255)",
    "rgb(0, 0, 255)",
    "rgb(255, 0, 255)",
];
//Display the pickedColor
//Hard Coded pickedColor (later on will randomize)
var pickedColor = colors[3];
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
        }
        else{
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
}


