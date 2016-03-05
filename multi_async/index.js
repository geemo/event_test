var http = require('http');
var fs = require('fs');
var after = require('./multi_async.js');
var PORT = process.env.PORT || 80;

var server = http.createServer();
server.on('request', function(req, res){
	var done = after(3, function(result){
		res.end(JSON.stringify(result));
	});

	fs.readFile('t1.txt', 'utf-8', function(err, data){
		done('t1', data);
	});

	fs.readFile('t2.txt', 'utf-8', function(err, data){
		done('t2', data);
	});

	fs.readFile('t3.txt', 'utf-8', function(err, data){
		done('t3', data);
	});
});
server.listen(PORT, function(){
	console.log('server start on port: ' + PORT);
});