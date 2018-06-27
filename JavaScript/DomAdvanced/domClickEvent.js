//Get element from document
var button = document.querySelector("button");
//Logic to change background color
var isBlue = false;
//Add click event
button.addEventListener("click",function(){
    console.log("Button Clicked");
    if(!isBlue){
        document.body.style.background = "blue";
    }
    else{
        document.body.style.background = "white";
    }
    //At the end of this click, it will set the isBlue to the opposite value.
    isBlue = !isBlue;
});
