System.register(['babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', './net/message', './client-config', './client-context'], function (_export) {
	var _classCallCheck, _Object$create, _Object$assign, Message, ClientConfig, ClientContext, Client;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
		}, function (_babelRuntimeCoreJsObjectCreate) {
			_Object$create = _babelRuntimeCoreJsObjectCreate['default'];
		}, function (_babelRuntimeCoreJsObjectAssign) {
			_Object$assign = _babelRuntimeCoreJsObjectAssign['default'];
		}, function (_netMessage) {
			Message = _netMessage.Message;
		}, function (_clientConfig) {
			ClientConfig = _clientConfig.ClientConfig;
		}, function (_clientContext) {
			ClientContext = _clientContext.ClientContext;
		}],
		execute: function () {
			'use strict';

			Client = (function () {
				function Client(config, environment) {
					_classCallCheck(this, Client);

					this.config = config;
					this.context = new ClientContext(config, environment);
				}

				Client.prototype.setCredentials = function setCredentials(credentials) {
					this.context.setCredentials(credentials);
				};

				Client.prototype.connect = function connect() {

					return this.context.getAuth().getToken();
				};

				return Client;
			})();

			_export('Client', Client);

			Client.create = function (environment, config) {

				if (!config) {
					config = _Object$create(null);
				}

				config = _Object$assign(ClientConfig.defaults(), environment.config, config);

				return new Client(config, environment);
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7NEZBSWEsTUFBTTs7Ozs7Ozs7Ozt5QkFKWCxPQUFPOztnQ0FDUCxZQUFZOztrQ0FDWixhQUFhOzs7OztBQUVSLFNBQU07QUFFUCxhQUZDLE1BQU0sQ0FFTixNQUFNLEVBQUUsV0FBVyxFQUFFOzJCQUZyQixNQUFNOztBQUlqQixTQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixTQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztLQUV0RDs7QUFQVyxVQUFNLFdBU2xCLGNBQWMsR0FBQSx3QkFBQyxXQUFXLEVBQUU7QUFDM0IsU0FBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDekM7O0FBWFcsVUFBTSxXQWFsQixPQUFPLEdBQUEsbUJBQUc7O0FBRVQsWUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBRXpDOztXQWpCVyxNQUFNOzs7cUJBQU4sTUFBTTs7QUFxQm5CLFNBQU0sQ0FBQyxNQUFNLEdBQUcsVUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFLOztBQUV4QyxRQUFHLENBQUMsTUFBTSxFQUFDO0FBQ1YsV0FBTSxHQUFHLGVBQWMsSUFBSSxDQUFDLENBQUM7S0FDN0I7O0FBRUQsVUFBTSxHQUFHLGVBQWMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRTVFLFdBQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXZDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9