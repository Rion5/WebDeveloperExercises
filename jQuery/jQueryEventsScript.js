/**Objectives
 * click()
    - jQuery's click() method is a quick and easy way to add a click listener to elements
 
 * keypress()
 * on()
 */

// click()
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