System.register(['./auth/Auth', './net/channel/stomp'], function (_export) {
  'use strict';

  var Auth, Stomp, SecucardConnect;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_authAuth) {
      Auth = _authAuth.Auth;
    }, function (_netChannelStomp) {
      Stomp = _netChannelStomp.Stomp;
    }],
    execute: function () {
      SecucardConnect = function SecucardConnect(options) {
        _classCallCheck(this, SecucardConnect);

        this.auth = new Auth(options.auth);
        this.stomp = new Stomp(options.stomp);
      };

      _export('SecucardConnect', SecucardConnect);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L3NlY3VjYXJkLWNvbm5lY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21CQUdhLGVBQWU7Ozs7Ozt1QkFIcEIsSUFBSTs7K0JBQ0osS0FBSzs7O0FBRUEscUJBQWUsR0FDZixTQURBLGVBQWUsQ0FDZCxPQUFPLEVBQUU7OEJBRFYsZUFBZTs7QUFFeEIsWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbEMsWUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7T0FDdEM7O2lDQUpVLGVBQWUiLCJmaWxlIjoiY29tL3NlY3VjYXJkL2Nvbm5lY3Qvc2VjdWNhcmQtY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=