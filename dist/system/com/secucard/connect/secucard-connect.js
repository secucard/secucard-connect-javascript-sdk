System.register(['./auth/Auth'], function (_export) {
  'use strict';

  var Auth, SecucardConnect;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_authAuth) {
      Auth = _authAuth.Auth;
    }],
    execute: function () {
      SecucardConnect = function SecucardConnect(options) {
        _classCallCheck(this, SecucardConnect);

        this.auth = new Auth(options.auth);
      };

      _export('SecucardConnect', SecucardConnect);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L3NlY3VjYXJkLWNvbm5lY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1lBQ2EsZUFBZTs7Ozs7O3VCQURwQixJQUFJOzs7QUFDQyxxQkFBZSxHQUNmLFNBREEsZUFBZSxDQUNkLE9BQU8sRUFBRTs4QkFEVixlQUFlOztBQUV4QixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtPQUNuQzs7aUNBSFUsZUFBZSIsImZpbGUiOiJjb20vc2VjdWNhcmQvY29ubmVjdC9zZWN1Y2FyZC1jb25uZWN0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==