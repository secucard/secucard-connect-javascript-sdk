System.register([], function (_export) {
	'use strict';

	var Frame;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [],
		execute: function () {
			Frame = (function () {
				function Frame() {
					_classCallCheck(this, Frame);

					this.command = null;
					this.headers = null;
					this.body = null;
				}

				Frame.prototype.build_frame = function build_frame(args) {

					this.command = args['command'];
					this.headers = args['headers'];
					this.body = args['body'];

					return this;
				};

				Frame.prototype.as_string = function as_string() {
					var header_strs = [],
					    frame = '',
					    command = this.command,
					    headers = this.headers,
					    body = this.body;

					for (var header in headers) {
						header_strs.push(header + ':' + headers[header]);
					}

					frame += command + '\n';
					frame += header_strs.join('\n');
					frame += '\n\n';

					if (body) {
						frame += body;
					}

					frame += '\u0000';

					return frame;
				};

				return Frame;
			})();

			_export('Frame', Frame);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLWltcGwvZnJhbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0tBQWEsS0FBSzs7Ozs7OztBQUFMLFFBQUs7QUFFTixhQUZDLEtBQUssR0FFSDsyQkFGRixLQUFLOztBQUloQixTQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNqQixTQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNwQixTQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUVwQjs7QUFSVyxTQUFLLFdBVWpCLFdBQVcsR0FBQyxxQkFBQyxJQUFJLEVBQUU7O0FBRWxCLFNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLFNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV6QixZQUFPLElBQUksQ0FBQztLQUNaOztBQWpCVyxTQUFLLFdBbUJqQixTQUFTLEdBQUMscUJBQUc7QUFDWixTQUFJLFdBQVcsR0FBRyxFQUFFO1NBQ25CLEtBQUssR0FBRyxFQUFFO1NBQ1YsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPO1NBQ3RCLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztTQUN0QixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFbEIsVUFBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7QUFDM0IsaUJBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztNQUNqRDs7QUFFRCxVQUFLLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztBQUN4QixVQUFLLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxVQUFLLElBQUksTUFBTSxDQUFDOztBQUVoQixTQUFJLElBQUksRUFBRTtBQUNULFdBQUssSUFBSSxJQUFJLENBQUM7TUFDZDs7QUFFRCxVQUFLLElBQUksUUFBTSxDQUFDOztBQUVoQixZQUFPLEtBQUssQ0FBQztLQUNiOztXQXpDVyxLQUFLOzs7b0JBQUwsS0FBSyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9zdG9tcC1pbXBsL2ZyYW1lLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==