/**DOM Selectors Exercise
 * 5 Main Ways to selecting different DOM elements
 * 
 * document.getElementById()
 *      - Takes a string argument and returns the ONE element with a matching ID (IDs are unique)
 * document.getElementsByClassName()
 *      - Takes a returns a List of elements that have a matching class
 * document.getElementsByTagName()
 *      - Returns a List of all elements of a given tag name, like <li> or <h1>
 * document.querySelector()
 *      - Returns the FIRST element that matches a given CSS-style selector
 * document.querySelectorAll()
 *      - Returns a List of elements that matches a given CSS-style selector
 * */

//1) Come up with at least 4 different ways to select just the first <p> tag
document.getElementById("first");
document.querySelector("#first");
document.getElementsByClassName("special")[0];  //Returns a list with class name special, and then selecting the first index [0]
document.querySelector(".special");             //Returns just the first result with a class name special.
document.querySelector("p");


//2) Using a classList, make the h1 tag special (add the special class)
var h1Tag = document.querySelector("h1");
h1Tag.classList.add("special");                 //Adds the class 'special' to first h1 tag
h1Tag.classList.toggle("special");              //Toggles the special class: OFF
