//Check off specific todo by clicking on X
$("li").click(function () {
    $(this).toggleClass("completed");
});