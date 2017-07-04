import {Channel} from '../net/channel';
import EE from 'eventemitter3';

export class ProductService {

    /**
     * contains meta data for product
     */
    _meta;
    
    constructor() {

        Object.assign(this, EE.prototype);

    }

    configureWithContext(context) {

        this.getChannel = context.getChannel.bind(context);
        this.getServiceDefaultOptions = context.getServiceDefaultOptions.bind(context);

    }

    getEndpoint() {


    }

    getEventTargets() {

    }

    getUid() {

        return this.getEndpoint().join('.').toLowerCase();

    }
    
    _parseMeta(data) {
        
        if(!data) {
            return data;
        }
        
        data.describe = function (property) {

            var _this = this;

            let res = property.split('.').reduce((collector, item) => {
                return collector.properties[item];
            }, _this);

            if (res.type == 'object') {
                res.describe = this.describe;
            }

            return res;

        };
        
        return data;
    }

    /**
     * get a promise for a meta of product, that describes type of product and its properties<br/>
     * is being cached<br/>
     * to get property description call describe(property) method<br/>
     * Example of Product item {prop1: {prop2: 'string_value'}}:<br/>
     * Example of Meta object:<br/>
     * {type: 'object', properties: {prop1: {type: 'object', properties: {prop2: {type: 'string'}}}}}
     * meta.describe('prop1.prop2') => {type: 'string'}
     * @see http://json-schema.org/draft-04/schema#
     * @param options when options are set, send request
     * @return {Promise}
     */
    
    getMeta(options) {
        return this._meta && !options? 
            Promise.resolve(this._meta) : 
            this.retrieveMeta(options).then((res) => { 
                this._meta = this._parseMeta(res.meta);
                return this._meta; 
            });
    }
    
    /**
     * Retrieves a promise for a meta of object (resource) of a given type<br/>
     * Would invoke for example: GET /targetType/objectId/?meta=only .<br/>
     * @param options
     * @return {Promise}
     */
    retrieveMeta(options) {
        
        let params = {
            endpoint: this.getEndpoint(),
            queryParams: {meta: 'only'},
            options: options
        };
        
        return this._request(Channel.METHOD.GET, params, options);
        
    }

    /**
     * Retrieves a promise for a single object (resource) of a given type, never null<br/>
     * Would invoke for example: GET /targetType/objectId .<br/>
     * An exception is thrown if the id is unknown.
     * @param id
     * @param queryParams
     * @param options
     * @return {Promise}
     */

    retrieve(id, queryParams, options) {

        let params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            queryParams: queryParams,
            options: options
        };

        return this._request(Channel.METHOD.GET, params, options);

    }

    /**
     * Retrieves a promise for a single object (resource) of a given type, never null<br/>
     * Would invoke for example: GET /targetType/objectId/action/actionArg .<br/>
     * An exception is thrown if the id is unknown.
     * @param id
     * @param action
     * @param actionArg
     * @param options
     * @return {Promise}
     */
    retrieveWithAction(id, action, actionArg, options) {

        let params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            action: action,
            actionArg: actionArg,
            options: options
        };

        return this._request(Channel.METHOD.GET, params, options);

    }

    /**
     * Retrieves a promise for a collection of objects (resources) of a given type according to a given query.<br/>
     * Would invoke for example: GET /targetType?queryParams.<br/>
     * May throw an exception if an error happens.
     *
     * @param queryParams    The query parameter data.
     * @param options        will be used to determine actual target destination.
     * @return {Promise}
     */

    retrieveList(queryParams, options) {

        let params = {
            endpoint: this.getEndpoint(),
            queryParams: queryParams,
            options: options
        };

        return this._request(Channel.METHOD.GET, params, options);

    }

    /**
     * Retrieves a promise for  the actual created object, never null.
     * May contain additional or corrected data, like id.  So using this object later on instead the provided is necessary.
     * Would invoke for example: POST /object with object mapped to JSON as _request body.<br/>
     *
     * Throws exception if object cannot be created.
     * @param data   The object holding data to create. The type/class of the object is used to determine the target
     *                   destination.
     * @param options        will be used to determine actual target destination.
     * @param multipart object contains data for multipart form content, {files: [Blob|File], fields: [{name,value}]}
     * @return {Promise}
     */

    create(data, options, multipart) {

        let params = {
            endpoint: this.getEndpoint(),
            data: data,
            options: options,
            multipart: multipart
        };

        return this._request(Channel.METHOD.CREATE, params, options);
    }
    
    
    /**
     * Retrieves a promise for updating an object.<br/>
     * Would invoke for example: PUT /object/objectId with object mapped to JSON as _request body.<br/>
     * May throw an exception if an error happens.
     *
     * @param data    The object holding data to update with, must also provide unique source id. The type/class of the
     *                    object is used to determine the target destination.
     * @param options        will be used to determine actual target destination.
     * @param multipart object contains data for multipart form content, {files: [Blob|File], fields: [{name,value}]}
     * 
     * @return {Promise} The actual updated object, never null. Throws exception if object cannot be updated. May contain additional
     * or corrected data, like id.  So using this object later on instead the provided is necessary.
     */

    update(data, options, multipart) {

        let params = {
            endpoint: this.getEndpoint(),
            objectId: data.id,
            data: data,
            options: options,
            multipart: multipart
        };

        return this._request(Channel.METHOD.UPDATE, params, options);

    }

    /**

     * Retrieves a promise for updating an object.<br/>
     * Would invoke for example: PUT /targetType/objectId/action/actionArg with arg mapped to JSON as _request body.<br/>
     * May throw an exception if an error happens.
     *
     * @param id   Id of the resource to update.
     * @param action     Additional action to execute.
     * @param actionArg  Additional argument to the action, optional.
     * @param data        The new data to update with.
     * @param options        will be used to determine actual target destination.
     * @param multipart object contains data for multipart form content, {files: [Blob|File], fields: [{name,value}]}
     
     * @return {Promise} The actual updated object, or the result of the update, never null. Throws exception if object cannot be
     * updated. May contain additional or corrected data, like id. So using this object later on instead the provided is
     * necessary.
     */

    updateWithAction(id, action, actionArg, data, options, multipart) {

        let params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            data: data,
            action: action,
            actionArg: actionArg,
            options: options,
            multipart: multipart
        };

        return this._request(Channel.METHOD.UPDATE, params, options);
    }

    /**
     * Retrieves a promise for deleting an object.<br/>
     * Would invoke for example: DELETE /targetType/objectId.<br/>
     * May throw an exception if an error happens
     *
     * @param id   Id of the resource to delete.
     * @param options        will be used to determine actual target destination.
     */

    remove(id, options) {

        let params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            options: options
        };

        return this._request(Channel.METHOD.DELETE, params, options);

    }

    /**
     * Retrieves a promise for deleting an object.<br/>
     * Would invoke for example: DELETE /targetType/objectId/action/actionArg.<br/>
     * May throw an exception if an error happens.
     * @param id   Id of the resource to delete.
     * @param action     Additional action to execute.
     * @param actionArg  Additional argument to the action, optional.
     * @param options        will be used to determine actual target destination.
     * @return {Promise}
     */

    removeWithAction(id, action, actionArg, options) {

        let params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            action: action,
            actionArg: actionArg,
            options: options
        };

        return this._request(Channel.METHOD.DELETE, params, options);

    }

    /**
     * Retrieves a promise for executing an action.<br/>
     * Would invoke for example: POST /targetType/objectId/action/actionArg with arg as JSON _request body.<br/>
     * May throw an exception if an error happens.
     *
     * @param id   Id of a resource.
     * @param action     Action to execute.
     * @param actionArg  Additional argument to the action, optional.
     * @param data        The data to be processed by the action.
     * @param options        will be used to determine actual target destination.
     * @return {Promise} The result of the execution, never null. An exception is thrown if the action cannot be executed.
     */

    execute(id, action, actionArg, data, options) {

        let params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            action: action,
            actionArg: actionArg,
            data: data,
            options: options
        };

        return this._request(Channel.METHOD.EXECUTE, params, options);

    }

    /**
     * Retrieves a promise for executing an action.<br/>
     * Would invoke for example: POST /General/Apps/appId/callBackend/action with arg as JSON request body.<br/>
     * May throw an exception if an error happens.
     *
     * @param appId        Id of a application for which the given action is executed.
     * @param action    Action to execute.
     * @param data        The data to be processed by the action.
     * @param options        will be used to determine actual target destination.
     * @return {Promise} The result of the execution, never null. An exception is thrown if the action cannot be executed.
     */

    executeAppAction(appId, action, data, options) {

        let params = {
            appId: appId,
            action: action,
            data: data,
            options: options
        };

        return this._request(Channel.METHOD.EXECUTE, params, options);

    }

    /**
     *
     * @param method Channel.METHOD
     * @param params request parameters
     * @param options request options
     * @returns {Promise}
     */
    _request(method, params, options) {

        if (options == null) {
            options = this.getServiceDefaultOptions();
        }

        if (params.options == null) {
            params.options = options;
        }

        return this.getChannel(options.channelConfig).request(method, params);

    }

}
