var answer = 7;

//Ask user to guess a number 0-10, cast it to a number.
var guess = Number(prompt("Guess a number between 0-10"));

//check if number is valid
if(guess < 0 || guess > 10 || isNaN(guess)){
    alert("Error: Invalid Number");
    
}

//Check if User got correct answer
if(guess === answer){
    alert("Congrats! You guess the number correctly!");
}
else if(guess > answer){
    alert("Your guess is too high");
}
else if(guess < answer){
    alert("Your guess is too low");
}