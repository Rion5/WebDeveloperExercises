//Using 2 different ways to select the button
//Player 1 Button
var p1Button = document.querySelector("#p1");
var p1Display = document.getElementById("p1ScoreDisplay");
var p1Score = 0;
//Player 2
var p2Button = document.getElementById("p2");
var p2Display = document.querySelector("#p2ScoreDisplay");
var p2Score = 0;

//Reset Button
var resetButton = document.getElementById("reset");

//P1 Button Click
p1Button.addEventListener("click",function(){
    p1Score++;
    p1Display.textContent = p1Score;
    console.log("Player 1: ", p1Score);
});

//P2 Button Click
p2Button.addEventListener("click",function(){
    p2Score++;
    p2Display.textContent = p2Score;
    console.log("Player 2: ", p2Score);
});

//Reset Button Click
resetButton.addEventListener("click",function(){
    p1Score = p2Score = 0;
    p1Display.textContent = p2Display.textContent = p1Score;
    console.log("Score reset to 0");
});