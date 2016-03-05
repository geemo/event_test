function after(times, callback){
	var count = 0, result = {};
	return function(key, value){
		result[key] = value;
		count++;
		if(count === times){
			callback(result);
		}
	}
}

module.exports = after;