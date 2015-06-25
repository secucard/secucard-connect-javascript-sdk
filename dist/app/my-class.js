System.register(['jquery'], function (_export) {
  'use strict';

  var $, MyClass;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }],
    execute: function () {
      MyClass = (function () {
        function MyClass() {
          _classCallCheck(this, MyClass);

          $(document.body).css('background-color', 'grey');
          this.writeMessage('es6 class method');
        }

        _createClass(MyClass, [{
          key: 'writeMessage',
          value: function writeMessage(msg) {
            $(document.body).html(msg);
          }
        }]);

        return MyClass;
      })();

      _export('MyClass', MyClass);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9teS1jbGFzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7U0FHYSxPQUFPOzs7Ozs7Ozs7OztBQUFQLGFBQU87QUFDUCxpQkFEQSxPQUFPLEdBQ0o7Z0NBREgsT0FBTzs7QUFFaEIsV0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDakQsY0FBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3ZDOztxQkFKVSxPQUFPOztpQkFLTixzQkFBQyxHQUFHLEVBQUU7QUFDaEIsYUFBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7V0FDNUI7OztlQVBVLE9BQU87Ozt5QkFBUCxPQUFPIiwiZmlsZSI6ImFwcC9teS1jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=