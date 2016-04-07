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



