'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SocketAtNode = undefined;

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _tls = require('tls');

var _tls2 = _interopRequireDefault(_tls);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SocketAtNode = exports.SocketAtNode = {};

SocketAtNode.connect = function (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) {

    var socket = null;

    if (sslEnabled) {

        (0, _minilog2.default)('secucard.socket.node').debug('Connecting to ' + host + ':' + port + ' using SSL');

        socket = _tls2.default.connect(port, host, ssl_options, function () {
            (0, _minilog2.default)('secucard.socket.node').debug('SSL connection complete');

            if (!socket.authorized) {
                (0, _minilog2.default)('secucard.socket.node').error('SSL is not authorized:', socket.authorizationError);
                if (ssl_validate) {
                    onError(socket.authorizationError);
                    SocketNode.disconnect(socket);
                    return;
                }
            }

            onInit(socket, true);
        }).on('error', function (err, obj) {
            (0, _minilog2.default)('secucard.socket.node').error(err, obj);
            onError(err);
        });
    } else {
        (0, _minilog2.default)('secucard.socket.node').debug('Connecting to ' + host + ':' + port);

        socket = new _net2.default.Socket();
        socket.connect(port, host);
        onInit(socket, false);
    }
};

SocketAtNode.disconnect = function (socket) {

    socket.end();
    if (socket.readyState == 'readOnly') {
        socket.destroy();
    }

    (0, _minilog2.default)('secucard.socket.node').debug('disconnect called');
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtbm9kZS5qcyJdLCJuYW1lcyI6WyJTb2NrZXRBdE5vZGUiLCJjb25uZWN0IiwiaG9zdCIsInBvcnQiLCJlbmRwb2ludCIsInNzbEVuYWJsZWQiLCJzc2xfb3B0aW9ucyIsInNzbF92YWxpZGF0ZSIsIm9uSW5pdCIsIm9uRXJyb3IiLCJzb2NrZXQiLCJkZWJ1ZyIsInRscyIsImF1dGhvcml6ZWQiLCJlcnJvciIsImF1dGhvcml6YXRpb25FcnJvciIsIlNvY2tldE5vZGUiLCJkaXNjb25uZWN0Iiwib24iLCJlcnIiLCJvYmoiLCJuZXQiLCJTb2NrZXQiLCJlbmQiLCJyZWFkeVN0YXRlIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBQ08sSUFBTUEsc0NBQWUsRUFBckI7O0FBRVBBLGFBQWFDLE9BQWIsR0FBdUIsVUFBQ0MsSUFBRCxFQUFPQyxJQUFQLEVBQWFDLFFBQWIsRUFBdUJDLFVBQXZCLEVBQW1DQyxXQUFuQyxFQUFnREMsWUFBaEQsRUFBOERDLE1BQTlELEVBQXNFQyxPQUF0RSxFQUFrRjs7QUFFckcsUUFBSUMsU0FBUyxJQUFiOztBQUVBLFFBQUlMLFVBQUosRUFBZ0I7O0FBRVosK0JBQVEsc0JBQVIsRUFBZ0NNLEtBQWhDLENBQXNDLG1CQUFtQlQsSUFBbkIsR0FBMEIsR0FBMUIsR0FBZ0NDLElBQWhDLEdBQXVDLFlBQTdFOztBQUVBTyxpQkFBU0UsY0FBSVgsT0FBSixDQUFZRSxJQUFaLEVBQWtCRCxJQUFsQixFQUF3QkksV0FBeEIsRUFBcUMsWUFBTTtBQUNoRCxtQ0FBUSxzQkFBUixFQUFnQ0ssS0FBaEMsQ0FBc0MseUJBQXRDOztBQUVBLGdCQUFJLENBQUNELE9BQU9HLFVBQVosRUFBd0I7QUFDcEIsdUNBQVEsc0JBQVIsRUFBZ0NDLEtBQWhDLENBQXNDLHdCQUF0QyxFQUFnRUosT0FBT0ssa0JBQXZFO0FBQ0Esb0JBQUlSLFlBQUosRUFBa0I7QUFDZEUsNEJBQVFDLE9BQU9LLGtCQUFmO0FBQ0FDLCtCQUFXQyxVQUFYLENBQXNCUCxNQUF0QjtBQUNBO0FBQ0g7QUFDSjs7QUFFREYsbUJBQU9FLE1BQVAsRUFBZSxJQUFmO0FBRUgsU0FkUSxFQWNOUSxFQWRNLENBY0gsT0FkRyxFQWNNLFVBQVVDLEdBQVYsRUFBZUMsR0FBZixFQUFvQjtBQUMvQixtQ0FBUSxzQkFBUixFQUFnQ04sS0FBaEMsQ0FBc0NLLEdBQXRDLEVBQTJDQyxHQUEzQztBQUNBWCxvQkFBUVUsR0FBUjtBQUNILFNBakJRLENBQVQ7QUFrQkgsS0F0QkQsTUF3Qks7QUFDRCwrQkFBUSxzQkFBUixFQUFnQ1IsS0FBaEMsQ0FBc0MsbUJBQW1CVCxJQUFuQixHQUEwQixHQUExQixHQUFnQ0MsSUFBdEU7O0FBRUFPLGlCQUFTLElBQUlXLGNBQUlDLE1BQVIsRUFBVDtBQUNBWixlQUFPVCxPQUFQLENBQWVFLElBQWYsRUFBcUJELElBQXJCO0FBQ0FNLGVBQU9FLE1BQVAsRUFBZSxLQUFmO0FBRUg7QUFFSixDQXJDRDs7QUF1Q0FWLGFBQWFpQixVQUFiLEdBQTBCLFVBQUNQLE1BQUQsRUFBWTs7QUFFbENBLFdBQU9hLEdBQVA7QUFDQSxRQUFJYixPQUFPYyxVQUFQLElBQXFCLFVBQXpCLEVBQXFDO0FBQ2pDZCxlQUFPZSxPQUFQO0FBQ0g7O0FBRUQsMkJBQVEsc0JBQVIsRUFBZ0NkLEtBQWhDLENBQXNDLG1CQUF0QztBQUVILENBVEQiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc29ja2V0L3NvY2tldC1ub2RlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
