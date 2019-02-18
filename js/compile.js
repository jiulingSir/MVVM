function complie(el, vm){
	this.$vm = vm;
	this.$el = this.isElementNode(el) ? el : document.querySelector(el);
	if (this.$el) {
		this.$fragment = this.getNodeFragment(this.$el);
		this.complieFragment(this.$fragment);
		this.$el.appendChild(this.$fragment);
	}
}
complie.prototype = {
	isElementNode: function(el){
		return el.nodeType === 1;
	},
	isTextNode: function(el){
		return el.nodeType === 3;
	},
	getNodeFragment: function(el){
		var fragment = document.createDocumentFragment();
		var child;
		while(child = el.firstChild){
			fragment.appendChild(child);
		}
		return fragment;
	},
	complieFragment: function(el){ 
		var childNodes = el.childNodes,
            me = this;
		[].slice.call(childNodes).forEach(function(node){
			var text = node.textContent;
			var reg = /\{\{(.*)\}\}/;
			if (me.isTextNode(node) && reg.test(text)) { 
				me.complieText(node, RegExp.$1);
			}
			if (node.childNodes && node.childNodes.length) {
				me.complieFragment(node);
			}
		})
	},
	complieText: function(node, exp){
		node.textContent = this.updateFunc(this.$vm, exp);
		new watcher(this.$vm, exp, function(newValue, oldValue){
		node.textContent = this.updateFunc(this.$vm, newValue, oldValue);
		})
	},
	updateFunc: function(vm, exp){
		var val;
		exps = exp.split('.');
		exps.forEach(function(exp){
		  val = vm[exp];
		});
		return val;
	}
}