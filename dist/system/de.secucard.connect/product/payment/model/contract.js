System.register([], function (_export) {
    "use strict";

    var Contract, ContractCloneParams;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [],
        execute: function () {
            Contract = function Contract(created, updated, parent, allow_cloning) {
                _classCallCheck(this, Contract);

                this.created = created;
                this.updated = updated;
                this.parent = parent;
                this.allow_cloning = allow_cloning;
            };

            _export("Contract", Contract);

            ContractCloneParams = function ContractCloneParams(allow_transactions, url_push, payment_data, project) {
                _classCallCheck(this, ContractCloneParams);

                this.allow_transactions = allow_transactions;
                this.url_push = url_push;
                this.payment_data = payment_data;
                this.project = project;
            };

            _export("ContractCloneParams", ContractCloneParams);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL2NvbnRyYWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztRQVdhLFFBQVEsRUFXUixtQkFBbUI7Ozs7Ozs7QUFYbkIsb0JBQVEsR0FFTixTQUZGLFFBQVEsQ0FFTCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUU7c0NBRjVDLFFBQVE7O0FBR2Isb0JBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLG9CQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixvQkFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsb0JBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO2FBQ3RDOztnQ0FQUSxRQUFROztBQVdSLCtCQUFtQixHQUNqQixTQURGLG1CQUFtQixDQUNoQixrQkFBa0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRTtzQ0FEeEQsbUJBQW1COztBQUV4QixvQkFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQzdDLG9CQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixvQkFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDakMsb0JBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2FBQzFCOzsyQ0FOUSxtQkFBbUIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvbW9kZWwvY29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9