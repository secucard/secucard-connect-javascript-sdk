'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SecucardConnectException = undefined;

var _exception = require('../auth/exception');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SecucardConnectException = exports.SecucardConnectException = function SecucardConnectException(data) {
    _classCallCheck(this, SecucardConnectException);

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        Object.defineProperty(this, 'stack', {
            configurable: true,
            enumerable: false,
            value: Error(data.error_details).stack
        });
    }

    Object.defineProperty(this, 'message', {
        configurable: true,
        enumerable: false,
        value: data.error_details
    });

    Object.defineProperty(this, 'name', {
        configurable: true,
        enumerable: false,
        value: this.constructor.name
    });

    Object.defineProperty(this, 'status', {
        configurable: true,
        enumerable: false,
        value: data.status
    });

    Object.defineProperty(this, 'error', {
        configurable: true,
        enumerable: false,
        value: data.error
    });

    Object.defineProperty(this, 'error_details', {
        configurable: true,
        enumerable: false,
        value: data.error_details
    });

    Object.defineProperty(this, 'error_user', {
        configurable: true,
        enumerable: false,
        value: data.error_user
    });

    Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: false,
        value: data.code
    });

    Object.defineProperty(this, 'supportId', {
        configurable: true,
        enumerable: false,
        value: data.supportId
    });
};

SecucardConnectException.create = function (data) {

    var error = void 0;

    if (data.error == 'ProductSecurityException') {
        error = Object.assign(new _exception.AuthenticationFailedException(), data);
    } else {
        error = new SecucardConnectException(data);
    }

    return error;
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWN1Y2FyZENvbm5lY3RFeGNlcHRpb24iLCJkYXRhIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwidmFsdWUiLCJlcnJvcl9kZXRhaWxzIiwic3RhY2siLCJuYW1lIiwic3RhdHVzIiwiZXJyb3IiLCJlcnJvcl91c2VyIiwiY29kZSIsInN1cHBvcnRJZCIsImNyZWF0ZSIsImFzc2lnbiIsIkF1dGhlbnRpY2F0aW9uRmFpbGVkRXhjZXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBV0E7Ozs7SUFFYUEsd0IsV0FBQUEsd0IsR0FDVCxrQ0FBWUMsSUFBWixFQUFrQjtBQUFBOztBQUVkLFFBQUlDLE1BQU1DLGlCQUFWLEVBQTZCO0FBQ3pCRCxjQUFNQyxpQkFBTixDQUF3QixJQUF4QixFQUE4QixLQUFLQyxXQUFuQztBQUNILEtBRkQsTUFFTztBQUNIQyxlQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLE9BQTVCLEVBQXFDO0FBQ2pDQywwQkFBYyxJQURtQjtBQUVqQ0Msd0JBQVksS0FGcUI7QUFHakNDLG1CQUFPUCxNQUFNRCxLQUFLUyxhQUFYLEVBQTBCQztBQUhBLFNBQXJDO0FBS0g7O0FBRUROLFdBQU9DLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEIsU0FBNUIsRUFBdUM7QUFDbkNDLHNCQUFjLElBRHFCO0FBRW5DQyxvQkFBWSxLQUZ1QjtBQUduQ0MsZUFBT1IsS0FBS1M7QUFIdUIsS0FBdkM7O0FBTUFMLFdBQU9DLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEIsTUFBNUIsRUFBb0M7QUFDaENDLHNCQUFjLElBRGtCO0FBRWhDQyxvQkFBWSxLQUZvQjtBQUdoQ0MsZUFBTyxLQUFLTCxXQUFMLENBQWlCUTtBQUhRLEtBQXBDOztBQU1BUCxXQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLFFBQTVCLEVBQXNDO0FBQ2xDQyxzQkFBYyxJQURvQjtBQUVsQ0Msb0JBQVksS0FGc0I7QUFHbENDLGVBQU9SLEtBQUtZO0FBSHNCLEtBQXRDOztBQU1BUixXQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLE9BQTVCLEVBQXFDO0FBQ2pDQyxzQkFBYyxJQURtQjtBQUVqQ0Msb0JBQVksS0FGcUI7QUFHakNDLGVBQU9SLEtBQUthO0FBSHFCLEtBQXJDOztBQU1BVCxXQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLGVBQTVCLEVBQTZDO0FBQ3pDQyxzQkFBYyxJQUQyQjtBQUV6Q0Msb0JBQVksS0FGNkI7QUFHekNDLGVBQU9SLEtBQUtTO0FBSDZCLEtBQTdDOztBQU9BTCxXQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLFlBQTVCLEVBQTBDO0FBQ3RDQyxzQkFBYyxJQUR3QjtBQUV0Q0Msb0JBQVksS0FGMEI7QUFHdENDLGVBQU9SLEtBQUtjO0FBSDBCLEtBQTFDOztBQU1BVixXQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLE1BQTVCLEVBQW9DO0FBQ2hDQyxzQkFBYyxJQURrQjtBQUVoQ0Msb0JBQVksS0FGb0I7QUFHaENDLGVBQU9SLEtBQUtlO0FBSG9CLEtBQXBDOztBQU1BWCxXQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLFdBQTVCLEVBQXlDO0FBQ3JDQyxzQkFBYyxJQUR1QjtBQUVyQ0Msb0JBQVksS0FGeUI7QUFHckNDLGVBQU9SLEtBQUtnQjtBQUh5QixLQUF6QztBQU1ILEM7O0FBR0xqQix5QkFBeUJrQixNQUF6QixHQUFrQyxVQUFDakIsSUFBRCxFQUFVOztBQUV4QyxRQUFJYSxjQUFKOztBQUVBLFFBQUliLEtBQUthLEtBQUwsSUFBYywwQkFBbEIsRUFBOEM7QUFDMUNBLGdCQUFRVCxPQUFPYyxNQUFQLENBQWMsSUFBSUMsd0NBQUosRUFBZCxFQUFtRG5CLElBQW5ELENBQVI7QUFDSCxLQUZELE1BRU87QUFDSGEsZ0JBQVEsSUFBSWQsd0JBQUosQ0FBNkJDLElBQTdCLENBQVI7QUFDSDs7QUFFRCxXQUFPYSxLQUFQO0FBQ0gsQ0FYRCIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
