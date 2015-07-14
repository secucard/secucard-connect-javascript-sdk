System.register(['./net/message', './client-config', './client-context'], function (_export) {
	'use strict';

	var Message, ClientConfig, ClientContext, Client;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_netMessage) {
			Message = _netMessage.Message;
		}, function (_clientConfig) {
			ClientConfig = _clientConfig.ClientConfig;
		}, function (_clientContext) {
			ClientContext = _clientContext.ClientContext;
		}],
		execute: function () {
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
					config = Object.create(null);
				}

				config = Object.assign(ClientConfig.defaults(), environment.config, config);

				return new Client(config, environment);
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzsyQ0FJYSxNQUFNOzs7Ozs7eUJBSlgsT0FBTzs7Z0NBQ1AsWUFBWTs7a0NBQ1osYUFBYTs7O0FBRVIsU0FBTTtBQUVQLGFBRkMsTUFBTSxDQUVOLE1BQU0sRUFBRSxXQUFXLEVBQUU7MkJBRnJCLE1BQU07O0FBSWpCLFNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBRXREOztBQVBXLFVBQU0sV0FTbEIsY0FBYyxHQUFBLHdCQUFDLFdBQVcsRUFBRTtBQUMzQixTQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN6Qzs7QUFYVyxVQUFNLFdBYWxCLE9BQU8sR0FBQSxtQkFBRzs7QUFFVCxZQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7S0FFekM7O1dBakJXLE1BQU07OztxQkFBTixNQUFNOztBQXFCbkIsU0FBTSxDQUFDLE1BQU0sR0FBRyxVQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUs7O0FBRXhDLFFBQUcsQ0FBQyxNQUFNLEVBQUM7QUFDVixXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3Qjs7QUFFRCxVQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFNUUsV0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFdkMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=