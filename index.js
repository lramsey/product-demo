var rec = require('product-recommender');

var mockNames = 500;
var mockProducts = 120;
var matrix = __dirname + '/matrix.txt';

var makeRecommendations = function(){
    console.log('begin analysis');
    rec.setRecVariables(matrix, function(){
        console.log(rec.getRecKeys());


        var customer = rec.getRecVariable('customers')[0];
        var pastRecProduct = rec.getRecVariable('products')[1];
        var pastRecs = rec.getRecVariable('pastRecommendations');
        pastRecs[customer][pastRecProduct] = true;
        rec.loadRecVariable('pastRecommendations', pastRecs);
        console.log('\nDid ' + customer + ' buy ' + pastRecProduct + '?  ' + rec.getRecVariable('pastRecommendations')[customer][pastRecProduct] + '\n');

        var product = rec.recommender(customer);
        console.log(customer + ' should buy ' + product + '\n');

        var cluster = rec.relatedProducts(product);
        console.log(product + ' is similar to ' + cluster + '\n');

        var product2 = rec.recommendByProduct(customer,product);
        console.log('Since ' + customer + ' bought ' + product + ', he should buy ' + product2 + '.' + '\n');

        customers = rec.relatedCustomers(customer);
        console.log(customer + ' is related to ' + customers + '.' + '\n');

        customers2 = rec.relatedCustomersByProduct(customer, product2);

        console.log(customer + "'s taste in relation to " + product2 + ' is similar to ' + customers2 + '.' + '\n');
        console.log('these recommendations have already been sent out for ' + customer + ':' + rec.pastCustomerRecommendations(customer) + '\n');
        console.log('power recommendations for ' + customer + ':' + rec.powerRecommendation(customer) + '\n');
        console.log('product:',product + '\n');
        console.log('neighborhoods:',rec.nearestProducts(product,3) + '\n');
        console.log('neighbors:',rec.nearestNeighbors(customer, 3, false) + '\n');
        
        results = rec.getRecVariable('results');
    }, mockNames, mockProducts);
};

makeRecommendations();