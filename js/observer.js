 function Dep(){
       this.subs = [];
    }
    Dep.prototype = {
      addSub: function(sub){
      	this.subs.push(sub);
      },
      notify: function(){
      	this.subs.forEach(function(sub){
      		sub.update();
      	})
      }
    };
	function observer(data){
	  if(!data || typeof data !== 'object'){
	    return
	  }
	  Object.keys(data).forEach(function(key){
	  	defineReactive(data, key, data[key]);
	  })
	}
	function defineReactive(data, key, value){
		observer(value);
		var dep = new Dep();
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get: function(){
				if (Dep.target) {
					dep.addSub(Dep.target);
				}
				return value;
			},
			set: function(newVal){
				if (value === newVal) return
				value = newVal;
			    dep.notify();
			}
		})
	}