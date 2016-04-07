# secucard connect Javascript SDK

SDK for using the [secuconnect API](http://developer.secuconnect.com) in browser and node.js environment.

## Install

Node:

```
npm install secucard-connect
```

[jspm](http://jspm.io/):

```
jspm install secucard-connect=github:secucard/secucard-connect-javascript-sdk
```

Browserify standalone:

```html
<script src="http://cdn.secucard.com/am/connect-browser/0.2.x/secucard-connect.js"></script>
<script src="http://cdn.secucard.com/am/connect-browser/0.2.x/secucard-connect.min.js"></script>
```

## Usage

A general integration guide can be found here: [http://developer.secuconnect.com/doc/guide](http://developer.secuconnect.com/doc/guide)

The Javascript specific guide is here: [http://developer.secuconnect.com/doc/sdk/js/guide](http://developer.secuconnect.com/doc/sdk/js/guide). From there you have access to other information material.

SDKs for other language can be found here: [http://developer.secuconnect.com/doc/sdk](http://developer.secuconnect.com/doc/sdk)

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.


## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) and [CONDUCT](CONDUCT.md) for details.


## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the [LICENSE File](LICENSE) file, or at:

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

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
