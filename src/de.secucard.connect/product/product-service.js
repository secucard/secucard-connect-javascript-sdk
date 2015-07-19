import {Channel} from '../net/channel';
import EE from 'eventemitter3';

export class ProductService {
	
	
	constructor() {
		
		Object.assign(this, EE.prototype);
		
	}
	
	configureWithContext(context) {
		
		this.getChannel = context.getChannel.bind(context);
		this.getServiceDefaultOptions = context.getServiceDefaultOptions.bind(context);
		
	}
	
	getEndpoint(){
		
		
		
	}
	
	getEventTargets() {
		
	}
	
	getUid() {
		
		return this.getEndpoint().join('.').toLowerCase();
		
	}
	
	/**
	* Retrieves a promise for a single object (resource) of a given type, never null<br/>
	* Would invoke for example: GET /targetType/objectId .<br/>
	* An exception is thrown if the id is unknown.
	* @param id
	* @param options
	 * @return {Promise} 
	*/
	
	getObject(id, options) {
		
		let params = {
			endpoint: this.getEndpoint(), 
			objectId: id, 
			options: options
		};
		
		return this._request(Channel.METHOD.GET, params, options);
		
	}
	 
	/**
	* Retrieves a promise for a collection of objects (resources) of a given type according to a given query.<br/>
	* Would invoke for example: GET /targetType?queryParams.<br/>
	* May throw an exception if an error happens.
	*
	* @param queryParams 	The query parameter data.
	* @param options 		will be used to determine actual target destination.
	* @return {Promise}
	*/
	
	getObjectList(queryParams, options) {
		
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
	 * 	               destination.
	 * @param options 		will be used to determine actual target destination.
	 * @return {Promise}
	*/
	
	createObject(data, options) {
		
		let params = {
			endpoint: this.getEndpoint(), 
			data: data,
			options: options
		};
		
		return this._request(Channel.METHOD.CREATE, params, options);
	}

	/**
	 * Retrieves a promise for updating an object.<br/>
	 * Would invoke for example: PUT /object/objectId with object mapped to JSON as _request body.<br/>
	 * May throw an exception if an error happens.
	 *
	 * @param data	The object holding data to update with, must also provide unique source id. The type/class of the
	 * 					object is used to determine the target destination.
	 * @param options 		will be used to determine actual target destination.
	 * 
	 * @return {Promise} The actual updated object, never null. Throws exception if object cannot be updated. May contain additional
	 * or corrected data, like id.  So using this object later on instead the provided is necessary. 
	 */
	
	updateObject(data, options) {
		
		let params = {
			endpoint: this.getEndpoint(),
			objectId: data.id,
			data: data,
			options: options
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
	 * @param options 		will be used to determine actual target destination.
	 * 
	 * @return {Promise} The actual updated object, or the result of the update, never null. Throws exception if object cannot be
	 * updated. May contain additional or corrected data, like id. So using this object later on instead the provided is
	 * necessary.
	*/
	
	updateObjectWithAction(id, action, actionArg, data, options) {
		
		let params = {
			endpoint: this.getEndpoint(),
			objectId: id,
			data: data,
			action: action,
			actionArg: actionArg,
			options: options
		};
		
		return this._request(Channel.METHOD.UPDATE, params, options);
	}
	
	/**
	 * Retrieves a promise for deleting an object.<br/>
	 * Would invoke for example: DELETE /targetType/objectId.<br/>
	 * May throw an exception if an error happens
	 * 
	 * @param id   Id of the resource to delete.
	 * @param options 		will be used to determine actual target destination.
	 * @param callback   The callback for async invocation.
	*/
	
	deleteObject(id, options) {
		
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
	 * @param options 		will be used to determine actual target destination.
	 * @return {Promise}
	 */
	
	deleteObjectWithAction(id, action, actionArg, options) {
		
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
	 * @param options 		will be used to determine actual target destination.
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
	 * @param appId		Id of a application for which the given action is executed.
	 * @param action	Action to execute.
	 * @param data		The data to be processed by the action.
	 * @param options 		will be used to determine actual target destination.
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
		
		if(options == null){
			options = this.getServiceDefaultOptions();
		}
		
		if(params.options == null) {
			params.options = options;
		}
		
		return this.getChannel(options.channelConfig).request(method, params);
		
	}
	
}
