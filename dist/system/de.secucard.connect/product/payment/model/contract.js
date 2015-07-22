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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL2NvbnRyYWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztLQUFhLFFBQVEsRUFXUixtQkFBbUI7Ozs7Ozs7QUFYbkIsV0FBUSxHQUVULFNBRkMsUUFBUSxDQUVSLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRTswQkFGekMsUUFBUTs7QUFHbkIsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsUUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDbkM7O3VCQVBXLFFBQVE7O0FBV1Isc0JBQW1CLEdBQ3BCLFNBREMsbUJBQW1CLENBQ25CLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFOzBCQURyRCxtQkFBbUI7O0FBRTlCLFFBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztBQUM3QyxRQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixRQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztBQUNqQyxRQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN2Qjs7a0NBTlcsbUJBQW1CIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL2NvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==