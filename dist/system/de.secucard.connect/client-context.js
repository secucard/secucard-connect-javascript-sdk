System.register(['babel-runtime/helpers/class-call-check', './net/rest', './auth/auth', './auth/credentials'], function (_export) {
	var _classCallCheck, Rest, Auth, Credentials, ClientContext;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
		}, function (_netRest) {
			Rest = _netRest.Rest;
		}, function (_authAuth) {
			Auth = _authAuth.Auth;
		}, function (_authCredentials) {
			Credentials = _authCredentials.Credentials;
		}],
		execute: function () {
			'use strict';

			ClientContext = (function () {
				function ClientContext(config, environment) {
					_classCallCheck(this, ClientContext);

					var auth = new Auth();
					auth.configureWithContext(this);
					this.auth = auth;

					var restChannel = new Rest();
					restChannel.configureWithContext(this);
					this.restChannel = restChannel;

					var stompChannel = environment.StompChannel.create();
					stompChannel.configureWithContext(this);
					this.stompChannel = stompChannel;

					this.config = config;
				}

				ClientContext.prototype.setCredentials = function setCredentials(credentials) {
					this.credentials = Credentials.create(credentials);
				};

				ClientContext.prototype.getCredentials = function getCredentials() {
					return this.credentials;
				};

				ClientContext.prototype.getConfig = function getConfig() {
					return this.config;
				};

				ClientContext.prototype.getAuth = function getAuth() {
					return this.auth;
				};

				ClientContext.prototype.getChannel = function getChannel() {
					return null;
				};

				ClientContext.prototype.getRestChannel = function getRestChannel() {
					return this.restChannel;
				};

				ClientContext.prototype.getStompChannel = function getStompChannel() {
					return this.stompChannel;
				};

				ClientContext.prototype.getServiceDefaultOptions = function getServiceDefaultOptions() {};

				return ClientContext;
			})();

			_export('ClientContext', ClientContext);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjsrQ0FHYSxhQUFhOzs7Ozs7bUJBSGxCLElBQUk7O29CQUNKLElBQUk7O2tDQUNKLFdBQVc7Ozs7O0FBQ04sZ0JBQWE7QUFFZCxhQUZDLGFBQWEsQ0FFYixNQUFNLEVBQUUsV0FBVyxFQUFFOzJCQUZyQixhQUFhOztBQUl4QixTQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3RCLFNBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxTQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsU0FBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUM3QixnQkFBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLFNBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOztBQUUvQixTQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JELGlCQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsU0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7O0FBRWpDLFNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBR3JCOztBQW5CVyxpQkFBYSxXQXFCekIsY0FBYyxHQUFBLHdCQUFDLFdBQVcsRUFBRTtBQUMzQixTQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDbkQ7O0FBdkJXLGlCQUFhLFdBeUJ6QixjQUFjLEdBQUEsMEJBQUc7QUFDaEIsWUFBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQ3hCOztBQTNCVyxpQkFBYSxXQTZCekIsU0FBUyxHQUFBLHFCQUFHO0FBQ1gsWUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ25COztBQS9CVyxpQkFBYSxXQWlDekIsT0FBTyxHQUFBLG1CQUFHO0FBQ1QsWUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2pCOztBQW5DVyxpQkFBYSxXQXFDekIsVUFBVSxHQUFBLHNCQUFHO0FBRVosWUFBTyxJQUFJLENBQUM7S0FDWjs7QUF4Q1csaUJBQWEsV0EwQ3pCLGNBQWMsR0FBQSwwQkFBRztBQUNoQixZQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDeEI7O0FBNUNXLGlCQUFhLFdBOEN6QixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQ3pCOztBQWhEVyxpQkFBYSxXQWtEekIsd0JBQXdCLEdBQUEsb0NBQUcsRUFJMUI7O1dBdERXLGFBQWE7Ozs0QkFBYixhQUFhIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9