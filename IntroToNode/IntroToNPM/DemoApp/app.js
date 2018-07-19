var catMe = require("cat-me");
//catMe(): returns a random cat img from the cat-me package.
console.log(catMe());


var faker = require("faker");

for(var i = 0; i< 10; i++){
    //print 10 random names then '-' and price
    var adj = faker.commerce.productAdjective();
    var randomProduct = faker.commerce.product();
    var randomPrice = faker.commerce.price();
    console.log(`${adj} ${randomProduct} - ${randomPrice}`);

}