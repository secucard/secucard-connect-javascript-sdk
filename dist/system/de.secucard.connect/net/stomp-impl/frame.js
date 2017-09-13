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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLWltcGwvZnJhbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBV2EsS0FBSzs7Ozs7OztBQUFMLGlCQUFLO0FBRUgseUJBRkYsS0FBSyxHQUVBOzBDQUZMLEtBQUs7O0FBSVYsd0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLHdCQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNwQix3QkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7aUJBRXBCOztBQVJRLHFCQUFLLFdBVWQsV0FBVyxHQUFBLHFCQUFDLElBQUksRUFBRTs7QUFFZCx3QkFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0Isd0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLHdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFekIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmOztBQWpCUSxxQkFBSyxXQW1CZCxTQUFTLEdBQUEscUJBQUc7QUFDUix3QkFBSSxXQUFXLEdBQUcsRUFBRTt3QkFDaEIsS0FBSyxHQUFHLEVBQUU7d0JBQ1YsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPO3dCQUN0QixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87d0JBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOztBQUVyQix5QkFBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7QUFDeEIsbUNBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDcEQ7O0FBRUQseUJBQUssSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLHlCQUFLLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyx5QkFBSyxJQUFJLE1BQU0sQ0FBQzs7QUFFaEIsd0JBQUksSUFBSSxFQUFFO0FBQ04sNkJBQUssSUFBSSxJQUFJLENBQUM7cUJBQ2pCOztBQUVELHlCQUFLLElBQUksUUFBTSxDQUFDOztBQUVoQiwyQkFBTyxLQUFLLENBQUM7aUJBQ2hCOzt1QkF6Q1EsS0FBSzs7OzZCQUFMLEtBQUsiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc3RvbXAtaW1wbC9mcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=