//Using 2 different ways to select the button
//Player 1 Button
var p1Button = document.querySelector("#p1");
var p1Display = document.getElementById("p1ScoreDisplay");
var p1Score = 0;
//Player 2
var p2Button = document.getElementById("p2");
var p2Display = document.querySelector("#p2ScoreDisplay");
var p2Score = 0;
//Input Box
var numInput = document.querySelector("input[type='number']");
//If winningScore is reached, change gameOver to true
var winningScoreDisplay = document.querySelector("p span");     //display = the <span> element within the <p>
var winningScore = 5;
var gameOver = false;

//Reset Button
var resetButton = document.getElementById("reset");

//P1 Button Click
p1Button.addEventListener("click",function(){
    if(!gameOver){
        p1Score++;
        p1Display.textContent = p1Score;
        if(p1Score === winningScore){
            p1Display.classList.add("winner");
            gameOver = true;
        }
        console.log("Player 1: ", p1Score);
    }
});

//P2 Button Click
p2Button.addEventListener("click",function(){
    if(!gameOver){
        p2Score++;
        p2Display.textContent = p2Score;
        if(p2Score === winningScore){
            p2Display.classList.add("winner");
            gameOver = true;
        }
        console.log("Player 2: ", p2Score);
    }
});

//Reset Button Click
resetButton.addEventListener("click",function(){
    gameOver = false;
    p1Score = p2Score = 0;
    p1Display.textContent = p2Display.textContent = p1Score;
    //Selecting whichever element has the winner class to it, and toggling it off
    var winner = document.querySelector(".winner");
    winner.classList.remove("winner");
    console.log("Score reset to 0");
});

//Input Box - Change Event
numInput.addEventListener("change", function(){
    winningScore = (Number)(numInput.value);
    winningScoreDisplay.textContent = numInput.value;
});