#Express Routing Exercise

1. Create a brand new Express app
2. Create a package.json using `npm init` and add express as a dependency
3. In the main app.js file, add 3 different routes:

Visiting "/" should print "Hi, welcome to my page."
==========================================================================
Visiting "/speak/pig" should print "The pig says 'Oink'"
Visiting "/speak/cow" should print "The cow says 'Moo'"
Visiting "/speak/dog" should print "the dog says 'Bow Wow'"
==========================================================================
Visiting "/repeat/hello/3" should print "hello hello hello"
Visiting "/repeat/hello/5" should print "hello hello hello hello hello"
Visiting "/repeat/blah/2"  should print "blah blah"

If a user visits any other route, print:
"Sorry, page not found."