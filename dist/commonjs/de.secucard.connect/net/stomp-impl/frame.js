'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Frame = (function () {
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
            frame = "",
            command = this.command,
            headers = this.headers,
            body = this.body;

        for (var header in headers) {
            header_strs.push(header + ':' + headers[header]);
        }

        frame += command + "\n";
        frame += header_strs.join("\n");
        frame += "\n\n";

        if (body) {
            frame += body;
        }

        frame += '\x00';

        return frame;
    };

    return Frame;
})();

exports.Frame = Frame;