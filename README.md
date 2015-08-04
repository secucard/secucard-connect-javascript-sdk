# secucard connect Javascript client library

[![Latest Stable Version](https://poser.pugx.org/secucard/secucard-connect-javascript-client-lib/v/stable)](https://packagist.org/packages/secucard/secucard-connect-javascript-client-lib)
[![Total Downloads](https://poser.pugx.org/secucard/secucard-connect-javascript-client-lib/downloads)](https://packagist.org/packages/secucard/secucard-connect-javascript-client-lib)
[![License](https://poser.pugx.org/secucard/secucard-connect-javascript-client-lib/license)](https://packagist.org/packages/secucard/secucard-connect-javascript-client-lib)


## Installing

Node:

```
npm install secucard-connect
```

[jspm](http://jspm.io/):

```
jspm install github:secucard/secucard-connect-javascript-client-lib 
```

Browserify standalone:

```html
<script src="http://cdn.secucard.com/am/connect-browser/0.1.x/secucard-connect.js"></script>
<script src="http://cdn.secucard.com/am/connect-browser/0.1.x/secucard-connect.min.js"></script>
```

## Getting Started

Simple usage looks like:

Node/jspm:

```javascript

var SecucardConnect = require('secucard-connect').SecucardConnect;
var Services = require('secucard-connect').Services;

// set credentials
var credentials = {
	"client_id": "your_client_id",
	"client_secret": "your_client_secret"
};

// create Secucard client
var secucardClient = SecucardConnect.create();
secucardClient.setCredentials(credentials);

// get Loyalty/Cards service
var cards = secucardClient.getService(Services.Loyalty.Cards);

// establish connection
secucardClient.open().then(function(){
	
	// use secucard client to get available loyalty/cards list
	cards.retrieveList().then(function(res){
		console.log(res);
	}).catch(function(err){
		console.log(err);
	});
	
});

```

## Documentation

Please see http://developer.secucard.com/api/index.html for up-to-date documentation.
