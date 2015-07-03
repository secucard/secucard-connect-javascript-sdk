export class Channel {
	
	constructor() {
		
	}
	
	send() {
		
	}

	/**
	* Retrieves a promise for a single object (resource) of a given type, never null<br/>
	* Would invoke for example: GET /targetType/objectId .<br/>
	* An exception is thrown if the id is unknown.
	* @param targetType
	* @param objectId
	 * @return {Promise} 
	*/
	
	getItem(targetType, objectId) {
		
		
		
	}
	 
	/**
	* Retrieves a promise for a collection of objects (resources) of a given type according to a given query.<br/>
	* Would invoke for example: GET /targetType?queryParams.<br/>
	* May throw an exception if an error happens.
	*
	* @param targetType  Type of the resources to search for, will be used to determine actual target destination.
	* @param queryParams The query parameter data.
	* @return {Promise}
	*/
	
	findItems(targetType, queryParams) {
		
		
		
	}
	
	/**
	* Retrieves a promise for creating an object.<br/>
	 * Retrieves a promise for  the actual created object, never null.
	 * May contain additional or corrected data, like id.  So using this object later on instead the provided is necessary.
	* Would invoke for example: POST /object with object mapped to JSON as request body.<br/>
	 * 
	* Throws exception if object cannot be created.
	*
	* @param object   The object holding data to create. The type/class of the object is used to determine the target
	*                 destination.
	* @return {Promise}
	*/
	
	createItem(object) {
		
		
		
	}

	/**
	 * Retrieves a promise for updating an object.<br/>
	 * Would invoke for example: PUT /object/objectId with object mapped to JSON as request body.<br/>
	 * May throw an exception if an error happens.
	 *
	 * @param object	The object holding data to update with, must also provide unique source id. The type/class of the
	 * 					object is used to determine the target destination.
	 * 
	 * @return {Promise} The actual updated object, never null. Throws exception if object cannot be updated. May contain additional
	 * or corrected data, like id.  So using this object later on instead the provided is necessary. 
	 */
	
	updateItem(object) {
		
	}
	/**
	
	 * Retrieves a promise for updating an object.<br/>
	 * Would invoke for example: PUT /targetType/objectId/action/actionArg with arg mapped to JSON as request body.<br/>
	 * May throw an exception if an error happens.
	 *
	 * @param targetType Type of the resource to update, will be used to determine actual target destination.
	 * @param objectId   Id of the resource to update.
	 * @param action     Additional action to execute.
	 * @param actionArg  Additional argument to the action, optional.
	 * @param arg        The new data to update with.
	 * @return {Promise} The actual updated object, or the result of the update, never null. Throws exception if object cannot be
	 * updated. May contain additional or corrected data, like id. So using this object later on instead the provided is
	 * necessary.
	*/
	
	updateItemWithAction(targetType, objectId, action, actionArg, arg) {
		
	}
	
	/**
	 * Retrieves a promise for deleting an object.<br/>
	 * Would invoke for example: DELETE /targetType/objectId.<br/>
	 * May throw an exception if an error happens
	 * 
	 * @param targetType Type of the resource to delete, will be used to determine actual target destination.
	 * @param objectId   Id of the resource to delete.
	 * @param callback   The callback for async invocation.
	*/
	
	deleteObject(targetType, objectId) {
		
		
		
	}
	
	/**
	 * Retrieves a promise for deleting an object.<br/>
	 * Would invoke for example: DELETE /targetType/objectId/action/actionArg.<br/>
	 * May throw an exception if an error happens.
	 * @param targetType Type of the resource to delete, will be used to determine actual target destination.
	 * @param objectId   Id of the resource to delete.
	 * @param action     Additional action to execute.
	 * @param actionArg  Additional argument to the action, optional.
	 * @return {Promise}
	 */
	
	deleteObjectWithAction(targetType, objectId, action, actionArg) {
		
		
		
	}
	
	/**
	 * Retrieves a promise for executing an action.<br/>
	 * Would invoke for example: POST /targetType/objectId/action/actionArg with arg as JSON request body.<br/>
	 * May throw an exception if an error happens.
	 * 
	 * @param targetType Type of the resource, will be used to determine target destination.
	 * @param objectId   Id of a resource.
	 * @param action     Action to execute.
	 * @param actionArg  Additional argument to the action, optional.
	 * @param arg        The data to be processed by the action.
	 * @return {Promise} The result of the execution, never null. An exception is thrown if the action cannot be executed.
	*/
	
	execute(targetType, objectId, action, actionArg, arg) {
		
		
		
	}
	
	/**
	 * Retrieves a promise for executing an action.<br/>
	 * Would invoke for example: POST /General/Apps/appId/callBackend/action with arg as JSON request body.<br/>
	 * May throw an exception if an error happens.
	 * 
	 * @param appId		Id of a application for which the given action is executed.
	 * @param action	Action to execute.
	 * @param arg		The data to be processed by the action.
	 * @return {Promise} The result of the execution, never null. An exception is thrown if the action cannot be executed.
	*/
	
	execute(appId, action, arg) {
		
		
		
	}
	
}
