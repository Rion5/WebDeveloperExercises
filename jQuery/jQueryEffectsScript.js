//on button click, toggle fadeIn or fadeOut divs, and remove the button AFTER the div has faded out
// $("button").on("click",function(){
//     $("div").fadeToggle(1000,function(){
//         $("button").remove();
//     });
// });

$("button").on("click",function(){
    $("div").slideToggle();
});