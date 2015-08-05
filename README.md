# secucard connect Javascript SDK

## Installing

Node:

```
npm install secucard-connect
```

[jspm](http://jspm.io/):

```
jspm install github:secucard/secucard-connect-javascript-sdk
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
var client = SecucardConnect.create();
client.setCredentials(credentials);

// get Loyalty/Cards service
var cards = client.getService(Services.Loyalty.Cards);

// establish connection
client.open().then(function(){
	
	// use secucard client to get available loyalty/cards list
	cards.retrieveList().then(function(res){
		console.log(res);
	}).catch(function(err){
		console.log(err);
	});
	
});

```

Browserify standalone:

```javascript

var SecucardConnect = secucardConnect.SecucardConnect;
var Services = secucardConnect.Services;

var client = SecucardConnect.create();

// set credentials
var credentials = {
	"token": {
		"access_token":"your_access_token"
	},
};

// get Smart/Transactions service
var smartTransactions = client.getService(Services.Smart.Transactions);

// subscribe for event
smartTransactions.on('display', (function (data) {
	
	console.log('Display event', data);
	
});

// establish connection
client.open().then(function(){
	
	var transactionType = 'demo';
	// use secucard client to start transaction
	smartTransactions.start('your_transaction_id', transactionType).then(function(res){
		console.log(res);
	}).catch(function(err){
		console.log(err);
	});
	
});

```

## Documentation

Please see http://developer.secucard.com/api/ for up-to-date documentation.
