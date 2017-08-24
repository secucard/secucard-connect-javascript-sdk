<a name="0.3.0"></a>
# 0.3.0 (2017-08-24)

### New

* New: add loyalty.actionmessages endpoint
 ([b8ecf6b](https://github.com/secucard/secucard-connect-javascript-sdk/commit/b8ecf6b))
* New: add REST url generators for ProductService
 ([876ec4c](https://github.com/secucard/secucard-connect-javascript-sdk/commit/876ec4c))
* New: loyalty.actioncampaigns, loyalty.actionemailconfigs, loyalty.actionsmsconfigs endpoints
 ([0eb9afe](https://github.com/secucard/secucard-connect-javascript-sdk/commit/0eb9afe))
* New: loyalty.reports endpoint
 ([3c8006d](https://github.com/secucard/secucard-connect-javascript-sdk/commit/3c8006d))
* New(loyalty.actioncampaigns): add action to check if able to delete
 ([a89bca7](https://github.com/secucard/secucard-connect-javascript-sdk/commit/a89bca7))
* New(loyalty.actionemailconfig): add testConfiguration action
 ([0cb9952](https://github.com/secucard/secucard-connect-javascript-sdk/commit/0cb9952))
* New(loyalty.customers): support additional data templates
 ([700a834](https://github.com/secucard/secucard-connect-javascript-sdk/commit/700a834))
* New(loyalty): transactions endpoint
 ([3aa44fc](https://github.com/secucard/secucard-connect-javascript-sdk/commit/3aa44fc))
 ([b4ae975](https://github.com/secucard/secucard-connect-javascript-sdk/commit/b4ae975))
* New(rest): add option to send cookies with REST requests
 ([c6a9858](https://github.com/secucard/secucard-connect-javascript-sdk/commit/c6a9858))

### Update

* Update: add verification code feature to action-config
 ([526a781](https://github.com/secucard/secucard-connect-javascript-sdk/commit/526a781))
* Update: change args for merchant card charge action
 ([3a9c000](https://github.com/secucard/secucard-connect-javascript-sdk/commit/3a9c000))
* Update: rename charge method to transaction in loyalty.merchantcards
 ([531342a](https://github.com/secucard/secucard-connect-javascript-sdk/commit/531342a))
* Update(loyalty.merchantcards): add amount_split_allowed parameter
 ([a3b7bad](https://github.com/secucard/secucard-connect-javascript-sdk/commit/a3b7bad))
* Update(loyalty): replace actionsmsconfigs and actionemailconfigs with one actionconfigs
 ([a8ba4c0](https://github.com/secucard/secucard-connect-javascript-sdk/commit/a8ba4c0))
* Removed conduct and Added SOFFICE-510 functionality
 ([19db2d3](https://github.com/secucard/secucard-connect-javascript-sdk/commit/19db2d3))
* Add functionality to validate the IBAN
 ([f9cf4f6](https://github.com/secucard/secucard-connect-javascript-sdk/commit/f9cf4f6))
* Added missing entries for the environments
 ([a8b6aaa](https://github.com/secucard/secucard-connect-javascript-sdk/commit/a8b6aaa))
* Backport changes (CONTRIBUTING.md)
 ([e6b7f5e](https://github.com/secucard/secucard-connect-javascript-sdk/commit/e6b7f5e))
* Breaking change: rename "loyalty/actionactions" endpoint to "loyalty/actions"
 ([b36f9fc](https://github.com/secucard/secucard-connect-javascript-sdk/commit/b36f9fc))
* Delete CONTRIBUTING.md
 ([c4d654e](https://github.com/secucard/secucard-connect-javascript-sdk/commit/c4d654e))
* Loyalty payment container
 ([d8a628a](https://github.com/secucard/secucard-connect-javascript-sdk/commit/d8a628a))

<a name="0.2.7"></a>
## 0.2.7 (2016-09-21)

### Fix

* Fix(loyalty.merchantcards): change group action
 ([3ad90ea](https://github.com/secucard/secucard-connect-javascript-sdk/commit/3ad90ea))

### New

* New(loyalty.merchantcards): unlock action
 ([53fd943](https://github.com/secucard/secucard-connect-javascript-sdk/commit/53fd943))

<a name="0.2.6"></a>
## 0.2.6 (2016-07-28)

### Fix

* fix(loyalty.merchantcards): lock payload
 ([986b12e](https://github.com/secucard/secucard-connect-javascript-sdk/commit/986b12e))

<a name="0.2.5"></a>
## 0.2.5 (2016-07-24)

### Doc

* Doc: including secucard-tokenizer
 ([083dea6](https://github.com/secucard/secucard-connect-javascript-sdk/commit/083dea6))

### Update

* Update: loyalty endpoints
 ([fbf8055](https://github.com/secucard/secucard-connect-javascript-sdk/commit/fbf8055))

* enhance error handling
 ([a28f131](https://github.com/secucard/secucard-connect-javascript-sdk/commit/a28f131))

<a name="0.2.4"></a>
## 0.2.4 (2016-04-15)

* validate form with tokenizer
 ([bfde5f2](https://github.com/secucard/secucard-connect-javascript-sdk/commit/bfde5f2))

<a name="0.2.3"></a>
## 0.2.3 (2016-04-13)

### Dev

* dev: add Hapi for unit testing
 ([0d15a1f](https://github.com/secucard/secucard-connect-javascript-sdk/commit/0d15a1f))

### Fix

* Fix: import for ActionActionService
 ([acfcf20](https://github.com/secucard/secucard-connect-javascript-sdk/commit/acfcf20))

### New

* New: add 'retrieveToken' param to client config, if credentials not set, client retrieves token itse ([502ba71](https://github.com/secucard/secucard-connect-javascript-sdk/commit/502ba71))

<a name="0.2.2"></a>
## 0.2.2 (2016-04-11)

### Doc

* Doc: LICENSE and CONTRIBUTING
 ([67bb948](https://github.com/secucard/secucard-connect-javascript-sdk/commit/67bb948))

### Fix

* fix:  es6-shim updated
 ([80fc7a1](https://github.com/secucard/secucard-connect-javascript-sdk/commit/80fc7a1))

### New

* New: Add credit card tokenizer, basic request
 ([33ae875](https://github.com/secucard/secucard-connect-javascript-sdk/commit/33ae875))

<a name="0.2.1"></a>
## 0.2.1 (2016-04-07)

### Doc

* Doc: versioning and releasing
 ([604ef21](https://github.com/secucard/secucard-connect-javascript-sdk/commit/604ef21) [6ebdd14](https://github.com/secucard/secucard-connect-javascript-sdk/commit/6ebdd14) [db05756](https://github.com/secucard/secucard-connect-javascript-sdk/commit/db05756) [9cdfc52](https://github.com/secucard/secucard-connect-javascript-sdk/commit/9cdfc52) [68011b8](https://github.com/secucard/secucard-connect-javascript-sdk/commit/68011b8) [49024ac](https://github.com/secucard/secucard-connect-javascript-sdk/commit/49024ac) [d1b5fd7](https://github.com/secucard/secucard-connect-javascript-sdk/commit/d1b5fd7) [6a62341](https://github.com/secucard/secucard-connect-javascript-sdk/commit/6a62341) [285390d](https://github.com/secucard/secucard-connect-javascript-sdk/commit/285390d))

<a name="0.2.0"></a>
# 0.2.0 (2016-03-15)

### Fix

* Fix: Make "Credentials error" to be catched from Promise
 ([d0b2ee3](https://github.com/secucard/secucard-connect-javascript-sdk/commit/d0b2ee3))

### New

* New(ProductService): implement getMeta() feature for product service, that retrieves and caches meta ([7debad9](https://github.com/secucard/secucard-connect-javascript-sdk/commit/7debad9))
* New(payment.transactions): add cancel and getShippingUrl actions
 ([d86dfa0](https://github.com/secucard/secucard-connect-javascript-sdk/commit/d86dfa0))
* New(smart.routings): assignDevice/removeDevice actions
 ([a25e0f6](https://github.com/secucard/secucard-connect-javascript-sdk/commit/a25e0f6))
* New: Services.Identcases endpoint
 ([cf18cd7](https://github.com/secucard/secucard-connect-javascript-sdk/commit/cf18cd7))
* New: add start, finish and task actions to Services.Identcases
 ([ab76239](https://github.com/secucard/secucard-connect-javascript-sdk/commit/ab76239))
* New: payment.transactions
 ([91ff672](https://github.com/secucard/secucard-connect-javascript-sdk/commit/91ff672))
* New: smart.devices and smart.routings endpoint
 ([767e48b](https://github.com/secucard/secucard-connect-javascript-sdk/commit/767e48b))

### Update

* Update: IMPORTANT breaking change ProductService.retrieve params changed from (id, options) to (id,  ([93ac625](https://github.com/secucard/secucard-connect-javascript-sdk/commit/93ac625))
* Update: add uploadMultiform to Document.Uploads
 ([776cbc0](https://github.com/secucard/secucard-connect-javascript-sdk/commit/776cbc0))
* Update: change Client params order
 ([f8ead24](https://github.com/secucard/secucard-connect-javascript-sdk/commit/f8ead24))
* Update: es6-shim removed for browser by default, added browser shimed endpoint
 ([372db4b](https://github.com/secucard/secucard-connect-javascript-sdk/commit/372db4b))
* Update: log client config
 ([56d86ef](https://github.com/secucard/secucard-connect-javascript-sdk/commit/56d86ef))

* Doc (guide): add dummy placeholder
 ([eff3e0e](https://github.com/secucard/secucard-connect-javascript-sdk/commit/eff3e0e))
* Reformat code to 4 spaces
 ([da41c5f](https://github.com/secucard/secucard-connect-javascript-sdk/commit/da41c5f))
* add Loyalty actionprofiles service
 ([97f75a0](https://github.com/secucard/secucard-connect-javascript-sdk/commit/97f75a0))
* add Loyalty.ActionActions
 ([daf2fa5](https://github.com/secucard/secucard-connect-javascript-sdk/commit/daf2fa5))
* add loyalty.storegroups and general.storegroups endpoints
 ([eb8b13a](https://github.com/secucard/secucard-connect-javascript-sdk/commit/eb8b13a))
* add loyalty.storegroups and general.storegroups endpoints
 ([830fdcb](https://github.com/secucard/secucard-connect-javascript-sdk/commit/830fdcb))
* better handling of internal sdk errors
 ([5d55194](https://github.com/secucard/secucard-connect-javascript-sdk/commit/5d55194))
* fix bug with DELETE req
 ([d47ba6d](https://github.com/secucard/secucard-connect-javascript-sdk/commit/d47ba6d))
* fix identcase.task() action, use PUT(Update) not POST(execute)
 ([0ba0bb1](https://github.com/secucard/secucard-connect-javascript-sdk/commit/0ba0bb1))
* rename Services.identcases finish task to close
 ([ddc6651](https://github.com/secucard/secucard-connect-javascript-sdk/commit/ddc6651))
* update es6-shim
 ([90b2556](https://github.com/secucard/secucard-connect-javascript-sdk/commit/90b2556))

<a name="0.1.4"></a>
## 0.1.4 (2015-08-10)

### Fix

* Fix: token expire time not udated on api request
 ([0662439](https://github.com/secucard/secucard-connect-javascript-sdk/commit/0662439))

<a name="0.1.3"></a>
## 0.1.3 (2015-08-07)

### Fix

* fix exception + fix query params for stomp
 ([a7fb624](https://github.com/secucard/secucard-connect-javascript-sdk/commit/a7fb624))
* fix readme
 ([5715353](https://github.com/secucard/secucard-connect-javascript-sdk/commit/5715353))

<a name="0.1.2"></a>
## 0.1.2 (2015-08-06)

### Docs

* Docs: add browserify + Smart/Transactions example to readme
 ([81f9920](https://github.com/secucard/secucard-connect-javascript-sdk/commit/81f9920))
* Docs: basic readme
 ([db28d13](https://github.com/secucard/secucard-connect-javascript-sdk/commit/db28d13))

### New

* New: implemented device auth workflow (getting code and polling for refresh token)
 ([82c6806](https://github.com/secucard/secucard-connect-javascript-sdk/commit/82c6806))
* New: use minilog library for log messages
 ([23097bf](https://github.com/secucard/secucard-connect-javascript-sdk/commit/23097bf))
* New: use device uuid from client config
 ([0dca441](https://github.com/secucard/secucard-connect-javascript-sdk/commit/0dca441))
* add Auth.Sessions service
 ([babc55d](https://github.com/secucard/secucard-connect-javascript-sdk/commit/babc55d))
* implement custom token storage for client
 ([88aec51](https://github.com/secucard/secucard-connect-javascript-sdk/commit/88aec51))
* use mixins for custom token storage
 ([0e335cb](https://github.com/secucard/secucard-connect-javascript-sdk/commit/0e335cb))
* get stored token async with promise
 ([41881b8](https://github.com/secucard/secucard-connect-javascript-sdk/commit/41881b8))

<a name="0.1.1"></a>
## 0.1.1 (2015-08-03)

* add license
 ([109748d](https://github.com/secucard/secucard-connect-javascript-client-lib/commit/109748d))
* add gulp task to create change-log with gulp-conventional-changelog
 ([d069332](https://github.com/secucard/secucard-connect-javascript-client-lib/commit/d069332))
