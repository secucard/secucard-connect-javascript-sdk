System.register(['superagent', './message', './channel'], function (_export) {
	'use strict';

	var Request, GET, POST, PUT, HEAD, DELETE, Message, Channel, Rest;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzhEQUlhLElBQUk7Ozs7Ozs7O2tCQUhULEdBQUc7bUJBQUUsSUFBSTtrQkFBRSxHQUFHO21CQUFFLElBQUk7cUJBQUUsTUFBTTtzQkFDNUIsT0FBTzs7c0JBQ1AsT0FBTzs7O0FBQ0YsT0FBSTtBQUVMLGFBRkMsSUFBSSxHQUVGOzJCQUZGLElBQUk7O0FBSWYsU0FBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLFNBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNuQyxTQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7O0FBRXJDLFNBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNuQyxTQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDckMsU0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLFVBQU8sQ0FBQzs7QUFFekMsU0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7O0FBRWxELFNBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3RELFNBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUV2RCxTQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNyRCxTQUFJ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Q0FBQyxDQUFDOztBQUUxQixTQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7O0FBRXRCLFNBQUcsTUFBTSxDQUFDLEtBQUssRUFBQztBQUNmLGtCQUFZLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7TUFDaEUsTUFBTSxJQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDMUIsa0JBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO01BQy9CLE1BQU07QUFDTixZQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7TUFDcEQ7O0FBRUQsU0FBSSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtBQUM1QixrQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7TUFDbkM7O0FBRUQsU0FBRyxNQUFNLENBQUMsTUFBTSxFQUFDO0FBQ2hCLGtCQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztNQUNqQzs7QUFFRCxTQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUM7QUFDbkIsa0JBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO01BQ3BDOztBQUVELFlBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztBQUVqRCxTQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUM7QUFDckIsYUFBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7TUFDckM7O0FBRUQsU0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ2YsYUFBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDN0I7O0FBRUQsWUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFckIsWUFBTyxPQUFPLENBQUM7S0FFZjs7QUF2TVcsUUFBSSxXQXlNaEIsYUFBYSxHQUFBLHVCQUFDLFFBQVEsRUFBRTs7QUFFdkIsU0FBRyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztBQUNuQyxZQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7TUFDbkQ7O0FBRUQsWUFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBRTFCOztXQWpOVyxJQUFJOzs7bUJBQUosSUFBSSIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9yZXN0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==