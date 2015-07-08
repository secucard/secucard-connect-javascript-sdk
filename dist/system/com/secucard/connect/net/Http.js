System.register(['superagent', 'lodash'], function (_export) {
  'use strict';

  var Request, _, Http;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_superagent) {
      Request = _superagent['default'];
    }, function (_lodash) {
      _ = _lodash['default'];
    }],
    execute: function () {
      Http = (function () {
        function Http() {
          _classCallCheck(this, Http);

          this.request = Request;
        }

        Http.prototype.post = function post(url) {
          var options = arguments[1] === undefined ? { send: {} } : arguments[1];

          var request = this.request.post(url).type('json').set('Accept', 'application/json').send(options.send);

          _.forEach(options.set, function (set) {
            request.set(set.label, set.value);
          });
          return new Promise(function (resolve, reject) {
            request.end(function (err, res) {
              if (err) {
                reject(err.response);
              } else {
                resolve(res.body);
              }
            });
          });
        };

        return Http;
      })();

      _export('Http', Http);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9IdHRwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFFYSxJQUFJOzs7Ozs7Ozs7OztBQUFKLFVBQUk7QUFDSixpQkFEQSxJQUFJLEdBQ0Q7Z0NBREgsSUFBSTs7QUFFYixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtTQUN2Qjs7QUFIVSxZQUFJLFdBSWYsSUFBSSxHQUFBLGNBQUMsR0FBRyxFQUFxQjtjQUFuQixPQUFPLGdDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQzs7QUFDekIsY0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNULElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDWixHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7O0FBRXJCLFdBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQUcsRUFBTTtBQUMvQixtQkFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtXQUNsQyxDQUFDLENBQUE7QUFDSCxpQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDbkMsbUJBQU8sQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFJO0FBQ3hCLGtCQUFJLEdBQUcsRUFBRTtBQUNQLHNCQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2VBQ3JCLE1BQU07QUFDTCx1QkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtlQUNsQjthQUNGLENBQUMsQ0FBQTtXQUNILENBQ0YsQ0FBQTtTQUNGOztlQXhCVSxJQUFJOzs7c0JBQUosSUFBSSIsImZpbGUiOiJjb20vc2VjdWNhcmQvY29ubmVjdC9uZXQvSHR0cC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=