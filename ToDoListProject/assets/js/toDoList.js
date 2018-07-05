//Check off specific todo by clicking on X
$("ul").on("click","li",function(){
    $(this).toggleClass("completed");
});

//Click on the X to delete task
$("ul").on("click","span",function(event){
    $(this).parent().fadeOut(1000,function(){
        $(this).remove();
    });
    event.stopPropagation(); //this will stop the event from bubbling up to parent elements
});

$("input[type='text']").keypress(function(event){
    //if user presses Enter, get input
    if(event.which===13){
        var inputText = ($(this).val());
        $(this).val("");
        //create a new li and add to ul
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> "+inputText+"</li>");
    }
});