# Unofficial Takealot.com API

JSON Takealot.com API Written in NodeJS, based on Takealot's existing REST API

![](https://rhyswilliams.co.za/blog/wp-content/uploads/2017/02/bar-1.png)

## Goals:
- Search Through Products
- Find Details about Specific Product 
- Check for changes in prices of competitor products (price-matching)
- Much more

This was inspired through a reseller store on takealot who currently employs
staff to do price-matching. Why not do this automatically?

## Usage
Clone this repo, then run 'npm install'. To start server, 'npm start'.

Now, visit http://127.0.0.1:9000/api/...

 - .../search/name_here to search through Products
 - .../product/skuid_here to select a product (sku_id can be found through search)


## Changelog:

### 2018-01-05:
Started Development
Created API Features to Search & Select Products
