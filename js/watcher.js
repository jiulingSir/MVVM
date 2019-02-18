function watcher(vm, exp, cb)  {
	this.$vm = vm;
	this.exp = exp;
	this.cb = cb;
	this.value = this.get();
}
watcher.prototype = {
	update: function(){
		this.run();
	},
	run: function(){
		var oldValue = this.value;
		var newValue = this.vm._data[this.exp];
		if (oldValue !== newValue) {
			this.value = newValue;
			this.cb.call(this.$vm, newValue, oldValue);
		}
	},
	get: function(){
		Dep.target = this;
		var value = this.$vm._data[this.exp];
		Dep.target = null;
		return value;
	}
}