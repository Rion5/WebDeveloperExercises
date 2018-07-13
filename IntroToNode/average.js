function average(scores){
    //Add all scores
    var total = 0;
    scores.forEach(function(score){
        total +=score;
    });
    //Divide by total number of scores
    var average = total/scores.length;
    //return rounded average
    return Math.round(average);
}

var score = [60, 75, 100, 93, 23];
console.log(average(score));

//To run using node: 'node average.js'