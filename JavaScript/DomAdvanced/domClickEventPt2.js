//Using 2 different ways to select the button
//Player 1 Button
var p1Button = document.querySelector("#p1");
var p1Score = 0;
//Player 2
var p2Button = document.getElementById("p2");
var p2Score = 0;

p1Button.addEventListener("click",function(){
    p1Score++;
    console.log(p1Score);
});

p2Button.addEventListener("click",function(){
    p2Score++;
    console.log(p2Score);
});