var http = require('http');
var events = require('events');
var MongoClient = require('mongodb').MongoClient;
var PORT = process.env.PORT || 80;
var MONGO_URL = 'mongodb://127.0.0.1:27017/test';

var proxy = new events.EventEmitter();
proxy.setMaxListeners(0);
var status = 'ready';
var i = 0;
var select = function(db, callback) {
    proxy.once('selected', callback);
    if (status == 'ready') {
        status = 'pending';
        db.collection('test1').find({}).toArray(function(err, docs){
        	if(err) return proxy.emit('selected', err);
        	proxy.emit('selected', null, docs);
        	status = 'ready';
        	console.log(++i);
        });
    }
};

MongoClient.connect(MONGO_URL, function(err, db) {
    var server = http.createServer();

    server.on('request', function(req, res) {
    	select(db, function(err, docs){
    		if(err) return res.end(err.message);
    		res.end(docs.toString());
    	});
    });

    server.listen(PORT, function() {
        console.log('服务器已启动，正在监听端口: ' + PORT);
    });
});
