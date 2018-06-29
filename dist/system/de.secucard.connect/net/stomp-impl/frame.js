'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Frame = exports.Frame = function () {
    function Frame() {
        _classCallCheck(this, Frame);

        this.command = null;
        this.headers = null;
        this.body = null;
    }

    _createClass(Frame, [{
        key: 'build_frame',
        value: function build_frame(args) {

            this.command = args['command'];
            this.headers = args['headers'];
            this.body = args['body'];

            return this;
        }
    }, {
        key: 'as_string',
        value: function as_string() {
            var header_strs = [],
                frame = "",
                command = this.command,
                headers = this.headers,
                body = this.body;

            for (var header in headers) {
                header_strs.push(header + ':' + headers[header]);
            }

            frame += command + "\n";
            frame += header_strs.join("\n");
            frame += "\n\n";

            if (body) {
                frame += body;
            }

            frame += '\x00';

            return frame;
        }
    }]);

    return Frame;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLWltcGwvZnJhbWUuanMiXSwibmFtZXMiOlsiRnJhbWUiLCJjb21tYW5kIiwiaGVhZGVycyIsImJvZHkiLCJhcmdzIiwiaGVhZGVyX3N0cnMiLCJmcmFtZSIsImhlYWRlciIsInB1c2giLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBV2FBLEssV0FBQUEsSztBQUVULHFCQUFjO0FBQUE7O0FBRVYsYUFBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxhQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUtDLElBQUwsR0FBWSxJQUFaO0FBRUg7Ozs7b0NBRVdDLEksRUFBTTs7QUFFZCxpQkFBS0gsT0FBTCxHQUFlRyxLQUFLLFNBQUwsQ0FBZjtBQUNBLGlCQUFLRixPQUFMLEdBQWVFLEtBQUssU0FBTCxDQUFmO0FBQ0EsaUJBQUtELElBQUwsR0FBWUMsS0FBSyxNQUFMLENBQVo7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOzs7b0NBRVc7QUFDUixnQkFBSUMsY0FBYyxFQUFsQjtBQUFBLGdCQUNJQyxRQUFRLEVBRFo7QUFBQSxnQkFFSUwsVUFBVSxLQUFLQSxPQUZuQjtBQUFBLGdCQUdJQyxVQUFVLEtBQUtBLE9BSG5CO0FBQUEsZ0JBSUlDLE9BQU8sS0FBS0EsSUFKaEI7O0FBTUEsaUJBQUssSUFBSUksTUFBVCxJQUFtQkwsT0FBbkIsRUFBNEI7QUFDeEJHLDRCQUFZRyxJQUFaLENBQWlCRCxTQUFTLEdBQVQsR0FBZUwsUUFBUUssTUFBUixDQUFoQztBQUNIOztBQUVERCxxQkFBU0wsVUFBVSxJQUFuQjtBQUNBSyxxQkFBU0QsWUFBWUksSUFBWixDQUFpQixJQUFqQixDQUFUO0FBQ0FILHFCQUFTLE1BQVQ7O0FBRUEsZ0JBQUlILElBQUosRUFBVTtBQUNORyx5QkFBU0gsSUFBVDtBQUNIOztBQUVERyxxQkFBUyxNQUFUOztBQUVBLG1CQUFPQSxLQUFQO0FBQ0giLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc3RvbXAtaW1wbC9mcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
