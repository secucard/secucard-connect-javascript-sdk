System.register(['superagent', './message', './channel', '../auth/exception', './exception', 'minilog'], function (_export) {
	'use strict';

	var Request, GET, POST, PUT, HEAD, DELETE, Message, Channel, AuthenticationFailedException, SecucardConnectException, minilog, Rest;

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
		}, function (_minilog) {
			minilog = _minilog['default'];
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

					minilog('secucard.rest').debug('message', message);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dJQW1CYSxJQUFJOzs7Ozs7OztrQkFQVCxHQUFHO21CQUFFLElBQUk7a0JBQUUsR0FBRzttQkFBRSxJQUFJO3FCQUFFLE1BQU07c0JBQzVCLE9BQU87O3NCQUNQLE9BQU87O2tEQUNQLDZCQUE2Qjs7eUNBQzdCLHdCQUF3Qjs7Ozs7QUFHbkIsT0FBSTtBQUVMLGFBRkMsSUFBSSxHQUVGOzJCQUZGLElBQUk7O0FBSWYsU0FBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLFNBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNuQyxTQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7O0FBRXJDLFNBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNuQyxTQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDckMsU0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLFVBQU8sQ0FBQzs7QUFFekMsU0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7O0FBRWxELFNBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3RELFNBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUV2RCxTQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdB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QUVELFlBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztBQUVqRCxTQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUM7QUFDckIsYUFBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7TUFDckM7O0FBRUQsU0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ2YsYUFBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDN0I7O0FBRUQsWUFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRW5ELFlBQU8sT0FBTyxDQUFDO0tBRWY7O0FBdE1XLFFBQUksV0F3TWhCLGFBQWEsR0FBQSx1QkFBQyxRQUFRLEVBQUU7O0FBRXZCLFNBQUcsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7QUFDbkMsWUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO01BQ25EOztBQUVELFlBQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUUxQjs7V0FoTlcsSUFBSTs7O21CQUFKLElBQUkiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvcmVzdC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=