var expect = require('chai').expect;
var rec  = require('product-recommender');

var mockNames = 500;
var mockProducts = 120;
var matrix = __dirname + '/../matrix.txt';

describe('Product-Recommender', function(){
  it('gains results from the python process', function(done){
    rec.setRecVariables(matrix, function(){

      var results = rec.getRecVariable('results');
      expect(Array.isArray(results)).to.be.true;

      var past = recommendationVariablTests();
      analyticsMethodsTests();

      done();
    }, mockNames, mockProducts);
  });
});

function done(){}

function recommendationVariablTests(){
  
  describe('recommendation variables', function(){
    it('should get the custmoer array', function(){
      var customers = rec.getRecVariable('customers');
      expect(Array.isArray(customers)).to.be.true;
      expect(customers.length).to.equal(mockNames);
      expect(typeof customers[0]).to.equal('string');
    });

    it('should be able to load data into variables', function(){
      var customer = rec.getRecVariable('customers')[0];
      pastRecProduct = rec.getRecVariable('products')[1];
      var pastRecommendations = rec.getRecVariable('pastRecommendations');
      var memory = pastRecommendations[customer][pastRecProduct];
      pastRecommendations[customer][pastRecProduct] = true;
      expect(memory).to.equal(undefined);
      rec.loadRecVariable('pastRecommendations', pastRecommendations);
      memory = rec.getRecVariable('pastRecommendations')[customer][pastRecProduct];
      expect(memory).to.be.true;
    });
  });
}

function analyticsMethodsTests(){
  describe('Analytics Methods', function(){
    var customer = rec.getRecVariable('customers')[0];
    var product = rec.recommender(customer);
    var productsMap = rec.getRecVariable('productsMap');

    recommendationTests(productsMap, product, customer);
    clusterTests(customer, product, productsMap);
  });
}

function recommendationTests(productsMap, product, customer){
  describe('Recommendations', function(){
    it('should make recommendations for a customer from the product list', function(){
      expect(productsMap[product]).to.not.equal(undefined);
    });


    it('should recommend product based on recent customer purchase', function(){
      var recommendation = rec.recommendByProduct(customer, product);
      expect(typeof recommendation).to.equal('string');
      expect(productsMap[recommendation]).to.not.equal(undefined);
    });

    it('should remember past recommendations', function(){
      var pastRecs = rec.pastCustomerRecommendations(customer);
      var pastRecProduct = rec.getRecVariable('products')[1];
      expect(pastRecs[pastRecProduct]).to.not.equal(undefined);
      expect(pastRecs[product]).to.not.equal(undefined);
    });
  });
}

function clusterTests(customer, product, productsMap){
  var productClustersMap;
  describe('Clusters', function(){
    it('should find a cluster of similar products', function(){
      var cluster = rec.relatedProducts(product);
      expect(Array.isArray(cluster)).to.be.true;
      productClustersMap = rec.getRecVariable('productClustersMap');
      var item1 = cluster[0];
      var item2 = cluster[1];
      expect(productClustersMap[item1]).to.equal(productClustersMap[product]);
      expect(productClustersMap[item2]).to.equal(productClustersMap[product]);
    });

    it('should find a cluster of similar customers', function(){
      var map = rec.getRecVariable('customerClusterHelpers')[2];
      var customers = rec.relatedCustomers(customer);
      var customer1 = customers[0];
      var customer2 = customers[1];

      expect(map[customer1]).to.equal(map[customer]);
      expect(map[customer2]).to.equal(map[customer]);
    });

    it('should find a cluster of similar customers based on a recent purchase', function(){
      var customers = rec.relatedCustomersByProduct(customer, product);
      var index = productClustersMap[product];

      var subClusterMap = rec.getRecVariable('subClustersHelpers')[index][2];
      
      var customer1 = customers[0];
      var customer2 = customers[1];

      expect(subClusterMap[customer1]).to.equal(subClusterMap[customer]);
      expect(subClusterMap[customer2]).to.equal(subClusterMap[customer]);
    });

    it('should find the k nearest neighbors of a customer', function(){
      var neighbors = rec.nearestNeighbors(customer, 3, false);
      expect(neighbors.length).to.equal(3);
    });
  });
}