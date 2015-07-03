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
	* @param itemId
	 * @return {Promise} 
	*/
	
	getItem(targetType, itemId) {
		
		
		
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
	* Creating an object.<br/>
	 * Retrieves a promise for  the actual created object, never null.
	 * May contain additional or corrected data, like id.  So using this object later on instead the provided is necessary.
	* Would invoke for example: POST /object with object mapped to JSON as request body.<br/>
	 * 
	* Throws exception if object cannot be created.
	*
	* @param item   The object holding data to create. The type/class of the object is used to determine the target
	*                 destination.
	* @return {Promise}
	*/
	
	createItem(item) {
		
		
		
	}
	
}
