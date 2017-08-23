System.register(['./session-service'], function (_export) {
  'use strict';

  var SessionService, Auth;
  return {
    setters: [function (_sessionService) {
      SessionService = _sessionService.SessionService;
    }],
    execute: function () {
      Auth = {};

      _export('Auth', Auth);

      Auth.SessionService = SessionService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hdXRoL2F1dGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NCQWFhLElBQUk7Ozt1Q0FGVCxjQUFjOzs7QUFFVCxVQUFJLEdBQUcsRUFBRTs7OztBQUN0QixVQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvYXV0aC9hdXRoLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
