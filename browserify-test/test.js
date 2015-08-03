var SecuofficeMixin = function () {
	this.custom = true;
};

SecuofficeMixin.prototype.init = function () {
	console.log('init SecuofficeMixin mixin');
};

SecuofficeMixin.prototype.getAppId = function () {
	return SecuofficeMixin.APP_ID;
};

SecuofficeMixin.prototype.authenticate = function (username, password) {
	var options = {
		channelConfig: [secucardConnect.Channel.REST], // use only rest
		useAuth: false // don't need auth token
	};
	return this.executeAppAction(this.getAppId(), 'authenticate', {username: username, password: password}, options);
};

SecuofficeMixin.prototype.getNavigation = function (options) {
	return this.executeAppAction(this.getAppId(), 'getNavigation', null, options);
};

SecuofficeMixin.APP_ID = 'APP_3KGNCU78A2YBG4J7R5GQG5KDNM8UA6';

var client = secucardConnect.SecucardConnect.create({
	restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
	oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
	stompHost: 'connect-dev10.secupay-ag.de',
	//stompEnabled: false
});

console.log('Client version:', client.getVersion());

var app = client.addAppService(SecuofficeMixin);
app.authenticate('developer@secucard.de', '').then(function (result) {
	
	if(result.error) {
		return Promise.resolve(result.error);
	}
	
	var credentials = {
		token: {
			//access_token: result.token,
			access_token: 'wrong',
			expires_in: 1200,
			token_type: 'bearer',
			scope: 'https://scope.secucard.com/e/api'
		}
	};

	client.setCredentials(credentials);
	return client.open();
	
	var accounts = client.getService(secucardConnect.Services.General.Accounts);
	return accounts.retrieve("me");

}).then(function (res) {

	console.log(res);

}).catch(function (err) {

	console.log('Error: ', err);

});