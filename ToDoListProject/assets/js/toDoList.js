//Check off specific todo by clicking on X
$("li").click(function () {
    $(this).toggleClass("completed");
});

//Click on the X to delete task
$("span").click(function(event){
    $(this).parent().fadeOut(1000,function(){
        $(this).remove();
    });
    event.stopPropagation(); //this will stop the event from bubbling up to parent elements
});