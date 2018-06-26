//SELECT
var h4 = document.querySelector("h4");
h4.style.color = "pink";
var isBlue = false;

//MANIPULATE
setInterval(function(){
    if(isBlue){
        h4.style.background = "white";
        isBlue = false;
    }
    else{
        h4.style.background = "blue";
        isBlue = true;
    }
}, 1000);