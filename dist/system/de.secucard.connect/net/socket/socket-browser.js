'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SocketAtBrowser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketAtBrowser = exports.SocketAtBrowser = function () {
    function SocketAtBrowser(url) {
        var _this = this;

        _classCallCheck(this, SocketAtBrowser);

        Object.assign(this, _eventemitter2.default.prototype);

        var ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";

        ws.onopen = function () {

            (0, _minilog2.default)('secucard.socket.browser').debug('onopen');
            _this.emit('connect');
        };

        ws.onmessage = function (event) {

            (0, _minilog2.default)('secucard.socket.browser').debug('onmessage', event);
            _this.emit('data', event.data);
        };

        ws.onclose = function (event) {

            if (event.code == 1000) {
                _this.emit('close');
            } else {
                _this.emit('close', event.reason);
            }
        };

        this.ws = ws;
    }

    _createClass(SocketAtBrowser, [{
        key: 'close',
        value: function close() {

            this.ws.close();
        }
    }, {
        key: 'write',
        value: function write(chunk) {

            this.ws.send(chunk);
            return true;
        }
    }]);

    return SocketAtBrowser;
}();

SocketAtBrowser.connect = function (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) {

    var url = host + ':' + port + endpoint;
    if (sslEnabled) {
        url = 'wss://' + url;
    } else {
        url = 'ws://' + url;
    }

    var socket = new SocketAtBrowser(url);
    onInit(socket, false);
};

SocketAtBrowser.disconnect = function (socket) {

    (0, _minilog2.default)('secucard.socket.browser').debug('disconnect called');
    socket.close();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtYnJvd3Nlci5qcyJdLCJuYW1lcyI6WyJTb2NrZXRBdEJyb3dzZXIiLCJ1cmwiLCJPYmplY3QiLCJhc3NpZ24iLCJFRSIsInByb3RvdHlwZSIsIndzIiwiV2ViU29ja2V0IiwiYmluYXJ5VHlwZSIsIm9ub3BlbiIsImRlYnVnIiwiZW1pdCIsIm9ubWVzc2FnZSIsImV2ZW50IiwiZGF0YSIsIm9uY2xvc2UiLCJjb2RlIiwicmVhc29uIiwiY2xvc2UiLCJjaHVuayIsInNlbmQiLCJjb25uZWN0IiwiaG9zdCIsInBvcnQiLCJlbmRwb2ludCIsInNzbEVuYWJsZWQiLCJzc2xfb3B0aW9ucyIsInNzbF92YWxpZGF0ZSIsIm9uSW5pdCIsIm9uRXJyb3IiLCJzb2NrZXQiLCJkaXNjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7OztBQUNBOzs7Ozs7OztJQUNhQSxlLFdBQUFBLGU7QUFFVCw2QkFBWUMsR0FBWixFQUFpQjtBQUFBOztBQUFBOztBQUViQyxlQUFPQyxNQUFQLENBQWMsSUFBZCxFQUFvQkMsdUJBQUdDLFNBQXZCOztBQUVBLFlBQUlDLEtBQUssSUFBSUMsU0FBSixDQUFjTixHQUFkLENBQVQ7QUFDQUssV0FBR0UsVUFBSCxHQUFnQixhQUFoQjs7QUFFQUYsV0FBR0csTUFBSCxHQUFZLFlBQU07O0FBRWQsbUNBQVEseUJBQVIsRUFBbUNDLEtBQW5DLENBQXlDLFFBQXpDO0FBQ0Esa0JBQUtDLElBQUwsQ0FBVSxTQUFWO0FBRUgsU0FMRDs7QUFPQUwsV0FBR00sU0FBSCxHQUFlLFVBQUNDLEtBQUQsRUFBVzs7QUFFdEIsbUNBQVEseUJBQVIsRUFBbUNILEtBQW5DLENBQXlDLFdBQXpDLEVBQXNERyxLQUF0RDtBQUNBLGtCQUFLRixJQUFMLENBQVUsTUFBVixFQUFrQkUsTUFBTUMsSUFBeEI7QUFFSCxTQUxEOztBQU9BUixXQUFHUyxPQUFILEdBQWEsVUFBQ0YsS0FBRCxFQUFXOztBQUlwQixnQkFBSUEsTUFBTUcsSUFBTixJQUFjLElBQWxCLEVBQXdCO0FBRXBCLHNCQUFLTCxJQUFMLENBQVUsT0FBVjtBQUNILGFBSEQsTUFHTztBQUNILHNCQUFLQSxJQUFMLENBQVUsT0FBVixFQUFtQkUsTUFBTUksTUFBekI7QUFDSDtBQUVKLFNBWEQ7O0FBYUEsYUFBS1gsRUFBTCxHQUFVQSxFQUFWO0FBQ0g7Ozs7Z0NBRU87O0FBRUosaUJBQUtBLEVBQUwsQ0FBUVksS0FBUjtBQUVIOzs7OEJBRUtDLEssRUFBTzs7QUFFVCxpQkFBS2IsRUFBTCxDQUFRYyxJQUFSLENBQWFELEtBQWI7QUFDQSxtQkFBTyxJQUFQO0FBRUg7Ozs7OztBQUlMbkIsZ0JBQWdCcUIsT0FBaEIsR0FBMEIsVUFBQ0MsSUFBRCxFQUFPQyxJQUFQLEVBQWFDLFFBQWIsRUFBdUJDLFVBQXZCLEVBQW1DQyxXQUFuQyxFQUFnREMsWUFBaEQsRUFBOERDLE1BQTlELEVBQXNFQyxPQUF0RSxFQUFrRjs7QUFFeEcsUUFBSTVCLE1BQU1xQixPQUFPLEdBQVAsR0FBYUMsSUFBYixHQUFvQkMsUUFBOUI7QUFDQSxRQUFJQyxVQUFKLEVBQWdCO0FBQ1p4QixjQUFNLFdBQVdBLEdBQWpCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hBLGNBQU0sVUFBVUEsR0FBaEI7QUFDSDs7QUFJRCxRQUFJNkIsU0FBUyxJQUFJOUIsZUFBSixDQUFvQkMsR0FBcEIsQ0FBYjtBQUNBMkIsV0FBT0UsTUFBUCxFQUFlLEtBQWY7QUFFSCxDQWREOztBQWdCQTlCLGdCQUFnQitCLFVBQWhCLEdBQTZCLFVBQUNELE1BQUQsRUFBWTs7QUFFckMsMkJBQVEseUJBQVIsRUFBbUNwQixLQUFuQyxDQUF5QyxtQkFBekM7QUFDQW9CLFdBQU9aLEtBQVA7QUFFSCxDQUxEIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
