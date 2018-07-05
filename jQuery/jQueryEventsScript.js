/**Objectives
 * click()
    - is a quick and easy way to add a click listener to elements
 
 * keypress()
    - is a quick and easy way to add keypress listeners to elements

 * on()
    - works similarly to addEventListener. It lets you specify the type of event to listen for

Notes: In most cases, click() and on("click") will both get the job done. However, there is 1 key difference
click() only adds listeners for existing elements
on() will add listeners for all potential future elements
 */

/// click()
//prints when item with id 'submit' is clicked
$("#submit").click(function(){
    console.log("Submit Click");
});

//alerts when ANY button is clicked
$("button").click(function(){
    console.log("Someone clicked a button");
});

$("h1").click(function(){
    alert("h1 clicked");
});

$("button").click(function(){
    var btnText = $(this).text();
    console.log("you clicked " + btnText);
    $(this).css("background","pink");
});

///keypress()
$("input").keypress(function(event){
    if(event.which ===13){
        alert("You pressed Enter");
    }
});

///on()
$("h1").on("click",function(){
    $(this).css("color","purple");
});
//mouse enter
$("button").on("mouseenter",function(){
    $(this).css("font-weight","bold");
    console.log("mouseenter (Hover)");
});
//mouse leave
$("button").on("mouseleave",function(){
    $(this).css("font-weight","normal");
    console.log("mouseleave (Hover)");
});
//double click event
$("button").on("dblclick",function(){
    alert("Double Click!");
});