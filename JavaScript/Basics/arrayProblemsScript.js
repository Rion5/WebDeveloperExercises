/** printReverse() 
 * Write a function printReverse() that takes an array as an argument and prints out the elements in the array in reverse order
 */

function printReverse(array){
    for(var i = array.length - 1; i >= 0; i--){
        console.log(array[i]);
    }
}

/** isUniform()
 * Write a function isUniform() which takes an array as an argument and returns true if all elements in the array are identical 
 * */
function isUniform(array){
    for(var i = 1; i < array.length; i++){
        if(array[i] !== first){
            return false;
        }
    }
}

/** sumArray()
 * Write a function sumArray() that accepts an array of numbers and returns the sum of all numbers in the array
 */

 function sumArray(array){
     var total = 0;
     array.foreach(function(element){
         total +=element;
     });
     return total;
 }

 /** max()
  * Write a function max() that accepts an array of numbers and returns the maximum number in the array.
  */
 function max(array){
     var max = array[0];
     for(var i = 0; i<=array.length; i++){
         if(array[i] > max){
             max = array[i];
         }
     }
     return max;
 }