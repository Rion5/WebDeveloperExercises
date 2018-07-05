//click()
//jQuery's click() method is a quick and easy way to add a click listener to elements

//prints when item with id 'submit' is clicked
$("#submit").click(function(){
    console.log("Another Click");
});

//alerts when ANY button is clicked
$("button").click(function(){
    alert("Someone clicked a button");
});

