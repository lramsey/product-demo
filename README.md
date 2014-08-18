product-demo
============

Demo application for the Product-Recommender NPM module.  To see more about product-recommender, please visit www.npmjs.org/package/product-recommender.  Code in the index.js file demonstrates how product-recommender can be used in practice.  If product-demo was downloaded by npm, Product-Recommender should already have been installed in the node_modules folder as a dependency of Product-Demo.  But if product-demo was installed outside of npm, Product-Recommender will need to be installed.

    npm install product-recommender

With product-recommender loaded, now you can see product-recommender in action.  To run this demo, use the node command on the file index.js
    
    node index.js

The analysis will now begin executing.  Included in this project is a matrix of faux data that will be used for this demo, which is contained in matrix.txt.  A string referencing the file directory of our matrix will be passed to product-recommender, which will read the data from that file and enter it into the algorithm.

When the algorithm has concluded executing, various analytics methods will be run, with the results logged to the terminal.
