function Observer(){
	if(!(this instanceof Observer)) return new Observer();
	this.cbSet = {};
}

Observer.prototype = {
	consructor: Observer,
	on: function(){
		var evtName = arguments[0];
		if(typeof evtName !== 'string') throw new Error('args[0] is event name, must be a string');
		var cbs = Array.prototype.slice.call(arguments, 1);
		if(cbs.length) this.cbSet[evtName] = cbs;
	},
	emit: function(){
		var evtName = arguments[0];
		if(typeof evtName !== 'string') throw new Error('args[0] is event name, must be a string');
		var msgs = Array.prototype.slice.call(arguments, 1);
		var cbs = this.cbSet[evtName];
		if(msgs.length && cbs) {
			for(var i = 0; i < cbs.length; ++i) cbs[i].apply(this, msgs);
		}
	}
}

var obs = new Observer();
obs.on('aa', function(xx){
	console.log(xx);
});

obs.emit('aa', 'aasdfasdf');