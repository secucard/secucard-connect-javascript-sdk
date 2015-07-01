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

          var request = this.request.post(url).send(options.send);
          _.forEach(options.set, function (set) {
            request.set(set.label, set.value);
          });
          return new Promise(function (resolve, reject) {
            request.end(function (err, res) {
              if (err) {
                reject(err, res);
              } else {
                resolve(res);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9IdHRwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFFYSxJQUFJOzs7Ozs7Ozs7OztBQUFKLFVBQUk7QUFDSixpQkFEQSxJQUFJLEdBQ0Q7Z0NBREgsSUFBSTs7QUFFYixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtTQUN2Qjs7QUFIVSxZQUFJLFdBSWYsSUFBSSxHQUFBLGNBQUMsR0FBRyxFQUFxQjtjQUFuQixPQUFPLGdDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQzs7QUFDekIsY0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN2RCxXQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQU07QUFDL0IsbUJBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7V0FDbEMsQ0FBQyxDQUFBO0FBQ0gsaUJBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLO0FBQ25DLG1CQUFPLENBQUMsR0FBRyxDQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSTtBQUN4QixrQkFBSSxHQUFHLEVBQUU7QUFDUCxzQkFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtlQUNqQixNQUFNO0FBQ0wsdUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtlQUNiO2FBQ0YsQ0FBQyxDQUFBO1dBQ0gsQ0FDRixDQUFBO1NBQ0Y7O2VBbkJVLElBQUk7OztzQkFBSixJQUFJIiwiZmlsZSI6ImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9IdHRwLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==