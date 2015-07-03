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

          var request = this.request.post(url).type(options.type || 'json').send(options.send);

          _.forEach(options.set, function (set) {
            request.set(set.label, set.value);
          });
          return new Promise(function (resolve, reject) {
            request.end(function (err, res) {
              if (err) {
                reject(err.response);
              } else {
                resolve(res.text);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9IdHRwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFFYSxJQUFJOzs7Ozs7Ozs7OztBQUFKLFVBQUk7QUFDSixpQkFEQSxJQUFJLEdBQ0Q7Z0NBREgsSUFBSTs7QUFFYixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtTQUN2Qjs7QUFIVSxZQUFJLFdBSWYsSUFBSSxHQUFBLGNBQUMsR0FBRyxFQUFxQjtjQUFuQixPQUFPLGdDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQzs7QUFDekIsY0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNULElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBOztBQUVyQixXQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQU07QUFDL0IsbUJBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7V0FDbEMsQ0FBQyxDQUFBO0FBQ0gsaUJBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLO0FBQ25DLG1CQUFPLENBQUMsR0FBRyxDQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSTtBQUN4QixrQkFBSSxHQUFHLEVBQUU7QUFDUCxzQkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtlQUNyQixNQUFNO0FBQ0wsdUJBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7ZUFDbEI7YUFDRixDQUFDLENBQUE7V0FDSCxDQUNGLENBQUE7U0FDRjs7ZUF2QlUsSUFBSTs7O3NCQUFKLElBQUkiLCJmaWxlIjoiY29tL3NlY3VjYXJkL2Nvbm5lY3QvbmV0L0h0dHAuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9