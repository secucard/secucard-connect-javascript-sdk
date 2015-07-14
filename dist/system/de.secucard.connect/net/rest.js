System.register(['babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/promise', 'babel-runtime/core-js/object/assign', 'superagent', './message', './channel'], function (_export) {
	var _classCallCheck, _Promise, _Object$assign, Request, GET, POST, PUT, HEAD, DELETE, Message, Channel, Rest;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
		}, function (_babelRuntimeCoreJsPromise) {
			_Promise = _babelRuntimeCoreJsPromise['default'];
		}, function (_babelRuntimeCoreJsObjectAssign) {
			_Object$assign = _babelRuntimeCoreJsObjectAssign['default'];
		}, function (_superagent) {
			Request = _superagent['default'];
		}, function (_message) {
			GET = _message.GET;
			POST = _message.POST;
			PUT = _message.PUT;
			HEAD = _message.HEAD;
			DELETE = _message.DELETE;
			Message = _message.Message;
		}, function (_channel) {
			Channel = _channel.Channel;
		}],
		execute: function () {
			'use strict';

			Rest = (function () {
				function Rest() {
					_classCallCheck(this, Rest);

					this.methodFuns = {};

					this.methodFuns[GET] = Request.get;
					this.methodFuns[POST] = Request.post;

					this.methodFuns[PUT] = Request.put;
					this.methodFuns[HEAD] = Request.head;
					this.methodFuns[DELETE] = Request['delete'];

					this.methodFuns[Channel.METHOD.GET] = Request.get;

					this.methodFuns[Channel.METHOD.CREATE] = Request.post;
					this.methodFuns[Channel.METHOD.EXECUTE] = Request.post;

					this.methodFuns[Channel.METHOD.UPDATE] = Request.put;
					this.methodFuns[Channel.METHOD.DELETE] = Request['delete'];
				}

				Rest.prototype.configureWithContext = function configureWithContext(context) {

					this.restUrl = function () {

						return context.getConfig().getRestUrl();
					};

					this.getToken = function () {

						return context.getAuth().getToken();
					};
				};

				Rest.prototype.createMessage = function createMessage() {
					var message = new Message();
					return message.setBaseUrl(this.restUrl());
				};

				Rest.prototype.r = function r(url, method) {
					return this.methodFuns[method](url);
				};

				Rest.prototype.send = function send(message) {
					var _this = this;

					return new _Promise(function (resolve, reject) {

						var url = message.baseUrl ? message.baseUrl + message.url : message.url;
						var request = _this.r(url, message.method);

						if (message.headers) {
							request.set(message.headers);
						}

						if (message.query) {
							request.query(message.query);
						}

						if (message.body) {
							request.send(message.body);
						}

						if (message.accept) {
							request.accept(message.accept);
						}

						request.end(function (err, res) {
							if (err) {
								reject(err, res);
							} else {
								resolve(res);
							}
						});
					});
				};

				Rest.prototype.getAuthHeader = function getAuthHeader(token) {

					return { 'Authorization': 'Bearer ' + token.access_token };
				};

				Rest.prototype.sendWithToken = function sendWithToken(message) {
					var _this2 = this;

					return this.getToken().then(function (token) {

						var headers = _Object$assign({}, message.headers, _this2.getAuthHeader(token));
						message.setHeaders(headers);
						return _this2.send(message);
					});
				};

				Rest.prototype.request = function request(method, params) {

					var requestSuccess = function requestSuccess(res) {
						return res.body;
					};

					var requestError = function requestError(err) {
						var error = err;

						try {
							error = new Error('Api request error');
							error.data = err.response.body;
						} catch (e) {

							error = err;
						}

						throw error;
					};

					var message = this.createMessageForRequest(method, params);
					return this.sendWithToken(message).then(requestSuccess)['catch'](requestError);
				};

				Rest.prototype.createMessageForRequest = function createMessageForRequest(method, params) {

					var message = this.createMessage();
					message.setHeaders({ 'Content-Type': 'application/json' });
					message.setMethod(method);

					var endPointSpec = [];

					if (params.appId) {
						endPointSpec = ['General', 'Apps', params.appId, 'callBackend'];
					} else if (params.endpoint) {
						endPointSpec = params.endpoint;
					} else {
						throw new Error('Missing endpoint spec or app id.');
					}

					if (params.objectId != null) {
						endPointSpec.push(params.objectId);
					}

					if (params.action) {
						endPointSpec.push(params.action);
					}

					if (params.actionArg) {
						endPointSpec.push(params.actionArg);
					}

					message.setUrl(this.buildEndpoint(endPointSpec));

					if (params.queryParams) {
						message.setQuery(params.queryParams);
					}

					if (params.data) {
						message.setBody(params.data);
					}

					console.log(message);

					return message;
				};

				Rest.prototype.buildEndpoint = function buildEndpoint(endpoint) {

					if (!endpoint || endpoint.length < 2) {
						throw new Error('Invalid endpoint specification.');
					}

					return endpoint.join('/');
				};

				return Rest;
			})();

			_export('Rest', Rest);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijt5R0FJYSxJQUFJOzs7Ozs7Ozs7Ozs7a0JBSFQsR0FBRzttQkFBRSxJQUFJO2tCQUFFLEdBQUc7bUJBQUUsSUFBSTtxQkFBRSxNQUFNO3NCQUM1QixPQUFPOztzQkFDUCxPQUFPOzs7OztBQUNGLE9BQUk7QUFFTCxhQUZDLElBQUksR0FFRjsyQkFGRixJQUFJOztBQUlmLFNBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVyQixTQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbkMsU0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUVyQyxTQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbkMsU0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3JDLFNBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxVQUFPLENBQUM7O0FBRXpDLFNBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztBQUVsRCxTQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN0RCxTQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFdkQsU0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDckQs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