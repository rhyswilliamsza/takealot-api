/**
 * Rhys Williams
 * me@rhyswilliams.co.za
 * https://rhyswilliams.co.za
 */
const express = require('express');
var http = require('http');
const app = express();
var cloudscraper = require('cloudscraper');

/**
 * Setup Caching Hole
 */
var product_cache = {}; //caching to reduce load on takealot api
var timeout = 3600; //timeout in seconds

/**
 * Server Configuration & Listener Setup
 */

app.listen(9000, function() {
  console.log('Running API on 0.0.0.0:9000/api');
});

app.get('/api/search/:search', function(req, res) {
  if (req.params.search) {
    console.log("SEARCH: \"" + req.params.search + "\"");
    searchProducts(req.params.search, res);
  }
});

app.get('/api/product/:skuid', function(req, res) {
  if (req.params.skuid) {
    getProduct(req.params.skuid, res);
  }
});

/**
 * Individual API functions
 */

function searchProducts(name, res) {
  cloudscraper.get('https://api.takealot.com/rest/v-1-6-0/productlines/search?sort=Default%20Descending&rows=50&start=0&detail=mlisting&qsearch=' + name, function(error, response, body) {
    if (error) {
      res.json(JSON.stringify("An Error Occured"));
    } else {
      res.json(JSON.parse(body)['results']['productlines']);
    }
  });
}

function getProduct(skuid, res) {
  if (product_cache[skuid] && (Date.now() - product_cache[skuid]['cache_time'] < timeout * 1000)) {
    console.log("GET SKU: " + skuid + " (CACHE)");
    res.json(product_cache[skuid]);
  } else {
    console.log("GET SKU: " + skuid + " (RETRIEVE)");
    cloudscraper.get('https://api.takealot.com/rest/v-1-6-0/productlines/lookup?idProduct=' + skuid, function(error, response, body) {
      if (error) {
        res.json(JSON.stringify("An Error Occured"));
      } else {
        product_cache[skuid] = {
          "product": JSON.parse(body),
          "cache_time": Date.now()
        };
        res.json(product_cache[skuid]);
      }
    });
  }
}