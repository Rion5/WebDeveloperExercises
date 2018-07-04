//1)
if(jQuery){
    console.log("jQuery Loaded");
}

//2) Select all divs and give them a purple background
$("div").css("background","purple");

//3)Select divs with the class highlight and make them 200px wide
$(".highlight").css("width","200px");

//4) Select the div with id "third" and give it an orange border
$("#third").css("border","4px solid orange");

//5) Bonus: Select the first div only and change its font color to pink
$("div:first-of-type").css("color","pink");