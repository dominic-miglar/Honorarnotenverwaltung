(function(exports) {
	var apiServer = 'http://127.0.0.1:8000/';
	exports.apiUrl = apiServer + 'api/v1/';
	exports.apiAuthUrl = apiServer + 'api-token-auth/';
})(typeof exports === 'undefined' ? this['configuration'] = {} : exports);
