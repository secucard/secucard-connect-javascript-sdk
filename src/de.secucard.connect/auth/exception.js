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
export class AuthenticationFailedException extends Error {

    constructor(message = 'Authentication failed') {
        super(message);
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Object.defineProperty(this, 'stack', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: Error(message).stack
            });
        }

        Object.defineProperty(this, 'message', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: message
        });

        Object.defineProperty(this, 'name', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: 'AuthenticationFailedException'
        });

        Object.defineProperty(this, 'error_user', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: ''
        });

    }
}

export class AuthenticationTimeoutException extends Error {

    constructor(message = 'Authentication timeout') {
        super(message);
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Object.defineProperty(this, 'stack', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: Error(message).stack
            });
        }

        Object.defineProperty(this, 'message', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: message
        });

        Object.defineProperty(this, 'name', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: 'AuthenticationTimeoutException'
        });

    }
}
