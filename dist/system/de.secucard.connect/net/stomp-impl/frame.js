System.register(['babel-runtime/helpers/class-call-check'], function (_export) {
	var _classCallCheck, Frame;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
		}],
		execute: function () {
			'use strict';

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLWltcGwvZnJhbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtzQkFBYSxLQUFLOzs7Ozs7Ozs7QUFBTCxRQUFLO0FBRU4sYUFGQyxLQUFLLEdBRUg7MkJBRkYsS0FBSzs7QUFJaEIsU0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDakIsU0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FFcEI7O0FBUlcsU0FBSyxXQVVqQixXQUFXLEdBQUMscUJBQUMsSUFBSSxFQUFFOztBQUVsQixTQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQixTQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQixTQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFekIsWUFBTyxJQUFJLENBQUM7S0FDWjs7QUFqQlcsU0FBSyxXQW1CakIsU0FBUyxHQUFDLHFCQUFHO0FBQ1osU0FBSSxXQUFXLEdBQUcsRUFBRTtTQUNuQixLQUFLLEdBQUcsRUFBRTtTQUNWLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztTQUN0QixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87U0FDdEIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7O0FBRWxCLFVBQUssSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO0FBQzNCLGlCQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7TUFDakQ7O0FBRUQsVUFBSyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDeEIsVUFBSyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsVUFBSyxJQUFJLE1BQU0sQ0FBQzs7QUFFaEIsU0FBSSxJQUFJLEVBQUU7QUFDVCxXQUFLLElBQUksSUFBSSxDQUFDO01BQ2Q7O0FBRUQsVUFBSyxJQUFJLFFBQU0sQ0FBQzs7QUFFaEIsWUFBTyxLQUFLLENBQUM7S0FDYjs7V0F6Q1csS0FBSzs7O29CQUFMLEtBQUsiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc3RvbXAtaW1wbC9mcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=