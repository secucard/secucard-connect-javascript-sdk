export class Frame {
	
	constructor() {
		
		this.command = null;
    	this.headers = null;
    	this.body = null;
		
	}

	build_frame (args) {
		
		this.command = args['command'];
		this.headers = args['headers'];
		this.body = args['body'];
		
		return this;
	}

	as_string () {
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
	}
	
}
