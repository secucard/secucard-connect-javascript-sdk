let mixins = function (Parent, ...mixins) {
	class Mixed extends Parent {}
	let merged = Object.create(null);
	for (let mixin of mixins) {
		for (let prop of Object.getOwnPropertyNames(mixin.prototype)) {
			if(prop == 'constructor'){
				if(!merged[prop]) {
					merged[prop] = [];
				}
				(merged[prop]).push(mixin.prototype[prop]);
			} else {
				Mixed.prototype[prop] = mixin.prototype[prop];
			}
		}
	}
	return Mixed;
};

export default mixins;