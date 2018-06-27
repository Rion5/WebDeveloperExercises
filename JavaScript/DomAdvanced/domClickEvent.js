//Get element from document
var button = document.querySelector("button");
//Logic to change background color
var isBlue = false;
//Add click event
button.addEventListener("click",function(){
    console.log("Button Clicked");
    if(!isBlue){
        document.body.style.background = "blue";
        isBlue = true;
    }
    else{
        document.body.style.background = "white";
        isBlue = false;
    }
});
