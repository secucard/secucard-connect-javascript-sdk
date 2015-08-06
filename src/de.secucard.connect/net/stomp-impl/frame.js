/*
 Copyright 2015 hp.weber GmbH & Co secucard KG (www.secucard.com)
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
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
