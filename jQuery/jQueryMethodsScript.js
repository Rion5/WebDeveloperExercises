/**Often used methods
 * val()
    - Get the current value of the 1st element in the set of matched elements or set the value of every matched element.

 * text()
    - Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.

 * attr()
    - Get the value of an attribute for the fire element in the set of matched elements or set one or more attributes for every matched element.
Example: Selects greatphoto and change alt to Beijing
<img id = "greatphoto" src="brush-seller.jpg" alt="brush seller"> 
$("#greatphoto").attr("alt, "Beijing");

 * html()
    - Get the HTML contents of the 1st element in the set of matched elements or set the HTML contents of every matched element.

 * addClass()
 * removeClass()
 * toggleClass()
 */

 //val()
 $("input").val("jQuery.val()");

 //text()
 $("ul li:first-of-type").text("Updated via jQuery.text()");

 //attr()
 $('img').css("width","50%");
 $('img:nth-of-type(2').attr("src","https://c1.staticflickr.com/3/2418/2243463214_f32ab004af_b.jpg");

 //html()
 $("ul li:last-of-type").html("<li>Updated via jQuery.html()</li>");

 //addClass()
 $("ul").addClass("correct");

 //removeClass()
 $("ul").removeClass("correct");

 //toggleClass()
 $("li").first().toggleClass("done"); //using jQuery .first()