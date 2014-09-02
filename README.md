Product-Demo
============

Demo application for the Product-Recommender NPM module.  To learn more about Product-Recommender, please visit Product-Recommender's npm <a href="https://www.npmjs.org/package/product-recommender">profile</a>.  Code in the index.js file demonstrates how Product-Recommender can be used in practice.  If Product-Demo was downloaded by npm, Product-Recommender should already have been installed in the node_modules folder as a dependency of Product-Demo.  But if Product-Demo was installed outside of npm, Product-Recommender will need to be installed.

    npm install product-recommender

With Product-Recommender loaded, now you can see Product-Recommender in action.  To run this demo, use the node command on the file index.js
    
    node index.js

The analysis will now begin executing.  Included in this project is a matrix of faux data that will be used for this demo, which is contained in matrix.txt.  A string referencing the file directory of our matrix will be passed to Product-Recommender, which will read the data from that file and enter it into the algorithm.
When the algorithm has concluded executing, various analytics methods will be run.  The results will be logged to the terminal tab that is running the node script.  Not all methods from Product-Recommender will be run in this demo, but other methods can be easily added to Product-Demo by following the provided format.  All documentation for the analytics methods run in Product-Demo are contained in the Product-Recommender <a href="https://github.com/lramsey/product-recommender">ReadMe</a> on github.

A mocha test suite for Product-Recommender is included in this demo application.  To run the mocha test suite, enter the command npm test.
  
    npm test
