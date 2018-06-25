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


//1) Come up with 4 different ways to select the first <p> tag
var firstWay = document.getElementById("first");
