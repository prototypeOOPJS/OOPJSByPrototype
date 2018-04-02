var m = {
	/*
	 * copyLevels can avoid endless loop.
	 * e.g. U define Person object, one attribute name self=this. when this structure instance copy to other object.
	 * because self point to person instance again, endless loop occur. 
	 * As I know Chorme can intelligently avoid endless loop, but others browser can not.
	 * 
	 * When call recursive, deepCopy will increase.
	 * 
	 */
	copyLevels: 0,
	deepCopy: function(fromObj, toObj, override) {
		m.copyLevels = 0;
		if (typeof override == "undefined") {
			override = true;
		}
		m.oneLevelCopy(fromObj, toObj, override);
	},
	isArray: function(object) {
		return object && typeof object === 'object' &&
			typeof object.length === 'number' &&
			typeof object.splice === 'function' &&
			//length is important attrebute of array  
			!(object.propertyIsEnumerable('length'));
	},
	oneLevelCopy: function(fromObj, toObj, override) {
		// if recursive depth copyLevels overflow. do shallow copy
		if (m.copyLevels++ > 19) {
			for (var key in fromObj) {//copy as Object. array also copy as Object
				if (typeof toObj[key] == 'undefined') {
					toObj[key] = fromObj[key];
				} else {
					if (override) {
						toObj[key] = fromObj[key];
					}
				}
			}
			if (this.isArray(fromObj)) {// copy as array
				for (var i = 0; i < fromObj.length; i++) {
					if (typeof toObj[i] == 'undefined') {
						toObj[i] = fromObj[i];
					} else {
						if (override) {
							// if toObj is array [a,b,c,d] and fromObj is [1,2]. the overried result is [1,2,c,d]
							toObj[i] = fromObj[i];
						}
					}
				}
			}
			return;
		}
		for (var key in fromObj) {//copy as object
			if (typeof fromObj[key] == 'object') { // 1) actually Array type also is object. 
				if (typeof toObj[key] == 'undefined') {// target does have this property, then generate one.
					if (this.isArray(fromObj[key])) {
						toObj[key] = [];// if from property is array. then generate array in target
					} else {
						toObj[key] = {};
					}
					m.oneLevelCopy(fromObj[key], toObj[key], override);
				} else if (typeof toObj[key] == 'object') {
					m.oneLevelCopy(fromObj[key], toObj[key], override);
				}
			} else { // plaint type copy
				if (typeof toObj[key] == 'undefined') {
					toObj[key] = fromObj[key];
				} else {
					if (override) {
						toObj[key] = fromObj[key];
					}
				}
			}
		}
		if (this.isArray(fromObj)) { // for array part
			for (var i = 0; i < fromObj.length; i++) {
				if (typeof fromObj[i] == 'object') { // 1) actually Array type also is object. 
					if (typeof toObj[i] == 'undefined') {
						if (this.isArray(fromObj[key])) {// if one attr is array,generate array
							toObj[i] = [];
						} else {
							toObj[i] = {};
						}
						m.oneLevelCopy(fromObj[i], toObj[i], override);
					} else if (typeof toObj[i] == 'object') {
						m.oneLevelCopy(fromObj[i], toObj[i], override);
					}
				} else { // plaint type copy
					if (typeof toObj[i] == 'undefined') {
						toObj[i] = fromObj[i];
					} else {
						if (override) {
							// if toObj is array [a,b,c,d] and fromObj is [1,2]. the overried result is [1,2,c,d]
							toObj[i] = fromObj[i];
						}
					}
				}
			}
		}
	}
};
Function.prototype.extend = function(superCls) {
	var self_prototype = this.prototype;
	var super_prototype = superCls.prototype;
	self_prototype.super = super_prototype;
	m.deepCopy(super_prototype, self_prototype, false);
	return this;
}
Function.prototype.body = function(obj) {
		for (var p in obj) {
			this.prototype[p] = obj[p];
		}
		return this;
	}
	/*
	Author: Eric Meng
	作者：孟详毅
	above code implement oop. following is demo. it is little different to java oop. every thing is override by sub-class. in Java, only method override.
	以上实现面向对象，以下是例子。
	please follow LGPL protocol
	请遵守 LGPL 协议
	my wechat is: treeiv email:cat555666@126.com, if you have question, my pleasure to discuss.
	我的微信是treeiv. 电邮 cat555666@126.com. 如果有问题欢迎讨论。
	var Animal=function(){
		alert("Animal name is "+this.name);
	}.body({
		self:this,
		name:"generic animal",
		sing:function(){
			alert(this.name+" sing");
		}
	});
	var Chiken=function(){
		this.super.constructor.apply(this);
		alert("Chiken name is "+this.name);
	}.body({
		name:"chiken",
		sing:function(sth){
			alert(this.name+" sing ji ji gou " + sth);
		}
	}).extend(Animal);
	var Duck=function(){
		this.super.constructor.apply(this);
		alert("Duck name is "+this.name);
	}.body({
		name:"duck",
		sing:function(){
			this.super.sing.apply(this,arguments)
			alert(this.name+" sing gua gua");
		}
	}).extend(Animal);
		var TomDuck=function(){
		this.super.constructor.apply(this);
		alert("TomDuck name is "+this.name);
	}.body({
		name:"Tom duck",
		sing:function(){
			alert(this.name+" what's fuck sing");
		}
	}).extend(Duck);
	var tomDuck=new TomDuck();
	tomDuck.sing();
	var duck=new Duck();
	duck.sing("....");
	*/
