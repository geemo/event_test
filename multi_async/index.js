var http = require('http');
var fs = require('fs');
var dosomething = require('./multi_async.js');
var PORT = process.env.PORT || 80;

var server = http.createServer();
server.on('request', function(req, res){
	dosomething(function(result){
		res.end(JSON.stringify(result));
	});
});
server.listen(PORT, function(){
	console.log('server start on port: ' + PORT);
});