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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hdXRoL2F1dGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NCQWFhLElBQUk7Ozt1Q0FGVCxjQUFjOzs7QUFFVCxVQUFJLEdBQUcsRUFBRTs7c0JBQVQsSUFBSTs7QUFDakIsVUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2F1dGgvYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=