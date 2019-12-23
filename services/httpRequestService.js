const request = require("request");

exports.sendHttpRequest = sendHttpRequest;

function sendHttpRequest(opts) {
	return new Promise(async (resolve, reject) => {
		const options = {
			method: opts.requestMethod,
			url   : opts.url,
			body  : opts.body,
			qs    : opts.qs,
			json  : true
		};
		request(options, function (error, response, body) {
			if (error) {
				return reject(error);
			}else if(body.error){
				return reject(body.error);
			}
			resolve(body)
		});
	});
}
