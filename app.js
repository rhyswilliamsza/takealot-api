const express = require('express');
var http = require('http');
const app = express();
var cloudscraper = require('cloudscraper');

app.listen(9000, function () {
    console.log('Running API on 0.0.0.0:9000/api');
});

app.get('/api/search/:search', function (req, res) {
    if (req.params.search) {
      console.log("Searched for " + req.params.search);
      searchProducts(req.params.search, res);
    }
});

app.get('/api/product/:skuid', function (req, res) {
    if (req.params.skuid) {
      console.log("Asked for " + req.params.skuid);
      selectProduct(req.params.skuid, res);
    }
});

function searchProducts(name, res) {
    cloudscraper.get('https://api.takealot.com/rest/v-1-6-0/productlines/search?sort=Default%20Descending&rows=50&start=0&detail=mlisting&qsearch=' + name, function(error, response, body) {
      if (error) {
        res.json(JSON.stringify("An Error Occured"));
        return false;
      } else {
        res.json(JSON.parse(body)['results']['productlines']);
        return true;
      }
    });
}

function selectProduct(skuid, res) {
    cloudscraper.get('https://api.takealot.com/rest/v-1-6-0/productlines/lookup?idProduct=' + skuid, function(error, response, body) {
      if (error) {
        res.json(JSON.stringify("An Error Occured"));
        return false;
      } else {
        res.json(JSON.parse(body));
        return true;
      }
    });
}
