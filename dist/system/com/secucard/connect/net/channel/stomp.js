System.register(['node-secucard'], function (_export) {
  'use strict';

  var Secucard, Stomp;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_nodeSecucard) {
      Secucard = _nodeSecucard['default'];
    }],
    execute: function () {
      Stomp = function Stomp() {
        var config = arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Stomp);

        return new Secucard(config).Channel.Stomp;
      };

      _export('Stomp', Stomp);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztnQkFDYSxLQUFLOzs7Ozs7Ozs7QUFBTCxXQUFLLEdBQ0wsU0FEQSxLQUFLLEdBQ087WUFBWCxNQUFNLGdDQUFDLEVBQUU7OzhCQURWLEtBQUs7O0FBRWQsZUFBTyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFBO09BQzFDOzt1QkFIVSxLQUFLIiwiZmlsZSI6ImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==