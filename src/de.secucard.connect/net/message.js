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
export const HEAD = 'HEAD';
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export class Message {

    constructor() {

    }

    /**
     *
     * @param value
     * @returns {Message}
     */
    setBaseUrl(value) {
        this.baseUrl = value;
        return this;
    }

    /**
     *
     * @param value
     * @returns {Message}
     */
    setUrl(value) {
        this.url = value;
        return this;
    }

    /**
     *
     * @param value
     * @returns {Message}
     */
    setMethod(value) {
        this.method = value;
        return this;
    }

    /**
     *
     * @param value
     * @returns {Message}
     */
    setHeaders(value) {
        this.headers = value;
        return this;
    }

    /**
     *
     * @param value
     * @returns {Message}
     */
    setQuery(value) {
        this.query = value;
        return this;
    }

    /**
     *
     * @param value
     * @returns {Message}
     */
    setBody(value) {
        this.body = value;
        return this;
    }

    /**
     *
     * @param value
     * @returns {Message}
     */
    setAccept(value) {
        this.accept = value;
        return this;
    }
    
    /**
     * 
     * @param value
     * @returns {Message}
     */
    
    setMultipart(value) {
        this.multipart = value;
    }

}
