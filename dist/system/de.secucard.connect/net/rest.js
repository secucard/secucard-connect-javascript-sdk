System.register(['superagent', './message', './channel', '../auth/exception', './exception'], function (_export) {
	'use strict';

	var Request, GET, POST, PUT, HEAD, DELETE, Message, Channel, AuthenticationFailedException, SecucardConnectException, Rest;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_superagent) {
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
		}, function (_authException) {
			AuthenticationFailedException = _authException.AuthenticationFailedException;
		}, function (_exception) {
			SecucardConnectException = _exception.SecucardConnectException;
		}],
		execute: function () {
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

					this.isRequestWithToken = context.isRequestWithToken.bind(context);
				};

				Rest.prototype.open = function open() {
					return Promise.resolve(true);
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

					return new Promise(function (resolve, reject) {

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

						var headers = Object.assign({}, message.headers, _this2.getAuthHeader(token));
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
						var request = JSON.stringify({ method: method, params: params });

						if (error instanceof AuthenticationFailedException) {} else {
							error = SecucardConnectException.create(err.response.body);
						}

						error.request = request;

						throw error;
					};

					var message = this.createMessageForRequest(method, params);

					var pr = !this.isRequestWithToken || this.isRequestWithToken(params.options) ? this.sendWithToken(message) : this.send(message);

					return pr.then(requestSuccess)['catch'](requestError);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3VIQWtCYSxJQUFJOzs7Ozs7OztrQkFOVCxHQUFHO21CQUFFLElBQUk7a0JBQUUsR0FBRzttQkFBRSxJQUFJO3FCQUFFLE1BQU07c0JBQzVCLE9BQU87O3NCQUNQLE9BQU87O2tEQUNQLDZCQUE2Qjs7eUNBQzdCLHdCQUF3Qjs7O0FBRW5CLE9BQUk7QUFFTCxhQUZDLElBQUksR0FFRjsyQkFGRixJQUFJOztBQUlmLFNBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVyQixTQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbkMsU0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUVyQyxTQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbkMsU0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3JDLFNBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxVQUFPLENBQUM7O0FBRXpDLFNBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztBQUVsRCxTQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN0RCxTQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFdkQsU0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFH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RCxZQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7QUFFakQsU0FBRyxNQUFNLENBQUMsV0FBVyxFQUFDO0FBQ3JCLGFBQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO01BQ3JDOztBQUVELFNBQUcsTUFBTSxDQUFDLElBQUksRUFBRTtBQUNmLGFBQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO01BQzdCOztBQUVELFlBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXJCLFlBQU8sT0FBTyxDQUFDO0tBRWY7O0FBdE1XLFFBQUksV0F3TWhCLGFBQWEsR0FBQSx1QkFBQyxRQUFRLEVBQUU7O0FBRXZCLFNBQUcsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7QUFDbkMsWUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO01BQ25EOztBQUVELFlBQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUUxQjs7V0FoTlcsSUFBSTs7O21CQUFKLElBQUkiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvcmVzdC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=