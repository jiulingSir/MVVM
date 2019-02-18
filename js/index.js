function myVue(option){
	this.$option = option;
	var data = this._data = this.$option.data;
	var me = this;
	Object.keys(data).forEach(function(key){
		me._proxy(key); 
	});
	observer(data, this);console.log(this)
	this.$complie = new complie(option.el || document.body, this);
}
myVue.prototype = {
	_proxy: function(key){
		var me = this;
		Object.defineProperty(me, key, {
			get: function(){
				return me._data[key];
			},
			set: function(newVal){
				me._data[key] = newVal;
			}
		})
	}
}