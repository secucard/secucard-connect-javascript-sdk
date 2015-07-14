System.register(['./net/stomp', './net/socket/socket-node'], function (_export) {
	'use strict';

	var Stomp, SocketAtNode, ClientNodeEnvironment;
	return {
		setters: [function (_netStomp) {
			Stomp = _netStomp.Stomp;
		}, function (_netSocketSocketNode) {
			SocketAtNode = _netSocketSocketNode.SocketAtNode;
		}],
		execute: function () {
			ClientNodeEnvironment = {
				config: {
					stompPort: 61614
				}
			};

			_export('ClientNodeEnvironment', ClientNodeEnvironment);

			ClientNodeEnvironment.StompChannel = {
				create: function create() {
					return new Stomp(SocketAtNode);
				}
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LW5vZGUtZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzBCQUdhLHFCQUFxQjs7O3FCQUgxQixLQUFLOzt1Q0FDTCxZQUFZOzs7QUFFUCx3QkFBcUIsR0FBRztBQUNwQyxVQUFNLEVBQUU7QUFDUCxjQUFTLEVBQUUsS0FBSztLQUNoQjtJQUNEOztvQ0FKWSxxQkFBcUI7O0FBS2xDLHdCQUFxQixDQUFDLFlBQVksR0FBRztBQUNwQyxVQUFNLEVBQUUsa0JBQU07QUFDYixZQUFPLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC1ub2RlLWVudmlyb25tZW50LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==