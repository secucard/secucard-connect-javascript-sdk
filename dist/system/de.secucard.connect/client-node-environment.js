System.register(['./net/stomp', './net/stomp-node/stomp'], function (_export) {
	'use strict';

	var Stomp, StompNodeImpl, ClientNodeEnvironment;
	return {
		setters: [function (_netStomp) {
			Stomp = _netStomp.Stomp;
		}, function (_netStompNodeStomp) {
			StompNodeImpl = _netStompNodeStomp.Stomp;
		}],
		execute: function () {
			ClientNodeEnvironment = {};

			_export('ClientNodeEnvironment', ClientNodeEnvironment);

			ClientNodeEnvironment.StompChannel = {
				create: function create() {
					return new Stomp(StompNodeImpl);
				}
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LW5vZGUtZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzJCQUdhLHFCQUFxQjs7O3FCQUgxQixLQUFLOztzQ0FDTCxLQUFLOzs7QUFFQSx3QkFBcUIsR0FBRyxFQUFFOztvQ0FBMUIscUJBQXFCOztBQUNsQyx3QkFBcUIsQ0FBQyxZQUFZLEdBQUc7QUFDcEMsVUFBTSxFQUFFLGtCQUFNO0FBQ2IsWUFBTyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNoQztJQUNELENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtbm9kZS1lbnZpcm9ubWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=