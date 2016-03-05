var fs = require('fs');
var events = require('events');
var proxy = new events.EventEmitter();
proxy.setMaxListeners(0);
var count = 0;
var status = 'ready';

function after(times) {
    var count = 0,
        result = {};
    return function(key, value) {
        if (key) result[key] = value;
        count++;
        if (count === times) {
            proxy.emit('done', result);
            status = 'ready';
        }
    }
}

function dosomething(done) {
    fs.readFile('t1.txt', 'utf8', function(err, data) {
        done('t1', data);
    });

    fs.readFile('t2.txt', 'utf8', function(err, data) {
        done('t2', data);
    });

    fs.readFile('t3.txt', 'utf8', function(err, data) {
        done('t3', data);
    });
}

function doing(callback) {
    proxy.once('done', callback);
    if (status === 'ready') {
        status = 'pending';
        dosomething(after(3));
        console.log(++count);
    }
}

module.exports = doing;
